var socket = io('/' + gameid);
var countriesLayer;
var mapTerritories = [];
var gameFinished = false;
var state = {
  game: null,
  players: [],
  territories: [],
  castles: [],
};
var USER = null;
var activeQuestionId = null;
var questionCountdownInterval = null;
var questionRevealTimer = null;








var element = function (id) {
  return document.getElementById(id);
};








var messages = element('messages');
var gamelogs = element('gamelog');
var textarea = element('textarea');
var playercards = element('playercards');
var phaseboard = element('phaseboard');
var orderboard = element('orderboard');
var ordermeta = element('ordermeta');
var ordersummary = element('ordersummary');
var gamestatus = element('gamestatus');
var phaseSplash = element('phase-splash');
var phaseSplashTitle = element('phase-splash-title');
var winnerModal = element('winner-modal');
var winnerTitle = element('winner-title');
var winnerSubtitle = element('winner-subtitle');
var lastPhaseGroupShown = null;
var phaseSplashTimer = null;


var currentQuestionData = null;
var questionUiTimers = [];
var ownColorBannerTimer = null;
var ultraSabotageBannerTimer = null;
var hasSubmittedCurrentQuestion = false;




function queueUiTimer(fn, ms) {
  var timer = setTimeout(fn, ms);
  questionUiTimers.push(timer);
  return timer;
}




function clearQuestionUiTimers() {
  while (questionUiTimers.length) {
    clearTimeout(questionUiTimers.pop());
  }
}




function ensureQuestionEnhancementStyles() {
  if (document.getElementById('question-enhancement-styles')) return;
  var style = document.createElement('style');
  style.id = 'question-enhancement-styles';
  style.textContent = [
    '#question-body.is-resolving { display:flex; flex-direction:column; gap:12px; }',
    '#question-body .question-option { position:relative; overflow:hidden; transition: transform .26s ease, opacity .32s ease, box-shadow .32s ease, border-color .32s ease, filter .32s ease, max-height .34s ease, margin .34s ease, padding .34s ease; }',
    '#question-body .question-option.question-option-revealed { color:#fff; border-color: rgba(255,255,255,0.18); box-shadow: 0 20px 36px rgba(0,0,0,0.22); }',
    '#question-body .question-option.question-option-correct { transform: translateY(-2px) scale(1.035); border:2px solid rgba(123,255,190,0.98); box-shadow: 0 0 0 1px rgba(214,255,235,0.22) inset, 0 0 22px rgba(128,255,196,0.28), 0 18px 34px rgba(0,0,0,0.24); }',
    '#question-body .question-option.question-option-fade { opacity:0; filter:blur(2px) saturate(.55); transform:translateY(20px) scale(.965); pointer-events:none; max-height:0; margin:0; padding-top:0; padding-bottom:0; border-width:0; }',
    '#question-body .question-option .question-option-overlay { position:absolute; inset:0; opacity:0; transition: opacity .28s ease; z-index:0; }',
    '#question-body .question-option.question-option-revealed .question-option-overlay { opacity:1; }',
    '#question-body .question-option .question-option-label, #question-body .question-option .question-option-voters { position:relative; z-index:1; display:block; }',
    '#question-body .question-option .question-option-label { font-weight:700; }',
    '#question-body .question-option .question-option-voters { margin-top:8px; font-size:12px; letter-spacing:0.04em; text-transform:uppercase; opacity:0.95; }',
    '#question-body .question-option .question-option-voters:empty { display:none; }',
    '.territory-overlay-stack { display:flex; flex-direction:column; align-items:center; gap:5px; }',
    '.pending-selection-badge { min-width:26px; height:26px; padding:0 10px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:12px; border:2px solid rgba(255,255,255,0.72); box-shadow:0 8px 16px rgba(0,0,0,0.18); }',
    '.attack-selection-badge { width:32px; height:32px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; color:#fff; font-size:18px; border:2px solid rgba(255,255,255,0.75); box-shadow:0 8px 16px rgba(0,0,0,0.22); background:rgba(0,0,0,0.22); }',
    '.own-color-banner { position:fixed; top:92px; left:50%; transform:translateX(-50%); z-index:10050; min-width:280px; max-width:calc(100vw - 28px); text-align:center; padding:18px 28px; border-radius:18px; color:#fff; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; box-shadow:0 18px 36px rgba(0,0,0,0.22); opacity:0; pointer-events:none; transition:opacity .28s ease, transform .28s ease; }',
    '.own-color-banner.is-visible { opacity:1; transform:translateX(-50%) translateY(0); }',
    '.own-color-banner small { display:block; margin-top:6px; font-size:12px; letter-spacing:0.08em; opacity:0.9; }'
  ].join('\n');
  document.head.appendChild(style);
}




function getPlayerColorName(pid) {
  var names = ['PIROS', 'ZÖLD', 'FEHÉR'];
  return names[pid] || 'ISMERETLEN';
}




function getPendingSelectionPidForTid(tid) {
  if (!state.game || !state.game.pendingSelections) return null;
  var foundPid = null;
  Object.keys(state.game.pendingSelections).forEach(function (pidKey) {
    var selection = state.game.pendingSelections[pidKey];
    if (Array.isArray(selection)) {
      if (selection.indexOf(tid) !== -1) {
        foundPid = Number(pidKey);
      }
      return;
    }
    if (Number(selection) === tid) {
      foundPid = Number(pidKey);
    }
  });
  return foundPid;
}




function getActiveAttackPreview(tid) {
  if (!currentQuestionData || !currentQuestionData.context) return null;
  if (currentQuestionData.context.flow !== 'BATTLE') return null;
  if (Number(currentQuestionData.context.targetTid) !== tid) return null;
  if (!Number.isInteger(currentQuestionData.context.attackerPid)) return null;
  return currentQuestionData.context.attackerPid;
}




function buildTerritoryOverlayHtml(tid) {
  var parts = [];
  var castle = getCastleByTid(tid);
  if (castle) {
    parts.push('<div class="castle-pill"><span class="castle-pill-icon">♜</span><span>' + castle.hp + '</span></div>');
  }


  var pendingPid = getPendingSelectionPidForTid(tid);
  if (pendingPid !== null) {
    parts.push('<div class="pending-selection-badge" style="background:' + getOwnerColor(pendingPid) + '; border-color:' + rgba(getOwnerStroke(pendingPid), 0.82) + ';">' + escapeHtml(getPlayerColorName(pendingPid).charAt(0)) + '</div>');
  }


  var attackerPid = getActiveAttackPreview(tid);
  if (attackerPid !== null) {
    parts.push('<div class="attack-selection-badge" style="background:' + rgba(getOwnerColor(attackerPid), 0.92) + '; border-color:' + rgba(getOwnerStroke(attackerPid), 0.86) + ';">⚔</div>');
  }


  if (!parts.length) return '';
  return '<div class="territory-overlay-stack">' + parts.join('') + '</div>';
}




function buildOptionVoteGradient(selectedPids) {
  if (!selectedPids || !selectedPids.length) {
    return 'linear-gradient(135deg, rgba(182,159,121,0.92), rgba(140,116,83,0.92))';
  }


  var parts = [];
  var step = 100 / selectedPids.length;
  selectedPids.forEach(function (pid, index) {
    var start = (step * index).toFixed(3);
    var end = (step * (index + 1)).toFixed(3);
    var base = getOwnerColor(pid);
    var edge = getOwnerStroke(pid);
    parts.push(base + ' ' + start + '%');
    parts.push(edge + ' ' + end + '%');
  });


  return 'linear-gradient(90deg, ' + parts.join(', ') + ')';
}




function describeSelectedPlayers(selectedPids) {
  if (!selectedPids || !selectedPids.length) return '';
  return selectedPids.map(function (pid) {
    return getPlayerColorName(pid);
  }).join(' • ');
}




function showOwnColorBanner() {
  if (!USER) return;
  ensureQuestionEnhancementStyles();


  var existing = document.getElementById('own-color-banner');
  if (existing) {
    existing.remove();
  }


  var banner = document.createElement('div');
  banner.id = 'own-color-banner';
  banner.className = 'own-color-banner';
  banner.style.background = 'linear-gradient(135deg, ' + getOwnerColor(USER.pid) + ', ' + getOwnerStroke(USER.pid) + ')';
  banner.innerHTML = 'A TE SZÍNED: ' + escapeHtml(getPlayerColorName(USER.pid)) + '<small>ezzel a színnel játszol ebben a meccsben</small>';
  document.body.appendChild(banner);


  requestAnimationFrame(function () {
    banner.classList.add('is-visible');
  });


  if (ownColorBannerTimer) {
    clearTimeout(ownColorBannerTimer);
  }


  ownColorBannerTimer = setTimeout(function () {
    banner.classList.remove('is-visible');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 320);
  }, 3000);
}






function getCharacterDefinition(id) {
  return id && CHARACTER_DEFS[id] ? CHARACTER_DEFS[id] : null;
}

function ensureCharacterUi() {
  if (!document.getElementById('character-draft-modal')) {
    var modal = document.createElement('div');
    modal.id = 'character-draft-modal';
    modal.className = 'character-draft-modal';
    modal.innerHTML = '<div class="character-draft-backdrop"></div><div class="character-draft-panel"><div class="character-draft-header"><div class="character-draft-kicker">KARAKTERVÁLASZTÁS</div><div id="character-draft-title" class="character-draft-title"></div><div id="character-draft-subtitle" class="character-draft-subtitle"></div></div><div id="character-draft-options" class="character-draft-options"></div></div>';
    document.body.appendChild(modal);
  }
  if (!document.getElementById('character-tray')) {
    var tray = document.createElement('div');
    tray.id = 'character-tray';
    tray.className = 'character-tray';
    document.body.appendChild(tray);
  }
}

function getCharacterDraftOrder() {
  return state && state.game && Array.isArray(state.game.characterDraftOrder) ? state.game.characterDraftOrder.slice() : [];
}

function renderCharacterDraftModal() {
  ensureCharacterUi();
  var modal = document.getElementById('character-draft-modal');
  if (!modal) return;
  if (!state.game || state.game.phase !== 'CHARACTER_SELECTION') {
    modal.classList.remove('is-open');
    return;
  }
  var currentPid = state.game.currentplayer;
  var currentPlayer = getPlayerByPid(currentPid);
  var title = document.getElementById('character-draft-title');
  var subtitle = document.getElementById('character-draft-subtitle');
  var options = document.getElementById('character-draft-options');
  if (title) title.textContent = currentPlayer ? (getPlayerDisplayName(currentPlayer) + ' választ') : 'Karakterválasztás';
  if (subtitle) subtitle.textContent = USER && currentPid === USER.pid ? 'Válassz egy karaktert.' : 'Várj, amíg a soron lévő játékos választ.';
  var available = (state.game.availableCharacterIds || []).filter(function (id) { return id !== 'kossuth'; });
  options.innerHTML = available.map(function (id) {
    var def = getCharacterDefinition(id);
    if (!def) return '';
    return '<button type="button" class="character-draft-card' + (USER && currentPid === USER.pid ? '' : ' is-disabled') + '" data-character-id="' + escapeHtml(id) + '" ' + (USER && currentPid === USER.pid ? '' : 'disabled') + '><span class="character-draft-card-image-wrap"><img class="character-draft-card-image" src="' + escapeHtml(CHARACTER_IMAGE_BY_ID[id]) + '" alt="' + escapeHtml(def.name) + '" loading="lazy"></span><span class="character-draft-card-body"><span class="character-draft-card-name">' + escapeHtml(def.name) + '</span><span class="character-draft-card-desc">' + escapeHtml(def.shortDescription) + '</span></span></button>';
  }).join('');
  Array.prototype.slice.call(options.querySelectorAll('[data-character-id]')).forEach(function (button) {
    button.addEventListener('click', function () {
      if (!USER || state.game.currentplayer !== USER.pid) return;
      button.disabled = true;
      playOneShot(soundPlayers.characterSelect);
      socket.emit('selectCharacter', { characterId: button.getAttribute('data-character-id') });
    });
  });
  modal.classList.add('is-open');
}

