const Chat = require('./public/models/chat');
const Territory = require('./public/models/territory');
const Gameutils = require('./public/models/gameutils');
const Player = require('./public/models/players');
const Castle = require('./public/models/castle');
const { MULTIPLE_CHOICE_QUESTIONS, GUESS_QUESTIONS, ULTRAHARD_QUESTIONS = [] } = require('./questions');




const PHASES = {
  WAITING: 'WAITING_FOR_PLAYERS',
  BASE_SELECTION: 'BASE_SELECTION',
  EXPANSION_SELECTION: 'EXPANSION_SELECTION',
  EXPANSION_QUESTION: 'EXPANSION_QUESTION',
  BATTLE_SELECTION: 'BATTLE_SELECTION',
  BATTLE_QUESTION: 'BATTLE_QUESTION',
  FINISHED: 'FINISHED',
};




const PLAYER_COLORS = ['Piros', 'Fehér', 'Zöld'];
const TERRITORY_SCORE = 200;
const CASTLE_SCORE_BONUS = 800; // 200 (territory) + 800 = 1000
const DEFENSE_BONUS = 100;
const MAX_BATTLE_ROUNDS = 6;
const MCQ_TIME_LIMIT_MS = 18000;
const GUESS_TIME_LIMIT_MS = 18000;








const ACTIVE_GAMES = new Map();




module.exports = function createGame(io, rawGameId, creatorUsername, howmany, maplevel) {
  const gameid = Number(rawGameId);
  if (ACTIVE_GAMES.has(gameid)) {
    return ACTIVE_GAMES.get(gameid);
  }




  const namespace = io.of(`/${gameid}`);
  const room = {
    io,
    namespace,
    gameid,
    howmany: Math.min(Math.max(Number(howmany) || 2, 2), 3),
    maplevel,
    creatorUsername,
    players: [],
    territories: [],
    castles: [],
    game: null,
    questionTimer: null,
    usedMcqIds: new Set(),
    usedGuessIds: new Set(),
    usedUltraHardIds: new Set(),
    questionRuntime: null,
  };




  ACTIVE_GAMES.set(gameid, room);
  setupGame(room).catch((error) => console.error('Game setup failed:', error));
  attachNamespaceHandlers(room);
  return room;
};




async function setupGame(room) {
  await deleteExistingGameData(room.gameid);




  room.players = createInitialPlayers(room.gameid, room.creatorUsername, room.howmany);
  room.territories = createMapTerritories(room.gameid, room.maplevel);
  room.castles = [];
  room.game = {
    gameid: room.gameid,
    phase: PHASES.WAITING,
    currentplayer: -1,
    players: room.players.map((player) => player.pid),
    playernames: room.players.map((player) => player.name),
    gamefinish: false,
    howmany: room.howmany,
    maplevel: room.maplevel,
    creater: room.creatorUsername,
    baseOrder: [],
    orderCycle: createOrderCycle(room.players.map((player) => player.pid)),
    baseSelectionIndex: 0,
    expansionRound: 0,
    expansionCycleIndex: 0,
    battleRound: 0,
    battleTurnIndex: 0,
    currentOrder: [],
    pendingSelections: {},
    reservedTerritories: [],
    expansionSelectionsPerTurn: 1,
    activeQuestion: null,
    ultraSabotageRemaining: 4,
    ultraSabotageRemainingByPid: Object.fromEntries(room.players.map((player) => [player.pid, 4])),
  };




  await Territory.createTerritories(room.territories);
  await Player.createPlayers(room.players);
  await Gameutils.addGameUtil(room.game);
  emitSnapshot(room);
}




function attachNamespaceHandlers(room) {
  room.namespace.on('connection', (socket) => {
    emitSnapshot(room, socket);




    socket.on('joingame', async (data = {}) => {
      try {
        await handleJoinGame(room, socket, String(data.username || '').trim());
      } catch (error) {
        console.error('joingame error:', error);
      }
    });




    socket.on('selectBase', async (data = {}) => {
      try {
        await handleSelectBase(room, socket, Number(data.tid));
      } catch (error) {
        console.error('selectBase error:', error);
      }
    });




    socket.on('selectExpansionTarget', async (data = {}) => {
      try {
        await handleSelectExpansionTarget(room, socket, Number(data.tid));
      } catch (error) {
        console.error('selectExpansionTarget error:', error);
      }
    });




    socket.on('selectAttackTarget', async (data = {}) => {
      try {
        await handleSelectAttackTarget(room, socket, Number(data.tid));
      } catch (error) {
        console.error('selectAttackTarget error:', error);
      }
    });




    socket.on('submitAnswer', async (data = {}) => {
      try {
        await handleSubmitAnswer(room, socket, data);
      } catch (error) {
        console.error('submitAnswer error:', error);
      }
    });




    socket.on('activateUltraSabotage', async () => {
      try {
        await handleActivateUltraSabotage(room, socket);
      } catch (error) {
        console.error('activateUltraSabotage error:', error);
      }
    });




    socket.on('getmsgs', async () => {
      try {
        const chats = await Chat.find({ gameid: room.gameid }).sort({ _id: 1 }).lean();
        socket.emit('outputmsg', chats);
      } catch (error) {
        console.error('getmsgs error:', error);
      }
    });




    socket.on('newmessage', async (data = {}) => {
      try {
        if (!String(data.message || '').trim()) return;
        const payload = {
          gameid: room.gameid,
          name: String(data.name || 'Ismeretlen'),
          message: String(data.message || '').trim(),
        };
        await Chat.create(payload);
        room.namespace.emit('outputmsg', [payload]);
      } catch (error) {
        console.error('newmessage error:', error);
      }
    });




    socket.on('disconnect', async () => {
      try {
        await handleDisconnect(room, socket);
      } catch (error) {
        console.error('disconnect error:', error);
      }
    });
  });
}




async function handleJoinGame(room, socket, username) {
  if (!username) {
    return;
  }




  socket.currentUsername = username;
  const existingPlayer = room.players.find((player) => player.name === username);




  if (existingPlayer) {
    existingPlayer.connected = true;
    await persistPlayer(room, existingPlayer);
    await refreshGamePlayerNames(room);
    sendStatus(room, `${username} csatlakozott.`);
    gameLog(room, `${username} csatlakozott a játékhoz.`);
    await maybeStartGame(room);
    emitSnapshot(room);
    return;
  }




  const openSlot = room.players.find((player) => player.name === 'x');
  if (!openSlot) {
    socket.emit('serverstatus', ['A szoba megtelt.']);
    return;
  }




  openSlot.name = username;
  openSlot.connected = true;
  await persistPlayer(room, openSlot);
  await refreshGamePlayerNames(room);
  gameLog(room, `${username} csatlakozott a játékhoz.`);
  sendStatus(room, `${username} csatlakozott.`);
  await maybeStartGame(room);
  emitSnapshot(room);
}




async function handleDisconnect(room, socket) {
  const username = socket.currentUsername;
  if (!username) {
    return;
  }




  const player = room.players.find((item) => item.name === username);
  if (!player) {
    return;
  }




  player.connected = false;
  await persistPlayer(room, player);
  gameLog(room, `${username} lecsatlakozott.`);
  sendStatus(room, `${username} lecsatlakozott.`);




  if (
    room.game.activeQuestion &&
    room.game.activeQuestion.participants.includes(player.pid) &&
    !room.game.activeQuestion.answers[player.pid]
  ) {
    room.game.activeQuestion.answers[player.pid] = {
      submittedAt: Date.now(),
      timedOut: true,
    };
    await persistGame(room);
    await maybeResolveQuestionEarly(room);
  }




  if (room.game.phase === PHASES.BATTLE_SELECTION || room.game.phase === PHASES.EXPANSION_SELECTION || room.game.phase === PHASES.BASE_SELECTION) {
    await maybeAdvanceWhenCurrentPlayerUnavailable(room);
  }




  emitSnapshot(room);
}





function getExpansionSelectionCap(room) {
  const eligiblePlayers = getEligiblePlayers(room);
  if (!eligiblePlayers.length) return 1;
  const unownedCount = getUnownedTerritories(room).length;
  return Math.min(2, Math.max(1, Math.floor(unownedCount / eligiblePlayers.length)));
}

