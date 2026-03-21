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
    '#question-body .question-option { position:relative; overflow:hidden; transition: transform .26s ease, opacity .28s ease, box-shadow .28s ease, border-color .28s ease, filter .28s ease; }',
    '#question-body .question-option.question-option-revealed { color:#fff; border-color: rgba(255,255,255,0.22); box-shadow: 0 16px 26px rgba(0,0,0,0.16); }',
    '#question-body .question-option.question-option-correct { transform: scale(1.02); box-shadow: 0 18px 30px rgba(0,0,0,0.20); border-color: #f4ddab; }',
    '#question-body .question-option.question-option-fade { opacity: 0; transform: translateY(10px) scale(0.98); pointer-events:none; max-height:0; margin:0; padding-top:0; padding-bottom:0; border-width:0; }',
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




function renderMcqAnswers(payload) {
  if (!currentQuestionData || currentQuestionData.type !== 'mcq') {
    hideQuestion();
    return;
  }


  ensureQuestionEnhancementStyles();
  clearQuestionCountdown();
  clearQuestionUiTimers();


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
    }, 80 + optionIndex * 120);
  });


  timer.textContent = 'Válaszok felfedése';
  note.textContent = 'Mindenki látja, ki mire szavazott.';


  queueUiTimer(function () {
    Array.prototype.slice.call(body.querySelectorAll('.question-option')).forEach(function (button) {
      var optionIndex = Number(button.getAttribute('data-option'));
      if (optionIndex === payload.correctOptionIndex) {
        button.classList.add('question-option-correct');
      } else {
        button.classList.add('question-option-fade');
      }
    });
    note.textContent = 'A helyes válasz marad fent.';
  }, 2100);


  queueUiTimer(function () {
    hideQuestion();
  }, 3900);
}




var PLAYER_FILL_COLORS = ['#a95f4f', '#6d8660', '#d7cfbd'];
var PLAYER_STROKE_COLORS = ['#5e2f20', '#334b31', '#7c7464'];
var PLAYER_NAMES_FALLBACK = ['Piros', 'Zöld', 'Fehér'];
var UNOWNED_FILL = '#b69f79';
var UNOWNED_STROKE = '#5a442d';


var SOUND_BASE = document.body.getAttribute('data-sound-base') || '/sounds';
var soundState = {
unlocked: false,
goodVoiceCount: 0,
badVoiceCount: 0,
currentBg: null,
lastSnapshotSeen: false
};


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
kozepsuliHelp: new Audio(SOUND_BASE + '/kozepsulineked_help.mp3')
};


soundPlayers.lobbyBg.loop = true;
soundPlayers.gameBg.loop = true;
soundPlayers.battleBg.loop = true;
soundPlayers.questionTimer.loop = true;


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










var map = L.map('map', {
  zoomControl: false,
  attributionControl: false,
}).setView([43.8476, 18.3564], 2);
L.control.zoom({ position: 'bottomright' }).addTo(map);








var questionModal = buildQuestionModal();








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

  var groupSelector = kind === 'help' ? '.question-action-group--help' : '.question-action-group--sabotage';
  var targetContainer = panel.querySelector(groupSelector) || panel;

  var burst = document.createElement('div');
  burst.className = 'question-action-burst question-action-burst--' + kind;
  burst.innerHTML = [
    '<span class="question-action-burst-glow"></span>',
    '<span class="question-action-smoke smoke-1"></span>',
    '<span class="question-action-smoke smoke-2"></span>',
    '<span class="question-action-smoke smoke-3"></span>',
    '<span class="question-action-smoke smoke-4"></span>'
  ].join('');
  targetContainer.appendChild(burst);
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
}