function renderCharacterTray() {
  ensureCharacterUi();
  var tray = document.getElementById('character-tray');
  if (!tray) return;
  var cards = state.players.filter(function (player) { return !!player.characterId && player.characterId !== 'kossuth'; }).sort(function (a, b) { return a.pid - b.pid; });
  tray.innerHTML = cards.map(function (player) {
    var def = getCharacterDefinition(player.characterId);
    var isOwn = Boolean(USER) && USER.pid === player.pid;
    if (!def) return '';
    return '<button type="button" class="character-tray-card' + (isOwn ? ' is-own' : ' is-readonly') + '" data-character-tray="' + player.pid + '" ' + (isOwn ? '' : 'aria-disabled="true"') + '><span class="character-tray-color" style="background:' + getOwnerColor(player.pid) + '"></span><img class="character-tray-image" src="' + escapeHtml(CHARACTER_IMAGE_BY_ID[player.characterId]) + '" alt="' + escapeHtml(def.name) + '" loading="lazy"><span class="character-tray-text"><span class="character-tray-name">' + escapeHtml(def.name) + '</span><span class="character-tray-owner">' + escapeHtml(getPlayerDisplayName(player)) + '</span></span>' + (isOwn ? ('<span class="character-tray-detail">' + escapeHtml(def.fullDescription) + '</span>') : '') + '</button>';
  }).join('');
  Array.prototype.slice.call(tray.querySelectorAll('.character-tray-card.is-own')).forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('is-open');
    });
  });
}

function canUseBrutusMirror(question) {
  return Boolean(question && question.context && question.context.canUseBrutusMirror);
}

function applyNapoleonEuropeState() {
  var ownerPid = state && state.game ? state.game.napoleonEuropeOwnerPid : null;
  if (ownerPid !== lastNapoleonEuropeOwnerPid) {
    if (Number.isInteger(ownerPid) || Number.isInteger(lastNapoleonEuropeOwnerPid)) {
      playOneShot(soundPlayers.napoleonEurope);
    }
    lastNapoleonEuropeOwnerPid = ownerPid;
  }
}

function updateScoreDeltas(previousPlayers, nextPlayers) {
  previousScoreByPid = previousScoreByPid || {};
  latestScoreDeltaByPid = latestScoreDeltaByPid || {};
  (nextPlayers || []).forEach(function (player) {
    var prev = Object.prototype.hasOwnProperty.call(previousScoreByPid, player.pid) ? previousScoreByPid[player.pid] : player.score;
    var delta = player.score - prev;
    if (delta !== 0) {
      latestScoreDeltaByPid[player.pid] = { value: delta, at: Date.now() };
    }
    previousScoreByPid[player.pid] = player.score;
  });
}

function getActiveScoreDelta(pid) {
  var entry = latestScoreDeltaByPid[pid];
  if (!entry) return null;
  if (Date.now() - entry.at > 2600) return null;
  return entry;
}

function syncCharacterUi() {
  renderCharacterDraftModal();
  renderCharacterTray();
}

function buildGuessRevealEntries(payload) {
  var answers = payload && payload.answers ? payload.answers : {};
  return Object.keys(answers).map(function (pidKey) {
    var pid = Number(pidKey);
    var player = getPlayerByPid(pid);
    var answer = answers[pidKey] || {};
    return {
      pid: pid,
      name: player ? player.name : ('Játékos ' + pid),
      guess: answer.guess,
      distance: Number.isFinite(answer.distance) ? answer.distance : Number.POSITIVE_INFINITY,
      submittedAt: Number.isFinite(answer.submittedAt) ? answer.submittedAt : Number.POSITIVE_INFINITY,
      timedOut: Boolean(answer.timedOut)
    };
  }).sort(function (a, b) {
    return a.distance - b.distance || a.submittedAt - b.submittedAt || a.pid - b.pid;
  });
}

function renderGuessReveal(payload) {
  var body = element('question-body');
  var note = element('question-note');
  var timer = element('question-timer');
  if (!body) return;

  var entries = buildGuessRevealEntries(payload);
  var unitSuffix = payload && payload.unit ? ' ' + payload.unit : '';
  timer.textContent = payload.exactAnswer != null ? ('Pontos válasz: ' + payload.exactAnswer + unitSuffix) : '';

  body.classList.add('is-resolving');
  body.innerHTML = [
    '<div class="question-guess-reveal">',
      '<div class="question-guess-exact-card" id="question-guess-exact-card">',
        '<div class="question-guess-exact-kicker">PONTOS VÁLASZ</div>',
        '<div class="question-guess-exact-value">' + escapeHtml(String(payload.exactAnswer)) + (unitSuffix ? '<span class="question-guess-exact-unit">' + escapeHtml(unitSuffix) + '</span>' : '') + '</div>',
      '</div>',
      '<div class="question-guess-ranking" id="question-guess-ranking">',
        entries.map(function (entry, index) {
          var stateClass = entry.timedOut || entry.guess === null || typeof entry.guess === 'undefined' ? ' is-missed' : '';
          var answerText = entry.timedOut || entry.guess === null || typeof entry.guess === 'undefined'
            ? 'nem tippelt'
            : String(entry.guess) + unitSuffix;
          var distanceText = entry.timedOut || !Number.isFinite(entry.distance)
            ? 'Nincs értékelhető tipp'
            : ('Eltérés: ' + entry.distance + unitSuffix);
          return [
            '<div class="question-guess-card' + stateClass + '" data-rank="' + index + '">',
              '<div class="question-guess-card-rank">#' + (index + 1) + '</div>',
              '<div class="question-guess-card-name">' + escapeHtml(entry.name) + '</div>',
              '<div class="question-guess-card-answer">' + escapeHtml(answerText) + '</div>',
              '<div class="question-guess-card-distance">' + escapeHtml(distanceText) + '</div>',
            '</div>'
          ].join('');
        }).join(''),
      '</div>',
    '</div>'
  ].join('');

  if (note) {
    note.classList.remove('question-note-help');
    note.textContent = 'A pontos válasz kiemelve, alatta a tippek közelség szerint rendezve.';
  }

  queueUiTimer(function () {
    var exact = element('question-guess-exact-card');
    if (exact) exact.classList.add('is-visible');
    Array.prototype.slice.call(body.querySelectorAll('.question-guess-card')).forEach(function (card, index) {
      queueUiTimer(function () {
        card.classList.add('is-visible');
        if (index <= 1) card.classList.add('is-nearest');
      }, 120 + index * 130);
    });
  }, 60);

  queueUiTimer(function () {
    var winner = body.querySelector('.question-guess-card[data-rank="0"]');
    if (winner) winner.classList.add('is-winner');
  }, 1450);

  if (questionRevealTimer) clearTimeout(questionRevealTimer);
  questionRevealTimer = setTimeout(function() {
    hideQuestion();
  }, 4600);
}

function renderMcqAnswers(payload) {
  if (!currentQuestionData || currentQuestionData.type !== 'mcq') {
    hideQuestion();
    return;
  }

  ensureQuestionEnhancementStyles();
  clearQuestionCountdown();
  clearQuestionUiTimers();
  stopQuestionTimerSound();

  var body = element('question-body');
  var note = element('question-note');
  var timer = element('question-timer');
  if (!body) return;

  var answers = payload && payload.answers ? payload.answers : {};
  var voteMap = {};
  Object.keys(answers).forEach(function (pidKey) {
    var answer = answers[pidKey];
    if (answer && Number.isInteger(answer.selectedIndex)) {
      if (!voteMap[answer.selectedIndex]) voteMap[answer.selectedIndex] = [];
      voteMap[answer.selectedIndex].push(Number(pidKey));
    }
  });

  body.classList.add('is-resolving');
  body.innerHTML = (currentQuestionData.options || []).map(function (option, index) {
    return [
      '<button type="button" class="question-option question-option-reveal" data-option="' + index + '" disabled>',
      '<span class="question-option-overlay"></span>',
      '<span class="question-option-label">' + escapeHtml(option) + '</span>',
      '<span class="question-option-voters"></span>',
      '</button>'
    ].join('');
  }).join('');

  Array.prototype.slice.call(body.querySelectorAll('.question-option')).forEach(function (button) {
    var optionIndex = Number(button.getAttribute('data-option'));
    var selectedPids = (voteMap[optionIndex] || []).slice().sort(function (a, b) { return a - b; });
    var overlay = button.querySelector('.question-option-overlay');
    var voters = button.querySelector('.question-option-voters');

    if (overlay) {
      overlay.style.background = buildOptionVoteGradient(selectedPids);
    }
    if (voters) {
      voters.textContent = describeSelectedPlayers(selectedPids);
    }

    queueUiTimer(function () {
      button.classList.add('question-option-revealed');
    }, 70 + optionIndex * 100);
  });

  timer.textContent = 'Válaszok felfedése';
  if (note) {
    note.classList.remove('question-note-help');
    note.textContent = 'A rossz válaszok kifutnak, a helyes megoldás UV-zöldben marad.';
  }

  queueUiTimer(function () {
    Array.prototype.slice.call(body.querySelectorAll('.question-option')).forEach(function (button) {
      var optionIndex = Number(button.getAttribute('data-option'));
      if (optionIndex === payload.correctOptionIndex) {
        button.classList.add('question-option-correct');
      } else {
        button.classList.add('question-option-fade');
      }
    });
    if (note) note.textContent = 'HELYES VÁLASZ kiemelve.';
  }, 1700);

  queueUiTimer(function () {
    hideQuestion();
  }, 4900);
}

var PLAYER_FILL_COLORS = ['#b76455', '#728a5f', '#e4d9c0'];
var PLAYER_STROKE_COLORS = ['#61372a', '#41503b', '#817562'];
var PLAYER_NAMES_FALLBACK = ['Piros', 'Zöld', 'Fehér'];
var UNOWNED_FILL = '#bba17a';
var UNOWNED_STROKE = '#6a543d';
var topoMapEngine = null;


var SOUND_BASE = document.body.getAttribute('data-sound-base') || '/sounds';
var soundState = {
unlocked: false,
goodVoiceCount: 0,
badVoiceCount: 0,
currentBg: null,
lastSnapshotSeen: false
};
var previousScoreByPid = {};
var latestScoreDeltaByPid = {};
var lastNapoleonEuropeOwnerPid = null;


var soundPlayers = {




lobbyBg: new Audio(SOUND_BASE + '/lobby_bg.mp3'),
gameBg: new Audio(SOUND_BASE + '/game_bg.mp3'),
battleBg: new Audio(SOUND_BASE + '/battle_bg.mp3'),
questionTimer: new Audio(SOUND_BASE + '/question_timer.mp3'),
popupBase: new Audio(SOUND_BASE + '/popup_base.mp3'),
popupExpansion: new Audio(SOUND_BASE + '/popup_expansion.mp3'),
popupBattle: new Audio(SOUND_BASE + '/popup_battle.mp3'),
actionClick: new Audio(SOUND_BASE + '/action_click.mp3'),
correctAction: new Audio(SOUND_BASE + '/correct_action.mp3'),
territoryCapture: new Audio(SOUND_BASE + '/territory_capture.mp3'),
attackEnemyAction: new Audio(SOUND_BASE + '/attack_enemy_action.mp3'),
ultraSabotage: new Audio(SOUND_BASE + '/ultra_sabotage_hahaha.mp3'),
kozepsuliHelp: new Audio(SOUND_BASE + '/kozepsulineked_help.mp3'),
expansionSelectablePick: new Audio(SOUND_BASE + '/expansion_select_pick.mp3'),
napoleonEurope: new Audio(SOUND_BASE + '/napoleon_europe.mp3'),
brutusMirror: new Audio(SOUND_BASE + '/brutus_mirror.mp3'),
characterSelect: new Audio(SOUND_BASE + '/character_select.mp3')
};


soundPlayers.lobbyBg.loop = true;
soundPlayers.gameBg.loop = true;
soundPlayers.battleBg.loop = true;
soundPlayers.questionTimer.loop = true;