function getUltraSabotageRemainingForPid(room, pid) {
  if (!room || !room.game) return 0;
  const byPid = room.game.ultraSabotageRemainingByPid || {};
  const remaining = byPid[pid];
  if (Number.isFinite(remaining)) return Math.max(0, remaining);
  if (Number.isInteger(pid) && Number.isFinite(room.game.ultraSabotageRemaining)) {
    return Math.max(0, room.game.ultraSabotageRemaining);
  }
  return 0;
}

function getPendingSelectionsForPid(room, pid) {
  const raw = room.game && room.game.pendingSelections ? room.game.pendingSelections[pid] : null;
  if (Array.isArray(raw)) return raw.slice();
  if (Number.isInteger(raw)) return [raw];
  return [];
}

async function maybeAdvanceExpansionSelection(room, player) {
  const selectionCap = room.game.expansionSelectionsPerTurn || 1;
  const currentSelections = getPendingSelectionsForPid(room, player.pid);
  const currentIndex = room.game.currentOrder.indexOf(player.pid);

  if (currentSelections.length < selectionCap) {
    const remainingTargets = getExpansionSelectableTargets(room, player.pid);
    if (remainingTargets.length) {
      room.game.currentplayer = player.pid;
      await persistGame(room);
      sendStatus(
        room,
        selectionCap === 2 && currentSelections.length === 1
          ? `Foglalási kör: ${player.name}, válassz MÉG EGY területet.`
          : `Foglalási kör: ${player.name} választ.`
      );
      return;
    }
  }

  const nextPid = nextEligiblePidInOrder(room, room.game.currentOrder, currentIndex, false, room.game.pendingSelections);
  if (nextPid === -1) {
    await startExpansionQuestion(room);
  } else {
    room.game.currentplayer = nextPid;
    await persistGame(room);
    const nextPlayer = getPlayerByPid(room, nextPid);
    sendStatus(room, `Foglalási kör: ${nextPlayer.name} választ.`);
  }
}

async function maybeAdvanceExpansionSelectionWhenUnavailable(room) {
  const current = getPlayerByPid(room, room.game.currentplayer);
  if (!current || current.eliminated || !current.connected) {
    const currentIndex = room.game.currentOrder.indexOf(room.game.currentplayer);
    const nextPid = nextEligiblePidInOrder(room, room.game.currentOrder, currentIndex, false, room.game.pendingSelections);
    if (nextPid === -1) {
      await startExpansionQuestion(room);
    } else {
      room.game.currentplayer = nextPid;
      await persistGame(room);
      emitSnapshot(room);
    }
  }
}

async function maybeStartGame(room) {
  const filledPlayers = room.players.filter((player) => player.name !== 'x');
  if (filledPlayers.length !== room.howmany) {
    return;
  }
  if (room.game.phase !== PHASES.WAITING) {
    return;
  }




  room.game.baseOrder = shuffle(room.players.map((player) => player.pid));
  room.game.baseSelectionIndex = 0;
  room.game.phase = PHASES.BASE_SELECTION;
  room.game.currentplayer = room.game.baseOrder[0];
  room.game.currentOrder = [...room.game.baseOrder];
  await refreshGamePlayerNames(room);
  await persistGame(room);




  const starter = getPlayerByPid(room, room.game.currentplayer);
  gameLog(room, `A játék elindult. Bázisválasztás következik. Kezd: ${starter.name}.`);
  sendStatus(room, `Bázisválasztás: ${starter.name} választ bázist.`);
}




async function handleSelectBase(room, socket, tid) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  if (!player) return;
  if (room.game.phase !== PHASES.BASE_SELECTION) return;
  if (room.game.currentplayer !== player.pid) {
    socket.emit('serverstatus', ['Most nem te választasz bázist.']);
    return;
  }




  const territory = getTerritoryByTid(room, tid);
  if (!territory || territory.ownsto !== -1) {
    socket.emit('serverstatus', ['Ez a bázis nem választható.']);
    return;
  }




  const touchingBase = room.castles.some((castle) => {
    if (!castle.active) return false;
    const castleTerritory = getTerritoryByTid(room, castle.tid);
    return castleTerritory && castleTerritory.neighbors.includes(tid);
  });




  if (touchingBase) {
    socket.emit('serverstatus', ['A bázis nem lehet egy másik bázis mellett.']);
    return;
  }




  territory.ownsto = player.pid;
  room.castles.push({ gameid: room.gameid, pid: player.pid, tid, hp: 3, active: true });
  rebuildPlayerTerritories(room);
  recalculateScores(room);




  await persistTerritory(room, territory);
  await persistCastle(room, room.castles[room.castles.length - 1], true);
  await persistAllPlayers(room);




  gameLog(room, `${player.name} bázist választott: ${territory.tname}.`);




  room.game.baseSelectionIndex += 1;
  if (room.game.baseSelectionIndex >= room.game.baseOrder.length) {
    await startExpansionRound(room, true);
  } else {
    room.game.currentplayer = room.game.baseOrder[room.game.baseSelectionIndex];
    await persistGame(room);
    const nextPlayer = getPlayerByPid(room, room.game.currentplayer);
    sendStatus(room, `Bázisválasztás: ${nextPlayer.name} következik.`);
  }




  emitSnapshot(room);
}




async function startExpansionRound(room, firstRound = false) {
  if (allTerritoriesClaimed(room)) {
    await startBattleRound(room, 1);
    return;
  }




  const eligible = getEligiblePlayers(room);
  if (eligible.length <= 1) {
    await finishMatch(room, eligible[0]?.pid ?? getHighestScorePlayer(room).pid);
    return;
  }




  if (getUnownedTerritories(room).length < 5) {
    await startExpansionRemainderGuess(room);
    return;
  }




  room.game.phase = PHASES.EXPANSION_SELECTION;
  room.game.expansionRound = firstRound ? 1 : room.game.expansionRound + 1;
  room.game.currentOrder = room.game.orderCycle[room.game.expansionCycleIndex % room.game.orderCycle.length] || [];
  room.game.expansionCycleIndex = (room.game.expansionCycleIndex + 1) % room.game.orderCycle.length;
  room.game.pendingSelections = {};
  room.game.reservedTerritories = [];
  room.game.expansionSelectionsPerTurn = getExpansionSelectionCap(room);
  room.game.activeQuestion = null;
  room.game.currentplayer = nextEligiblePidInOrder(room, room.game.currentOrder, -1, true);
  await persistGame(room);




  if (room.game.currentplayer === -1) {
    await startExpansionRound(room);
    return;
  }




  const current = getPlayerByPid(room, room.game.currentplayer);
  gameLog(room, `Foglalási kör ${room.game.expansionRound}. Sorrend: ${formatOrder(room, room.game.currentOrder)}.`);
  sendStatus(
    room,
    room.game.expansionSelectionsPerTurn === 2
      ? `Foglalási kör ${room.game.expansionRound}: ${current.name} választhat, összesen KÉT területet.`
      : `Foglalási kör ${room.game.expansionRound}: ${current.name} választ.`
  );
  emitSnapshot(room);
}




async function startExpansionRemainderGuess(room) {
  const eligible = getEligiblePlayers(room);
  if (eligible.length <= 1) {
    await finishMatch(room, eligible[0]?.pid ?? getHighestScorePlayer(room).pid);
    return;
  }

  const unownedTerritories = getUnownedTerritories(room).sort((a, b) => a.tid - b.tid);
  if (!unownedTerritories.length) {
    await startBattleRound(room, 1);
    return;
  }

  room.game.phase = PHASES.EXPANSION_QUESTION;
  room.game.currentplayer = -1;
  room.game.pendingSelections = {};
  room.game.reservedTerritories = unownedTerritories.map((territory) => territory.tid);
  room.game.activeQuestion = null;
  await persistGame(room);

  await createAndBroadcastQuestion(room, {
    type: 'guess',
    context: {
      flow: 'EXPANSION',
      subflow: 'REMAINDER_GUESS',
      remainingTids: unownedTerritories.map((territory) => territory.tid),
      remainingNames: unownedTerritories.map((territory) => territory.tname),
      targetTid: unownedTerritories[0].tid,
      targetName: unownedTerritories[0].tname,
    },
    participants: eligible.map((player) => player.pid),
    viewers: room.players.map((player) => player.pid),
  });

  gameLog(room, `Maradék területek tippelős kiosztása: ${unownedTerritories.map((territory) => territory.tname).join(', ')}.`);
  sendStatus(room, `Maradék területek tippelős kiosztása következik.`);
}




