const Chat = require('./public/models/chat');
const Territory = require('./public/models/territory');
const Gameutils = require('./public/models/gameutils');
const Player = require('./public/models/players');
const Castle = require('./public/models/castle');
const { MULTIPLE_CHOICE_QUESTIONS, GUESS_QUESTIONS, ULTRAHARD_QUESTIONS = [] } = require('./questions');
const LobbyStore = require('./lobbyStore');
const MatchmakingStore = require('./matchmakingStore');




const PHASES = {
  WAITING: 'WAITING_FOR_PLAYERS',
  BASE_SELECTION: 'BASE_SELECTION',
  CHARACTER_SELECTION: 'CHARACTER_SELECTION',
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
const EXPANSION_SELECTIONS_PER_TURN = 2;
const MCQ_TIME_LIMIT_MS = 18000;
const GUESS_TIME_LIMIT_MS = 18000;
const REMAINDER_GUESS_CUTOFF = 4;
const REMAINDER_GUESS_MAX_REWARD = 2;
const CASTLE_SIEGE_INTRO_MS = 2800;
const CASTLE_TOWER_DOWN_MS = 2500;
const CASTLE_DESTROYED_MS = 3200;
const CHATGPT_BOT_NAME = 'ChatGPT Bot';
const BOT_MC_CORRECT_PROBABILITY = 0.4;
const BOT_GUESS_EXACT_PROBABILITY = 0.1;
const PLAYER_INACTIVITY_LIMIT_MS = 20000;
const INACTIVITY_CHECK_INTERVAL_MS = 4000;


const NAPOLEON_CONTINENT_BONUS = 800;
const HORTHY_HOMELAND_BONUS = 400;
const CHARACTERS = {
  einstein: {
    id: 'einstein',
    name: 'Einstein',
    shortDescription: '5 segítséged van 2 helyett.',
    fullDescription: 'Einsteinként összesen 5 KÖZÉPSULINEKED HELP-et használhatsz a meccs során.',
    image: '/images/character-einstein.webp',
  },
  szilardleo: {
    id: 'szilardleo',
    name: 'Szilárd Leó',
    shortDescription: '+1 segítség és 1 atombomba battle phase-ben.',
    fullDescription: 'Ha az atombombát ledobod, tied a terület ,vagy veszít 1 életet a másik vára',
    image: '/images/character-szilardleo.webp',
  },
  kossuth: {
    id: 'kossuth',
    name: 'Széchényi',
    shortDescription: 'A Széchényi Kaszinót 2 alkalommal aktiválhatod kérdés előtt.',
    fullDescription: ' Ha ezzel szerzel területet, területenként +200 pont jár és az adott terület arannyá válik. Ha a próbálkozásod kudarcba fullad, -200 pontot kapsz.',
    image: '/images/character-szechenyi.webp',
  },
  napoleon: {
    id: 'napoleon',
    name: 'Napóleon',
    shortDescription: 'Ha tied egész Európa, +800 pontot kapsz.',
    fullDescription: 'Ha tied egész európa (7 terület), +800 pontod lesz addig, amíg a szövetség él.',
    image: '/images/character-napoleon.webp',
  },
  horthy: {
    id: 'horthy',
    name: 'Horthy Miklós',
    shortDescription: 'Ha tied a teljes FELVIDÉL és ERDÉLY, +400 pontot kapsz.',
    fullDescription: 'Ha tied a teljes FELVIDÉL és ERDÉLY, +400 pontot kapsz, és a területek piros-fehér-zöld fénnyel izzanak.',
    image: '/images/character-horthy.webp',
  },
  brutus: {
    id: 'brutus',
    name: 'Brutus',
    shortDescription: '3 tükröző szabotázsod van battle phase-ben.',
    fullDescription: 'Battle kérdésnél 3 alkalommal lila, tükrözött kérdéskártyát adhatsz az ellenfelednek.',
    image: '/images/character-brutus.webp',
  },
};
const WORLD_CHARACTER_ORDER = ['einstein', 'napoleon', 'brutus'];
const HUNGARY13_CHARACTER_ORDER = ['szilardleo', 'horthy', 'kossuth'];
const NAPOLEON_EUROPE_NAMES = [
  'western europe',
  'middle europe',
  'southern europe',
  'northern europe',
  'ukraine',
  'scandinavia',
  'great britain',
];
const NAPOLEON_EUROPE_MEDIUM_NAMES = [
  'western europe',
  'middle europe',
  'ukraine',
  'scandinavia',
  'great britain',
];
const HORTHY_HOMELAND_NAMES = [
  'western europe',
  'great britain',
  'iceland',
];

function getCharacterPoolForMap(maplevel) {
  const normalizedMaplevel = normalizeMapLevelValue(maplevel);
  if (normalizedMaplevel === 'hungary13') {
    return HUNGARY13_CHARACTER_ORDER.slice();
  }
  return WORLD_CHARACTER_ORDER.slice();
}

const ACTIVE_GAMES = new Map();

const QUESTION_CATEGORY_KEYS = [
  'hungary_pre_1848',
  'hungary_post_1848',
  'world_pre_1848',
  'world_post_1848',
  'literature',
];

const DEFAULT_QUESTION_FILTERS = {
  hungary_pre_1848: true,
  hungary_post_1848: true,
  world_pre_1848: true,
  world_post_1848: true,
  literature: true,
};

function normalizeMapLevelValue(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'hungary13' || normalized === 'hungary_13' || normalized === 'hungary-13') return 'hungary13';
  if (normalized === 'medium') return 'medium';
  if (normalized === 'world' || normalized === 'hard' || normalized === 'countries' || !normalized) return 'world';
  return 'world';
}


function isHungary13Rules(roomOrMaplevel) {
  if (typeof roomOrMaplevel === 'string') {
    return normalizeMapLevelValue(roomOrMaplevel) === 'hungary13';
  }
  const maplevel = roomOrMaplevel && roomOrMaplevel.game && roomOrMaplevel.game.maplevel
    ? roomOrMaplevel.game.maplevel
    : (roomOrMaplevel && roomOrMaplevel.maplevel);
  return normalizeMapLevelValue(maplevel) === 'hungary13';
}

function getExpansionSelectionsPerTurn(room) {
  return isHungary13Rules(room) ? 1 : EXPANSION_SELECTIONS_PER_TURN;
}

function getRemainderGuessCutoff(room) {
  return isHungary13Rules(room) ? 2 : REMAINDER_GUESS_CUTOFF;
}

function getBaseUltraSabotagePerPlayer(room) {
  return 2;
}

function getBaseKozepsuliHelpPerPlayer(room) {
  return 2;
}


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
    maplevel: normalizeMapLevelValue(maplevel),
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
    botTimers: new Map(),
    activityByPid: new Map(),
    inactivityMonitor: null,
  };




  ACTIVE_GAMES.set(gameid, room);
  startInactivityMonitor(room);
  setupGame(room).catch((error) => console.error('Game setup failed:', error));
  attachNamespaceHandlers(room);
  return room;
};