var GAME_CORNER_PROMO_LINK = 'https://kozepsulineked.com/products/30-napos-elofizetes-kozepsulineked';
var GAME_CORNER_PROMO_VIDEO = '/videos/game-corner-promo.mp4';
var QUESTION_HELP_ART_SRC = '/images/question-help-king.png';
var QUESTION_SABOTAGE_ART_SRC = '/images/question-sabotage-clown.png';
var CHARACTER_IMAGE_BY_ID = {
  einstein: '/images/character-einstein.png',
  kossuth: '/images/character-kossuth.png',
  napoleon: '/images/character-napoleon.png',
  brutus: '/images/character-brutus.png'
};
var CHARACTER_DEFS = {
  einstein: { id: 'einstein', name: 'Einstein', shortDescription: '6 segítséged van 3 helyett.', fullDescription: 'Einsteinként 6 KÖZÉPSULINEKED HELP-et kapsz a meccs teljes hosszára.' },
  kossuth: { id: 'kossuth', name: 'Kossuth', shortDescription: 'Kaszinózhatsz a foglalási köröd előtt.', fullDescription: 'A foglalási köröd elején aktiválhatod a kaszinót: siker esetén extra pont, kudarc esetén pontvesztés.' },
  napoleon: { id: 'napoleon', name: 'Napóleon', shortDescription: 'Ha tied egész Európa, +800 pontot kapsz.', fullDescription: 'Western Europe, Middle Europe, Southern Europe, Northern Europe, Ukraine, Scandinavia és Great Britain egyesítése +800 pontot ér.' },
  brutus: { id: 'brutus', name: 'Brutus', shortDescription: '3 tükröző battle-szabotázsod van.', fullDescription: 'Battle kérdésnél 3 alkalommal tükrözheted az ellenfél kérdéskártyáját.' }
};


function safePlay(audio) {
if (!audio) return;
try {
var playPromise = audio.play();
if (playPromise && typeof playPromise.catch === 'function') {
playPromise.catch(function () {});
}
} catch (e) {}
}




function playOneShot(audio) {
if (!audio) return;
try {
var clone = audio.cloneNode();
clone.volume = audio.volume;
safePlay(clone);
} catch (e) {
try {
audio.currentTime = 0;
safePlay(audio);
} catch (err) {}
}
}


function stopAudio(audio) {
if (!audio) return;
try {
audio.pause();
audio.currentTime = 0;
} catch (e) {}
}


function unlockSound() {
if (soundState.unlocked) return;
soundState.unlocked = true;
syncBackgroundMusic();
}




document.addEventListener('click', unlockSound, { once: true, capture: true });
document.addEventListener('keydown', unlockSound, { once: true, capture: true });


function syncBackgroundMusic() {
if (!soundState.unlocked) return;
var phaseGroup = getCurrentPhaseGroup();
var wanted = null;


if (gameFinished || phaseGroup === 'FINISHED' || phaseGroup === 'WAIT') {
wanted = null;
} else if (phaseGroup === 'BATTLE') {
wanted = 'battleBg';
} else if (state.game) {
wanted = 'gameBg';
}


if (soundState.currentBg === wanted) return;


stopAudio(soundPlayers.gameBg);
stopAudio(soundPlayers.battleBg);


soundState.currentBg = wanted;
if (wanted) safePlay(soundPlayers[wanted]);
}


function playPopupPhaseVoice(phaseGroup) {
if (!soundState.unlocked) return;
if (phaseGroup === 'BASE') playOneShot(soundPlayers.popupBase);




if (phaseGroup === 'EXPANSION') playOneShot(soundPlayers.popupExpansion);
if (phaseGroup === 'BATTLE') playOneShot(soundPlayers.popupBattle);
}


function maybePlayActionClick(event) {
if (!soundState.unlocked) return;
var target = event && event.target;
if (!target || !target.closest) return;
if (target.closest('button, a, input, textarea, select, label')) return;
playOneShot(soundPlayers.actionClick);
}


document.addEventListener('click', maybePlayActionClick, true);


function startQuestionTimerSound() {
if (!soundState.unlocked) return;
safePlay(soundPlayers.questionTimer);
}


function stopQuestionTimerSound() {
stopAudio(soundPlayers.questionTimer);
}


function pickRandom(list) {
if (!list || !list.length) return null;
return list[Math.floor(Math.random() * list.length)];
}




function playAnswerVoice(isCorrect) {
var audio = null;


if (isCorrect) {
soundState.goodVoiceCount += 1;
if (soundState.goodVoiceCount % 4 === 0) {
audio = pickRandom([
new Audio(SOUND_BASE + '/answer_good_rare_1.mp3')
]);
} else {
audio = pickRandom([
new Audio(SOUND_BASE + '/answer_good_common_1.mp3'),
new Audio(SOUND_BASE + '/answer_good_common_2.mp3')
]);
}
} else {
soundState.badVoiceCount += 1;
if (soundState.badVoiceCount % 4 === 0) {
audio = pickRandom([
new Audio(SOUND_BASE + '/answer_bad_rare_1.mp3'),
new Audio(SOUND_BASE + '/answer_bad_rare_2.mp3'),
new Audio(SOUND_BASE + '/answer_bad_rare_3.mp3')
]);
} else {
audio = pickRandom([
new Audio(SOUND_BASE + '/answer_bad_common_1.mp3'),
new Audio(SOUND_BASE + '/answer_bad_common_2.mp3')
]);




}
}


playOneShot(audio);
}


function maybePlayTerritoryCaptureSound(previousState, nextState) {
if (!soundState.unlocked || !previousState || !previousState.territories || !USER) return;


var before = {};
previousState.territories.forEach(function (territory) {
before[territory.tid] = territory.ownsto;
});


var gained = (nextState.territories || []).some(function (territory) {
return before.hasOwnProperty(territory.tid) && before[territory.tid] !== USER.pid &&
territory.ownsto === USER.pid;
});


if (gained) {
playOneShot(soundPlayers.territoryCapture);
}
}











function createGameCornerPromo() {
  if (!document.body || !document.body.classList.contains('game-screen')) return null;
  if (document.getElementById('game-corner-promo')) return document.getElementById('game-corner-promo');

  var shell = document.getElementById('game-shell') || document.body;
  var promo = document.createElement('a');
  promo.id = 'game-corner-promo';
  promo.className = 'game-corner-promo game-corner-promo--left';
  promo.href = GAME_CORNER_PROMO_LINK;
  promo.target = '_blank';
  promo.rel = 'noopener noreferrer';
  promo.setAttribute('aria-label', 'Középsuli Neked ajánlat megnyitása');

  promo.innerHTML = [
    '<span class="game-corner-promo-frame"></span>',
    '<video class="game-corner-promo-video" autoplay muted loop playsinline preload="auto">',
    '<source src="' + GAME_CORNER_PROMO_VIDEO + '" type="video/mp4">',
    '</video>'
  ].join('');

  shell.appendChild(promo);
  return promo;
}

var map = L.map('map', {
  zoomControl: false,
  attributionControl: false,
}).setView([43.8476, 18.3564], 2);
L.control.zoom({ position: 'bottomright' }).addTo(map);








var questionModal = buildQuestionModal();
var gameCornerPromo = createGameCornerPromo();
ensureCharacterUi();








function buildQuestionModal() {
  var modal = document.createElement('div');
  modal.id = 'question-modal';
  modal.innerHTML = [
    '<div class="question-panel">',
    '<div id="question-context" class="question-context"></div>',
    '<div id="question-prompt" class="question-prompt"></div>',
    '<div id="question-timer" class="question-timer"></div>',
    '<div id="question-body"></div>',
    '<div id="question-note" class="question-note"></div>',
    '<div id="question-extra-actions" class="question-extra-actions"></div>',
    '</div>'
  ].join('');
  document.body.appendChild(modal);
  return modal;
}









function getQuestionPanel() {
  return questionModal ? questionModal.querySelector('.question-panel') : null;
}

function getQuestionActionsHost() {
  return element('question-extra-actions');
}

function clearQuestionActions() {
  var host = getQuestionActionsHost();
  if (host) {
    host.innerHTML = '';
  }
}

function canUseUltraSabotage(question) {
  return Boolean(
    question &&
    question.type === 'mcq' &&
    question.context &&
    question.context.flow === 'BATTLE' &&
    question.context.canUseUltraSabotage &&
    USER &&
    question.participants &&
    question.participants.indexOf(USER.pid) !== -1 &&
    !question.isUltra &&
    !hasSubmittedCurrentQuestion
  );
}

function canUseKozepsuliHelp(question) {
  return Boolean(
    question &&
    question.context &&
    question.context.canUseKozepsuliHelp &&
    USER &&
    question.participants &&
    question.participants.indexOf(USER.pid) !== -1 &&
    !hasSubmittedCurrentQuestion
  );
}

function triggerQuestionActionEffect(kind, payload) {
  var panel = getQuestionPanel();
  if (!panel) return;

  var burst = document.createElement('div');
  burst.className = 'question-action-burst question-action-burst--' + kind;
  burst.innerHTML = [
    '<span class="question-action-burst-glow"></span>',
    '<span class="question-action-smoke smoke-1"></span>',
    '<span class="question-action-smoke smoke-2"></span>',
    '<span class="question-action-smoke smoke-3"></span>',
    '<span class="question-action-smoke smoke-4"></span>'
  ].join('');
  panel.appendChild(burst);
  requestAnimationFrame(function () {
    burst.classList.add('is-active');
  });
  setTimeout(function () {
    if (burst.parentNode) {
      burst.parentNode.removeChild(burst);
    }
  }, 1800);

  var buttonClass = kind === 'help' ? '.question-help-button' : '.question-sabotage-button';
  var button = panel.querySelector(buttonClass);
  if (button) {
    button.classList.add('is-triggered');
    setTimeout(function () {
      button.classList.remove('is-triggered');
    }, 1600);
  }
}

function applyKozepsuliHelpGranted(payload) {
  if (!currentQuestionData || !payload || payload.questionId !== currentQuestionData.id) return;

  currentQuestionData.context = currentQuestionData.context || {};
  currentQuestionData.context.kozepsuliHelpRemaining = typeof payload.remaining === 'number'
    ? payload.remaining
    : currentQuestionData.context.kozepsuliHelpRemaining;
  currentQuestionData.context.canUseKozepsuliHelp = false;
  renderQuestionActions(currentQuestionData);

  var note = element('question-note');
  var body = element('question-body');
  if (!body) return;

  if (currentQuestionData.type === 'mcq' && typeof payload.correctOptionIndex === 'number') {
    Array.prototype.slice.call(body.querySelectorAll('.question-option')).forEach(function (button) {
      var optionIndex = Number(button.getAttribute('data-option'));
      button.classList.remove('question-option-help-correct');
      if (optionIndex === payload.correctOptionIndex) {
        button.classList.add('question-option-help-correct');
      }
    });
    if (note) {
      note.textContent = 'KÖZÉPSULINEKED HELP aktív: a helyes válasz zölddel kiemelve.';
      note.classList.add('question-note-help');
    }
    return;
  }

  if (currentQuestionData.type === 'guess') {
    var row = body.querySelector('.question-guess-row');
    var input = element('guess-input');
    if (row) {
      row.classList.add('question-guess-row-help');
    }
    if (input && typeof payload.exactAnswer !== 'undefined') {
      input.value = payload.exactAnswer;
      input.classList.add('question-guess-input-help');
    }

    var existing = body.querySelector('.question-help-answer');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
    var reveal = document.createElement('div');
    reveal.className = 'question-help-answer';
    reveal.textContent = 'Pontos válasz: ' + payload.exactAnswer + (payload.unit ? ' ' + payload.unit : '');
    body.appendChild(reveal);
    if (note) {
      note.textContent = 'KÖZÉPSULINEKED HELP aktív: a pontos válasz megjelent zölddel.';
      note.classList.add('question-note-help');
    }
  }
}

function applyQuestionVisualMode(question) {
  var panel = getQuestionPanel();
  if (!panel) return;
  panel.classList.toggle('is-ultra-hard', Boolean(question && question.isUltra));
  var brutusActive = Boolean(question && question.context && Number.isInteger(USER && USER.pid) && question.context.brutusMirrorTargetPid === USER.pid);
  panel.classList.toggle('is-brutus-mirror', brutusActive);
}