async function handleSelectExpansionTarget(room, socket, tid) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  if (!player) return;
  if (room.game.phase !== PHASES.EXPANSION_SELECTION) return;
  if (room.game.currentplayer !== player.pid) {
    socket.emit('serverstatus', ['Most nem te választasz területet.']);
    return;
  }

  const territory = getTerritoryByTid(room, tid);
  if (!territory || territory.ownsto !== -1) {
    socket.emit('serverstatus', ['Ez a terület most nem választható.']);
    return;
  }
  if (room.game.reservedTerritories.includes(tid)) {
    socket.emit('serverstatus', ['Ezt a területet ebben a körben már lefoglalták.']);
    return;
  }

  const allowedTargets = getExpansionSelectableTargets(room, player.pid);
  if (!allowedTargets.includes(tid)) {
    socket.emit('serverstatus', ['Csak szomszédos üres mezőt választhatsz, vagy ha nincs ilyen, bármelyik üreset.']);
    return;
  }

  const selectionCap = room.game.expansionSelectionsPerTurn || 1;
  const selections = getPendingSelectionsForPid(room, player.pid);
  if (selections.length >= selectionCap) {
    socket.emit('serverstatus', ['Ebben a körben már kiválasztottad az összes foglalható területedet.']);
    return;
  }

  selections.push(tid);
  room.game.pendingSelections[player.pid] = selections;
  room.game.reservedTerritories.push(tid);
  gameLog(room, `${player.name} kinézte ezt a területet: ${territory.tname}.`);

  await maybeAdvanceExpansionSelection(room, player);
  emitSnapshot(room);
}


async function startExpansionQuestion(room) {
  const participants = Object.keys(room.game.pendingSelections)
    .map((value) => Number(value))
    .filter((pid) => getPendingSelectionsForPid(room, pid).length > 0);
  if (!participants.length) {
    await startExpansionRound(room);
    return;
  }

  room.game.phase = PHASES.EXPANSION_QUESTION;
  room.game.currentplayer = -1;
  await createAndBroadcastQuestion(room, {
    type: 'mcq',
    context: {
      flow: 'EXPANSION',
      participants,
      pendingSelections: { ...room.game.pendingSelections },
      selectionsPerTurn: room.game.expansionSelectionsPerTurn || 1,
    },
    participants,
    viewers: room.players.map((player) => player.pid),
  });
  sendStatus(room, 'Közös foglalási kérdés indul.');
}




async function startBattleRound(room, roundNumber) {
  const alive = getAlivePlayers(room);
  if (alive.length <= 1) {
    await finishMatch(room, alive[0]?.pid ?? getHighestScorePlayer(room).pid);
    return;
  }




  if (roundNumber > MAX_BATTLE_ROUNDS) {
    await finishMatch(room, getHighestScorePlayer(room).pid);
    return;
  }




  room.game.phase = PHASES.BATTLE_SELECTION;
  room.game.battleRound = roundNumber;
  room.game.battleTurnIndex = 0;
  room.game.currentOrder = room.game.orderCycle[(roundNumber - 1) % room.game.orderCycle.length] || [];
  room.game.currentplayer = nextEligiblePidInOrder(room, room.game.currentOrder, -1, true);
  room.game.activeQuestion = null;
  await persistGame(room);




  gameLog(room, `Csatakör ${roundNumber}. Sorrend: ${formatOrder(room, room.game.currentOrder)}.`);
  emitSnapshot(room);
  await maybeAdvanceWhenCurrentPlayerUnavailable(room);
}




async function maybeAdvanceWhenCurrentPlayerUnavailable(room) {
  if (room.game.phase === PHASES.BASE_SELECTION) {
    const current = getPlayerByPid(room, room.game.currentplayer);
    if (!current || current.name === 'x' || !current.connected) {
      room.game.baseSelectionIndex += 1;
      if (room.game.baseSelectionIndex >= room.game.baseOrder.length) {
        await startExpansionRound(room, true);
      } else {
        room.game.currentplayer = room.game.baseOrder[room.game.baseSelectionIndex];
        await persistGame(room);
        emitSnapshot(room);
      }
    }
    return;
  }




  if (room.game.phase === PHASES.EXPANSION_SELECTION) {
    await maybeAdvanceExpansionSelectionWhenUnavailable(room);
    return;
  }




  if (room.game.phase === PHASES.BATTLE_SELECTION) {
    const current = getPlayerByPid(room, room.game.currentplayer);
    if (!current || current.eliminated) {
      await advanceBattleTurn(room);
      return;
    }
    if (!current.connected) {
      gameLog(room, `${current.name} kimarad ebből a csatakörből, mert nincs kapcsolódva.`);
      await advanceBattleTurn(room);
      return;
    }
    const attackable = getAttackableTargets(room, current.pid);
    if (!attackable.length) {
      gameLog(room, `${current.name} kimarad, mert nincs támadható szomszédos ellenséges terület.`);
      await advanceBattleTurn(room);
      return;
    }
    sendStatus(room, `Csata ${room.game.battleRound}. kör: ${current.name} támadót választ.`);
    emitSnapshot(room);
  }
}




async function handleSelectAttackTarget(room, socket, tid) {
  const attacker = getPlayerByUsername(room, socket.currentUsername);
  if (!attacker) return;
  if (room.game.phase !== PHASES.BATTLE_SELECTION) return;
  if (room.game.currentplayer !== attacker.pid) {
    socket.emit('serverstatus', ['Most nem te támadsz.']);
    return;
  }




  const territory = getTerritoryByTid(room, tid);
  if (!territory || territory.ownsto < 0 || territory.ownsto === attacker.pid) {
    socket.emit('serverstatus', ['Csak szomszédos, ellenséges terület támadható.']);
    return;
  }




  if (!getAttackableTargets(room, attacker.pid).includes(tid)) {
    socket.emit('serverstatus', ['Ez a terület nem támadható.']);
    return;
  }




  const defender = getPlayerByPid(room, territory.ownsto);
  const castle = getActiveCastleByTid(room, tid);




  gameLog(room, `${attacker.name} megtámadta ${territory.tname} területét. Védő: ${defender.name}.`);
  await startBattleMcq(room, {
    attackerPid: attacker.pid,
    defenderPid: defender.pid,
    targetTid: tid,
    targetName: territory.tname,
    isCastle: Boolean(castle),
    castleTid: castle ? castle.tid : null,
    castleStage: 1,
  });
}




async function startBattleMcq(room, battleContext) {
  room.game.phase = PHASES.BATTLE_QUESTION;
  room.game.currentplayer = -1;
  await createAndBroadcastQuestion(room, {
    type: 'mcq',
    context: {
      flow: 'BATTLE',
      ...battleContext,
    },
    participants: [battleContext.attackerPid, battleContext.defenderPid],
    viewers: room.players.map((player) => player.pid),
  });




  const attacker = getPlayerByPid(room, battleContext.attackerPid);
  const defender = getPlayerByPid(room, battleContext.defenderPid);
  if (battleContext.isCastle) {
    sendStatus(room, `Várostrom: ${attacker.name} támad, ${defender.name} véd.`);
  } else {
    sendStatus(room, `Csata: ${attacker.name} támad, ${defender.name} véd.`);
  }
}




async function handleSubmitAnswer(room, socket, data) {
  if (!room.game.activeQuestion) return;




  const player = getPlayerByUsername(room, socket.currentUsername);
  if (!player) return;
  const question = room.game.activeQuestion;
  if (!question.participants.includes(player.pid)) return;
  if (question.answers[player.pid]) return;




  const now = Date.now();
  if (now > question.deadline) {
    socket.emit('serverstatus', ['Lejárt az idő.']);
    return;
  }




  if (question.type === 'mcq') {
    const selectedIndex = Number(data.selectedIndex);
    const localQuestion = getQuestionVariantForPid(room, player.pid) || question;
    if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
      socket.emit('serverstatus', ['Érvénytelen válasz.']);
      return;
    }
    question.answers[player.pid] = {
      selectedIndex,
      submittedAt: now,
      correct: selectedIndex === localQuestion.correctOptionIndex,
      questionVariantId: localQuestion.id || question.id,
      ultraHard: Boolean(localQuestion.isUltra),
    };
  } else if (question.type === 'guess') {
    const guess = Number(data.guess);
    if (!Number.isFinite(guess)) {
      socket.emit('serverstatus', ['Érvénytelen tipp.']);
      return;
    }
    question.answers[player.pid] = {
      guess,
      submittedAt: now,
      distance: Math.abs(guess - question.exactAnswer),
    };
  }




  room.game.activeQuestion = question;
  await persistGame(room);
  await maybeResolveQuestionEarly(room);
}