async function setupGame(room) {
  await deleteExistingGameData(room.gameid);




  room.players = createInitialPlayers(room.gameid, room.creatorUsername, room.howmany);
  room.territories = createMapTerritories(room.gameid, room.maplevel);
  room.castles = [];
  const baseUltraSabotagePerPlayer = getBaseUltraSabotagePerPlayer(room);
  const baseKozepsuliHelpPerPlayer = getBaseKozepsuliHelpPerPlayer(room);
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
    expansionRequiredByPid: {},
    expansionReadyByPid: {},
    activeQuestion: null,
    characterDraftOrder: [],
    characterDraftIndex: 0,
    availableCharacterIds: getCharacterPoolForMap(room.maplevel),
    selectedCharactersByPid: {},
    brutusMirrorRemainingByPid: Object.fromEntries(room.players.map((player) => [player.pid, 0])),
    kossuthGambleArmedByPid: Object.fromEntries(room.players.map((player) => [player.pid, false])),
    kossuthGambleRemainingByPid: Object.fromEntries(room.players.map((player) => [player.pid, 0])),
    szilardBombRemainingByPid: Object.fromEntries(room.players.map((player) => [player.pid, 0])),
    napoleonEuropeOwnerPid: null,
    napoleonEuropeTerritoryTids: [],
    horthyHomelandOwnerPid: null,
    horthyHomelandTerritoryTids: [],
    ultraSabotageRemaining: room.players.length * baseUltraSabotagePerPlayer,
    ultraSabotageRemainingByPid: Object.fromEntries(room.players.map((player) => [player.pid, baseUltraSabotagePerPlayer])),
    kozepsuliHelpRemaining: room.players.length * baseKozepsuliHelpPerPlayer,
    kozepsuliHelpRemainingByPid: Object.fromEntries(room.players.map((player) => [player.pid, baseKozepsuliHelpPerPlayer])),
    questionFilters: { ...DEFAULT_QUESTION_FILTERS },
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

    socket.on('syncWaitingRoomPlayers', async (data = {}) => {
      try {
        await handleSyncWaitingRoomPlayers(room, socket, data);
      } catch (error) {
        console.error('syncWaitingRoomPlayers error:', error);
      }
    });

    socket.on('addBotPlayer', async (data = {}) => {
      try {
        await handleAddBotPlayer(room, socket, data);
      } catch (error) {
        console.error('addBotPlayer error:', error);
      }
    });

    socket.on('updateQuestionFilters', async (data = {}) => {
      try {
        await handleUpdateQuestionFilters(room, socket, data);
      } catch (error) {
        console.error('updateQuestionFilters error:', error);
      }
    });

    socket.on('hostStartMatch', async (data = {}) => {
      try {
        await handleHostStartMatch(room, socket, data);
      } catch (error) {
        console.error('hostStartMatch error:', error);
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




    socket.on('activateKozepsuliHelp', async () => {
      try {
        await handleActivateKozepsuliHelp(room, socket);
      } catch (error) {
        console.error('activateKozepsuliHelp error:', error);
      }
    });

    socket.on('selectCharacter', async (data = {}) => {
      try {
        await handleSelectCharacter(room, socket, String(data.characterId || '').trim());
      } catch (error) {
        console.error('selectCharacter error:', error);
      }
    });

    socket.on('activateBrutusMirror', async () => {
      try {
        await handleActivateBrutusMirror(room, socket);
      } catch (error) {
        console.error('activateBrutusMirror error:', error);
      }
    });

    socket.on('activateKossuthGamble', async () => {
      try {
        await handleActivateKossuthGamble(room, socket);
      } catch (error) {
        console.error('activateKossuthGamble error:', error);
      }
    });

    socket.on('launchSzilardBomb', async (data = {}) => {
      try {
        await handleLaunchSzilardBomb(room, socket, data);
      } catch (error) {
        console.error('launchSzilardBomb error:', error);
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
        touchPlayerActivity(room, socket.currentUsername || (data && data.username));
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




    socket.on('playerActivity', (data = {}) => {
      try {
        handlePlayerActivity(room, socket, data);
      } catch (error) {
        console.error('playerActivity error:', error);
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
    touchPlayerActivity(room, existingPlayer.pid);
    await persistPlayer(room, existingPlayer);
    await refreshGamePlayerNames(room);
    sendStatus(room, `${username} csatlakozott.`);
    gameLog(room, `${username} csatlakozott a játékhoz.`);
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
  touchPlayerActivity(room, openSlot.pid);
  await persistPlayer(room, openSlot);
  await refreshGamePlayerNames(room);
  gameLog(room, `${username} csatlakozott a játékhoz.`);
  sendStatus(room, `${username} csatlakozott.`);
  emitSnapshot(room);
}





function emitServerError(socket, message) {
  if (!socket || !message) return;
  socket.emit('serverstatus', [message]);
}


function normalizeQuestionFilters(rawFilters) {
  const normalized = {};
  QUESTION_CATEGORY_KEYS.forEach((key) => {
    if (rawFilters && Object.prototype.hasOwnProperty.call(rawFilters, key)) {
      normalized[key] = Boolean(rawFilters[key]);
    } else {
      normalized[key] = Boolean(DEFAULT_QUESTION_FILTERS[key]);
    }
  });
  return normalized;
}

function getSelectedQuestionCategoryKeys(room) {
  const filters = normalizeQuestionFilters(room && room.game ? room.game.questionFilters : null);
  return QUESTION_CATEGORY_KEYS.filter((key) => filters[key]);
}

function getFilteredMultipleChoiceQuestions(room) {
  const enabled = new Set(getSelectedQuestionCategoryKeys(room));
  if (!enabled.size) return [];
  return MULTIPLE_CHOICE_QUESTIONS.filter((question) => enabled.has(question.category));
}

function validateQuestionFiltersForStart(room) {
  const selectedKeys = getSelectedQuestionCategoryKeys(room);
  if (selectedKeys.length < 2) {
    return 'Minimum 2 témát kell kiválasztani a meccs indításához.';
  }

  const filteredQuestions = getFilteredMultipleChoiceQuestions(room);
  if (!filteredQuestions.length) {
    return 'A kiválasztott témákhoz jelenleg nincs elérhető feleletválasztós kérdés.';
  }

  return null;
}


function syncLobbyStoreBeforeMatchStart(room) {
  const gameid = String(room.gameid);
  const lobby = LobbyStore.getLobby(gameid);
  if (!lobby) {
    return { ok: true, skipped: true };
  }

  const namesToEnsure = room.players
    .filter((player) => player && player.name && player.name !== 'x')
    .map((player) => player.name);

  for (const name of namesToEnsure) {
    if (LobbyStore.isParticipant(gameid, name)) {
      continue;
    }
    const joinResult = LobbyStore.joinLobby(gameid, name);
    if (!joinResult.ok && joinResult.reason !== 'started') {
      return joinResult;
    }
  }

  return LobbyStore.startLobby(gameid, room.creatorUsername);
}

function getHumanWaitingNamesFromLobbyPayload(room, rawPlayers) {
  const seen = new Set();
  const cleaned = [];
  (Array.isArray(rawPlayers) ? rawPlayers : []).forEach((value) => {
    const name = String(value || '').trim();
    if (!name || name === 'x' || name === CHATGPT_BOT_NAME || seen.has(name)) {
      return;
    }
    seen.add(name);
    cleaned.push(name);
  });

  if (!cleaned.includes(room.creatorUsername)) {
    cleaned.unshift(room.creatorUsername);
  }

  return cleaned.slice(0, room.howmany);
}

function applyWaitingRoomMirror(room, lobbyPlayerNames) {
  if (!room || !room.game || room.game.phase !== PHASES.WAITING) return false;

  const names = getHumanWaitingNamesFromLobbyPayload(room, lobbyPlayerNames);
  const creatorPresent = names.includes(room.creatorUsername);
  const otherHumans = names.filter((name) => name !== room.creatorUsername);
  let changed = false;

  room.players.forEach((player) => {
    if (player.pid === 0) {
      if (player.name !== room.creatorUsername) {
        player.name = room.creatorUsername;
        changed = true;
      }
      if (player.isBot) {
        player.isBot = false;
        changed = true;
      }
      if (player.connected !== creatorPresent) {
        player.connected = creatorPresent;
        changed = true;
      }
      return;
    }

    if (player.isBot) {
      if (!player.connected) {
        player.connected = true;
        changed = true;
      }
      return;
    }

    const nextHumanName = otherHumans.shift() || 'x';
    const shouldBeConnected = nextHumanName !== 'x';
    if (player.name !== nextHumanName) {
      player.name = nextHumanName;
      changed = true;
    }
    if (player.connected !== shouldBeConnected) {
      player.connected = shouldBeConnected;
      changed = true;
    }
    if (player.isBot) {
      player.isBot = false;
      changed = true;
    }
  });

  return changed;
}

async function handleSyncWaitingRoomPlayers(room, socket, data = {}) {
  if (!room || !room.game || room.game.phase !== PHASES.WAITING) return;
  const changed = applyWaitingRoomMirror(room, data.players);
  if (!changed) return;
  await persistAllPlayers(room);
  await refreshGamePlayerNames(room);
  emitSnapshot(room);
}

async function handleAddBotPlayer(room, socket, data = {}) {
  if (!room || !room.game || room.game.phase !== PHASES.WAITING) {
    emitServerError(socket, 'Botot csak a váróteremben lehet hozzáadni.');
    return;
  }

  const requesterName = String((data && data.username) || socket.currentUsername || '').trim();
  if (!requesterName || requesterName !== room.creatorUsername) {
    emitServerError(socket, 'Csak a host adhat hozzá botot.');
    return;
  }

  applyWaitingRoomMirror(room, data.players);

  if (room.players.some((player) => player.isBot)) {
    emitServerError(socket, 'Ebben a szobában már van ChatGPT Bot.');
    return;
  }

  const humanPlayers = room.players.filter((player) => player.name !== 'x' && !player.isBot);
  if (humanPlayers.length !== room.howmany - 1) {
    emitServerError(socket, 'A ChatGPT Botot akkor lehet hozzáadni, ha már minden emberi hely betelt, és pontosan 1 slot maradt üresen.');
    return;
  }

  const openSlot = room.players.find((player) => player.name === 'x' && !player.isBot);
  if (!openSlot) {
    emitServerError(socket, 'Nincs szabad hely a ChatGPT Bot számára.');
    return;
  }

  openSlot.name = CHATGPT_BOT_NAME;
  openSlot.isBot = true;
  openSlot.connected = true;
  openSlot.eliminated = false;
  openSlot.active = true;
  openSlot.characterId = null;
  openSlot.score = 0;
  openSlot.defenseBonus = 0;
  openSlot.castleCaptureBonus = 0;
  openSlot.kossuthScoreModifier = 0;
  openSlot.napoleonEuropeBonus = 0;
  openSlot.horthyHomelandBonus = 0;

  await persistPlayer(room, openSlot);
  await refreshGamePlayerNames(room);
  gameLog(room, `${CHATGPT_BOT_NAME} csatlakozott a szobához.`);
  sendStatus(room, `${CHATGPT_BOT_NAME} bekerült a váróterembe. Most már 2 ember + 1 bot felállással is indulhat a meccs.`);
  emitSnapshot(room);
}

async function handleUpdateQuestionFilters(room, socket, data = {}) {
  if (!room || !room.game || room.game.phase !== PHASES.WAITING) {
    emitServerError(socket, 'A témákat csak a váróteremben lehet módosítani.');
    return;
  }

  const requesterName = String((data && data.username) || socket.currentUsername || '').trim();
  if (!requesterName || requesterName !== room.creatorUsername) {
    emitServerError(socket, 'Csak a host állíthatja be a témákat.');
    return;
  }

  room.game.questionFilters = normalizeQuestionFilters(data && data.questionFilters);
  await persistGame(room);
  emitSnapshot(room);
}


async function syncRoomMapSelectionBeforeMatchStart(room, requestedMaplevel) {
  const lobby = LobbyStore.getLobby(String(room.gameid));
  const desiredMaplevel = normalizeMapLevelValue(requestedMaplevel || (lobby && lobby.maplevel) || room.maplevel || (room.game && room.game.maplevel));

  if (room.maplevel === desiredMaplevel && room.game && room.game.maplevel === desiredMaplevel) {
    return;
  }

  room.maplevel = desiredMaplevel;
  if (room.game) {
    room.game.maplevel = desiredMaplevel;
  }
  room.castles = [];
  room.territories = createMapTerritories(room.gameid, desiredMaplevel);

  await Territory.deleteMany({ gameid: room.gameid });
  await Castle.deleteMany({ gameid: room.gameid });
  await Territory.createTerritories(room.territories);
}

async function handleHostStartMatch(room, socket, data = {}) {
  if (!room || !room.game) return;
  const requesterName = String((data && data.username) || socket.currentUsername || '').trim();
  if (!requesterName || requesterName !== room.creatorUsername) {
    emitServerError(socket, 'Csak a host indíthatja el a meccset.');
    return;
  }
  if (room.game.phase !== PHASES.WAITING) {
    if (room.game.phase !== PHASES.FINISHED) {
      room.namespace.emit('matchStarted', { gameid: room.gameid });
    }
    return;
  }

  await syncRoomMapSelectionBeforeMatchStart(room, data && data.maplevel);
  applyWaitingRoomMirror(room, data.players);
  room.game.questionFilters = normalizeQuestionFilters(data && data.questionFilters ? data.questionFilters : room.game.questionFilters);
  await persistAllPlayers(room);
  await refreshGamePlayerNames(room);
  await persistGame(room);

  const filledPlayers = room.players.filter((player) => player.name !== 'x');
  if (filledPlayers.length !== room.howmany) {
    emitServerError(socket, `A meccshez pontosan ${room.howmany} játékos kell.`);
    emitSnapshot(room);
    return;
  }

  const filterError = validateQuestionFiltersForStart(room);
  if (filterError) {
    emitServerError(socket, filterError);
    emitSnapshot(room);
    return;
  }

  const lobbyStartResult = syncLobbyStoreBeforeMatchStart(room);
  if (!lobbyStartResult.ok) {
    let lobbyStartMessage = 'Nem sikerült elindítani a lobbyt.';
    if (lobbyStartResult.reason === 'not_found') {
      lobbyStartMessage = 'A lobby nem található.';
    } else if (lobbyStartResult.reason === 'only_host_can_start') {
      lobbyStartMessage = 'Csak a host indíthatja el a lobbyt.';
    } else if (lobbyStartResult.reason === 'not_enough_players') {
      lobbyStartMessage = 'A lobby játékoslistája nincs szinkronban. Kérj meg mindenkit, hogy lépjen vissza a váróterembe, majd próbáld újra.';
    } else if (lobbyStartResult.reason === 'full') {
      lobbyStartMessage = 'A lobby megtelt, de nincs szinkronban a váróteremmel.';
    }
    emitServerError(socket, lobbyStartMessage);
    emitSnapshot(room);
    return;
  }

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
  room.namespace.emit('matchStarted', { gameid: room.gameid });
  emitSnapshot(room);
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
    await startCharacterDraft(room);
  } else {
    room.game.currentplayer = room.game.baseOrder[room.game.baseSelectionIndex];
    await persistGame(room);
    const nextPlayer = getPlayerByPid(room, room.game.currentplayer);
    sendStatus(room, `Bázisválasztás: ${nextPlayer.name} következik.`);
  }




  emitSnapshot(room);
}





async function startCharacterDraft(room) {
  const draftOrder = room.players
    .filter((player) => player.name !== 'x' && !player.eliminated)
    .map((player) => player.pid)
    .sort((a, b) => a - b);

  room.game.phase = PHASES.CHARACTER_SELECTION;
  room.game.currentOrder = draftOrder;
  room.game.characterDraftOrder = draftOrder.slice();
  room.game.characterDraftIndex = 0;
  room.game.currentplayer = draftOrder.length ? draftOrder[0] : -1;
  room.game.availableCharacterIds = getCharacterPoolForMap(room.maplevel);
  room.game.selectedCharactersByPid = {};
  await persistGame(room);

  const current = getPlayerByPid(room, room.game.currentplayer);
  sendStatus(room, current ? `Karakterválasztás: ${current.name} választ.` : 'Karakterválasztás indul.');
  gameLog(room, 'A bázisok kiosztása után karakterválasztás indul.');
  emitSnapshot(room);
}

async function handleSelectCharacter(room, socket, characterId) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  if (!player) return;
  if (room.game.phase !== PHASES.CHARACTER_SELECTION) return;
  if (room.game.currentplayer !== player.pid) {
    socket.emit('serverstatus', ['Most nem te választasz karaktert.']);
    return;
  }

  if (!CHARACTERS[characterId]) {
    socket.emit('serverstatus', ['Érvénytelen karakter.']);
    return;
  }
  if ((room.game.availableCharacterIds || []).indexOf(characterId) === -1) {
    socket.emit('serverstatus', ['Ezt a karaktert már elvitték.']);
    return;
  }

  room.game.selectedCharactersByPid[player.pid] = characterId;
  room.game.availableCharacterIds = (room.game.availableCharacterIds || []).filter((id) => id !== characterId);
  player.characterId = characterId;

  if (characterId === 'einstein') {
    room.game.kozepsuliHelpRemainingByPid[player.pid] = getBaseKozepsuliHelpPerPlayer(room) + 3;
  }
  if (characterId === 'szilardleo') {
    room.game.kozepsuliHelpRemainingByPid[player.pid] = getBaseKozepsuliHelpPerPlayer(room) + 1;
    room.game.szilardBombRemainingByPid[player.pid] = 1;
  }
  if (characterId === 'brutus') {
    room.game.brutusMirrorRemainingByPid[player.pid] = 3;
  }
  if (characterId === 'kossuth') {
    room.game.kossuthGambleRemainingByPid[player.pid] = 2;
  }

  room.game.ultraSabotageRemaining = getTotalUltraSabotageRemaining(room);
  room.game.kozepsuliHelpRemaining = getTotalKozepsuliHelpRemaining(room);

  const currentIndex = room.game.characterDraftOrder.indexOf(player.pid);
  const nextPid = nextEligiblePidInOrder(room, room.game.characterDraftOrder, currentIndex, false, room.game.selectedCharactersByPid);
  if (nextPid === -1) {
    room.game.currentplayer = -1;
    await persistPlayer(room, player);
    await persistGame(room);
    sendStatus(room, 'Mindenki karaktert választott. Indul a foglalási kör.');
    gameLog(room, `${player.name} karaktere: ${CHARACTERS[characterId].name}. Minden karakter kiosztva.`);
    emitSnapshot(room);
    await startExpansionRound(room, true);
    return;
  }

  room.game.currentplayer = nextPid;
  room.game.characterDraftIndex = Math.max(0, currentIndex + 1);
  await persistPlayer(room, player);
  await persistGame(room);
  const nextPlayer = getPlayerByPid(room, nextPid);
  gameLog(room, `${player.name} karaktere: ${CHARACTERS[characterId].name}.`);
  sendStatus(room, `Karakterválasztás: ${nextPlayer.name} választ.`);
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




  if (getUnownedTerritories(room).length <= getRemainderGuessCutoff(room)) {
    await startExpansionRemainderGuess(room);
    return;
  }




  room.game.phase = PHASES.EXPANSION_SELECTION;
  room.game.expansionRound = firstRound ? 1 : room.game.expansionRound + 1;
  room.game.currentOrder = room.game.orderCycle[room.game.expansionCycleIndex % room.game.orderCycle.length] || [];
  room.game.expansionCycleIndex = (room.game.expansionCycleIndex + 1) % room.game.orderCycle.length;
  room.game.pendingSelections = {};
  room.game.reservedTerritories = [];
  room.game.expansionRequiredByPid = {};
  room.game.expansionReadyByPid = {};
  resetKossuthGamble(room);
  room.game.activeQuestion = null;
  room.game.currentplayer = getNextExpansionSelectionPid(room, -1);
  await persistGame(room);




  if (room.game.currentplayer === -1) {
    await startExpansionRound(room);
    return;
  }




  const current = getPlayerByPid(room, room.game.currentplayer);
  gameLog(room, `Foglalási kör ${room.game.expansionRound}. Sorrend: ${formatOrder(room, room.game.currentOrder)}.`);
  sendStatus(room, `Foglalási kör ${room.game.expansionRound}: ${current.name} választ.`);
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




  const targetTerritories = unownedTerritories.slice(0, REMAINDER_GUESS_MAX_REWARD);
  const targetTids = targetTerritories.map((territory) => territory.tid);
  const targetNames = targetTerritories.map((territory) => territory.tname);




  room.game.phase = PHASES.EXPANSION_QUESTION;
  room.game.currentplayer = -1;
  room.game.pendingSelections = {};
  room.game.reservedTerritories = targetTids;
  room.game.activeQuestion = null;
  await persistGame(room);




  await createAndBroadcastQuestion(room, {
    type: 'guess',
    context: {
      flow: 'EXPANSION',
      subflow: 'REMAINDER_GUESS',
      targetTids,
      targetNames,
      maxReward: REMAINDER_GUESS_MAX_REWARD,
    },
    participants: eligible.map((player) => player.pid),
    viewers: room.players.map((player) => player.pid),
  });




  const targetLabel = targetNames.join(', ');
  gameLog(room, `Maradék területek tippelős kiosztása: ${targetLabel}.`);
  sendStatus(room, `Maradék területek tippelős kiosztása: ${targetLabel}.`);
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

  const requiredSelections = getLockedExpansionSelectionsRequired(room, player.pid);
  const currentSelections = Array.isArray(room.game.pendingSelections[player.pid])
    ? room.game.pendingSelections[player.pid].slice()
    : (room.game.pendingSelections[player.pid] != null ? [room.game.pendingSelections[player.pid]] : []);

  if (currentSelections.includes(tid)) {
    socket.emit('serverstatus', ['Ezt a területet már kiválasztottad ebben a körben.']);
    return;
  }

  currentSelections.push(tid);
  room.game.pendingSelections[player.pid] = currentSelections;
  room.game.reservedTerritories.push(tid);
  room.game.expansionReadyByPid[player.pid] = currentSelections.length >= requiredSelections;
  gameLog(room, `${player.name} kinézte ezt a területet: ${territory.tname}.`);

  if (currentSelections.length < requiredSelections) {
    await persistGame(room);
    sendStatus(room, `Foglalási kör: ${player.name} még választ ${requiredSelections - currentSelections.length} területet.`);
    emitSnapshot(room);
    return;
  }

  const currentIndex = room.game.currentOrder.indexOf(player.pid);
  const nextPid = getNextExpansionSelectionPid(room, currentIndex);

  if (nextPid === -1) {
    await startExpansionQuestion(room);
  } else {
    room.game.currentplayer = nextPid;
    await persistGame(room);
    const nextPlayer = getPlayerByPid(room, nextPid);
    sendStatus(room, `Foglalási kör: ${nextPlayer.name} választ.`);
  }

  emitSnapshot(room);
}




async function startExpansionQuestion(room) {
  const participants = Object.keys(getCompletedExpansionSelectionMap(room)).map((value) => Number(value));
  if (!participants.length) {
    await startExpansionRound(room);
    return;
  }

  room.game.pendingSelections = getCompletedExpansionSelectionMap(room);
  room.game.phase = PHASES.EXPANSION_QUESTION;
  room.game.currentplayer = -1;
  await createAndBroadcastQuestion(room, {
    type: 'mcq',
    context: {
      flow: 'EXPANSION',
      participants,
      pendingSelections: { ...room.game.pendingSelections },
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
  resetKossuthGamble(room);
  room.game.battleTurnIndex = 0;
  room.game.currentOrder = room.game.orderCycle[(roundNumber - 1) % room.game.orderCycle.length] || [];
  room.game.currentplayer = getNextExpansionSelectionPid(room, -1);
  room.game.activeQuestion = null;
  await persistGame(room);




  gameLog(room, `Csatakör ${roundNumber}. Sorrend: ${formatOrder(room, room.game.currentOrder)}.`);
  emitSnapshot(room);
  await maybeAdvanceWhenCurrentPlayerUnavailable(room);
}




function touchPlayerActivity(room, playerRef) {
  if (!room || !room.activityByPid) return;
  if (typeof playerRef === 'number' && Number.isInteger(playerRef)) {
    room.activityByPid.set(playerRef, Date.now());
    return;
  }

  const username = String(playerRef || '').trim();
  if (!username) return;
  const player = getPlayerByUsername(room, username);
  if (!player) return;
  room.activityByPid.set(player.pid, Date.now());
}

function handlePlayerActivity(room, socket, data = {}) {
  if (!room) return;
  const username = String((socket && socket.currentUsername) || (data && data.username) || '').trim();
  if (!username) return;
  if (socket && !socket.currentUsername) {
    socket.currentUsername = username;
  }
  touchPlayerActivity(room, username);
}

function getRequiredActivePlayerPid(room) {
  if (!room || !room.game) return null;
  if (room.game.phase === PHASES.BASE_SELECTION || room.game.phase === PHASES.CHARACTER_SELECTION || room.game.phase === PHASES.EXPANSION_SELECTION || room.game.phase === PHASES.BATTLE_SELECTION) {
    return Number.isInteger(room.game.currentplayer) && room.game.currentplayer >= 0 ? room.game.currentplayer : null;
  }
  return null;
}

async function disconnectInactivePlayer(room, player) {
  if (!room || !player || !player.connected || player.eliminated || isBotPlayer(player)) return;

  player.connected = false;
  await persistPlayer(room, player);

  const message = `${player.name} 20 másodpercig inaktív volt, ezért ideiglenesen lecsatlakozott. Ugyanazzal a névvel vissza tud csatlakozni.`;
  gameLog(room, message);
  sendStatus(room, message);

  if (
    room.game.activeQuestion &&
    room.game.activeQuestion.participants.includes(player.pid) &&
    !room.game.activeQuestion.answers[player.pid]
  ) {
    room.game.activeQuestion.answers[player.pid] = {
      submittedAt: Date.now(),
      timedOut: true,
      inactiveDisconnect: true,
    };
    await persistGame(room);
    await maybeResolveQuestionEarly(room);
  }

  await maybeAdvanceWhenCurrentPlayerUnavailable(room);
  emitSnapshot(room);
}

async function evaluateRoomInactivity(room) {
  if (!room || !room.game || room.game.phase === PHASES.WAITING || room.game.phase === PHASES.FINISHED) return;

  const activePid = getRequiredActivePlayerPid(room);
  if (!Number.isInteger(activePid)) return;

  const player = getPlayerByPid(room, activePid);
  if (!player || !player.connected || player.eliminated || isBotPlayer(player)) return;

  const lastActivityAt = room.activityByPid.get(activePid);
  if (!lastActivityAt) {
    room.activityByPid.set(activePid, Date.now());
    return;
  }

  if ((Date.now() - lastActivityAt) < PLAYER_INACTIVITY_LIMIT_MS) return;

  room.activityByPid.set(activePid, Date.now());
  await disconnectInactivePlayer(room, player);
}

function startInactivityMonitor(room) {
  if (!room) return;
  stopInactivityMonitor(room);
  room.inactivityMonitor = setInterval(() => {
    evaluateRoomInactivity(room).catch((error) => {
      console.error('Inactivity monitor failed:', error);
    });
  }, INACTIVITY_CHECK_INTERVAL_MS);
}

function stopInactivityMonitor(room) {
  if (!room || !room.inactivityMonitor) return;
  clearInterval(room.inactivityMonitor);
  room.inactivityMonitor = null;
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




  if (room.game.phase === PHASES.CHARACTER_SELECTION) {
    const current = getPlayerByPid(room, room.game.currentplayer);
    if (!current || !current.connected) {
      const currentIndex = room.game.characterDraftOrder.indexOf(room.game.currentplayer);
      const nextPid = nextEligiblePidInOrder(room, room.game.characterDraftOrder, currentIndex, false, room.game.selectedCharactersByPid);
      if (nextPid === -1) {
        await startExpansionRound(room, true);
      } else {
        room.game.currentplayer = nextPid;
        await persistGame(room);
        emitSnapshot(room);
      }
    }
    return;
  }

  if (room.game.phase === PHASES.EXPANSION_SELECTION) {
    const current = getPlayerByPid(room, room.game.currentplayer);
    const currentRequiredSelections = current ? getLockedExpansionSelectionsRequired(room, current.pid) : 0;
    if (!current || current.eliminated || !current.connected || currentRequiredSelections <= 0) {
      if (current && !current.eliminated && current.connected && currentRequiredSelections <= 0) {
        gameLog(room, `${current.name} kimarad a foglalási körből, mert nem maradt választható területe.`);
      }
      const currentIndex = room.game.currentOrder.indexOf(room.game.currentplayer);
      const nextPid = getNextExpansionSelectionPid(room, currentIndex);
      if (nextPid === -1) {
        await startExpansionQuestion(room);
      } else {
        room.game.currentplayer = nextPid;
        await persistGame(room);
        emitSnapshot(room);
      }
    }
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

  if (castle) {
    room.game.phase = PHASES.BATTLE_QUESTION;
    room.game.currentplayer = -1;
    room.game.activeQuestion = null;
    await persistGame(room);
    emitSnapshot(room);
    await playCastleSiegeIntro(room, { attacker, defender, territory, castle });
  }

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






function getSzilardBombTargets(room, pid) {
  return room.territories
    .filter((territory) => territory.ownsto >= 0 && territory.ownsto !== pid)
    .map((territory) => territory.tid);
}

async function handleLaunchSzilardBomb(room, socket, data = {}) {
  const attacker = getPlayerByUsername(room, socket.currentUsername);
  if (!attacker) return;
  if (room.game.phase !== PHASES.BATTLE_SELECTION) return;
  if (room.game.currentplayer !== attacker.pid) {
    socket.emit('serverstatus', ['Most nem te következel.']);
    return;
  }
  if (getCharacterIdForPid(room, attacker.pid) !== 'szilardleo') {
    socket.emit('serverstatus', ['Az atombombát csak Szilárd Leó használhatja.']);
    return;
  }
  const remaining = getSzilardBombRemainingForPid(room, attacker.pid);
  if (remaining <= 0) {
    socket.emit('serverstatus', ['Az atombombát már felhasználtad.']);
    return;
  }

  const tid = Number(data.tid);
  const territory = getTerritoryByTid(room, tid);
  if (!territory || territory.ownsto < 0 || territory.ownsto === attacker.pid) {
    socket.emit('serverstatus', ['Atombombát csak ellenséges területre dobhatsz.']);
    return;
  }
  if (!getSzilardBombTargets(room, attacker.pid).includes(tid)) {
    socket.emit('serverstatus', ['Ez a célpont nem bombázható.']);
    return;
  }

  const defender = getPlayerByPid(room, territory.ownsto);
  const castle = getActiveCastleByTid(room, tid);
  const rawX = Number(data.screenXRatio);
  const rawY = Number(data.screenYRatio);
  const screenXRatio = Number.isFinite(rawX) ? Math.max(0, Math.min(1, rawX)) : 0.5;
  const screenYRatio = Number.isFinite(rawY) ? Math.max(0, Math.min(1, rawY)) : 0.5;

  if (!room.game.szilardBombRemainingByPid || typeof room.game.szilardBombRemainingByPid !== 'object') {
    room.game.szilardBombRemainingByPid = {};
  }
  room.game.szilardBombRemainingByPid[attacker.pid] = Math.max(0, remaining - 1);

  let message = '';
  let castleDestroyed = false;
  if (castle) {
    castle.hp = Math.max(0, Number(castle.hp || 0) - 1);
    if (castle.hp <= 0) {
      castle.active = false;
      castleDestroyed = true;
    }
    await persistCastle(room, castle, false);
    message = castleDestroyed
      ? `${attacker.name} atombombája megsemmisítette ${defender.name} várát ${territory.tname} területén.`
      : `${attacker.name} atombombája eltalálta ${defender.name} várát ${territory.tname} területén. Maradék életerő: ${castle.hp}.`;
  } else {
    territory.ownsto = attacker.pid;
    territory.szechenyiCasinoOwnerPid = null;
    await persistTerritory(room, territory);
    message = `${attacker.name} atombombával elfoglalta ${territory.tname} területét ${defender.name} játékostól.`;
  }

  rebuildPlayerTerritories(room);
  recalculateScores(room);
  await persistAllPlayers(room);
  await persistGame(room);

  gameLog(room, message);
  sendStatus(room, message);
  room.namespace.emit('szilardBombLaunched', {
    byPid: attacker.pid,
    byName: attacker.name,
    targetTid: tid,
    targetName: territory.tname,
    defenderPid: defender ? defender.pid : null,
    isCastle: Boolean(castle),
    castleDestroyed,
    remaining: getSzilardBombRemainingForPid(room, attacker.pid),
    screenXRatio,
    screenYRatio,
  });

  emitSnapshot(room);
  await advanceBattleTurn(room);
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

  if (!baseQuestion) {
    throw new Error(config.type === 'mcq'
      ? 'Nincs elérhető feleletválasztós kérdés a kiválasztott témákban.'
      : 'Nincs elérhető tippelős kérdés.');
  }

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
    brutusMirrorUsed: false,
    brutusMirrorTargetPid: null,
    brutusMirrorByPid: null,
    questionHelpUsedByPid: {},
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
    const selectedTidsRaw = question.context.pendingSelections[pid];
    const selectedTids = Array.isArray(selectedTidsRaw)
      ? selectedTidsRaw
      : (selectedTidsRaw != null ? [selectedTidsRaw] : []);
    const gambleArmed = isKossuthGambleArmed(room, pid);

    if (!selectedTids.length) {
      if (gambleArmed) {
        const delta = applyKossuthGambleFailure(player);
        clearKossuthGamble(room, pid);
        resultLines.push(`${player.name} Széchényi Kaszinója nem hozott területet: ${formatKossuthGambleDelta(delta)} pont.`);
      }
      return;
    }

    if (question.answers[pid].correct) {
      const capturedNames = [];
      const capturedTerritories = [];
      selectedTids.forEach((tid) => {
        const territory = getTerritoryByTid(room, tid);
        if (!territory || territory.ownsto !== -1) {
          return;
        }
        territory.ownsto = pid;
        territory.szechenyiCasinoOwnerPid = gambleArmed ? pid : null;
        capturedTerritories.push(territory);
        capturedNames.push(territory.tname);
      });

      if (capturedNames.length === 1) {
        resultLines.push(`${player.name} helyesen válaszolt, megszerezte: ${capturedNames[0]}.`);
      } else if (capturedNames.length > 1) {
        resultLines.push(`${player.name} helyesen válaszolt, megszerezte: ${capturedNames.join(', ')}.`);
      }

      if (gambleArmed) {
        const delta = awardKossuthGambleSuccess(player, capturedTerritories.length);
        clearKossuthGamble(room, pid);
        if (delta > 0) {
          resultLines.push(`${player.name} Széchényi Kaszinó bónusza: ${formatKossuthGambleDelta(delta)} pont.`);
        }
      }
    } else {
      const missedNames = selectedTids.map((tid) => {
        const territory = getTerritoryByTid(room, tid);
        return territory ? territory.tname : null;
      }).filter(Boolean);

      if (missedNames.length === 1) {
        resultLines.push(`${player.name} nem szerezte meg: ${missedNames[0]}.`);
      } else if (missedNames.length > 1) {
        resultLines.push(`${player.name} nem szerezte meg: ${missedNames.join(', ')}.`);
      }

      if (gambleArmed) {
        const delta = applyKossuthGambleFailure(player);
        clearKossuthGamble(room, pid);
        resultLines.push(`${player.name} Széchényi Kaszinója elbukott: ${formatKossuthGambleDelta(delta)} pont.`);
      }
    }
  });




  rebuildPlayerTerritories(room);
  syncSzechenyiCasinoTerritories(room);
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
  const rawTargetTids = Array.isArray(question.context.targetTids)
    ? question.context.targetTids
    : (Number.isInteger(question.context.targetTid) ? [question.context.targetTid] : []);
  const availableTerritories = rawTargetTids
    .map((tid) => getTerritoryByTid(room, tid))
    .filter((territory) => territory && territory.ownsto === -1);




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




  const winnerEntry = rankedParticipants[0];
  const winner = winnerEntry ? getPlayerByPid(room, winnerEntry.pid) : null;
  const resultLines = [];




  if (winner) {
    const capturedTerritories = availableTerritories.slice(0, REMAINDER_GUESS_MAX_REWARD);
    capturedTerritories.forEach((territory) => {
      territory.ownsto = winner.pid;
      territory.szechenyiCasinoOwnerPid = isKossuthGambleArmed(room, winner.pid) ? winner.pid : null;
    });
    const winnerUsedGamble = isKossuthGambleArmed(room, winner.pid);
    if (winnerUsedGamble) {
      const delta = awardKossuthGambleSuccess(winner, capturedTerritories.length);
      clearKossuthGamble(room, winner.pid);
      if (delta > 0) {
        resultLines.push(`${winner.name} Széchényi Kaszinó bónusza: ${formatKossuthGambleDelta(delta)} pont.`);
      }
    }
    question.participants.forEach((pid) => {
      if (pid === winner.pid) return;
      if (!isKossuthGambleArmed(room, pid)) return;
      const player = getPlayerByPid(room, pid);
      const delta = applyKossuthGambleFailure(player);
      clearKossuthGamble(room, pid);
      resultLines.push(`${player.name} Széchényi Kaszinója elbukott: ${formatKossuthGambleDelta(delta)} pont.`);
    });
    rebuildPlayerTerritories(room);
    syncSzechenyiCasinoTerritories(room);
    recalculateScores(room);
    await Promise.all(capturedTerritories.map((territory) => persistTerritory(room, territory)));
    await persistAllPlayers(room);
    const capturedNames = capturedTerritories.map((territory) => territory.tname);
    if (capturedNames.length === 1) {
      resultLines.push(`${winner.name} szerezte meg a maradék területet: ${capturedNames[0]}.`);
    } else if (capturedNames.length > 1) {
      resultLines.push(`${winner.name} szerezte meg a maradék területeket: ${capturedNames.join(', ')}.`);
    }
  } else {
    question.participants.forEach((pid) => {
      if (!isKossuthGambleArmed(room, pid)) return;
      const player = getPlayerByPid(room, pid);
      const delta = applyKossuthGambleFailure(player);
      clearKossuthGamble(room, pid);
      resultLines.push(`${player.name} Széchényi Kaszinója elbukott: ${formatKossuthGambleDelta(delta)} pont.`);
    });
    syncSzechenyiCasinoTerritories(room);
    recalculateScores(room);
    await persistAllPlayers(room);
  }




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
  } else if (getUnownedTerritories(room).length <= getRemainderGuessCutoff(room)) {
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
    const gambleArmed = isKossuthGambleArmed(room, attacker.pid);
    territory.ownsto = attacker.pid;
    territory.szechenyiCasinoOwnerPid = gambleArmed ? attacker.pid : null;
    if (gambleArmed) {
      awardKossuthGambleSuccess(attacker, 1);
      clearKossuthGamble(room, attacker.pid);
    }
    rebuildPlayerTerritories(room);
    syncSzechenyiCasinoTerritories(room);
    recalculateScores(room);
    await persistTerritory(room, territory);
    await persistAllPlayers(room);




    const line = `${attacker.name} elfoglalta ${territory.tname} területét ${defender.name} játékostól.`;
    gameLog(room, line);
    room.namespace.emit('battle:result', {
      message: line,
      gambleDelta: gambleArmed ? TERRITORY_SCORE : 0,
      gamblePid: gambleArmed ? attacker.pid : null,
    });




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




  const territory = getTerritoryByTid(room, context.targetTid);
  const previousCastleHp = castle.hp;
  castle.hp -= 1;
  await persistCastle(room, castle, false);




  if (castle.hp <= 0) {
    const gambleArmed = isKossuthGambleArmed(room, attacker.pid);
    const capturedTerritories = [];
    castle.active = false;
    castle.hp = 0;
    defender.eliminated = true;
    defender.connected = false;
    defender.territories = [];
    attacker.castleCaptureBonus = (attacker.castleCaptureBonus || 0) + CASTLE_SCORE_BONUS;




    room.territories.forEach((territoryItem) => {
      if (territoryItem.ownsto === defender.pid) {
        territoryItem.ownsto = attacker.pid;
        territoryItem.szechenyiCasinoOwnerPid = gambleArmed ? attacker.pid : null;
        capturedTerritories.push(territoryItem);
      }
    });

    if (gambleArmed) {
      awardKossuthGambleSuccess(attacker, capturedTerritories.length);
      clearKossuthGamble(room, attacker.pid);
    }




    rebuildPlayerTerritories(room);
    syncSzechenyiCasinoTerritories(room);
    recalculateScores(room);
    await persistAllTerritories(room);
    await persistAllPlayers(room);
    await persistCastle(room, castle, false);




    const line = `${attacker.name} lerombolta ${defender.name} várát, megszerezte az összes területét, és ${defender.name} kiesett.`;
    gameLog(room, line);
    room.namespace.emit('battle:result', {
      message: line,
      gambleDelta: gambleArmed ? capturedTerritories.length * TERRITORY_SCORE : 0,
      gamblePid: gambleArmed ? attacker.pid : null,
    });




    room.game.activeQuestion = null;
    room.game.phase = PHASES.BATTLE_SELECTION;
    await persistGame(room);
    emitSnapshot(room);
    await playCastleDestroyed(room, { attacker, defender, territory });




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
  room.namespace.emit('battle:result', { message: line, gambleArmed: isKossuthGambleArmed(room, attacker.pid), gamblePid: attacker.pid });
  room.game.activeQuestion = null;
  await persistGame(room);
  emitSnapshot(room);
  await playCastleTowerDown(room, {
    attacker,
    defender,
    territory,
    previousHp: previousCastleHp,
    remainingHp: castle.hp,
  });




  await startBattleMcq(room, {
    attackerPid: attacker.pid,
    defenderPid: defender.pid,
    targetTid: context.targetTid,
    targetName: territory.tname,
    isCastle: true,
    castleTid: context.castleTid,
    castleStage: context.castleStage + 1,
  });
}




async function resolveSuccessfulDefense(room, { attacker, defender, isCastle, castleStage }) {
  defender.defenseBonus = (defender.defenseBonus || 0) + DEFENSE_BONUS;
  let gambleDelta = 0;
  if (attacker && isKossuthGambleArmed(room, attacker.pid)) {
    gambleDelta = applyKossuthGambleFailure(attacker);
    clearKossuthGamble(room, attacker.pid);
  }
  syncSzechenyiCasinoTerritories(room);
  recalculateScores(room);
  await persistAllPlayers(room);




  const line = isCastle
    ? `${defender.name} sikeresen megvédte a várát a ${castleStage}. ostromkérdésnél.`
    : `${defender.name} sikeresen megvédte a területét ${attacker.name} ellen.`;
  gameLog(room, line);
  room.namespace.emit('battle:result', { message: line, gambleDelta, gamblePid: attacker ? attacker.pid : null });




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
  stopInactivityMonitor(room);
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

  try {
    MatchmakingStore.clearMatch(room.gameid);
  } catch (error) {
    console.error('Failed to clear matchmaking state after finished game:', error);
  }
}




function getExpansionSelectableTargets(room, pid) {
  const reserved = new Set((room.game && room.game.reservedTerritories) || []);
  const owned = room.territories.filter((territory) => territory.ownsto === pid);
  const unowned = room.territories
    .filter((territory) => territory.ownsto === -1 && !reserved.has(territory.tid))
    .map((territory) => territory.tid);
  if (!owned.length) {
    return unowned;
  }




  const adjacent = new Set();
  owned.forEach((territory) => {
    territory.neighbors.forEach((neighborTid) => {
      const neighbor = getTerritoryByTid(room, neighborTid);
      if (neighbor && neighbor.ownsto === -1 && !reserved.has(neighborTid)) {
        adjacent.add(neighborTid);
      }
    });
  });




  const adjacentTargets = [...adjacent];
  if (adjacentTargets.length) {
    return adjacentTargets;
  }




  return unowned;
}





function getExpansionSelectionsRequired(room, pid) {
  const selectableCount = getExpansionSelectableTargets(room, pid).length;
  return Math.max(0, Math.min(getExpansionSelectionsPerTurn(room), selectableCount));
}

function getLockedExpansionSelectionsRequired(room, pid) {
  const locked = room.game && room.game.expansionRequiredByPid ? room.game.expansionRequiredByPid[pid] : undefined;
  if (Number.isInteger(locked)) {
    return locked;
  }
  return getExpansionSelectionsRequired(room, pid);
}

function getCompletedExpansionSelectionMap(room) {
  const completed = {};
  Object.keys(room.game.pendingSelections || {}).forEach((pidKey) => {
    const pid = Number(pidKey);
    const selections = room.game.pendingSelections[pid];
    const isReady = Boolean(room.game.expansionReadyByPid && room.game.expansionReadyByPid[pid]);
    if (Array.isArray(selections) && selections.length > 0 && isReady) {
      completed[pid] = selections.slice();
    }
  });
  return completed;
}

function getNextExpansionSelectionPid(room, currentIndex) {
  const completedSelections = getCompletedExpansionSelectionMap(room);

  for (let i = Math.max(currentIndex + 1, 0); i < room.game.currentOrder.length; i += 1) {
    const pid = room.game.currentOrder[i];
    const player = getPlayerByPid(room, pid);
    if (!player || player.eliminated || !player.connected) {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(completedSelections, pid)) {
      continue;
    }

    const requiredSelections = getLockedExpansionSelectionsRequired(room, pid);
    if (requiredSelections <= 0) {
      if (room.game.expansionRequiredByPid) {
        room.game.expansionRequiredByPid[pid] = 0;
      }
      if (room.game.expansionReadyByPid) {
        room.game.expansionReadyByPid[pid] = false;
      }
      gameLog(room, `${player.name} kimarad a foglalási körből, mert nem maradt választható területe.`);
      continue;
    }

    if (room.game.expansionRequiredByPid && !Number.isInteger(room.game.expansionRequiredByPid[pid])) {
      room.game.expansionRequiredByPid[pid] = requiredSelections;
    }
    if (room.game.expansionReadyByPid && typeof room.game.expansionReadyByPid[pid] !== 'boolean') {
      room.game.expansionReadyByPid[pid] = false;
    }

    return pid;
  }

  return -1;
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
  syncSzechenyiCasinoTerritories(room);
  syncNapoleonEuropeState(room);
  syncHorthyHomelandState(room);
  room.players.forEach((player) => {
    const territoryCount = room.territories.filter((territory) => territory.ownsto === player.pid).length;
    const activeCastleBonus = room.castles.some((castle) => castle.active && castle.pid === player.pid)
      ? CASTLE_SCORE_BONUS
      : 0;
    const assetScore = territoryCount * TERRITORY_SCORE + activeCastleBonus;
    player.score = assetScore
      + (player.defenseBonus || 0)
      + (player.castleCaptureBonus || 0)
      + (player.kossuthScoreModifier || 0)
      + (player.napoleonEuropeBonus || 0)
      + (player.horthyHomelandBonus || 0);
  });
}





function normalizeTerritoryName(value) {
  return String(value || '').trim().toLowerCase();
}

function getCharacterIdForPid(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return null;
  const selected = room.game.selectedCharactersByPid || {};
  if (Object.prototype.hasOwnProperty.call(selected, pid)) {
    return selected[pid] || null;
  }
  const player = getPlayerByPid(room, pid);
  return player && player.characterId ? player.characterId : null;
}

function getBrutusMirrorRemainingForPid(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return 0;
  const byPid = room.game.brutusMirrorRemainingByPid || {};
  return Math.max(0, Number(byPid[pid]) || 0);
}

function getKossuthGambleRemainingForPid(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return 0;
  const byPid = room.game.kossuthGambleRemainingByPid || {};
  return Math.max(0, Number(byPid[pid]) || 0);
}

function getSzilardBombRemainingForPid(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return 0;
  const byPid = room.game.szilardBombRemainingByPid || {};
  return Math.max(0, Number(byPid[pid]) || 0);
}

function isKossuthGambleArmed(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return false;
  const armedMap = room.game.kossuthGambleArmedByPid || {};
  return Boolean(armedMap[pid]);
}

function resetKossuthGamble(room) {
  if (!room || !room.game) return;
  room.game.kossuthGambleArmedByPid = Object.fromEntries(
    room.players.map((player) => [player.pid, false])
  );
}

function armKossuthGamble(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return;
  if (!room.game.kossuthGambleArmedByPid || typeof room.game.kossuthGambleArmedByPid !== 'object') {
    resetKossuthGamble(room);
  }
  room.game.kossuthGambleArmedByPid[pid] = true;
}

function clearKossuthGamble(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) return;
  if (!room.game.kossuthGambleArmedByPid || typeof room.game.kossuthGambleArmedByPid !== 'object') {
    resetKossuthGamble(room);
  }
  room.game.kossuthGambleArmedByPid[pid] = false;
}

function awardKossuthGambleSuccess(player, capturedCount) {
  const reward = Math.max(0, Number(capturedCount) || 0) * TERRITORY_SCORE;
  if (!player || reward <= 0) return 0;
  player.kossuthScoreModifier = (player.kossuthScoreModifier || 0) + reward;
  return reward;
}

function applyKossuthGambleFailure(player) {
  if (!player) return 0;
  player.kossuthScoreModifier = (player.kossuthScoreModifier || 0) - TERRITORY_SCORE;
  return -TERRITORY_SCORE;
}

function markTerritoriesForSzechenyiCasino(territories, ownerPid) {
  (territories || []).forEach((territory) => {
    if (!territory) return;
    territory.szechenyiCasinoOwnerPid = Number.isInteger(ownerPid) ? ownerPid : null;
  });
}

function syncSzechenyiCasinoTerritories(room) {
  (room.territories || []).forEach((territory) => {
    if (!territory) return;
    if (!Number.isInteger(territory.szechenyiCasinoOwnerPid) || territory.ownsto !== territory.szechenyiCasinoOwnerPid) {
      territory.szechenyiCasinoOwnerPid = null;
    }
  });
}

function formatKossuthGambleDelta(delta) {
  if (!delta) return '';
  return delta > 0 ? `+${delta}` : `${delta}`;
}

function getNapoleonRequiredEuropeNames(room) {
  const availableNames = new Set((room.territories || []).map((territory) => normalizeTerritoryName(territory.tname)));
  const primary = NAPOLEON_EUROPE_NAMES.filter((name) => availableNames.has(name));
  if (primary.length >= 6) {
    return primary;
  }
  const medium = NAPOLEON_EUROPE_MEDIUM_NAMES.filter((name) => availableNames.has(name));
  if (medium.length) {
    return medium;
  }
  return primary;
}

function getNapoleonEuropeTerritoryIds(room) {
  const wanted = new Set(getNapoleonRequiredEuropeNames(room));
  return room.territories
    .filter((territory) => wanted.has(normalizeTerritoryName(territory.tname)))
    .map((territory) => territory.tid)
    .sort((a, b) => a - b);
}

function syncNapoleonEuropeState(room) {
  const europeTids = getNapoleonEuropeTerritoryIds(room);
  room.game.napoleonEuropeTerritoryTids = europeTids;
  let activePid = null;
  room.players.forEach((player) => {
    if (getCharacterIdForPid(room, player.pid) !== 'napoleon') {
      player.napoleonEuropeBonus = 0;
      return;
    }
    const ownsAll = europeTids.length > 0 && europeTids.every((tid) => {
      const territory = getTerritoryByTid(room, tid);
      return territory && territory.ownsto === player.pid;
    });
    if (ownsAll) {
      activePid = player.pid;
      player.napoleonEuropeBonus = NAPOLEON_CONTINENT_BONUS;
    } else {
      player.napoleonEuropeBonus = 0;
    }
  });
  room.game.napoleonEuropeOwnerPid = Number.isInteger(activePid) ? activePid : null;
}


function getHorthyHomelandTerritoryIds(room) {
  const wanted = new Set(HORTHY_HOMELAND_NAMES);
  return room.territories
    .filter((territory) => wanted.has(normalizeTerritoryName(territory.tname)))
    .map((territory) => territory.tid)
    .sort((a, b) => a - b);
}

function syncHorthyHomelandState(room) {
  const homelandTids = normalizeMapLevelValue(room && room.maplevel) === 'hungary13'
    ? getHorthyHomelandTerritoryIds(room)
    : [];
  room.game.horthyHomelandTerritoryTids = homelandTids;
  let activePid = null;
  room.players.forEach((player) => {
    if (getCharacterIdForPid(room, player.pid) !== 'horthy') {
      player.horthyHomelandBonus = 0;
      return;
    }
    const ownsAll = homelandTids.length > 0 && homelandTids.every((tid) => {
      const territory = getTerritoryByTid(room, tid);
      return territory && territory.ownsto === player.pid;
    });
    if (ownsAll) {
      activePid = player.pid;
      player.horthyHomelandBonus = HORTHY_HOMELAND_BONUS;
    } else {
      player.horthyHomelandBonus = 0;
    }
  });
  room.game.horthyHomelandOwnerPid = Number.isInteger(activePid) ? activePid : null;
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




function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, Number(ms) || 0)));
}


async function emitCastleCinematic(room, payload, durationMs) {
  const finalDuration = Math.max(0, Number(durationMs) || 0);
  room.namespace.emit('castle:cinematic', {
    ...payload,
    durationMs: finalDuration,
  });
  if (finalDuration > 0) {
    await wait(finalDuration);
  }
}


async function playCastleSiegeIntro(room, { attacker, defender, territory, castle }) {
  if (!attacker || !defender || !territory || !castle || !castle.active) return;
  await emitCastleCinematic(room, {
    kind: 'siege-intro',
    attackerPid: attacker.pid,
    attackerName: attacker.name,
    defenderPid: defender.pid,
    defenderName: defender.name,
    targetTid: territory.tid,
    targetName: territory.tname,
    remainingHp: castle.hp,
    maxHp: 3,
  }, CASTLE_SIEGE_INTRO_MS);
}


async function playCastleTowerDown(room, { attacker, defender, territory, previousHp, remainingHp }) {
  if (!attacker || !defender || !territory) return;
  await emitCastleCinematic(room, {
    kind: 'tower-down',
    attackerPid: attacker.pid,
    attackerName: attacker.name,
    defenderPid: defender.pid,
    defenderName: defender.name,
    targetTid: territory.tid,
    targetName: territory.tname,
    previousHp,
    remainingHp,
    maxHp: 3,
  }, CASTLE_TOWER_DOWN_MS);
}


async function playCastleDestroyed(room, { attacker, defender, territory }) {
  if (!attacker || !defender || !territory) return;
  await emitCastleCinematic(room, {
    kind: 'castle-destroyed',
    attackerPid: attacker.pid,
    attackerName: attacker.name,
    defenderPid: defender.pid,
    defenderName: defender.name,
    targetTid: territory.tid,
    targetName: territory.tname,
    previousHp: 1,
    remainingHp: 0,
    maxHp: 3,
  }, CASTLE_DESTROYED_MS);
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
      pendingSelections: room.game.pendingSelections || {},
      expansionSelectionsPerTurn: getExpansionSelectionsPerTurn(room),
      reservedTerritories: room.game.reservedTerritories,
      ultraSabotageRemaining: getTotalUltraSabotageRemaining(room),
      ultraSabotageRemainingByPid: getUltraSabotageRemainingMap(room),
      kozepsuliHelpRemaining: getTotalKozepsuliHelpRemaining(room),
      kozepsuliHelpRemainingByPid: getKozepsuliHelpRemainingMap(room),
      characterDraftOrder: room.game.characterDraftOrder || [],
      availableCharacterIds: room.game.availableCharacterIds || [],
      selectedCharactersByPid: room.game.selectedCharactersByPid || {},
      questionFilters: normalizeQuestionFilters(room.game.questionFilters),
      brutusMirrorRemainingByPid: room.game.brutusMirrorRemainingByPid || {},
      kossuthGambleArmedByPid: room.game.kossuthGambleArmedByPid || {},
      kossuthGambleRemainingByPid: room.game.kossuthGambleRemainingByPid || {},
      szilardBombRemainingByPid: room.game.szilardBombRemainingByPid || {},
      napoleonEuropeOwnerPid: Number.isInteger(room.game.napoleonEuropeOwnerPid) ? room.game.napoleonEuropeOwnerPid : null,
      napoleonEuropeTerritoryTids: room.game.napoleonEuropeTerritoryTids || [],
      horthyHomelandOwnerPid: Number.isInteger(room.game.horthyHomelandOwnerPid) ? room.game.horthyHomelandOwnerPid : null,
      horthyHomelandTerritoryTids: room.game.horthyHomelandTerritoryTids || [],
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
      isBot: Boolean(player.isBot),
      castleCaptureBonus: player.castleCaptureBonus || 0,
      characterId: player.characterId || null,
      characterName: player.characterId && CHARACTERS[player.characterId] ? CHARACTERS[player.characterId].name : null,
      napoleonEuropeBonus: player.napoleonEuropeBonus || 0,
      horthyHomelandBonus: player.horthyHomelandBonus || 0,
      kossuthScoreModifier: player.kossuthScoreModifier || 0,
    })),
    castles: room.castles.map((castle) => ({
      pid: castle.pid,
      tid: castle.tid,
      hp: castle.hp,
      active: castle.active,
    })),
  });

  if (!socket) {
    queueBotStateEvaluation(room);
  }
}




function publicQuestionContext(room, context, pid = null) {
  if (!context) return null;

  const runtime = room.questionRuntime || {};
  const question = room.game && room.game.activeQuestion ? room.game.activeQuestion : null;
  const sabotageRemaining = getUltraSabotageRemainingForPid(room, pid);
  const helpRemaining = getKozepsuliHelpRemainingForPid(room, pid);
  const hasAnswered = Boolean(question && question.answers && Number.isInteger(pid) && question.answers[pid]);
  const helpUsedForQuestion = Boolean(runtime.questionHelpUsedByPid && runtime.questionHelpUsedByPid[pid]);
  const canUseKozepsuliHelp = Boolean(
    question &&
    Array.isArray(question.participants) &&
    question.participants.includes(pid) &&
    helpRemaining > 0 &&
    !hasAnswered &&
    !helpUsedForQuestion
  );

  const kossuthArmed = isKossuthGambleArmed(room, pid);
  const kossuthRemaining = getKossuthGambleRemainingForPid(room, pid);
  const canUseKossuthGamble = Boolean(
    question &&
    Array.isArray(question.participants) &&
    question.participants.includes(pid) &&
    getCharacterIdForPid(room, pid) === 'kossuth' &&
    kossuthRemaining > 0 &&
    !hasAnswered &&
    !kossuthArmed
  );

  if (context.flow === 'EXPANSION') {
    return {
      flow: 'EXPANSION',
      kozepsuliHelpRemaining: helpRemaining,
      kozepsuliHelpRemainingTotal: getTotalKozepsuliHelpRemaining(room),
      canUseKozepsuliHelp,
      kossuthGambleArmed: kossuthArmed,
      kossuthGambleRemaining: kossuthRemaining,
      canUseKossuthGamble,
    };
  }

  const canUseUltraSabotage = Boolean(
    question &&
    question.type === 'mcq' &&
    context.flow === 'BATTLE' &&
    Array.isArray(question.participants) &&
    question.participants.includes(pid) &&
    sabotageRemaining > 0 &&
    !runtime.ultraSabotageUsed &&
    Object.keys(question.answers || {}).length === 0
  );
  const brutusRemaining = getBrutusMirrorRemainingForPid(room, pid);
  const canUseBrutusMirror = Boolean(
    question &&
    question.type === 'mcq' &&
    context.flow === 'BATTLE' &&
    Array.isArray(question.participants) &&
    question.participants.includes(pid) &&
    getCharacterIdForPid(room, pid) === 'brutus' &&
    brutusRemaining > 0 &&
    !runtime.brutusMirrorUsed &&
    Object.keys(question.answers || {}).length === 0
  );

  const canUseBattleKossuthGamble = Boolean(
    question &&
    Array.isArray(question.participants) &&
    question.participants.includes(pid) &&
    Number.isInteger(context.attackerPid) &&
    context.attackerPid === pid &&
    getCharacterIdForPid(room, pid) === 'kossuth' &&
    kossuthRemaining > 0 &&
    !hasAnswered &&
    !kossuthArmed
  );

  return {
    flow: 'BATTLE',
    isCastle: Boolean(context.isCastle),
    targetTid: context.targetTid,
    castleStage: context.castleStage || 1,
    duelType: context.duelType || 'PRIMARY',
    attackerPid: Number.isInteger(context.attackerPid) ? context.attackerPid : null,
    defenderPid: Number.isInteger(context.defenderPid) ? context.defenderPid : null,
    kossuthGambleArmed: kossuthArmed,
    kossuthGambleRemaining: kossuthRemaining,
    canUseKossuthGamble: canUseBattleKossuthGamble,
    ultraSabotageRemaining: sabotageRemaining,
    ultraSabotageRemainingTotal: getTotalUltraSabotageRemaining(room),
    ultraSabotageUsed: Boolean(runtime.ultraSabotageUsed),
    ultraSabotageTargetPid: Number.isInteger(runtime.ultraSabotageTargetPid) ? runtime.ultraSabotageTargetPid : null,
    ultraSabotageByPid: Number.isInteger(runtime.ultraSabotageByPid) ? runtime.ultraSabotageByPid : null,
    canUseUltraSabotage,
    kozepsuliHelpRemaining: helpRemaining,
    kozepsuliHelpRemainingTotal: getTotalKozepsuliHelpRemaining(room),
    canUseKozepsuliHelp,
    brutusMirrorRemaining: brutusRemaining,
    brutusMirrorUsed: Boolean(runtime.brutusMirrorUsed),
    brutusMirrorTargetPid: Number.isInteger(runtime.brutusMirrorTargetPid) ? runtime.brutusMirrorTargetPid : null,
    brutusMirrorByPid: Number.isInteger(runtime.brutusMirrorByPid) ? runtime.brutusMirrorByPid : null,
    canUseBrutusMirror,
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
  queueBotQuestionAnswers(room);
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
  const sabotageRemaining = getUltraSabotageRemainingForPid(room, player.pid);
  if (sabotageRemaining <= 0) {
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

  if (!room.game.ultraSabotageRemainingByPid || typeof room.game.ultraSabotageRemainingByPid !== 'object') {
    room.game.ultraSabotageRemainingByPid = {};
  }
  room.game.ultraSabotageRemainingByPid[player.pid] = Math.max(0, sabotageRemaining - 1);
  room.game.ultraSabotageRemaining = getTotalUltraSabotageRemaining(room);
  await persistGame(room);

  emitQuestionStart(room);

  const sourcePlayer = getPlayerByPid(room, player.pid);
  const targetPlayer = getPlayerByPid(room, targetPid);
  room.namespace.emit('ultraSabotageActivated', {
    questionId: question.id,
    byPid: player.pid,
    targetPid,
    byName: sourcePlayer ? sourcePlayer.name : 'Ismeretlen',
    targetName: targetPlayer ? targetPlayer.name : 'Ismeretlen',
    remaining: getUltraSabotageRemainingForPid(room, player.pid),
    remainingTotal: getTotalUltraSabotageRemaining(room),
  });

  sendStatus(room, `${sourcePlayer ? sourcePlayer.name : 'Valaki'} szabotázst aktivált. ${targetPlayer ? targetPlayer.name : 'Az ellenfél'} ULTRA HARD kérdést kapott.`);
  gameLog(room, `${sourcePlayer ? sourcePlayer.name : 'Valaki'} szabotázst aktivált ${targetPlayer ? targetPlayer.name : 'az ellenfél'} ellen.`);
}

async function handleActivateKozepsuliHelp(room, socket) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  const question = room.game && room.game.activeQuestion;
  const runtime = room.questionRuntime || {};

  if (!player || !question) return;
  if (!Array.isArray(question.participants) || !question.participants.includes(player.pid)) {
    socket.emit('serverstatus', ['Csak az aktuális kérdés résztvevői használhatják a segítséget.']);
    return;
  }
  if (Date.now() > question.deadline) {
    socket.emit('serverstatus', ['Lejárt az idő.']);
    return;
  }
  if (question.answers[player.pid]) {
    socket.emit('serverstatus', ['Már válaszoltál erre a kérdésre.']);
    return;
  }

  const helpRemaining = getKozepsuliHelpRemainingForPid(room, player.pid);
  if (helpRemaining <= 0) {
    socket.emit('serverstatus', ['Elfogyott a KÖZÉPSULINEKED HELP ebben a meccsben.']);
    return;
  }

  if (!room.questionRuntime) {
    room.questionRuntime = { perPidQuestion: {}, questionHelpUsedByPid: {} };
  }
  if (!room.questionRuntime.questionHelpUsedByPid) {
    room.questionRuntime.questionHelpUsedByPid = {};
  }
  if (room.questionRuntime.questionHelpUsedByPid[player.pid]) {
    socket.emit('serverstatus', ['Erre a kérdésre már felhasználtad a segítséget.']);
    return;
  }

  room.questionRuntime.questionHelpUsedByPid[player.pid] = true;
  if (!room.game.kozepsuliHelpRemainingByPid || typeof room.game.kozepsuliHelpRemainingByPid !== 'object') {
    room.game.kozepsuliHelpRemainingByPid = {};
  }
  room.game.kozepsuliHelpRemainingByPid[player.pid] = Math.max(0, helpRemaining - 1);
  room.game.kozepsuliHelpRemaining = getTotalKozepsuliHelpRemaining(room);
  await persistGame(room);

  const localQuestion = getQuestionVariantForPid(room, player.pid) || question;
  const helpPayload = {
    questionId: question.id,
    type: question.type,
    remaining: getKozepsuliHelpRemainingForPid(room, player.pid),
    remainingTotal: getTotalKozepsuliHelpRemaining(room),
    unit: question.unit || '',
  };

  if (question.type === 'mcq') {
    helpPayload.correctOptionIndex = localQuestion && Number.isInteger(localQuestion.correctOptionIndex)
      ? localQuestion.correctOptionIndex
      : question.correctOptionIndex;
  } else if (question.type === 'guess') {
    helpPayload.exactAnswer = question.exactAnswer;
  }

  socket.emit('questionHelpGranted', helpPayload);
  room.namespace.emit('questionHelpActivated', {
    questionId: question.id,
    byPid: player.pid,
    byName: player.name,
    remaining: getKozepsuliHelpRemainingForPid(room, player.pid),
    remainingTotal: getTotalKozepsuliHelpRemaining(room),
  });

  sendStatus(room, `${player.name} felhasználta a KÖZÉPSULINEKED HELP-et.`);
  gameLog(room, `${player.name} felhasználta a KÖZÉPSULINEKED HELP-et.`);
}



async function handleActivateKossuthGamble(room, socket) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  const question = room.game && room.game.activeQuestion;

  if (!player || !question) return;
  if (!Array.isArray(question.participants) || !question.participants.includes(player.pid)) {
    socket.emit('serverstatus', ['Csak az aktuális kérdés résztvevői használhatják a Széchényi Kaszinót.']);
    return;
  }
  if (getCharacterIdForPid(room, player.pid) !== 'kossuth') {
    socket.emit('serverstatus', ['A Széchényi Kaszinót csak Széchényi használhatja.']);
    return;
  }
  if (Date.now() > question.deadline) {
    socket.emit('serverstatus', ['Lejárt az idő.']);
    return;
  }
  if (question.answers[player.pid]) {
    socket.emit('serverstatus', ['Válasz után már nem aktiválhatod a Széchényi Kaszinót.']);
    return;
  }
  if (question.context && question.context.flow === 'BATTLE' && Number.isInteger(question.context.attackerPid) && question.context.attackerPid !== player.pid) {
    socket.emit('serverstatus', ['Battle közben csak a támadó aktiválhatja a Széchényi Kaszinót.']);
    return;
  }
  if (isKossuthGambleArmed(room, player.pid)) {
    socket.emit('serverstatus', ['A Széchényi Kaszinó már aktív nálad.']);
    return;
  }
  const remaining = getKossuthGambleRemainingForPid(room, player.pid);
  if (remaining <= 0) {
    socket.emit('serverstatus', ['A Széchényi Kaszinót már mindkétszer felhasználtad.']);
    return;
  }

  armKossuthGamble(room, player.pid);
  if (!room.game.kossuthGambleRemainingByPid || typeof room.game.kossuthGambleRemainingByPid !== 'object') {
    room.game.kossuthGambleRemainingByPid = {};
  }
  room.game.kossuthGambleRemainingByPid[player.pid] = Math.max(0, remaining - 1);
  await persistGame(room);

  emitQuestionStart(room);
  room.namespace.emit('kossuthGambleActivated', {
    questionId: question.id,
    byPid: player.pid,
    byName: player.name,
    remaining: getKossuthGambleRemainingForPid(room, player.pid),
  });

  sendStatus(room, `${player.name} aktiválta a Széchényi Kaszinót.`);
  gameLog(room, `${player.name} aktiválta a Széchényi Kaszinót.`);
}

async function handleActivateBrutusMirror(room, socket) {
  const player = getPlayerByUsername(room, socket.currentUsername);
  const question = room.game && room.game.activeQuestion;
  const runtime = room.questionRuntime;

  if (!player || !question || !runtime) return;
  if (room.game.phase !== PHASES.BATTLE_QUESTION) return;
  if (question.type !== 'mcq' || !question.context || question.context.flow !== 'BATTLE') return;
  if (!Array.isArray(question.participants) || !question.participants.includes(player.pid)) {
    socket.emit('serverstatus', ['Csak az aktuális párbaj résztvevői használhatják Brutust.']);
    return;
  }
  if (getCharacterIdForPid(room, player.pid) !== 'brutus') {
    socket.emit('serverstatus', ['Brutus képességét csak Brutus használhatja.']);
    return;
  }

  const brutusRemaining = getBrutusMirrorRemainingForPid(room, player.pid);
  if (brutusRemaining <= 0) {
    socket.emit('serverstatus', ['Elfogyott Brutus minden használata ebben a meccsben.']);
    return;
  }
  if (runtime.brutusMirrorUsed) {
    socket.emit('serverstatus', ['Erre a kérdésre már aktiválták Brutust.']);
    return;
  }
  if (Object.keys(question.answers || {}).length > 0) {
    socket.emit('serverstatus', ['Brutust csak az első válasz előtt lehet aktiválni.']);
    return;
  }

  const targetPid = question.participants.find((pid) => pid !== player.pid);
  if (!Number.isInteger(targetPid)) {
    socket.emit('serverstatus', ['Most nincs érvényes Brutus célpont.']);
    return;
  }

  runtime.brutusMirrorUsed = true;
  runtime.brutusMirrorTargetPid = targetPid;
  runtime.brutusMirrorByPid = player.pid;

  if (!room.game.brutusMirrorRemainingByPid || typeof room.game.brutusMirrorRemainingByPid !== 'object') {
    room.game.brutusMirrorRemainingByPid = {};
  }
  room.game.brutusMirrorRemainingByPid[player.pid] = Math.max(0, brutusRemaining - 1);
  await persistGame(room);

  emitQuestionStart(room);

  const sourcePlayer = getPlayerByPid(room, player.pid);
  const targetPlayer = getPlayerByPid(room, targetPid);
  room.namespace.emit('brutusMirrorActivated', {
    questionId: question.id,
    byPid: player.pid,
    targetPid,
    byName: sourcePlayer ? sourcePlayer.name : 'Ismeretlen',
    targetName: targetPlayer ? targetPlayer.name : 'Ismeretlen',
    remaining: getBrutusMirrorRemainingForPid(room, player.pid),
  });

  sendStatus(room, `${sourcePlayer ? sourcePlayer.name : 'Valaki'} aktiválta Brutust. ${targetPlayer ? targetPlayer.name : 'Az ellenfél'} tükrözött kérdést kapott.`);
  gameLog(room, `${sourcePlayer ? sourcePlayer.name : 'Valaki'} aktiválta Brutust ${targetPlayer ? targetPlayer.name : 'az ellenfél'} ellen.`);
}

function getUltraSabotageRemainingForPid(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) {
    return 0;
  }

  const byPid = room.game.ultraSabotageRemainingByPid;
  if (byPid && typeof byPid === 'object' && Object.prototype.hasOwnProperty.call(byPid, pid)) {
    return Math.max(0, Number(byPid[pid]) || 0);
  }

  return 0;
}

function getUltraSabotageRemainingMap(room) {
  const result = {};
  (room.players || []).forEach((player) => {
    result[player.pid] = getUltraSabotageRemainingForPid(room, player.pid);
  });
  return result;
}

function getTotalUltraSabotageRemaining(room) {
  return Object.values(getUltraSabotageRemainingMap(room)).reduce((sum, value) => sum + value, 0);
}

function getKozepsuliHelpRemainingForPid(room, pid) {
  if (!room || !room.game || !Number.isInteger(pid)) {
    return 0;
  }

  const byPid = room.game.kozepsuliHelpRemainingByPid;
  if (byPid && typeof byPid === 'object' && Object.prototype.hasOwnProperty.call(byPid, pid)) {
    return Math.max(0, Number(byPid[pid]) || 0);
  }

  return 0;
}

function getKozepsuliHelpRemainingMap(room) {
  const result = {};
  room.players.forEach((player) => {
    result[player.pid] = getKozepsuliHelpRemainingForPid(room, player.pid);
  });
  return result;
}

function getTotalKozepsuliHelpRemaining(room) {
  return Object.values(getKozepsuliHelpRemainingMap(room)).reduce((sum, value) => sum + value, 0);
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
  var filteredQuestions = getFilteredMultipleChoiceQuestions(room);
  if (!filteredQuestions.length) {
    return null;
  }

  if (room.usedMcqIds.size >= filteredQuestions.length) {
    room.usedMcqIds.clear();
  }

  var availableQuestions = filteredQuestions.filter(function(question) {
    return !room.usedMcqIds.has(question.id);
  });

  if (!availableQuestions.length) {
    room.usedMcqIds.clear();
    availableQuestions = filteredQuestions.slice();
  }

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





function isBotPlayer(player) {
  return Boolean(player && player.isBot && player.name === CHATGPT_BOT_NAME);
}

function createBotSocket(player) {
  return {
    currentUsername: player && player.name ? player.name : CHATGPT_BOT_NAME,
    emit: function () {},
  };
}

function getRandomDelay(minMs, maxMs) {
  const min = Math.max(0, Number(minMs) || 0);
  const max = Math.max(min, Number(maxMs) || min);
  return min + Math.floor(Math.random() * (max - min + 1));
}

function scheduleBotTask(room, key, ms, callback) {
  if (!room.botTimers || !(room.botTimers instanceof Map)) {
    room.botTimers = new Map();
  }
  if (room.botTimers.has(key)) {
    clearTimeout(room.botTimers.get(key));
  }
  const timer = setTimeout(async () => {
    room.botTimers.delete(key);
    try {
      await callback();
    } catch (error) {
      console.error('Bot task failed:', error);
    }
  }, Math.max(0, Number(ms) || 0));
  room.botTimers.set(key, timer);
}

function queueBotStateEvaluation(room) {
  if (!room || !room.game) return;
  const bots = room.players.filter((player) => isBotPlayer(player) && !player.eliminated);
  if (!bots.length) return;
  scheduleBotTask(room, 'bot:state-eval', getRandomDelay(700, 1500), async () => {
    await runBotTurnIfNeeded(room);
  });
}

function scheduleBotStateEvaluation(room) {
  queueBotStateEvaluation(room);
}

function queueBotQuestionAnswers(room) {
  const question = room && room.game ? room.game.activeQuestion : null;
  if (!question) return;
  question.participants.forEach((pid) => {
    const player = getPlayerByPid(room, pid);
    if (!isBotPlayer(player)) return;
    scheduleBotTask(room, `bot:answer:${question.id}:${pid}`, getRandomDelay(1200, 3200), async () => {
      await runBotQuestionAnswer(room, question.id, pid);
    });
  });
}

function getAvailableBaseTargets(room) {
  return room.territories
    .filter((territory) => territory.ownsto === -1)
    .filter((territory) => !room.castles.some((castle) => {
      if (!castle.active) return false;
      const castleTerritory = getTerritoryByTid(room, castle.tid);
      return castleTerritory && castleTerritory.neighbors.includes(territory.tid);
    }))
    .map((territory) => territory.tid);
}

function chooseRandomValue(values) {
  if (!Array.isArray(values) || !values.length) return null;
  return values[Math.floor(Math.random() * values.length)];
}

function buildBotGuessValue(exactAnswer) {
  if (Math.random() < BOT_GUESS_EXACT_PROBABILITY) {
    return exactAnswer;
  }

  const numericExact = Number(exactAnswer);
  const magnitude = Math.max(3, Math.round(Math.abs(numericExact) * 0.25));
  const offset = Math.max(1, Math.floor(Math.random() * magnitude) + 1);
  const direction = Math.random() < 0.5 ? -1 : 1;
  let guess = numericExact + direction * offset;
  if (guess === numericExact) {
    guess = numericExact + offset + 1;
  }
  if (numericExact >= 0 && guess < 0) {
    guess = numericExact + offset;
  }
  return Number.isInteger(numericExact) ? Math.round(guess) : guess;
}

async function runBotQuestionAnswer(room, expectedQuestionId, pid) {
  if (!room || !room.game || !room.game.activeQuestion) return;
  const question = room.game.activeQuestion;
  if (question.id !== expectedQuestionId) return;
  if (!question.participants.includes(pid) || question.answers[pid]) return;
  const player = getPlayerByPid(room, pid);
  if (!isBotPlayer(player) || player.eliminated) return;

  if (question.type === 'mcq') {
    const localQuestion = getQuestionVariantForPid(room, pid) || question;
    const correctIndex = Number(localQuestion.correctOptionIndex);
    let selectedIndex = correctIndex;
    if (Math.random() >= BOT_MC_CORRECT_PROBABILITY) {
      const wrongOptions = [0, 1, 2, 3].filter((index) => index !== correctIndex);
      selectedIndex = chooseRandomValue(wrongOptions);
    }
    await handleSubmitAnswer(room, createBotSocket(player), { selectedIndex });
    return;
  }

  await handleSubmitAnswer(room, createBotSocket(player), { guess: buildBotGuessValue(question.exactAnswer) });
}

async function runBotTurnIfNeeded(room) {
  if (!room || !room.game || room.game.gamefinish || room.game.activeQuestion) return;
  const currentPid = room.game.currentplayer;
  if (!Number.isInteger(currentPid) || currentPid < 0) return;
  const player = getPlayerByPid(room, currentPid);
  if (!isBotPlayer(player) || player.eliminated || !player.connected) return;

  if (room.game.phase === PHASES.BASE_SELECTION) {
    const targetTid = chooseRandomValue(getAvailableBaseTargets(room));
    if (Number.isInteger(targetTid)) {
      await handleSelectBase(room, createBotSocket(player), targetTid);
    }
    return;
  }

  if (room.game.phase === PHASES.CHARACTER_SELECTION) {
    const choice = chooseRandomValue((room.game.availableCharacterIds || []).slice());
    if (choice) {
      await handleSelectCharacter(room, createBotSocket(player), choice);
    }
    return;
  }

  if (room.game.phase === PHASES.EXPANSION_SELECTION) {
    const targetTid = chooseRandomValue(getExpansionSelectableTargets(room, player.pid));
    if (Number.isInteger(targetTid)) {
      await handleSelectExpansionTarget(room, createBotSocket(player), targetTid);
    }
    return;
  }

  if (room.game.phase === PHASES.BATTLE_SELECTION) {
    const targetTid = chooseRandomValue(getAttackableTargets(room, player.pid));
    if (Number.isInteger(targetTid)) {
      await handleSelectAttackTarget(room, createBotSocket(player), targetTid);
    }
  }
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
      horthyHomelandBonus: 0,
      napoleonEuropeBonus: 0,
      kossuthScoreModifier: 0,
      active: true,
      eliminated: false,
      connected: false,
      isBot: false,
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
  const normalizedMaplevel = normalizeMapLevelValue(maplevel);
  const T = (tid, continent, tname, neighbors) => ({ gameid, tid, continent, tname, neighbors, ownsto: -1, szechenyiCasinoOwnerPid: null });

  if (normalizedMaplevel === 'hungary13') {
    return [
      T(0, 0, 'South Africa', [1, 2]),
      T(1, 0, 'East Africa', [0, 2, 3, 4, 5]),
      T(2, 0, 'Congo', [0, 1, 4]),
      T(3, 1, 'Egypt', [1, 4, 5, 6]),
      T(4, 0, 'West Africa', [2, 1, 3, 6, 7]),
      T(5, 1, 'Middle East', [1, 3, 6, 9]),
      T(6, 1, 'Southern Europe', [3, 4, 5, 7, 8, 9]),
      T(7, 1, 'Western Europe', [4, 6, 8, 11]),
      T(8, 1, 'Northern Europe', [6, 7, 9, 10, 11]),
      T(9, 1, 'Ukraine', [5, 6, 8, 10]),
      T(10, 1, 'Scandinavia', [8, 9, 11, 12]),
      T(11, 1, 'Great Britain', [7, 8, 10, 12]),
      T(12, 1, 'Iceland', [10, 11]),
    ];
  }

  if (normalizedMaplevel === 'medium') {
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