function renderQuestionActions(question) {
  var host = getQuestionActionsHost();
  if (!host) return;
  host.innerHTML = '';

  var sabotageGroup = null;
  var brutusGroup = null;
  var helpGroup = null;

  if (canUseUltraSabotage(question)) {
    sabotageGroup = document.createElement('div');
    sabotageGroup.className = 'question-action-group question-action-group--sabotage';

    var sabotageButton = document.createElement('button');
    sabotageButton.type = 'button';
    sabotageButton.className = 'question-action-button question-sabotage-button';
    sabotageButton.textContent = 'SZABOTÁZS';
    sabotageButton.addEventListener('click', function () {
      sabotageButton.disabled = true;
      triggerQuestionActionEffect('sabotage');
      socket.emit('activateUltraSabotage');
      var note = element('question-note');
      if (note) {
        note.textContent = 'Szabotázs aktiválva...';
        note.classList.remove('question-note-help');
      }
    });

    var sabotageCounter = document.createElement('div');
    sabotageCounter.className = 'question-action-counter question-sabotage-counter';
    sabotageCounter.textContent = 'MARADÉK: ' + Number(question.context.ultraSabotageRemaining || 0);

    var sabotageArtWrap = document.createElement('div');
    sabotageArtWrap.className = 'question-action-art question-action-art--sabotage';
    var sabotageArt = document.createElement('img');
    sabotageArt.className = 'question-action-art-image';
    sabotageArt.src = QUESTION_SABOTAGE_ART_SRC;
    sabotageArt.alt = 'Szabotázs bohóc';
    sabotageArt.loading = 'lazy';
    sabotageArt.addEventListener('error', function () {
      sabotageArtWrap.style.display = 'none';
    });
    sabotageArtWrap.appendChild(sabotageArt);

    sabotageGroup.appendChild(sabotageButton);
    sabotageGroup.appendChild(sabotageCounter);
    sabotageGroup.appendChild(sabotageArtWrap);
  }


  if (canUseBrutusMirror(question)) {
    brutusGroup = document.createElement('div');
    brutusGroup.className = 'question-action-group question-action-group--brutus';

    var brutusButton = document.createElement('button');
    brutusButton.type = 'button';
    brutusButton.className = 'question-action-button question-brutus-button';
    brutusButton.textContent = 'BRUTUS';
    brutusButton.addEventListener('click', function () {
      brutusButton.disabled = true;
      triggerQuestionActionEffect('brutus');
      socket.emit('activateBrutusMirror');
      var note = element('question-note');
      if (note) {
        note.textContent = 'Brutus aktiválva...';
        note.classList.remove('question-note-help');
      }
    });

    var brutusCounter = document.createElement('div');
    brutusCounter.className = 'question-action-counter question-brutus-counter';
    brutusCounter.textContent = 'MARADÉK: ' + Number(question.context.brutusMirrorRemaining || 0);

    brutusGroup.appendChild(brutusButton);
    brutusGroup.appendChild(brutusCounter);
  }

  if (canUseKozepsuliHelp(question)) {
    helpGroup = document.createElement('div');
    helpGroup.className = 'question-action-group question-action-group--help';

    var helpButton = document.createElement('button');
    helpButton.type = 'button';
    helpButton.className = 'question-action-button question-help-button';
    helpButton.textContent = 'KÖZÉPSULINEKED HELP';
    helpButton.addEventListener('click', function () {
      helpButton.disabled = true;
      triggerQuestionActionEffect('help');
      socket.emit('activateKozepsuliHelp');
      var note = element('question-note');
      if (note) {
        note.textContent = 'KÖZÉPSULINEKED HELP aktiválva...';
        note.classList.add('question-note-help');
      }
    });

    var helpCounter = document.createElement('div');
    helpCounter.className = 'question-action-counter question-help-counter';
    helpCounter.textContent = 'MARADÉK: ' + Number(question.context.kozepsuliHelpRemaining || 0);

    var helpArtWrap = document.createElement('div');
    helpArtWrap.className = 'question-action-art question-action-art--help';
    var helpArt = document.createElement('img');
    helpArt.className = 'question-action-art-image';
    helpArt.src = QUESTION_HELP_ART_SRC;
    helpArt.alt = 'KÖZÉPSULINEKED HELP király';
    helpArt.loading = 'lazy';
    helpArt.addEventListener('error', function () {
      helpArtWrap.style.display = 'none';
    });
    helpArtWrap.appendChild(helpArt);

    helpGroup.appendChild(helpButton);
    helpGroup.appendChild(helpCounter);
    helpGroup.appendChild(helpArtWrap);
  }

  if (sabotageGroup) {
    host.appendChild(sabotageGroup);
  }
  if (brutusGroup) {
    host.appendChild(brutusGroup);
  }
  if (helpGroup) {
    host.appendChild(helpGroup);
  }
}

function getPidDisplayName(pid) {
  var player = getPlayerByPid(pid);
  return player ? getPlayerDisplayName(player) : getPlayerColorName(pid);
}

function showUltraSabotageBanner(payload) {
  var existing = document.getElementById('ultra-sabotage-banner');
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  var banner = document.createElement('div');
  banner.id = 'ultra-sabotage-banner';
  banner.className = 'ultra-sabotage-banner';
  var byName = payload && payload.byName ? payload.byName : getPidDisplayName(payload && payload.byPid);
  var targetName = payload && payload.targetName ? payload.targetName : getPidDisplayName(payload && payload.targetPid);

  if (USER && payload && payload.targetPid === USER.pid) {
    banner.innerHTML = '<strong>ULTRA HARD KÉRDÉST KAPSZ!</strong><span>' + escapeHtml(byName || 'Valaki') + ' megszabotált.</span>';
  } else {
    banner.innerHTML = '<strong>ULTRA HARD KÉRDÉS!</strong><span>' + escapeHtml(targetName || 'Valaki') + ' most ultra nehéz kérdést kapott.</span>';
  }

  document.body.appendChild(banner);
  requestAnimationFrame(function () {
    banner.classList.add('is-visible');
  });

  if (ultraSabotageBannerTimer) {
    clearTimeout(ultraSabotageBannerTimer);
  }
  ultraSabotageBannerTimer = setTimeout(function () {
    banner.classList.remove('is-visible');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 320);
  }, 2600);
}

function showQuestion(question) {
  clearQuestionCountdown();
  clearQuestionUiTimers();
  currentQuestionData = question;
  hasSubmittedCurrentQuestion = false;
  ensureQuestionEnhancementStyles();
  activeQuestionId = question.id;
  questionModal.classList.add('is-open');
  applyQuestionVisualMode(question);








  var canAnswer = Boolean(USER) && question.participants.indexOf(USER.pid) !== -1;
  var body = element('question-body');
  var note = element('question-note');
  var context = element('question-context');
  element('question-prompt').textContent = question.prompt;








  if (question.context && question.context.flow === 'EXPANSION') {
    context.textContent = 'Területszerzés';
  } else if (question.context && question.context.flow === 'BATTLE') {
    context.textContent = question.context.isCastle ? 'Várostrom' : 'Csata';
  } else {
    context.textContent = 'Kérdés';
  }








  note.classList.remove('question-note-help');
  note.textContent = canAnswer ? 'Válaszolj időben. A szerver értékel.' : 'Néző vagy ennél a kérdésnél.';
  if (question.isUltra) {
    note.textContent = canAnswer ? 'ULTRA HARD kérdés aktív. Koncentrálj.' : 'Az egyik játékos ULTRA HARD kérdést kapott.';
  }
  renderQuestionActions(question);








  if (question.type === 'mcq') {
    body.innerHTML = question.options.map(function (option, index) {
      return '<button class="question-option" data-option="' + index + '">' + escapeHtml(option) + '</button>';
    }).join('');








    Array.prototype.slice.call(body.querySelectorAll('.question-option')).forEach(function (button) {
      button.disabled = !canAnswer;
      if (canAnswer) {
        button.addEventListener('click', function () {
          Array.prototype.slice.call(body.querySelectorAll('.question-option')).forEach(function (item) {
            item.disabled = true;
            item.style.opacity = '0.58';
          });
          button.style.opacity = '1';
          button.style.borderColor = '#8d5a29';
          button.style.boxShadow = '0 12px 20px rgba(0,0,0,0.08)';
          hasSubmittedCurrentQuestion = true;
          clearQuestionActions();
          socket.emit('submitAnswer', { questionId: activeQuestionId, selectedIndex: Number(button.getAttribute('data-option')) });
          note.textContent = 'Válasz elküldve. Várjuk a kiértékelést.';
        });
      }
    });
  } else {
    body.innerHTML = [
      '<div class="question-guess-row">',
      '<input id="guess-input" type="number" ' + (canAnswer ? '' : 'disabled') + ' />',
      '<button id="guess-submit" ' + (canAnswer ? '' : 'disabled') + '>Küldés</button>',
      '</div>',
      question.unit ? '<div class="question-unit">Egység: ' + escapeHtml(question.unit) + '</div>' : ''
    ].join('');








    if (canAnswer) {
      element('guess-submit').addEventListener('click', function () {
        var value = Number(element('guess-input').value);
        if (!Number.isFinite(value)) {
          note.textContent = 'Adj meg egy számot.';
          return;
        }
        element('guess-input').disabled = true;
        element('guess-submit').disabled = true;
        hasSubmittedCurrentQuestion = true;
        clearQuestionActions();
        socket.emit('submitAnswer', { questionId: activeQuestionId, guess: value });
        note.textContent = 'Tipp elküldve. Várjuk a kiértékelést.';
      });
    }
  }








  startQuestionCountdown(question.deadline);
  startQuestionTimerSound();
}








function hideQuestion() {
  clearQuestionCountdown();
  clearQuestionUiTimers();
  if (questionRevealTimer) {
    clearTimeout(questionRevealTimer);
    questionRevealTimer = null;
  }
  activeQuestionId = null;
  currentQuestionData = null;
  hasSubmittedCurrentQuestion = false;
  clearQuestionActions();
  applyQuestionVisualMode(null);
  var body = element('question-body');
  if (body) body.classList.remove('is-resolving');
  var note = element('question-note');
  if (note) note.classList.remove('question-note-help');
  questionModal.classList.remove('is-open');
  stopQuestionTimerSound();
  renderAllTerritories();
}








function showQuestionReveal(payload) {
  if (!payload || !payload.revealLines || !payload.revealLines.length) {
    hideQuestion();
    return;
  }
  clearQuestionCountdown();
  stopQuestionTimerSound();
  renderGuessReveal(payload);
}

function startQuestionCountdown(deadline) {
  function render() {
    var remaining = Math.max(0, deadline - Date.now());
    element('question-timer').textContent = 'Hátralévő idő: ' + (remaining / 1000).toFixed(1) + ' mp';
  }
  render();
  questionCountdownInterval = setInterval(render, 100);
}








function clearQuestionCountdown() {
  if (questionCountdownInterval) {
    clearInterval(questionCountdownInterval);
    questionCountdownInterval = null;
  }
}








function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}








function countriesOnEachFeature(feature, layer) {
  mapTerritories.push(layer);
  layer.on({
    click: whenClicked,
    mouseover: function (e) {
      var tid = mapTerritories.indexOf(e.target);
      var baseStyle = buildLayerStyle(tid);
      if (!baseStyle) return;
      var expansionHighlight = getExpansionHighlightState(tid);
      var selectableExpansion = expansionHighlight.selectable;
      var selectableBattle = Boolean(state.game && state.game.phase === 'BATTLE_SELECTION' && state.game.currentplayer === USER.pid && isSelectableAttack(tid));
      if (selectableExpansion || selectableBattle) {
        baseStyle.weight = Math.max(baseStyle.weight || 2, selectableBattle ? 8 : 7);
        baseStyle.fillOpacity = Math.min((baseStyle.fillOpacity || 0.7) + (selectableBattle ? 0.07 : 0.06), 0.98);
        baseStyle.color = selectableBattle ? '#ffe8ad' : '#fff8de';
        e.target.setStyle(baseStyle);
        decorateInteractiveLayer(e.target, baseStyle);
        if (e.target._path && e.target._path.classList) {
          e.target._path.classList.add('territory-selectable-hover');
          if (selectableBattle) e.target._path.classList.add('territory-selectable-battle-hover');
        }
        if (e.target.bringToFront) e.target.bringToFront();
      } else {
        baseStyle.weight = Math.max(baseStyle.weight || 2, 3);
        baseStyle.fillOpacity = Math.min((baseStyle.fillOpacity || 0.7) + 0.03, 0.9);
        e.target.setStyle(baseStyle);
        decorateInteractiveLayer(e.target, baseStyle);
      }
    },
    mouseout: function (e) {
      applyLayerStyle(e.target, mapTerritories.indexOf(e.target));
    }
  });
}