async function maybeResolveQuestionEarly(room) {
  const question = room.game.activeQuestion;
  if (!question) return;
  const everyoneAnswered = question.participants.every((pid) => Boolean(question.answers[pid]));
  if (everyoneAnswered) {
    clearQuestionTimer(room);
    await resolveActiveQuestion(room);
  }
}




async function createAndBroadcastQuestion(room, config) {
  clearQuestionTimer(room);




  const baseQuestion = config.type === 'mcq'
    ? drawMultipleChoiceQuestion(room)
    : drawGuessQuestion(room);




  const deadline = Date.now() + (config.type === 'mcq' ? MCQ_TIME_LIMIT_MS : GUESS_TIME_LIMIT_MS);




  room.game.activeQuestion = {
    id: `${config.type}_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    type: config.type,
    prompt: baseQuestion.prompt,
    options: baseQuestion.options || null,
    correctOptionIndex: baseQuestion.correctOptionIndex,
    exactAnswer: baseQuestion.exactAnswer,
    unit: baseQuestion.unit || '',
    participants: [...config.participants],
    viewers: [...config.viewers],
    answers: {},
    deadline,
    context: config.context,
  };




  room.questionRuntime = {
    perPidQuestion: {},
    ultraSabotageUsed: false,
    ultraSabotageTargetPid: null,
    ultraSabotageByPid: null,
  };

  if (config.type === 'mcq') {
    config.participants.forEach((pid) => {
      room.questionRuntime.perPidQuestion[pid] = {
        id: room.game.activeQuestion.id,
        prompt: baseQuestion.prompt,
        options: Array.isArray(baseQuestion.options) ? baseQuestion.options.slice() : [],
        correctOptionIndex: baseQuestion.correctOptionIndex,
        isUltra: false,
      };
    });
  }




  await persistGame(room);




  emitQuestionStart(room);




  room.questionTimer = setTimeout(async () => {
    try {
      await resolveActiveQuestion(room);
    } catch (error) {
      console.error('Question timeout resolve failed:', error);
    }
  }, Math.max(0, deadline - Date.now()) + 25);
}




async function resolveActiveQuestion(room) {
  const question = room.game.activeQuestion;
  if (!question) return;




  question.participants.forEach((pid) => {
    if (!question.answers[pid]) {
      question.answers[pid] = { submittedAt: question.deadline, timedOut: true };
      if (question.type === 'mcq') {
        question.answers[pid].correct = false;
      } else {
        question.answers[pid].guess = null;
        question.answers[pid].distance = Number.POSITIVE_INFINITY;
      }
    }
  });




  clearQuestionTimer(room);




  if (question.context.flow === 'EXPANSION') {
    if (question.context.subflow === 'REMAINDER_GUESS') {
      await resolveExpansionRemainderGuess(room, question);
    } else {
      await resolveExpansionQuestion(room, question);
    }
    return;
  }




  if (question.context.flow === 'BATTLE') {
    if (question.type === 'mcq') {
      await resolveBattleMcq(room, question);
    } else {
      await resolveBattleGuess(room, question);
    }
  }
}




async function resolveExpansionQuestion(room, question) {
  const resultLines = [];

  question.participants.forEach((pid) => {
    const player = getPlayerByPid(room, pid);
    const selectedTids = Array.isArray(question.context.pendingSelections[pid])
      ? question.context.pendingSelections[pid]
      : (Number.isInteger(question.context.pendingSelections[pid]) ? [question.context.pendingSelections[pid]] : []);

    if (question.answers[pid].correct) {
      const capturedNames = [];
      selectedTids.forEach((tid) => {
        const territory = getTerritoryByTid(room, tid);
        if (!territory || territory.ownsto !== -1) {
          return;
        }
        territory.ownsto = pid;
        capturedNames.push(territory.tname);
      });

      if (capturedNames.length) {
        resultLines.push(`${player.name} helyesen válaszolt, megszerezte: ${capturedNames.join(', ')}.`);
      } else {
        resultLines.push(`${player.name} helyesen válaszolt, de már nem maradt megszerezhető kijelölt területe.`);
      }
    } else {
      const missedNames = selectedTids
        .map((tid) => getTerritoryByTid(room, tid))
        .filter(Boolean)
        .map((territory) => territory.tname);
      resultLines.push(
        missedNames.length
          ? `${player.name} nem szerezte meg: ${missedNames.join(', ')}.`
          : `${player.name} nem szerzett területet.`
      );
    }
  });

  rebuildPlayerTerritories(room);
  recalculateScores(room);
  await persistAllTerritories(room);
  await persistAllPlayers(room);

  room.namespace.emit('question:resolved', {
    flow: 'EXPANSION',
    answers: sanitizeAnswers(question),
    correctOptionIndex: question.correctOptionIndex,
    messages: resultLines,
  });

  room.game.activeQuestion = null;
  room.questionRuntime = null;
  room.game.pendingSelections = {};
  room.game.reservedTerritories = [];
  await persistGame(room);

  resultLines.forEach((line) => gameLog(room, line));
  emitSnapshot(room);

  if (allTerritoriesClaimed(room)) {
    await startBattleRound(room, 1);
  } else {
    await startExpansionRound(room);
  }
}


async function resolveExpansionRemainderGuess(room, question) {
  const remainingTids = Array.isArray(question.context.remainingTids)
    ? question.context.remainingTids.slice()
    : (Number.isInteger(question.context.targetTid) ? [question.context.targetTid] : []);
  const availableTerritories = remainingTids
    .map((tid) => getTerritoryByTid(room, tid))
    .filter((territory) => territory && territory.ownsto === -1)
    .sort((a, b) => a.tid - b.tid);

  if (!availableTerritories.length) {
    room.game.activeQuestion = null;
    room.questionRuntime = null;
    room.game.pendingSelections = {};
    room.game.reservedTerritories = [];
    await persistGame(room);
    emitSnapshot(room);
    if (allTerritoriesClaimed(room)) {
      await startBattleRound(room, 1);
    } else {
      await startExpansionRound(room);
    }
    return;
  }

  const rankedParticipants = question.participants
    .map((pid) => {
      const answer = question.answers[pid] || {};
      return {
        pid,
        distance: Number.isFinite(answer.distance) ? answer.distance : Number.POSITIVE_INFINITY,
        submittedAt: Number.isFinite(answer.submittedAt) ? answer.submittedAt : Number.POSITIVE_INFINITY,
      };
    })
    .sort((a, b) => a.distance - b.distance || a.submittedAt - b.submittedAt || a.pid - b.pid);

  const resultLines = [];
  const winnerEntry = rankedParticipants[0];
  const secondEntry = rankedParticipants[1];

  if (winnerEntry) {
    const winner = getPlayerByPid(room, winnerEntry.pid);
    const winnerTerritories = availableTerritories.slice(0, Math.min(2, availableTerritories.length));
    winnerTerritories.forEach((territory) => {
      territory.ownsto = winner.pid;
    });

    if (winner && winnerTerritories.length) {
      resultLines.push(`${winner.name} szerezte meg a maradék területek közül: ${winnerTerritories.map((territory) => territory.tname).join(', ')}.`);
    }
  }

  const secondTerritories = availableTerritories.slice(Math.min(2, availableTerritories.length));
  if (secondEntry && secondTerritories.length) {
    const second = getPlayerByPid(room, secondEntry.pid);
    secondTerritories.forEach((territory) => {
      territory.ownsto = second.pid;
    });

    if (second) {
      resultLines.push(`${second.name} kapta a maradék területeket: ${secondTerritories.map((territory) => territory.tname).join(', ')}.`);
    }
  }

  rebuildPlayerTerritories(room);
  recalculateScores(room);
  await persistAllTerritories(room);
  await persistAllPlayers(room);

  room.namespace.emit('question:resolved', {
    flow: 'EXPANSION_REMAINDER_GUESS',
    answers: sanitizeAnswers(question),
    exactAnswer: question.exactAnswer,
    revealLines: buildGuessRevealLines(room, question),
    messages: resultLines,
  });

  room.game.activeQuestion = null;
  room.questionRuntime = null;
  room.game.pendingSelections = {};
  room.game.reservedTerritories = [];
  await persistGame(room);

  resultLines.forEach((line) => gameLog(room, line));
  emitSnapshot(room);

  if (allTerritoriesClaimed(room)) {
    await startBattleRound(room, 1);
  } else if (getUnownedTerritories(room).length < 5) {
    await startExpansionRemainderGuess(room);
  } else {
    await startExpansionRound(room);
  }
}




async function resolveBattleMcq(room, question) {
  const { attackerPid, defenderPid, targetTid, isCastle, castleTid, castleStage } = question.context;
  const attacker = getPlayerByPid(room, attackerPid);
  const defender = getPlayerByPid(room, defenderPid);
  const attackerCorrect = Boolean(question.answers[attackerPid]?.correct);
  const defenderCorrect = Boolean(question.answers[defenderPid]?.correct);




  emitBattleResolved(room, question);




  if (attackerCorrect && defenderCorrect) {
    room.questionRuntime = null;
    await createAndBroadcastQuestion(room, {
      type: 'guess',
      context: {
        flow: 'BATTLE',
        duelType: 'TIEBREAK',
        attackerPid,
        defenderPid,
        targetTid,
        isCastle,
        castleTid,
        castleStage,
      },
      participants: [attackerPid, defenderPid],
      viewers: room.players.map((player) => player.pid),
    });
    sendStatus(room, 'Mindketten jól válaszoltak, tippelős döntő következik.');
    return;
  }




  room.questionRuntime = null;
  const attackerWins = attackerCorrect && !defenderCorrect;
  if (attackerWins) {
    await resolveSuccessfulAttack(room, { attackerPid, defenderPid, targetTid, isCastle, castleTid, castleStage });
  } else {
    await resolveSuccessfulDefense(room, { attacker, defender, isCastle, castleStage });
  }
}




async function resolveBattleGuess(room, question) {
  const { attackerPid, defenderPid, targetTid, isCastle, castleTid, castleStage } = question.context;
  const attackerAnswer = question.answers[attackerPid];
  const defenderAnswer = question.answers[defenderPid];




  const attackerDistance = Number.isFinite(attackerAnswer.distance) ? attackerAnswer.distance : Number.POSITIVE_INFINITY;
  const defenderDistance = Number.isFinite(defenderAnswer.distance) ? defenderAnswer.distance : Number.POSITIVE_INFINITY;




  let attackerWins = false;
  if (attackerDistance < defenderDistance) {
    attackerWins = true;
  } else if (attackerDistance > defenderDistance) {
    attackerWins = false;
  } else {
    const attackerTime = attackerAnswer.submittedAt ?? Number.POSITIVE_INFINITY;
    const defenderTime = defenderAnswer.submittedAt ?? Number.POSITIVE_INFINITY;
    if (attackerTime < defenderTime) {
      attackerWins = true;
    } else {
      attackerWins = false;
    }
  }




  room.namespace.emit('question:resolved', {
    flow: 'BATTLE_GUESS',
    answers: sanitizeAnswers(question),
    exactAnswer: question.exactAnswer,
    revealLines: buildGuessRevealLines(room, question),
    messages: [],
  });




  if (attackerWins) {
    await resolveSuccessfulAttack(room, { attackerPid, defenderPid, targetTid, isCastle, castleTid, castleStage });
  } else {
    const attacker = getPlayerByPid(room, attackerPid);
    const defender = getPlayerByPid(room, defenderPid);
    await resolveSuccessfulDefense(room, { attacker, defender, isCastle, castleStage });
  }
}




async function resolveSuccessfulAttack(room, context) {
  const attacker = getPlayerByPid(room, context.attackerPid);
  const defender = getPlayerByPid(room, context.defenderPid);




  if (!context.isCastle) {
    const territory = getTerritoryByTid(room, context.targetTid);
    territory.ownsto = attacker.pid;
    rebuildPlayerTerritories(room);
    recalculateScores(room);
    await persistTerritory(room, territory);
    await persistAllPlayers(room);




    const line = `${attacker.name} elfoglalta ${territory.tname} területét ${defender.name} játékostól.`;
    gameLog(room, line);
    room.namespace.emit('battle:result', { message: line });




    room.game.activeQuestion = null;
    room.game.phase = PHASES.BATTLE_SELECTION;
    await persistGame(room);
    emitSnapshot(room);
    await advanceBattleTurn(room);
    return;
  }




  const castle = room.castles.find((item) => item.tid === context.castleTid && item.active);
  if (!castle) {
    await advanceBattleTurn(room);
    return;
  }




  castle.hp -= 1;
  await persistCastle(room, castle, false);




  if (castle.hp <= 0) {
    castle.active = false;
    castle.hp = 0;
    defender.eliminated = true;
    defender.connected = false;
    defender.territories = [];
    attacker.castleCaptureBonus = (attacker.castleCaptureBonus || 0) + CASTLE_SCORE_BONUS;




    room.territories.forEach((territory) => {
      if (territory.ownsto === defender.pid) {
        territory.ownsto = attacker.pid;
      }
    });




    rebuildPlayerTerritories(room);
    recalculateScores(room);
    await persistAllTerritories(room);
    await persistAllPlayers(room);
    await persistCastle(room, castle, false);




    const line = `${attacker.name} lerombolta ${defender.name} várát, megszerezte az összes területét, és ${defender.name} kiesett.`;
    gameLog(room, line);
    room.namespace.emit('battle:result', { message: line });




    room.game.activeQuestion = null;
    room.game.phase = PHASES.BATTLE_SELECTION;
    await persistGame(room);
    emitSnapshot(room);




    const alive = getAlivePlayers(room);
    if (alive.length <= 1) {
      await finishMatch(room, alive[0]?.pid ?? attacker.pid);
      return;
    }




    await advanceBattleTurn(room);
    return;
  }




  const line = `${attacker.name} újabb tornyot rombolt le ${defender.name} várából. Maradék életerő: ${castle.hp}.`;
  gameLog(room, line);
  room.namespace.emit('battle:result', { message: line });
  room.game.activeQuestion = null;
  await persistGame(room);
  emitSnapshot(room);




  await startBattleMcq(room, {
    attackerPid: attacker.pid,
    defenderPid: defender.pid,
    targetTid: context.targetTid,
    targetName: getTerritoryByTid(room, context.targetTid).tname,
    isCastle: true,
    castleTid: context.castleTid,
    castleStage: context.castleStage + 1,
  });
}




async function resolveSuccessfulDefense(room, { attacker, defender, isCastle, castleStage }) {
  defender.defenseBonus = (defender.defenseBonus || 0) + DEFENSE_BONUS;
  recalculateScores(room);
  await persistAllPlayers(room);




  const line = isCastle
    ? `${defender.name} sikeresen megvédte a várát a ${castleStage}. ostromkérdésnél.`
    : `${defender.name} sikeresen megvédte a területét ${attacker.name} ellen.`;
  gameLog(room, line);
  room.namespace.emit('battle:result', { message: line });




  room.game.activeQuestion = null;
  room.game.phase = PHASES.BATTLE_SELECTION;
  await persistGame(room);
  emitSnapshot(room);
  await advanceBattleTurn(room);
}




async function advanceBattleTurn(room) {
  const order = room.game.currentOrder || [];
  const currentIndex = room.game.currentplayer === -1 ? room.game.battleTurnIndex : order.indexOf(room.game.currentplayer);
  const nextPid = nextEligiblePidInOrder(room, order, currentIndex, false);




  if (nextPid === -1) {
    await startBattleRound(room, room.game.battleRound + 1);
    emitSnapshot(room);
    return;
  }




  room.game.currentplayer = nextPid;
  room.game.phase = PHASES.BATTLE_SELECTION;
  room.game.battleTurnIndex = order.indexOf(nextPid);
  await persistGame(room);
  emitSnapshot(room);
  await maybeAdvanceWhenCurrentPlayerUnavailable(room);
}




async function finishMatch(room, winnerPid) {
  room.game.phase = PHASES.FINISHED;
  room.game.currentplayer = -1;
  room.game.gamefinish = true;
  room.game.activeQuestion = null;
  room.game.winner = winnerPid;
  await persistGame(room);




  clearQuestionTimer(room);
  const winner = getPlayerByPid(room, winnerPid) || getHighestScorePlayer(room);
  gameLog(room, `A meccs véget ért. Győztes: ${winner.name} (${winner.score} pont).`);
  sendStatus(room, `A meccs véget ért. Győztes: ${winner.name}.`);
  emitSnapshot(room);
  room.namespace.emit('gamefinish', [{ winner: winner.pid }]);
}




function getExpansionSelectableTargets(room, pid) {
  const owned = room.territories.filter((territory) => territory.ownsto === pid);
  const unowned = room.territories.filter((territory) => territory.ownsto === -1).map((territory) => territory.tid);
  if (!owned.length) {
    return unowned;
  }




  const adjacent = new Set();
  owned.forEach((territory) => {
    territory.neighbors.forEach((neighborTid) => {
      const neighbor = getTerritoryByTid(room, neighborTid);
      if (neighbor && neighbor.ownsto === -1) {
        adjacent.add(neighborTid);
      }
    });
  });




  if (adjacent.size) {
    return [...adjacent].filter((tid) => !room.game.reservedTerritories.includes(tid));
  }




  return unowned.filter((tid) => !room.game.reservedTerritories.includes(tid));
}




function getAttackableTargets(room, pid) {
  const targetSet = new Set();
  room.territories.forEach((territory) => {
    if (territory.ownsto !== pid) return;
    territory.neighbors.forEach((neighborTid) => {
      const neighbor = getTerritoryByTid(room, neighborTid);
      if (neighbor && neighbor.ownsto >= 0 && neighbor.ownsto !== pid) {
        targetSet.add(neighborTid);
      }
    });
  });
  return [...targetSet];
}




function rebuildPlayerTerritories(room) {
  room.players.forEach((player) => {
    player.territories = [];
  });




  room.territories.forEach((territory) => {
    if (territory.ownsto >= 0) {
      const owner = getPlayerByPid(room, territory.ownsto);
      if (owner) {
        owner.territories.push(territory.tid);
      }
    }
  });
}




function recalculateScores(room) {
  room.players.forEach((player) => {
    const territoryCount = room.territories.filter((territory) => territory.ownsto === player.pid).length;
    const activeCastleBonus = room.castles.some((castle) => castle.active && castle.pid === player.pid)
      ? CASTLE_SCORE_BONUS
      : 0;
    const assetScore = territoryCount * TERRITORY_SCORE + activeCastleBonus;
    player.score = assetScore + (player.defenseBonus || 0) + (player.castleCaptureBonus || 0);
  });
}




function getHighestScorePlayer(room) {
  return [...room.players].sort((a, b) => b.score - a.score || a.pid - b.pid)[0];
}




function getAlivePlayers(room) {
  return room.players.filter((player) => !player.eliminated);
}




function getEligiblePlayers(room) {
  return room.players.filter((player) => !player.eliminated && player.connected);
}




function nextEligiblePidInOrder(room, order, currentIndex, includeCurrent = false, selectionMap = null) {
  const start = includeCurrent ? currentIndex : currentIndex + 1;
  for (let i = Math.max(start, 0); i < order.length; i += 1) {
    const pid = order[i];
    const player = getPlayerByPid(room, pid);
    if (!player || player.eliminated || !player.connected) {
      continue;
    }
    if (selectionMap && Object.prototype.hasOwnProperty.call(selectionMap, pid)) {
      continue;
    }
    return pid;
  }
  return -1;
}




function getPlayerByPid(room, pid) {
  return room.players.find((player) => player.pid === pid);
}




function getPlayerByUsername(room, username) {
  return room.players.find((player) => player.name === username);
}




function getTerritoryByTid(room, tid) {
  return room.territories.find((territory) => territory.tid === tid);
}




function getActiveCastleByTid(room, tid) {
  return room.castles.find((castle) => castle.active && castle.tid === tid) || null;
}




function getUnownedTerritories(room) {
  return room.territories.filter((territory) => territory.ownsto === -1);
}




function allTerritoriesClaimed(room) {
  return getUnownedTerritories(room).length === 0;
}




function sendStatus(room, message) {
  room.namespace.emit('serverstatus', [message]);
}




function gameLog(room, message) {
  room.namespace.emit('gamelog', [`${message} [${getTime()}]`]);
}




function emitSnapshot(room, socket = null) {
  if (!room.game) return;
  const target = socket || room.namespace;
  target.emit('stateSnapshot', {
    game: {
      gameid: room.game.gameid,
      phase: room.game.phase,
      currentplayer: room.game.currentplayer,
      howmany: room.game.howmany,
      maplevel: room.game.maplevel,
      currentOrder: room.game.currentOrder,
      expansionRound: room.game.expansionRound,
      battleRound: room.game.battleRound,
      expansionSelectionsPerTurn: room.game.expansionSelectionsPerTurn || 1,
      pendingSelections: room.game.pendingSelections || {},
      reservedTerritories: room.game.reservedTerritories,
      ultraSabotageRemaining: getUltraSabotageRemainingForPid(room, pid),
      ultraSabotageRemainingByPid: room.game.ultraSabotageRemainingByPid || {},
      gamefinish: room.game.gamefinish,
      winner: room.game.winner ?? null,
    },
    territories: room.territories,
    players: room.players.map((player) => ({
      pid: player.pid,
      name: player.name,
      territories: player.territories,
      score: player.score,
      defenseBonus: player.defenseBonus || 0,
      connected: Boolean(player.connected),
      eliminated: Boolean(player.eliminated),
      castleCaptureBonus: player.castleCaptureBonus || 0,
    })),
    castles: room.castles.map((castle) => ({
      pid: castle.pid,
      tid: castle.tid,
      hp: castle.hp,
      active: castle.active,
    })),
  });
}




function publicQuestionContext(room, context, pid = null) {
  if (!context) return null;
  if (context.flow === 'EXPANSION') {
    return {
      flow: 'EXPANSION',
      selectionsPerTurn: context.selectionsPerTurn || 1,
    };
  }

  const runtime = room.questionRuntime || {};
  const question = room.game && room.game.activeQuestion ? room.game.activeQuestion : null;
  const canUseUltraSabotage = Boolean(
    question &&
    question.type === 'mcq' &&
    context.flow === 'BATTLE' &&
    Array.isArray(question.participants) &&
    question.participants.includes(pid) &&
    getUltraSabotageRemainingForPid(room, pid) > 0 &&
    !runtime.ultraSabotageUsed &&
    Object.keys(question.answers || {}).length === 0
  );

  return {
    flow: 'BATTLE',
    isCastle: Boolean(context.isCastle),
    targetTid: context.targetTid,
    castleStage: context.castleStage || 1,
    duelType: context.duelType || 'PRIMARY',
    attackerPid: Number.isInteger(context.attackerPid) ? context.attackerPid : null,
    defenderPid: Number.isInteger(context.defenderPid) ? context.defenderPid : null,
    ultraSabotageRemaining: room.game.ultraSabotageRemaining || 0,
    ultraSabotageUsed: Boolean(runtime.ultraSabotageUsed),
    ultraSabotageTargetPid: Number.isInteger(runtime.ultraSabotageTargetPid) ? runtime.ultraSabotageTargetPid : null,
    ultraSabotageByPid: Number.isInteger(runtime.ultraSabotageByPid) ? runtime.ultraSabotageByPid : null,
    canUseUltraSabotage,
  };
}

function getQuestionVariantForPid(room, pid) {
  if (!room || !room.questionRuntime || !room.questionRuntime.perPidQuestion) return null;
  return room.questionRuntime.perPidQuestion[pid] || null;
}

function forEachKnownSocket(room, callback) {
  room.namespace.sockets.forEach((socket) => {
    callback(socket);
  });
}

function buildQuestionStartPayloadForSocket(room, socket) {
  const question = room.game.activeQuestion;
  if (!question) return null;
  const player = getPlayerByUsername(room, socket.currentUsername);
  const pid = player ? player.pid : null;
  const localQuestion = Number.isInteger(pid) ? getQuestionVariantForPid(room, pid) : null;

  return {
    id: question.id,
    type: question.type,
    prompt: localQuestion && localQuestion.prompt ? localQuestion.prompt : question.prompt,
    options: localQuestion && Array.isArray(localQuestion.options) ? localQuestion.options : question.options,
    unit: question.unit,
    participants: question.participants,
    viewers: question.viewers,
    deadline: question.deadline,
    context: publicQuestionContext(room, question.context, pid),
    isUltra: Boolean(localQuestion && localQuestion.isUltra),
  };
}

function emitQuestionStart(room) {
  if (!room.game || !room.game.activeQuestion) return;
  forEachKnownSocket(room, (socket) => {
    const payload = buildQuestionStartPayloadForSocket(room, socket);
    if (payload) {
      socket.emit('question:start', payload);
    }
  });
}

function buildBattleResolvedPayloadForPid(room, question, pid) {
  const runtime = room.questionRuntime || {};
  const sabotageUsed = Boolean(runtime.ultraSabotageUsed);
  if (!sabotageUsed) {
    return {
      flow: 'BATTLE_MC',
      answers: sanitizeAnswers(question),
      correctOptionIndex: question.correctOptionIndex,
      messages: [],
    };
  }

  const localQuestion = getQuestionVariantForPid(room, pid);
  if (!localQuestion) {
    return {
      flow: 'BATTLE_MC',
      messages: [],
    };
  }

  const answers = {};
  question.participants.forEach((participantPid) => {
    const participantQuestion = getQuestionVariantForPid(room, participantPid);
    if (!participantQuestion || participantQuestion.id !== localQuestion.id) return;
    const answer = question.answers[participantPid] || {};
    answers[participantPid] = {
      selectedIndex: answer.selectedIndex,
      guess: answer.guess,
      submittedAt: answer.submittedAt,
      correct: answer.correct,
      distance: answer.distance,
      timedOut: Boolean(answer.timedOut),
    };
  });

  return {
    flow: 'BATTLE_MC',
    answers,
    correctOptionIndex: localQuestion.correctOptionIndex,
    messages: [],
  };
}

function emitBattleResolved(room, question) {
  const runtime = room.questionRuntime || {};
  const targetPid = runtime.ultraSabotageTargetPid;
  const targetPlayer = Number.isInteger(targetPid) ? getPlayerByPid(room, targetPid) : null;
  const targetName = targetPlayer ? targetPlayer.name : 'Az ellenfél';

  forEachKnownSocket(room, (socket) => {
    const player = getPlayerByUsername(room, socket.currentUsername);
    const pid = player ? player.pid : null;

    if (Number.isInteger(pid) && question.participants.includes(pid)) {
      socket.emit('question:resolved', buildBattleResolvedPayloadForPid(room, question, pid));
      return;
    }

    if (runtime.ultraSabotageUsed) {
      socket.emit('question:resolved', {
        flow: 'BATTLE_MC',
        messages: [targetName + ' ultra nehéz kérdést kapott.'],
        sabotageActive: true,
      });
      return;
    }

    socket.emit('question:resolved', {
      flow: 'BATTLE_MC',
      answers: sanitizeAnswers(question),
      correctOptionIndex: question.correctOptionIndex,
      messages: [],
    });
  });
}

function drawUltraHardQuestion(room) {
  if (!Array.isArray(ULTRAHARD_QUESTIONS) || !ULTRAHARD_QUESTIONS.length) {
    return null;
  }

  if (room.usedUltraHardIds.size >= ULTRAHARD_QUESTIONS.length) {
    room.usedUltraHardIds.clear();
  }

  var availableQuestions = ULTRAHARD_QUESTIONS.filter(function(question) {
    return !room.usedUltraHardIds.has(question.id);
  });

  var pool = availableQuestions.length ? availableQuestions : ULTRAHARD_QUESTIONS;
  var question = pool[Math.floor(Math.random() * pool.length)];
  room.usedUltraHardIds.add(question.id);
  return question;
}

async function handleActivateUltraSabotage(room, socket) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  const question = room.game && room.game.activeQuestion;
  const runtime = room.questionRuntime;

  if (!player || !question || !runtime) return;
  if (room.game.phase !== PHASES.BATTLE_QUESTION) return;
  if (question.type !== 'mcq' || !question.context || question.context.flow !== 'BATTLE') return;
  if (!question.participants.includes(player.pid)) {
    socket.emit('serverstatus', ['Csak az aktuális párbaj résztvevői használhatnak szabotázst.']);
    return;
  }
  if (getUltraSabotageRemainingForPid(room, player.pid) <= 0) {
    socket.emit('serverstatus', ['Elfogyott a szabotázsod ebben a meccsben.']);
    return;
  }
  if (runtime.ultraSabotageUsed) {
    socket.emit('serverstatus', ['Erre a kérdésre már használtak szabotázst.']);
    return;
  }
  if (Object.keys(question.answers || {}).length > 0) {
    socket.emit('serverstatus', ['Szabotázst csak az első válasz előtt lehet aktiválni.']);
    return;
  }

  const targetPid = question.participants.find((pid) => pid !== player.pid);
  if (!Number.isInteger(targetPid)) {
    socket.emit('serverstatus', ['Most nincs érvényes szabotázs célpont.']);
    return;
  }

  const ultraQuestion = drawUltraHardQuestion(room);
  if (!ultraQuestion) {
    socket.emit('serverstatus', ['Nincs elérhető ultra nehéz kérdés.']);
    return;
  }

  runtime.ultraSabotageUsed = true;
  runtime.ultraSabotageTargetPid = targetPid;
  runtime.ultraSabotageByPid = player.pid;
  runtime.perPidQuestion[targetPid] = {
    id: ultraQuestion.id,
    prompt: ultraQuestion.prompt,
    options: Array.isArray(ultraQuestion.options) ? ultraQuestion.options.slice() : [],
    correctOptionIndex: ultraQuestion.correctOptionIndex,
    isUltra: true,
  };

  room.game.ultraSabotageRemainingByPid = room.game.ultraSabotageRemainingByPid || {};
  room.game.ultraSabotageRemainingByPid[player.pid] = Math.max(0, getUltraSabotageRemainingForPid(room, player.pid) - 1);
  await persistGame(room);

  emitQuestionStart(room);

  const sourcePlayer = getPlayerByPid(room, player.pid);
  const targetPlayer = getPlayerByPid(room, targetPid);
  room.namespace.emit('ultraSabotageActivated', {
    byPid: player.pid,
    targetPid,
    byName: sourcePlayer ? sourcePlayer.name : 'Ismeretlen',
    targetName: targetPlayer ? targetPlayer.name : 'Ismeretlen',
    remaining: getUltraSabotageRemainingForPid(room, player.pid),
  });

  sendStatus(room, `${sourcePlayer ? sourcePlayer.name : 'Valaki'} szabotázst aktivált. ${targetPlayer ? targetPlayer.name : 'Az ellenfél'} ULTRA HARD kérdést kapott.`);
  gameLog(room, `${sourcePlayer ? sourcePlayer.name : 'Valaki'} szabotázst aktivált ${targetPlayer ? targetPlayer.name : 'az ellenfél'} ellen.`);
}

function sanitizeAnswers(question) {
  const answers = {};
  question.participants.forEach((pid) => {
    const answer = question.answers[pid] || {};
    answers[pid] = {
      selectedIndex: answer.selectedIndex,
      guess: answer.guess,
      submittedAt: answer.submittedAt,
      correct: answer.correct,
      distance: answer.distance,
      timedOut: Boolean(answer.timedOut),
    };
  });
  return answers;
}








function buildGuessRevealLines(room, question) {
  return question.participants.map((pid) => {
    const player = getPlayerByPid(room, pid);
    const answer = question.answers[pid] || {};
    if (answer.timedOut || answer.guess === null || typeof answer.guess === 'undefined') {
      return `${player ? player.name : 'Ismeretlen'}: nem tippelt`;
    }
    return `${player ? player.name : 'Ismeretlen'}: ${answer.guess}${question.unit ? ' ' + question.unit : ''}`;
  });
}




function drawMultipleChoiceQuestion(room) {
  if (room.usedMcqIds.size >= MULTIPLE_CHOICE_QUESTIONS.length) {
    room.usedMcqIds.clear();
  }


  var availableQuestions = MULTIPLE_CHOICE_QUESTIONS.filter(function(question) {
    return !room.usedMcqIds.has(question.id);
  });


  var preferredQuestions = availableQuestions.filter(function(question) {
    return question.correctOptionIndex !== room.lastMcqCorrectOptionIndex;
  });


  var pool = preferredQuestions.length ? preferredQuestions : availableQuestions;
  var question = pool[Math.floor(Math.random() * pool.length)];


  room.usedMcqIds.add(question.id);
  room.lastMcqCorrectOptionIndex = question.correctOptionIndex;
  return question;
}




function drawGuessQuestion(room) {
  if (room.usedGuessIds.size >= GUESS_QUESTIONS.length) {
    room.usedGuessIds.clear();
  }
  let question = GUESS_QUESTIONS[Math.floor(Math.random() * GUESS_QUESTIONS.length)];
  while (room.usedGuessIds.has(question.id)) {
    question = GUESS_QUESTIONS[Math.floor(Math.random() * GUESS_QUESTIONS.length)];
  }
  room.usedGuessIds.add(question.id);
  return question;
}




function clearQuestionTimer(room) {
  if (room.questionTimer) {
    clearTimeout(room.questionTimer);
    room.questionTimer = null;
  }
}




function createInitialPlayers(gameid, creatorUsername, howmany) {
  const players = [];
  for (let pid = 0; pid < howmany; pid += 1) {
    players.push({
      gameid,
      pid,
      name: pid === 0 ? creatorUsername : 'x',
      territories: [],
      score: 0,
      defenseBonus: 0,
      castleCaptureBonus: 0,
      active: true,
      eliminated: false,
      connected: false,
    });
  }
  return players;
}




async function refreshGamePlayerNames(room) {
  room.game.playernames = room.players.map((player) => player.name);
  await persistGame(room);
}




async function persistGame(room) {
  await Gameutils.findOneAndUpdate({ gameid: room.gameid }, room.game, { new: true, upsert: true });
}




async function persistPlayer(room, player) {
  await Player.findOneAndUpdate({ gameid: room.gameid, pid: player.pid }, player, { new: true, upsert: true });
}




async function persistAllPlayers(room) {
  await Promise.all(room.players.map((player) => persistPlayer(room, player)));
}




async function persistTerritory(room, territory) {
  await Territory.findOneAndUpdate({ gameid: room.gameid, tid: territory.tid }, territory, { new: true, upsert: true });
}




async function persistAllTerritories(room) {
  await Promise.all(room.territories.map((territory) => persistTerritory(room, territory)));
}




async function persistCastle(room, castle, isCreate) {
  if (isCreate) {
    await Castle.create(castle);
    return;
  }
  await Castle.findOneAndUpdate({ gameid: room.gameid, tid: castle.tid }, castle, { new: true, upsert: true });
}




async function deleteExistingGameData(gameid) {
  await Promise.all([
    Territory.deleteMany({ gameid }),
    Player.deleteMany({ gameid }),
    Castle.deleteMany({ gameid }),
    Gameutils.deleteMany({ gameid }),
    Chat.deleteMany({ gameid }),
  ]);
}




function formatOrder(room, order) {
  return order.map((pid) => getPlayerByPid(room, pid)?.name || `P${pid}`).join(' → ');
}




function getTime() {
  const date = new Date();
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}




function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}




function createOrderCycle(playerIds) {
  const result = [];
  const used = new Array(playerIds.length).fill(false);
  const current = [];




  function backtrack() {
    if (current.length === playerIds.length) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < playerIds.length; i += 1) {
      if (used[i]) continue;
      used[i] = true;
      current.push(playerIds[i]);
      backtrack();
      current.pop();
      used[i] = false;
    }
  }




  backtrack();
  return result;
}




function createMapTerritories(gameid, maplevel) {
  const T = (tid, continent, tname, neighbors) => ({ gameid, tid, continent, tname, neighbors, ownsto: -1 });




  if (maplevel === 'medium') {
    return [
      T(0, 0, 'Veneru', [1, 2, 3]),
      T(1, 0, 'Brazil', [0, 2, 10]),
      T(2, 0, 'Argentina', [0, 1]),
      T(3, 1, 'Western United States', [0, 4, 7]),
      T(4, 1, 'Eastern United States', [3, 5, 7]),
      T(5, 1, 'Eastern Canada', [7, 4, 29]),
      T(6, 1, 'North Canada', [7, 23, 29]),
      T(7, 1, 'Southwestern Canada', [6, 5, 4, 3, 29]),
      T(8, 4, 'Middle Africa', [9, 10, 21, 11]),
      T(9, 4, 'Egypt', [10, 12, 8, 14]),
      T(10, 4, 'North Africa', [1, 9, 13, 14]),
      T(11, 4, 'South Africa', [8, 21]),
      T(12, 2, 'Middle East', [14, 9, 8, 20, 30]),
      T(13, 3, 'Western Europe', [18, 10, 14]),
      T(14, 3, 'Middle Europe', [18, 13, 15, 16, 12, 9]),
      T(15, 3, 'Ukraine', [16, 12, 14, 30]),
      T(16, 3, 'Scandinavia', [15, 19, 14, 18]),
      T(17, 2, 'Middle Russia', [24, 23, 22]),
      T(18, 3, 'Great Britain', [19, 14, 16, 13]),
      T(19, 3, 'Iceland', [29, 18, 16]),
      T(20, 2, 'India', [26, 22, 12, 30]),
      T(21, 4, 'Madagascar', [11, 8]),
      T(22, 2, 'China', [25, 17, 23, 26, 20, 24, 30]),
      T(23, 2, 'Kamchatka', [6, 25, 22, 17]),
      T(24, 2, 'Siberia', [22, 17, 30]),
      T(25, 2, 'Japan', [23, 22]),
      T(26, 5, 'Indonesia', [22, 28, 27, 20]),
      T(27, 5, 'New Guinea', [26, 28]),
      T(28, 5, 'Australia', [26, 27]),
      T(29, 1, 'Greenland', [19, 5, 6, 7]),
      T(30, 2, 'Western Asia', [24, 12, 15, 20, 22]),
    ];
  }




  return [
    T(0, 0, 'Venezuela', [4, 1, 2]),
    T(1, 0, 'Brazil', [3, 0, 2, 13]),
    T(2, 0, 'PERU', [3, 0, 1]),
    T(3, 0, 'Argentina', [1, 2]),
    T(4, 1, 'Mexico', [6, 0, 5]),
    T(5, 1, 'Western United States', [6, 4, 11, 10]),
    T(6, 1, 'Eastern United States', [10, 7, 5, 4]),
    T(7, 1, 'Eastern Canada', [6, 10, 40]),
    T(8, 1, 'Alaska', [9, 11, 32]),
    T(9, 1, 'North West Territory', [8, 11, 10, 40]),
    T(10, 1, 'Ontario', [6, 11, 5, 7, 9, 40]),
    T(11, 1, 'Alberta', [10, 8, 9, 5]),
    T(12, 4, 'Egypt', [19, 17, 13, 14]),
    T(13, 4, 'North Africa', [18, 1, 12, 14, 15]),
    T(14, 4, 'East Africa', [12, 17, 27, 15, 13]),
    T(15, 4, 'Congo', [13, 16, 14]),
    T(16, 4, 'South Africa', [15, 27, 14]),
    T(17, 2, 'Middle East', [12, 14, 25, 26, 20, 19]),
    T(18, 3, 'Western Europe', [13, 19, 22]),
    T(19, 3, 'Southern Europe', [12, 17, 22, 18, 20]),
    T(20, 3, 'Ukraine', [31, 26, 17, 21, 22, 19]),
    T(21, 3, 'Scandinavia', [20, 22, 24, 23]),
    T(22, 3, 'Northern Europe', [23, 21, 19, 18, 20]),
    T(23, 3, 'Great Britain', [24, 21, 22]),
    T(24, 3, 'Iceland', [40, 23, 21]),
    T(25, 2, 'India', [17, 26, 29, 28]),
    T(26, 2, 'Afghanistan', [17, 20, 31, 25, 29]),
    T(27, 4, 'Madagascar', [16, 14]),
    T(28, 2, 'Siam', [37, 25, 29]),
    T(29, 2, 'China', [26, 28, 25, 34, 31, 30]),
    T(30, 2, 'Mongolia', [29, 34, 35, 32, 36]),
    T(31, 2, 'Ural', [20, 34, 26, 29]),
    T(32, 2, 'Kamchatka', [8, 36, 35, 33, 30]),
    T(33, 2, 'Yakutsk', [35, 32, 34]),
    T(34, 2, 'Siberia', [31, 33, 35, 30, 29]),
    T(35, 2, 'Irutsk', [30, 33, 34, 32]),
    T(36, 2, 'Japan', [32, 30]),
    T(37, 5, 'Indonesia', [28, 38, 39]),
    T(38, 5, 'New Guinea', [37, 39]),
    T(39, 5, 'Australia', [37, 38]),
    T(40, 1, 'Greenland', [9, 10, 7, 24]),
  ];
}