function renderQuestionActions(question) {
  var host = getQuestionActionsHost();
  if (!host) return;
  host.innerHTML = '';

  var hasAnyAction = false;

  if (canUseKozepsuliHelp(question)) {
    hasAnyAction = true;
    var helpGroup = document.createElement('div');
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

    var helpIllustration = document.createElement('img');
    helpIllustration.className = 'question-action-illustration question-action-illustration--help';
    helpIllustration.src = '/images/question-help-king.png';
    helpIllustration.alt = 'KÖZÉPSULINEKED HELP';
    helpIllustration.loading = 'lazy';
    helpIllustration.decoding = 'async';

    helpGroup.appendChild(helpButton);
    helpGroup.appendChild(helpCounter);
    helpGroup.appendChild(helpIllustration);
    host.appendChild(helpGroup);
  }

  if (canUseUltraSabotage(question)) {
    hasAnyAction = true;
    var sabotageGroup = document.createElement('div');
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

    var sabotageIllustration = document.createElement('img');
    sabotageIllustration.className = 'question-action-illustration question-action-illustration--sabotage';
    sabotageIllustration.src = '/images/question-sabotage-clown.png';
    sabotageIllustration.alt = 'Szabotázs';
    sabotageIllustration.loading = 'lazy';
    sabotageIllustration.decoding = 'async';

    sabotageGroup.appendChild(sabotageButton);
    sabotageGroup.appendChild(sabotageCounter);
    sabotageGroup.appendChild(sabotageIllustration);
    host.appendChild(sabotageGroup);
  }

  if (!hasAnyAction) {
    host.innerHTML = '';
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
  var body = element('question-body');
  var note = element('question-note');
  element('question-timer').textContent = payload.exactAnswer != null ? ('Pontos válasz: ' + payload.exactAnswer) : '';
  body.innerHTML = '<div class="question-reveal-list">' + payload.revealLines.map(function(line) {
    return '<div class="question-reveal-item">' + escapeHtml(line) + '</div>';
  }).join('') + '</div>';
  note.classList.remove('question-note-help');
  note.textContent = 'Lejárt az idő. Eredmények megjelenítése...';
  if (questionRevealTimer) clearTimeout(questionRevealTimer);
  questionRevealTimer = setTimeout(function() {
    hideQuestion();
  }, 2600);
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
      baseStyle.weight = Math.max(baseStyle.weight || 2, 4);
      baseStyle.fillOpacity = Math.min((baseStyle.fillOpacity || 0.7) + 0.08, 0.92);
      e.target.setStyle(baseStyle);
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
    playOneShot(soundPlayers.actionClick);
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








function buildLayerStyle(tid) {
  var territory = getTerritoryByTid(tid);
  if (!territory) return null;








  var castle = getCastleByTid(tid);
  var ownerFill = territory.ownsto >= 0 ? getOwnerColor(territory.ownsto) : UNOWNED_FILL;
  var ownerStroke = territory.ownsto >= 0 ? getOwnerStroke(territory.ownsto) : UNOWNED_STROKE;








  var style = {
    weight: castle ? 4 : 2,
    opacity: 1,
    color: ownerStroke,
    dashArray: castle ? '' : '4 4',
    fillOpacity: territory.ownsto >= 0 ? 0.9 : 0.58,
    fillColor: ownerFill,
  };








  if (!gameFinished && state.game && USER && state.game.currentplayer === USER.pid) {
    if (state.game.phase === 'BASE_SELECTION' && isSelectableBase(tid)) {
      style.weight = 4;
      style.color = '#f3d8a3';
      style.fillColor = lightenHex(ownerFill, 0.18);
      style.fillOpacity = 0.72;
      style.dashArray = '';
    }








    if (state.game.phase === 'EXPANSION_SELECTION' && isSelectableExpansion(tid)) {
      style.weight = 4;
      style.color = '#f4ddab';
      style.fillColor = rgba(getOwnerColor(USER.pid), 0.76);
      style.fillOpacity = 0.8;
      style.dashArray = '';
    }








    if (state.game.phase === 'BATTLE_SELECTION' && isSelectableAttack(tid)) {
      style.weight = 5;
      style.color = '#f7e1a0';
      style.fillColor = rgba(getOwnerColor(USER.pid), 0.72);
      style.fillOpacity = 0.84;
      style.dashArray = '';
    }
  }








  return style;
}








function applyLayerStyle(layer, tid) {
  var territory = getTerritoryByTid(tid);
  if (!territory) return;








  var castle = getCastleByTid(tid);
  var style = buildLayerStyle(tid);
  if (!style) return;








  layer.setStyle(style);








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
}








function getCurrentPhaseGroup() {
  if (!state.game || !state.game.phase) return 'WAIT';
  if (state.game.phase === 'BASE_SELECTION') return 'BASE';
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
        '<span class="player-mini-stat"><strong>' + player.score + '</strong><em>PONT</em></span>',
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








  if (phaseGroup === 'BASE') {
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








function renderHUD() {
  renderPlayerCards();
  renderPhaseBoard();
  renderOrderBoard();
  renderStatus();
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
  if (phaseGroup === 'BASE') {
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
  maybePlayTerritoryCaptureSound(previousState, state);
  soundState.lastSnapshotSeen = true;
  renderAllTerritories();
  renderHUD();
  maybeShowPhaseSplash();
  syncBackgroundMusic();
  if (state.game && state.game.phase === 'FINISHED' && !gameFinished) {
    finishGame(state.game.winner);
  }
}








function initializeMap() {
  function baseStyle() {
    return {
      fillColor: UNOWNED_FILL,
      weight: 2,
      opacity: 1,
      color: UNOWNED_STROKE,
      dashArray: '4 4',
      fillOpacity: 0.58,
    };
  }








  if (maplevel === 'medium') {
    countriesLayer = L.geoJson(countries30, { style: baseStyle, onEachFeature: countriesOnEachFeature }).addTo(map);
  } else {
    countriesLayer = L.geoJson(countries, { style: baseStyle, onEachFeature: countriesOnEachFeature }).addTo(map);
  }
}








initializeMap();








socket.on('stateSnapshot', onStateSnapshot);
socket.on('question:start', function (question) {
  showQuestion(question);
  renderAllTerritories();
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