function whenClicked(e) {
  if (gameFinished || !state.game || !USER) {
    return;
  }








  var tid = mapTerritories.indexOf(e.target);
  if (tid < 0) {
    return;
  }








  if (state.game.currentplayer !== USER.pid) {
    setStatus('Most nem te jössz.');
    return;
  }








  if (state.game.phase === 'BASE_SELECTION') {
    playOneShot(soundPlayers.actionClick);
    socket.emit('selectBase', { tid: tid });
    return;
  }








  if (state.game.phase === 'EXPANSION_SELECTION') {
    if (isSelectableExpansion(tid)) {
      playOneShot(soundPlayers.expansionSelectablePick || soundPlayers.actionClick);
    } else {
      playOneShot(soundPlayers.actionClick);
    }
    socket.emit('selectExpansionTarget', { tid: tid });
    return;
  }








  if (state.game.phase === 'BATTLE_SELECTION') {
    playOneShot(soundPlayers.attackEnemyAction);
    socket.emit('selectAttackTarget', { tid: tid });
  }
}








function getOwnerColor(pid) {
  if (pid < 0 || pid >= PLAYER_FILL_COLORS.length) {
    return UNOWNED_FILL;
  }
  return PLAYER_FILL_COLORS[pid];
}








function getOwnerStroke(pid) {
  if (pid < 0 || pid >= PLAYER_STROKE_COLORS.length) {
    return UNOWNED_STROKE;
  }
  return PLAYER_STROKE_COLORS[pid];
}








function hexToRgb(hex) {
  var value = (hex || '').replace('#', '');
  if (value.length === 3) {
    value = value.split('').map(function (part) { return part + part; }).join('');
  }
  var number = parseInt(value, 16);
  if (!Number.isFinite(number)) {
    return { r: 190, g: 190, b: 190 };
  }
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}








function rgba(hex, alpha) {
  var rgb = hexToRgb(hex);
  return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + alpha + ')';
}








function lightenHex(hex, amount) {
  var rgb = hexToRgb(hex);
  var r = Math.round(rgb.r + (255 - rgb.r) * amount);
  var g = Math.round(rgb.g + (255 - rgb.g) * amount);
  var b = Math.round(rgb.b + (255 - rgb.b) * amount);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function mergeClassNames(existing, additions) {
  var classes = {};
  String(existing || '').split(/\s+/).forEach(function (name) {
    if (name) classes[name] = true;
  });
  String(additions || '').split(/\s+/).forEach(function (name) {
    if (name) classes[name] = true;
  });
  return Object.keys(classes).join(' ');
}








function getPlayerByPid(pid) {
  return state.players.find(function (player) { return player.pid === pid; }) || null;
}








function getPlayerDisplayName(player) {
  if (!player) {
    return '—';
  }
  return player.name && player.name !== 'x' ? player.name : (PLAYER_NAMES_FALLBACK[player.pid] || ('P' + player.pid));
}








function getTerritoryByTid(tid) {
  return state.territories.find(function (territory) { return territory.tid === tid; }) || null;
}








function getCastleByTid(tid) {
  return state.castles.find(function (castle) { return castle.tid === tid && castle.active; }) || null;
}








function getExpansionSelectableTargets(pid) {
  var owned = state.territories.filter(function (territory) { return territory.ownsto === pid; });
  var unowned = state.territories.filter(function (territory) { return territory.ownsto === -1; }).map(function (territory) { return territory.tid; });
  if (!owned.length) {
    return { adjacent: [], all: unowned };
  }








  var adjacent = [];
  var seen = {};
  owned.forEach(function (territory) {
    territory.neighbors.forEach(function (neighborTid) {
      var neighbor = getTerritoryByTid(neighborTid);
      if (neighbor && neighbor.ownsto === -1 && !seen[neighborTid]) {
        seen[neighborTid] = true;
        adjacent.push(neighborTid);
      }
    });
  });








  var reserved = (state.game && state.game.reservedTerritories) || [];
  return {
    adjacent: adjacent.filter(function (tid) { return reserved.indexOf(tid) === -1; }),
    all: unowned.filter(function (tid) { return reserved.indexOf(tid) === -1; }),
  };
}








function getAttackableTargets(pid) {
  var seen = {};
  var targets = [];
  state.territories.forEach(function (territory) {
    if (territory.ownsto !== pid) return;
    territory.neighbors.forEach(function (neighborTid) {
      var neighbor = getTerritoryByTid(neighborTid);
      if (!neighbor) return;
      if (neighbor.ownsto >= 0 && neighbor.ownsto !== pid && !seen[neighborTid]) {
        seen[neighborTid] = true;
        targets.push(neighborTid);
      }
    });
  });
  return targets;
}








function isSelectableBase(tid) {
  var territory = getTerritoryByTid(tid);
  if (!territory || territory.ownsto !== -1) return false;
  return !state.castles.some(function (castle) {
    if (!castle.active) return false;
    var castleTerritory = getTerritoryByTid(castle.tid);
    return castleTerritory && castleTerritory.neighbors.indexOf(tid) !== -1;
  });
}








function isSelectableExpansion(tid) {
  if (!USER) return false;
  var selection = getExpansionSelectableTargets(USER.pid);
  if (selection.adjacent.length) {
    return selection.adjacent.indexOf(tid) !== -1;
  }
  return selection.all.indexOf(tid) !== -1;
}








function isSelectableAttack(tid) {
  if (!USER) return false;
  return getAttackableTargets(USER.pid).indexOf(tid) !== -1;
}

function getExpansionHighlightState(tid) {
  if (!state.game || !USER || state.game.phase !== 'EXPANSION_SELECTION' || state.game.currentplayer !== USER.pid) {
    return { selectable: false, adjacentSelectable: false, fallbackSelectable: false, adjacentCount: 0 };
  }
  var selection = getExpansionSelectableTargets(USER.pid);
  var adjacentSelectable = selection.adjacent.indexOf(tid) !== -1;
  var fallbackSelectable = !selection.adjacent.length && selection.all.indexOf(tid) !== -1;
  return {
    selectable: adjacentSelectable || fallbackSelectable,
    adjacentSelectable: adjacentSelectable,
    fallbackSelectable: fallbackSelectable,
    adjacentCount: selection.adjacent.length
  };
}








function buildLayerStyle(tid) {
  var territory = getTerritoryByTid(tid);
  if (!territory) return null;

  var castle = getCastleByTid(tid);
  var ownerFill = territory.ownsto >= 0 ? getOwnerColor(territory.ownsto) : UNOWNED_FILL;
  var ownerStroke = territory.ownsto >= 0 ? getOwnerStroke(territory.ownsto) : UNOWNED_STROKE;

  var style = {
    weight: castle ? 3.2 : (territory.ownsto >= 0 ? 1.85 : 1.35),
    opacity: territory.ownsto >= 0 ? 0.98 : 0.84,
    color: ownerStroke,
    dashArray: territory.ownsto >= 0 ? '' : '4 5',
    fillOpacity: territory.ownsto >= 0 ? 0.34 : 0.18,
    fillColor: ownerFill,
    className: mergeClassNames('', [
      'territory-terrain-wash',
      territory.ownsto >= 0 ? ('territory-owned territory-player-' + territory.ownsto) : 'territory-neutral',
      castle ? 'territory-has-castle' : ''
    ].join(' '))
  };

  var isCurrentTurn = !gameFinished && state.game && USER && state.game.currentplayer === USER.pid;
  if (isCurrentTurn && state.game.phase === 'BASE_SELECTION' && isSelectableBase(tid)) {
    style.weight = 4.1;
    style.color = '#f1dbac';
    style.fillColor = lightenHex(ownerFill, 0.16);
    style.fillOpacity = 0.42;
    style.dashArray = '';
    style.className = mergeClassNames(style.className, 'territory-selectable territory-elevated territory-base-choice');
  }

  if (isCurrentTurn && state.game.phase === 'EXPANSION_SELECTION') {
    var expansionHighlight = getExpansionHighlightState(tid);
    var isUnowned = territory.ownsto === -1;

    if (expansionHighlight.selectable) {
      style.weight = expansionHighlight.adjacentSelectable ? 5.8 : 4.8;
      style.color = expansionHighlight.adjacentSelectable ? '#fff4cf' : '#def6d8';
      style.fillColor = expansionHighlight.adjacentSelectable
        ? lightenHex(getOwnerColor(USER.pid), 0.22)
        : lightenHex(getOwnerColor(USER.pid), 0.12);
      style.fillOpacity = expansionHighlight.adjacentSelectable ? 0.54 : 0.44;
      style.dashArray = '';
      style.className = mergeClassNames(style.className, expansionHighlight.adjacentSelectable
        ? 'territory-selectable territory-selectable-adjacent territory-elevated'
        : 'territory-selectable territory-selectable-fallback territory-elevated');
    } else if (isUnowned) {
      style.weight = 1.5;
      style.color = 'rgba(111,84,58,0.58)';
      style.fillColor = expansionHighlight.adjacentCount ? 'rgba(150,124,88,0.40)' : rgba(UNOWNED_FILL, 0.62);
      style.fillOpacity = expansionHighlight.adjacentCount ? 0.16 : 0.14;
      style.dashArray = '3 5';
      style.className = mergeClassNames(style.className, 'territory-unselectable');
    }
  }

  var napoleonEuropeActive = state.game && Number.isInteger(state.game.napoleonEuropeOwnerPid) && Array.isArray(state.game.napoleonEuropeTerritoryTids) && state.game.napoleonEuropeTerritoryTids.indexOf(tid) !== -1;
  if (napoleonEuropeActive) {
    style.weight = Math.max(style.weight, 4.4);
    style.color = '#a8dcff';
    style.fillColor = territory.ownsto >= 0 ? '#5d81d0' : '#4966ad';
    style.fillOpacity = territory.ownsto >= 0 ? 0.4 : 0.26;
    style.className = mergeClassNames(style.className, 'territory-napoleon-europe');
  }

  if (isCurrentTurn && state.game.phase === 'BATTLE_SELECTION' && isSelectableAttack(tid)) {
    style.weight = 5.9;
    style.color = '#ffe3a8';
    style.fillColor = lightenHex(getOwnerColor(USER.pid), 0.16);
    style.fillOpacity = 0.5;
    style.dashArray = '';
    style.className = mergeClassNames(style.className, 'territory-selectable territory-selectable-battle territory-elevated');
  }

  return style;
}







function decorateInteractiveLayer(layer, style) {
  if (!layer || !style || !layer._path) return;
  layer._path.style.fillRule = 'evenodd';
}







function applyLayerStyle(layer, tid) {
  var territory = getTerritoryByTid(tid);
  if (!territory) return;








  var castle = getCastleByTid(tid);
  var style = buildLayerStyle(tid);
  if (!style) return;








  layer.setStyle(style);
  decorateInteractiveLayer(layer, style);
  if (layer._path && layer._path.classList) {
    layer._path.classList.remove(
      'territory-selectable',
      'territory-selectable-adjacent',
      'territory-selectable-fallback',
      'territory-selectable-battle',
      'territory-selectable-hover',
      'territory-selectable-battle-hover',
      'territory-elevated',
      'territory-unselectable',
      'territory-napoleon-europe'
    );
    if (style.className) {
      style.className.split(/\s+/).forEach(function (name) {
        if (name) layer._path.classList.add(name);
      });
    }
  }
  if (style.className && style.className.indexOf('territory-selectable') !== -1 && layer.bringToFront) {
    layer.bringToFront();
  }








  var owner = getPlayerByPid(territory.ownsto);
  var label = buildTerritoryOverlayHtml(tid);
  if (layer.getTooltip()) {
    layer.unbindTooltip();
  }
  if (label) {
    layer.bindTooltip(label, {
      permanent: true,
      direction: 'center',
      className: 'countryLabel castle-label ' + 'countryLabel' + (territory.ownsto >= 0 ? territory.ownsto : 0)
    });
  }








}








function renderAllTerritories() {
  mapTerritories.forEach(function (layer, tid) {
    applyLayerStyle(layer, tid);
  });
  if (topoMapEngine) topoMapEngine.scheduleRedraw();
}








function getCurrentPhaseGroup() {
  if (!state.game || !state.game.phase) return 'WAIT';
  if (state.game.phase === 'BASE_SELECTION') return 'BASE';
  if (state.game.phase === 'CHARACTER_SELECTION') return 'CHAR';
  if (state.game.phase.indexOf('EXPANSION') === 0) return 'EXPANSION';
  if (state.game.phase.indexOf('BATTLE') === 0) return 'BATTLE';
  if (state.game.phase === 'FINISHED') return 'FINISHED';
  return 'WAIT';
}








function renderPlayerCards() {
  var html = state.players
    .slice()
    .sort(function (a, b) { return a.pid - b.pid; })
    .map(function (player) {
      var castle = state.castles.find(function (item) { return item.pid === player.pid && item.active; });
      var classes = ['player-card', 'player-card-sword'];
      if (USER && USER.pid === player.pid) classes.push('is-me');
      if (state.game && state.game.currentplayer === player.pid) classes.push('is-turn');
      if (!player.connected && !player.eliminated) classes.push('is-offline');
      if (player.eliminated) classes.push('is-eliminated');








      var status = 'aktív';
      if (player.eliminated) status = 'kiesett';
      else if (!player.connected) status = 'offline';
      else if (state.game && state.game.currentplayer === player.pid) status = 'soron van';








      var castleTowers = castle ? castle.hp : 0;








      return [
        '<div class="' + classes.join(' ') + '">',
        '<div class="player-card-accent" style="background:' + getOwnerColor(player.pid) + ';"></div>',
        '<div class="player-card-gem" style="background:' + getOwnerColor(player.pid) + ';"></div>',
        '<div class="player-card-body">',
        '<div class="player-name-row">',
        '<div class="player-name">' + escapeHtml(getPlayerDisplayName(player)) + '</div>',
        '<div class="player-sub">' + escapeHtml(status) + '</div>',
        '</div>',
        '<div class="player-mini-stats">',
        '<span class="player-mini-stat player-mini-stat--score"><strong>' + player.score + '</strong><em>PONT</em>' + (getActiveScoreDelta(player.pid) ? ('<span class="player-score-delta ' + (getActiveScoreDelta(player.pid).value > 0 ? 'is-positive' : 'is-negative') + '">' + (getActiveScoreDelta(player.pid).value > 0 ? '+' : '') + getActiveScoreDelta(player.pid).value + '</span>') : '') + '</span>',
        '<span class="player-mini-stat"><strong>' + player.territories.length + '</strong><em>TER.</em></span>',
        '<span class="player-mini-stat"><strong>' + castleTowers + '</strong><em>TORONY</em></span>',
        '</div>',
        '</div>',
        '</div>'
      ].join('');
    })
    .join('');








  playercards.innerHTML = html;
}








function renderPhaseBoard() {
  if (!state.game) {
    phaseboard.innerHTML = '';
    return;
  }








  var phaseGroup = getCurrentPhaseGroup();
  var title = 'Várakozás';
  var subtitle = 'A meccs előkészítése folyamatban.';








  if (state.game.phase === 'CHARACTER_SELECTION') {
    title = 'Karakterválasztás';
    subtitle = 'Piros, zöld, majd fehér választ.';
  } else if (phaseGroup === 'BASE') {
    title = 'Bázisfoglalás';
    subtitle = 'Mindenki kijelöli a saját kezdő várát.';
  } else if (phaseGroup === 'EXPANSION') {
    title = 'Területfoglalás';
    subtitle = 'Foglalási kör: ' + Math.max(1, state.game.expansionRound || 1) + '/6';
  } else if (phaseGroup === 'BATTLE') {
    title = 'Csata';
    subtitle = 'Csatakör: ' + Math.max(1, state.game.battleRound || 1) + '/6';
  } else if (phaseGroup === 'FINISHED') {
    title = 'Vége';
    subtitle = 'A meccs lezárult.';
  }








  phaseboard.innerHTML = [
    '<div class="phase-compact">',
    '<div class="phase-compact-title">' + escapeHtml(title) + '</div>',
    '<div class="phase-compact-sub">' + escapeHtml(subtitle) + '</div>',
    '</div>'
  ].join('');
}








function getPermutations(arr) {
  var result = [];
  function permute(prefix, rest) {
    if (!rest.length) {
      result.push(prefix);
      return;
    }
    for (var i = 0; i < rest.length; i++) {
      permute(prefix.concat(rest[i]), rest.slice(0, i).concat(rest.slice(i + 1)));
    }
  }
  permute([], arr.slice());
  return result;
}








function renderOrderBoard() {
  if (!state.game) {
    orderboard.innerHTML = '';
    ordermeta.innerHTML = '';
    ordersummary.innerHTML = '';
    return;
  }








  var orderedPlayers = state.players.slice().sort(function (a, b) { return a.pid - b.pid; }).map(function (player) { return player.pid; });
  var orders = getPermutations(orderedPlayers);
  var currentOrderKey = (state.game.currentOrder || []).join('-');
  var currentIndex = orders.findIndex(function (order) { return order.join('-') === currentOrderKey; });
  var phaseGroup = getCurrentPhaseGroup();
  var roundNumber = phaseGroup === 'BATTLE' ? (state.game.battleRound || 0) : (state.game.expansionRound || 0);
  var phaseRound = Math.max(1, roundNumber || 1);








  ordermeta.textContent = phaseGroup === 'BATTLE' ? ('Csata • ' + phaseRound + '/6') : (phaseGroup === 'EXPANSION' ? ('Foglalás • ' + phaseRound + '/6') : 'Sorrendciklus');
  ordersummary.textContent = currentIndex >= 0 ? ('Aktív sor: ' + (currentIndex + 1) + '/6') : 'Aktív sor: —';








  orderboard.innerHTML = '<div class="cycle-board">' + orders.map(function (order, rowIndex) {
    var isCurrent = rowIndex === currentIndex;
    return [
      '<div class="cycle-row ' + (isCurrent ? 'is-current' : '') + '">',
      '<div class="cycle-arrow">' + (isCurrent ? '➜' : '') + '</div>',
      '<div class="cycle-dots">',
      order.map(function (pid) {
        var player = getPlayerByPid(pid);
        var label = player ? getPlayerDisplayName(player).charAt(0).toUpperCase() : '';
        return '<span class="cycle-dot ' + (isCurrent && state.game.currentplayer === pid ? 'is-turn' : '') + '" style="background:' + getOwnerColor(pid) + '" title="' + escapeHtml(getPlayerDisplayName(player)) + '">' + escapeHtml(label) + '</span>';
      }).join(''),
      '</div>',
      '</div>'
    ].join('');
  }).join('') + '</div>';
}








function renderStatus() {
  if (!state.game) return;








  var current = getPlayerByPid(state.game.currentplayer);








  if (gameFinished) {
    return;
  }








  if (!USER) {
    setStatus('A saját játékosprofil szinkronizálása folyamatban.');
    return;
  }








  if (state.game.phase === 'WAITING_FOR_PLAYERS') {
    setStatus('Várakozás a játékosokra.');
  } else if (state.game.phase === 'BASE_SELECTION') {
    setStatus(state.game.currentplayer === USER.pid ? 'Te választasz bázist. Kattints egy érvényes üres mezőre.' : 'Most más választ bázist.');
  } else if (state.game.phase === 'CHARACTER_SELECTION') {
    setStatus(state.game.currentplayer === USER.pid ? 'Te választasz karaktert.' : 'Most más választ karaktert.');
  } else if (state.game.phase === 'EXPANSION_SELECTION') {
    var selectable = getExpansionSelectableTargets(USER.pid);
    var canChooseAny = selectable.adjacent.length === 0;
    var pendingSelection = state.game && state.game.pendingSelections ? state.game.pendingSelections[USER.pid] : null;
    var alreadyChosen = Array.isArray(pendingSelection)
      ? pendingSelection.length
      : (pendingSelection != null ? 1 : 0);
    var requiredSelections = state.game && state.game.expansionSelectionsPerTurn ? state.game.expansionSelectionsPerTurn : 2;
    if (state.game.currentplayer === USER.pid) {
      if (requiredSelections > 1) {
        setStatus(canChooseAny
          ? 'Te jössz. Válassz KETTŐ területet. Nincs szomszédos üres meződ, ezért bármelyik szabad mezőt választhatod.'
          : ('Te jössz. Válassz KETTŐ területet a területszerzéshez.' + (alreadyChosen > 0 ? ' Már kijelöltél ' + alreadyChosen + '/2 területet.' : '')));
      } else {
        setStatus(canChooseAny
          ? 'Te jössz. Nincs szomszédos üres meződ, ezért bármelyik szabad mezőt választhatod.'
          : 'Te jössz. Válassz egy szomszédos üres mezőt a területszerzéshez.');
      }
    } else {
      setStatus('Most más választ foglalási célpontot.');
    }
  } else if (state.game.phase === 'EXPANSION_QUESTION') {
    setStatus('Közös foglalási kérdés fut.');
  } else if (state.game.phase === 'BATTLE_SELECTION') {
    setStatus(state.game.currentplayer === USER.pid ? 'Te támadsz. A halványan kiemelt területek támadhatók.' : 'Most más támad.');
  } else if (state.game.phase === 'BATTLE_QUESTION') {
    setStatus('Csatakérdés fut.');
  } else if (state.game.phase === 'FINISHED') {
    setStatus('A meccs véget ért.');
  }
}









function renderKossuthAction() {
  var tray = document.getElementById('character-tray');
  if (!tray) return;
  Array.prototype.slice.call(tray.querySelectorAll('.character-tray-action')).forEach(function (button) {
    if (button && button.parentNode) button.parentNode.removeChild(button);
  });
}

function renderHUD() {
  renderPlayerCards();
  renderPhaseBoard();
  renderOrderBoard();
  renderStatus();
  syncCharacterUi();
  renderKossuthAction();
}








function setStatus(text) {
  gamestatus.textContent = text;
}








function showPhaseSplash(title) {
  if (!phaseSplash || !phaseSplashTitle) return;
  clearTimeout(phaseSplashTimer);
  phaseSplashTitle.textContent = title;
  phaseSplash.classList.add('is-visible');
  phaseSplashTimer = setTimeout(function () {
    phaseSplash.classList.remove('is-visible');
  }, 1800);
}








function maybeShowPhaseSplash() {
  var phaseGroup = getCurrentPhaseGroup();
  if (!phaseGroup || phaseGroup === 'WAIT' || phaseGroup === 'FINISHED') {
    return;
  }
  if (phaseGroup === lastPhaseGroupShown) {
    return;
  }
  lastPhaseGroupShown = phaseGroup;
  if (state.game.phase === 'CHARACTER_SELECTION') {
    title = 'Karakterválasztás';
    subtitle = 'Piros, zöld, majd fehér választ.';
  } else if (phaseGroup === 'BASE') {
    showPhaseSplash('BÁZISFOGLALÁS');
    queueUiTimer(function () {
      showOwnColorBanner();
    }, 450);
  }
  if (phaseGroup === 'EXPANSION') showPhaseSplash('TERÜLETFOGLALÁS');
  if (phaseGroup === 'BATTLE') showPhaseSplash('CSATA');
  playPopupPhaseVoice(phaseGroup);
}








function showWinnerModal(winner) {
  if (!winnerModal || !winnerTitle || !winnerSubtitle) return;
  winnerTitle.textContent = winner ? (getPlayerDisplayName(winner) + ' nyert!') : 'A meccs véget ért';
  winnerSubtitle.textContent = winner && USER && winner.pid === USER.pid
    ? 'Gratulálok, te győztél.'
    : (winner ? ('Győztes: ' + getPlayerDisplayName(winner)) : 'A győztes nem ismert.');
  winnerModal.classList.add('is-visible');
}








function finishGame(winnerPid) {
  gameFinished = true;
  hideQuestion();
  var winner = getPlayerByPid(winnerPid);
  setStatus(winner && USER && winner.pid === USER.pid ? 'Megnyerted a meccset.' : 'A meccs véget ért. Győztes: ' + (winner ? getPlayerDisplayName(winner) : 'ismeretlen'));
  renderAllTerritories();
  renderHUD();
  syncBackgroundMusic();
  showWinnerModal(winner);
}








function onStateSnapshot(payload) {
  var previousState = state;
  state = payload;
  USER = state.players.find(function (player) { return player.name === username; }) || null;
  updateScoreDeltas(previousState && previousState.players, state.players);
  maybePlayTerritoryCaptureSound(previousState, state);
  applyNapoleonEuropeState();
  soundState.lastSnapshotSeen = true;
  renderAllTerritories();
  renderHUD();
  maybeShowPhaseSplash();
  syncBackgroundMusic();
  if (state.game && state.game.phase === 'FINISHED' && !gameFinished) {
    finishGame(state.game.winner);
  }
}








var TOPO_RIDGE_CHAINS = [
  { lat: 42.7, lng: -0.3, sxDeg: 3.6, syDeg: 0.52, angle: -10, amp: 0.92 },
  { lat: 46.45, lng: 10.4, sxDeg: 6.6, syDeg: 0.78, angle: 18, amp: 1.48 },
  { lat: 44.9, lng: 7.4, sxDeg: 2.8, syDeg: 0.52, angle: 12, amp: 0.58 },
  { lat: 42.75, lng: 13.1, sxDeg: 4.8, syDeg: 0.42, angle: 30, amp: 0.82 },
  { lat: 47.0, lng: 24.2, sxDeg: 7.3, syDeg: 0.72, angle: 32, amp: 1.16 },
  { lat: 45.0, lng: 17.9, sxDeg: 4.9, syDeg: 0.44, angle: 38, amp: 0.76 },
  { lat: 42.6, lng: 24.2, sxDeg: 4.6, syDeg: 0.54, angle: 12, amp: 0.68 },
  { lat: 63.1, lng: 13.8, sxDeg: 11.2, syDeg: 0.95, angle: 18, amp: 1.22 },
  { lat: 57.2, lng: -4.6, sxDeg: 2.8, syDeg: 0.82, angle: 18, amp: 0.54 },
  { lat: 45.4, lng: 3.0, sxDeg: 2.7, syDeg: 1.25, angle: 2, amp: 0.4 },
  { lat: 40.8, lng: -3.8, sxDeg: 5.0, syDeg: 1.28, angle: -12, amp: 0.36 },
  { lat: 67.2, lng: 18.6, sxDeg: 5.8, syDeg: 0.72, angle: 24, amp: 0.46 }
];

var TOPO_RIVERS = [
  { width: 2.4, points: [[48.08, 8.23], [49.0, 8.6], [49.8, 8.9], [50.2, 7.6], [51.0, 6.9], [51.86, 4.3]] },
  { width: 2.5, points: [[47.3, 8.0], [48.1, 9.6], [48.7, 12.1], [48.2, 16.3], [47.5, 19.1], [47.1, 21.7], [45.25, 28.7]] },
  { width: 2.3, points: [[46.2, 6.8], [45.9, 4.8], [45.75, 4.85], [44.0, 4.8], [43.3, 4.8], [43.0, 4.8]] },
  { width: 2.2, points: [[55.75, 37.6], [56.5, 40.4], [56.9, 44.5], [55.7, 49.1], [53.2, 50.15], [48.7, 44.5], [46.7, 48.0]] }
];

function createTopographicMapEngine(mapInstance) {
  var featureCollection = null;
  var baseCanvas = null;
  var detailCanvas = null;
  var baseCtx = null;
  var detailCtx = null;
  var listenersBound = false;
  var redrawScheduled = false;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function createPane(name, zIndex) {
    var pane = mapInstance.getPane(name);
    if (!pane) pane = mapInstance.createPane(name);
    if (pane.classList) pane.classList.add(name);
    pane.style.zIndex = String(zIndex);
    pane.style.pointerEvents = 'none';
    return pane;
  }

  function createCanvas(pane, className) {
    var canvas = pane.querySelector('.' + className);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = className + ' topo-canvas';
      pane.appendChild(canvas);
    }
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    return canvas;
  }

  function ensureCanvases() {
    if (baseCanvas && detailCanvas) return;
    var basePane = createPane('topoBasePane', 330);
    var detailPane = createPane('topoDetailPane', 410);
    baseCanvas = createCanvas(basePane, 'topo-base-canvas');
    detailCanvas = createCanvas(detailPane, 'topo-detail-canvas');
    baseCtx = baseCanvas.getContext('2d', { alpha: true });
    detailCtx = detailCanvas.getContext('2d', { alpha: true });
  }

  function bindListeners() {
    if (listenersBound) return;
    listenersBound = true;
    mapInstance.on('zoomend moveend resize viewreset', scheduleRedraw);
  }

  function setCanvasSize(canvas, size) {
    if (canvas.width !== size.x || canvas.height !== size.y) {
      canvas.width = size.x;
      canvas.height = size.y;
    }
    canvas.style.width = size.x + 'px';
    canvas.style.height = size.y + 'px';
  }

  function alignCanvas(canvas) {
    L.DomUtil.setPosition(canvas, mapInstance.containerPointToLayerPoint([0, 0]));
  }

  function project(lat, lng) {
    var point = mapInstance.latLngToContainerPoint([lat, lng]);
    return { x: point.x, y: point.y };
  }

  function buildLandPath() {
    var path = new Path2D();
    if (!featureCollection || !featureCollection.features) return path;

    function drawRing(ring) {
      if (!ring || !ring.length) return;
      for (var i = 0; i < ring.length; i++) {
        var point = mapInstance.latLngToContainerPoint([ring[i][1], ring[i][0]]);
        if (i === 0) path.moveTo(point.x, point.y);
        else path.lineTo(point.x, point.y);
      }
      path.closePath();
    }

    featureCollection.features.forEach(function (feature) {
      if (!feature || !feature.geometry) return;
      var geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        geometry.coordinates.forEach(drawRing);
      } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach(function (polygon) {
          polygon.forEach(drawRing);
        });
      }
    });

    return path;
  }

  function hash2(x, y) {
    var seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return seed - Math.floor(seed);
  }

  function valueNoise(x, y) {
    var xi = Math.floor(x);
    var yi = Math.floor(y);
    var xf = x - xi;
    var yf = y - yi;
    var h00 = hash2(xi, yi);
    var h10 = hash2(xi + 1, yi);
    var h01 = hash2(xi, yi + 1);
    var h11 = hash2(xi + 1, yi + 1);
    var u = smoothstep(xf);
    var v = smoothstep(yf);
    return lerp(lerp(h00, h10, u), lerp(h01, h11, u), v);
  }

  function fbm(x, y) {
    var total = 0;
    var amplitude = 0.55;
    var frequency = 1;
    for (var i = 0; i < 4; i++) {
      total += amplitude * valueNoise(x * frequency, y * frequency);
      amplitude *= 0.5;
      frequency *= 2;
    }
    return total;
  }

  function degScaleAt(lat, lng) {
    var center = mapInstance.latLngToContainerPoint([lat, lng]);
    var x1 = mapInstance.latLngToContainerPoint([lat, lng + 1]);
    var y1 = mapInstance.latLngToContainerPoint([lat + 1, lng]);
    return {
      pxPerLng: Math.max(1, Math.abs(x1.x - center.x)),
      pxPerLat: Math.max(1, Math.abs(y1.y - center.y))
    };
  }

  function buildRidgesPx() {
    return TOPO_RIDGE_CHAINS.map(function (ridge) {
      var point = project(ridge.lat, ridge.lng);
      var scale = degScaleAt(ridge.lat, ridge.lng);
      return {
        x: point.x,
        y: point.y,
        sx: Math.max(20, ridge.sxDeg * scale.pxPerLng),
        sy: Math.max(10, ridge.syDeg * scale.pxPerLat),
        angle: ridge.angle * Math.PI / 180,
        amp: ridge.amp
      };
    });
  }

  function ridgeContribution(x, y, ridge) {
    var dx = x - ridge.x;
    var dy = y - ridge.y;
    var ca = Math.cos(ridge.angle);
    var sa = Math.sin(ridge.angle);
    var u = dx * ca + dy * sa;
    var v = -dx * sa + dy * ca;
    return ridge.amp * Math.exp(-((u * u) / (2 * ridge.sx * ridge.sx) + (v * v) / (2 * ridge.sy * ridge.sy)));
  }

  function sampleElevation(x, y, ridgesPx) {
    var elevation = 0;
    for (var i = 0; i < ridgesPx.length; i++) {
      elevation += ridgeContribution(x, y, ridgesPx[i]);
    }
    var macro = fbm(x * 0.0032, y * 0.0032) - 0.5;
    var medium = fbm((x + macro * 48) * 0.0066, (y - macro * 48) * 0.0066) - 0.5;
    var micro = fbm(x * 0.0125, y * 0.0125) - 0.5;
    elevation += macro * 0.26;
    elevation += medium * 0.18;
    elevation += micro * 0.08;
    return Math.max(0, elevation);
  }

  function marchingSegments(v0, v1, v2, v3, level, x, y, step) {
    var index = 0;
    if (v0 > level) index |= 1;
    if (v1 > level) index |= 2;
    if (v2 > level) index |= 4;
    if (v3 > level) index |= 8;
    if (index === 0 || index === 15) return [];

    function interp(a, b) {
      var delta = b - a;
      if (Math.abs(delta) < 1e-6) return 0.5;
      return (level - a) / delta;
    }

    var topT = interp(v0, v1);
    var rightT = interp(v1, v2);
    var bottomT = interp(v3, v2);
    var leftT = interp(v0, v3);

    var ptTop = [x + step * topT, y];
    var ptRight = [x + step, y + step * rightT];
    var ptBottom = [x + step * bottomT, y + step];
    var ptLeft = [x, y + step * leftT];

    var table = {
      1: [[ptLeft, ptTop]],
      2: [[ptTop, ptRight]],
      3: [[ptLeft, ptRight]],
      4: [[ptRight, ptBottom]],
      5: [[ptLeft, ptBottom], [ptTop, ptRight]],
      6: [[ptTop, ptBottom]],
      7: [[ptLeft, ptBottom]],
      8: [[ptBottom, ptLeft]],
      9: [[ptTop, ptBottom]],
      10: [[ptTop, ptLeft], [ptRight, ptBottom]],
      11: [[ptRight, ptBottom]],
      12: [[ptLeft, ptRight]],
      13: [[ptTop, ptRight]],
      14: [[ptLeft, ptTop]]
    };

    return table[index] || [];
  }

  function drawBathymetry(ctx, landPath) {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    var widths = [56, 34, 20, 10];
    var colors = [
      'rgba(116, 166, 176, 0.070)',
      'rgba(146, 195, 202, 0.090)',
      'rgba(187, 219, 225, 0.115)',
      'rgba(228, 243, 244, 0.095)'
    ];
    for (var i = 0; i < widths.length; i++) {
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = widths[i];
      ctx.strokeStyle = colors[i];
      ctx.stroke(landPath);
    }
    ctx.restore();
  }

  function drawLandBase(ctx, landPath, ridgesPx, size) {
    ctx.save();
    ctx.clip(landPath);

    var ground = ctx.createLinearGradient(0, 0, size.x, size.y);
    ground.addColorStop(0, 'rgba(190, 182, 132, 0.92)');
    ground.addColorStop(0.36, 'rgba(176, 168, 120, 0.94)');
    ground.addColorStop(0.72, 'rgba(163, 151, 111, 0.96)');
    ground.addColorStop(1, 'rgba(152, 138, 102, 0.98)');
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, size.x, size.y);

    var shadeStep = 10;
    for (var y = 0; y < size.y; y += shadeStep) {
      for (var x = 0; x < size.x; x += shadeStep) {
        var elevation = sampleElevation(x, y, ridgesPx);
        var dx = sampleElevation(x + 3, y, ridgesPx) - sampleElevation(x - 3, y, ridgesPx);
        var dy = sampleElevation(x, y + 3, ridgesPx) - sampleElevation(x, y - 3, ridgesPx);
        var light = clamp(0.56 + (-dx * 0.96 - dy * 0.72), 0, 1);
        var height = clamp(elevation * 0.74, 0, 1);
        var r = Math.round(154 + height * 54 + light * 22);
        var g = Math.round(144 + height * 46 + light * 18);
        var b = Math.round(104 + height * 30 + light * 10);
        var alpha = clamp(0.20 + height * 0.18 + light * 0.03, 0.18, 0.42);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
        ctx.fillRect(x, y, shadeStep + 1, shadeStep + 1);
      }
    }

    ctx.globalAlpha = 0.065;
    for (var gy = 0; gy < size.y; gy += 12) {
      for (var gx = 0; gx < size.x; gx += 12) {
        var grain = fbm(gx * 0.035, gy * 0.035);
        var shade = Math.round(90 + grain * 65);
        ctx.fillStyle = 'rgb(' + shade + ',' + Math.round(shade * 0.95) + ',' + Math.round(shade * 0.78) + ')';
        ctx.fillRect(gx, gy, 4, 4);
      }
    }
    ctx.restore();
  }

  function drawContours(ctx, landPath, ridgesPx, size) {
    ctx.save();
    ctx.clip(landPath);

    var step = 18;
    var gridW = Math.ceil(size.x / step) + 1;
    var gridH = Math.ceil(size.y / step) + 1;
    var grid = new Array(gridH);
    for (var gy = 0; gy < gridH; gy++) {
      grid[gy] = new Array(gridW);
      for (var gx = 0; gx < gridW; gx++) {
        grid[gy][gx] = sampleElevation(gx * step, gy * step, ridgesPx);
      }
    }

    var levels = [0.12, 0.18, 0.25, 0.33, 0.43, 0.56, 0.72, 0.9, 1.1, 1.32];
    levels.forEach(function (level, index) {
      ctx.beginPath();
      for (var gy = 0; gy < gridH - 1; gy++) {
        for (var gx = 0; gx < gridW - 1; gx++) {
          var x = gx * step;
          var y = gy * step;
          var v0 = grid[gy][gx];
          var v1 = grid[gy][gx + 1];
          var v2 = grid[gy + 1][gx + 1];
          var v3 = grid[gy + 1][gx];
          var segments = marchingSegments(v0, v1, v2, v3, level, x, y, step);
          for (var i = 0; i < segments.length; i++) {
            ctx.moveTo(segments[i][0][0], segments[i][0][1]);
            ctx.lineTo(segments[i][1][0], segments[i][1][1]);
          }
        }
      }
      ctx.lineWidth = index % 3 === 0 ? 1.14 : 0.72;
      ctx.strokeStyle = index % 3 === 0 ? 'rgba(84, 68, 42, 0.30)' : 'rgba(84, 68, 42, 0.18)';
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawRidgeHachures(ctx, landPath, ridgesPx) {
    ctx.save();
    ctx.clip(landPath);
    ridgesPx.forEach(function (ridge) {
      var tangentX = Math.cos(ridge.angle);
      var tangentY = Math.sin(ridge.angle);
      var normalX = -Math.sin(ridge.angle);
      var normalY = Math.cos(ridge.angle);
      for (var t = -0.82; t <= 0.82; t += 0.16) {
        var centerX = ridge.x + tangentX * ridge.sx * 0.68 * t;
        var centerY = ridge.y + tangentY * ridge.sx * 0.68 * t;
        var length = ridge.sy * (0.86 - Math.abs(t) * 0.45);
        ctx.beginPath();
        ctx.moveTo(centerX - normalX * length * 0.55, centerY - normalY * length * 0.55);
        ctx.lineTo(centerX + normalX * length * 0.55, centerY + normalY * length * 0.55);
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(248, 241, 216, 0.14)';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX - normalX * length * 0.35, centerY - normalY * length * 0.35);
        ctx.lineTo(centerX + normalX * length * 0.35, centerY + normalY * length * 0.35);
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = 'rgba(69, 53, 32, 0.10)';
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  function drawRivers(ctx, landPath) {
    ctx.save();
    ctx.clip(landPath);
    TOPO_RIVERS.forEach(function (river) {
      ctx.beginPath();
      river.points.forEach(function (point, index) {
        var projected = project(point[0], point[1]);
        if (index === 0) ctx.moveTo(projected.x, projected.y);
        else ctx.lineTo(projected.x, projected.y);
      });
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = river.width + 1.6;
      ctx.strokeStyle = 'rgba(233, 242, 246, 0.16)';
      ctx.stroke();
      ctx.lineWidth = river.width;
      ctx.strokeStyle = 'rgba(99, 125, 134, 0.30)';
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawCoastEmboss(ctx, landPath) {
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(245, 225, 176, 0.12)';
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'rgba(48, 38, 26, 0.12)';
    ctx.stroke(landPath);
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2.1;
    ctx.strokeStyle = 'rgba(255, 246, 216, 0.20)';
    ctx.stroke(landPath);
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = 'rgba(79, 63, 42, 0.28)';
    ctx.stroke(landPath);
    ctx.restore();
  }

  function redraw() {
    if (!featureCollection) return;
    ensureCanvases();
    bindListeners();

    var size = mapInstance.getSize();
    setCanvasSize(baseCanvas, size);
    setCanvasSize(detailCanvas, size);
    alignCanvas(baseCanvas);
    alignCanvas(detailCanvas);

    baseCtx.clearRect(0, 0, size.x, size.y);
    detailCtx.clearRect(0, 0, size.x, size.y);

    var landPath = buildLandPath();
    var ridgesPx = buildRidgesPx();

    drawBathymetry(baseCtx, landPath);
    drawLandBase(baseCtx, landPath, ridgesPx, size);
    drawContours(detailCtx, landPath, ridgesPx, size);
    drawRidgeHachures(detailCtx, landPath, ridgesPx);
    drawRivers(detailCtx, landPath);
    drawCoastEmboss(detailCtx, landPath);
  }

  function scheduleRedraw() {
    if (redrawScheduled) return;
    redrawScheduled = true;
    requestAnimationFrame(function () {
      redrawScheduled = false;
      redraw();
    });
  }

  return {
    init: function (collection) {
      featureCollection = collection;
      ensureCanvases();
      bindListeners();
      scheduleRedraw();
    },
    redraw: redraw,
    scheduleRedraw: scheduleRedraw
  };
}







function initializeMap() {
  function baseStyle() {
    return {
      fillColor: UNOWNED_FILL,
      weight: 1.35,
      opacity: 0.84,
      color: UNOWNED_STROKE,
      dashArray: '4 5',
      fillOpacity: 0.18,
      className: 'territory-terrain-wash territory-neutral'
    };
  }








  var activeCollection = maplevel === 'medium' ? countries30 : countries;
  countriesLayer = L.geoJson(activeCollection, { style: baseStyle, onEachFeature: countriesOnEachFeature }).addTo(map);
  topoMapEngine = createTopographicMapEngine(map);
  topoMapEngine.init(activeCollection);
}








initializeMap();








socket.on('stateSnapshot', onStateSnapshot);
socket.on('question:start', function (question) {
  showQuestion(question);
  renderAllTerritories();
});

socket.on('brutusMirrorActivated', function (payload) {
  playOneShot(soundPlayers.brutusMirror);
  if (currentQuestionData && currentQuestionData.context) {
    currentQuestionData.context.brutusMirrorTargetPid = payload && typeof payload.targetPid === 'number' ? payload.targetPid : null;
    currentQuestionData.context.brutusMirrorByPid = payload && typeof payload.byPid === 'number' ? payload.byPid : null;
    currentQuestionData.context.brutusMirrorRemaining = payload && typeof payload.remaining === 'number' ? payload.remaining : currentQuestionData.context.brutusMirrorRemaining;
    applyQuestionVisualMode(currentQuestionData);
    renderQuestionActions(currentQuestionData);
  }
});

socket.on('ultraSabotageActivated', function (payload) {
  playOneShot(soundPlayers.ultraSabotage);
  showUltraSabotageBanner(payload);
  if (currentQuestionData && payload && payload.questionId === currentQuestionData.id) {
    triggerQuestionActionEffect('sabotage', payload);
    currentQuestionData.context = currentQuestionData.context || {};
    currentQuestionData.context.ultraSabotageUsed = true;
    currentQuestionData.context.ultraSabotageTargetPid = payload && typeof payload.targetPid === 'number' ? payload.targetPid : null;
    currentQuestionData.context.ultraSabotageByPid = payload && typeof payload.byPid === 'number' ? payload.byPid : null;
    currentQuestionData.context.ultraSabotageRemaining = payload && typeof payload.remaining === 'number' ? payload.remaining : currentQuestionData.context.ultraSabotageRemaining;
    if (USER && payload && typeof payload.byPid === 'number' && USER.pid === payload.byPid) {
      currentQuestionData.context.canUseUltraSabotage = false;
    }
    renderQuestionActions(currentQuestionData);
  }
});

socket.on('questionHelpActivated', function (payload) {
  playOneShot(soundPlayers.kozepsuliHelp);
  if (currentQuestionData && payload && payload.questionId === currentQuestionData.id) {
    triggerQuestionActionEffect('help', payload);
    if (USER && typeof payload.byPid === 'number' && USER.pid === payload.byPid) {
      currentQuestionData.context = currentQuestionData.context || {};
      currentQuestionData.context.kozepsuliHelpRemaining = typeof payload.remaining === 'number'
        ? payload.remaining
        : currentQuestionData.context.kozepsuliHelpRemaining;
      currentQuestionData.context.canUseKozepsuliHelp = false;
      renderQuestionActions(currentQuestionData);
    }
  }
});

socket.on('questionHelpGranted', function (payload) {
  applyKozepsuliHelpGranted(payload);
});

socket.on('question:resolved', function (payload) {
  var myAnswer = USER && payload && payload.answers ? payload.answers[USER.pid] : null;
  if (myAnswer && typeof myAnswer.correct === 'boolean') {
    if (myAnswer.correct) {
      playOneShot(soundPlayers.correctAction);
      playAnswerVoice(true);
    } else {
      playAnswerVoice(false);
    }
  }
  if (currentQuestionData && currentQuestionData.type === 'mcq' && payload && payload.answers && typeof payload.correctOptionIndex === 'number') {
    renderMcqAnswers(payload);
  } else if (payload && payload.revealLines && payload.revealLines.length) {
    showQuestionReveal(payload);
  } else {
    hideQuestion();
  }
  if (payload.messages && payload.messages.length) {
    setStatus(payload.messages.join(' '));
  }
  renderAllTerritories();
});
socket.on('battle:result', function (payload) {
  if (payload && payload.message) {
    setStatus(payload.message);
  }
});
socket.on('gamefinish', function (data) {
  if (data && data.length) {
    finishGame(data[0].winner);
  } else {
    finishGame();
  }
});
socket.on('serverstatus', function (data) {
  if (data && data.length) {
    setStatus(data[0]);
  }
});
socket.on('gamelog', function (data) {
  if (!data || !data.length) return;
  data.forEach(function (line) {
    var gameLogMessage = document.createElement('div');
    gameLogMessage.id = 'gamelogs';
    gameLogMessage.innerHTML = line;
    gamelogs.append(gameLogMessage);
  });
  $('#gamelog').scrollTop($('#gamelog')[0].scrollHeight);
});
socket.on('outputmsg', function (data) {
  if (!data || !data.length) return;
  data.forEach(function (item) {
    var chatMessage = document.createElement('div');
    chatMessage.id = 'chatmsgs';
    chatMessage.innerHTML = '<b>' + escapeHtml(item.name) + '</b>: ' + escapeHtml(item.message);
    messages.append(chatMessage);
  });
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
});








socket.on('connect', function () {
  socket.emit('joingame', { username: username });
  socket.emit('getmsgs', { gameid: gameid });
});








textarea.addEventListener('keydown', function (event) {
  if (event.which === 13 && event.shiftKey === false) {
    socket.emit('newmessage', {
      gameid: gameid,
      name: USER ? USER.name : username,
      message: textarea.value,
    });
    textarea.value = '';
    event.preventDefault();
  }
});








window.onbeforeunload = function (e) {
  e = e || window.event;
  if (e) {
    e.returnValue = 'Biztosan bezárod az oldalt?';
  }
  return 'Biztosan bezárod az oldalt?';
};