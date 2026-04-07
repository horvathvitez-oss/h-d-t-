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
var castleCinematicTimer = null;
var castleCinematicCleanupTimer = null;








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

function territoryHasSzechenyiCasino(tid) {
  var territory = getTerritoryByTid(tid);
  return Boolean(territory && typeof territory.szechenyiCasinoOwnerPid === 'number' && territory.szechenyiCasinoOwnerPid === territory.ownsto);
}




function buildTerritoryOverlayHtml(tid) {
  var parts = [];
  var castle = getCastleByTid(tid);
  if (castle) {
    parts.push('<div class="castle-pill"><span class="castle-pill-icon">♜</span><span>' + castle.hp + '</span></div>');
  }
  if (territoryHasSzechenyiCasino(tid)) {
    parts.push('<div class="pending-selection-badge pending-selection-badge--casino">★</div>');
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




function clearCastleCinematicTimers() {
  if (castleCinematicTimer) {
    clearTimeout(castleCinematicTimer);
    castleCinematicTimer = null;
  }
  if (castleCinematicCleanupTimer) {
    clearTimeout(castleCinematicCleanupTimer);
    castleCinematicCleanupTimer = null;
  }
}


function ensureCastleCinematicOverlay() {
  var existing = document.getElementById('castle-cinematic');
  if (existing) return existing;

  var overlay = document.createElement('div');
  overlay.id = 'castle-cinematic';
  overlay.className = 'castle-cinematic';
  overlay.innerHTML = [
    '<div class="castle-cinematic-backdrop"></div>',
    '<div class="castle-cinematic-flare"></div>',
    '<div class="castle-cinematic-panel">',
      '<div class="castle-cinematic-kicker" id="castle-cinematic-kicker">VÁROSTROM</div>',
      '<div class="castle-cinematic-title" id="castle-cinematic-title"></div>',
      '<div class="castle-cinematic-subtitle" id="castle-cinematic-subtitle"></div>',
      '<div class="castle-cinematic-versus" id="castle-cinematic-versus"></div>',
      '<div class="castle-cinematic-towers" id="castle-cinematic-towers"></div>',
      '<div class="castle-cinematic-footer" id="castle-cinematic-footer"></div>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);
  return overlay;
}


function buildCastleCinematicTowers(remainingHp, maxHp) {
  var total = Number(maxHp) || 3;
  var active = Math.max(0, Math.min(total, Number(remainingHp) || 0));
  var html = [];
  for (var i = 0; i < total; i += 1) {
    var broken = i >= active;
    html.push('<span class="castle-cinematic-tower' + (broken ? ' is-broken' : '') + '"><span class="castle-cinematic-tower-icon">♜</span><span class="castle-cinematic-tower-base"></span></span>');
  }
  return html.join('');
}


function getCastleCinematicSubtitle(payload) {
  var remainingHp = Number(payload && payload.remainingHp);
  if (payload && payload.kind === 'siege-intro') {
    if (remainingHp <= 1) return 'Az utolsó torony áll. A döntő ostrom következik.';
    if (remainingHp === 2) return 'Két torony áll még. A vár meginog, de még tartja magát.';
    return 'A vár teljes erejével készül a védelemre.';
  }
  if (payload && payload.kind === 'tower-down') {
    if (remainingHp <= 1) return 'Már csak az utolsó torony áll.';
    if (remainingHp === 2) return 'Ledőlt egy torony. Már csak 2 maradt.';
    return 'A vár még mindig áll, de egy torony elesett.';
  }
  return 'A vár romokban. A védő minden területét elvesztette.';
}


function getCastleCinematicFooter(payload) {
  var targetName = payload && payload.targetName ? payload.targetName : 'Ismeretlen terület';
  if (payload && payload.kind === 'siege-intro') return targetName + ' ostroma megkezdődött';
  if (payload && payload.kind === 'tower-down') return targetName + ' falai megremegtek';
  return targetName + ' végleg elesett';
}


function showCastleCinematic(payload) {
  if (!payload || !payload.kind) return;

  hideQuestion();
  clearCastleCinematicTimers();

  var overlay = ensureCastleCinematicOverlay();
  var kicker = element('castle-cinematic-kicker');
  var title = element('castle-cinematic-title');
  var subtitle = element('castle-cinematic-subtitle');
  var versus = element('castle-cinematic-versus');
  var towers = element('castle-cinematic-towers');
  var footer = element('castle-cinematic-footer');
  var attackerName = payload.attackerName || 'Ismeretlen támadó';
  var defenderName = payload.defenderName || 'Ismeretlen védő';
  var remainingHp = Number(payload.remainingHp);
  var duration = Math.max(1200, Number(payload.durationMs) || 2600);

  overlay.className = 'castle-cinematic is-' + String(payload.kind).replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  document.body.classList.add('castle-cinematic-active');

  if (kicker) kicker.textContent = payload.kind === 'siege-intro' ? 'VÁROSTROM' : (payload.kind === 'tower-down' ? 'LEDŐLT EGY TORONY' : 'A VÁR ELPUSZTULT');
  if (title) {
    if (payload.kind === 'siege-intro') {
      title.textContent = attackerName + ' megtámadja ' + defenderName + ' várát';
    } else if (payload.kind === 'tower-down') {
      title.textContent = attackerName + ' áttörte ' + defenderName + ' védelmét';
    } else {
      title.textContent = attackerName + ' lerombolta ' + defenderName + ' várát';
    }
  }
  if (subtitle) subtitle.textContent = getCastleCinematicSubtitle(payload);
  if (versus) versus.textContent = attackerName + '  ⚔  ' + defenderName;
  if (towers) towers.innerHTML = buildCastleCinematicTowers(remainingHp, payload.maxHp);
  if (footer) footer.textContent = getCastleCinematicFooter(payload);

  if (soundState.unlocked) {
    if (payload.kind === 'siege-intro') {
      playOneShot(soundPlayers.attackEnemyAction);
    } else if (payload.kind === 'tower-down') {
      playOneShot(soundPlayers.correctAction);
    } else {
      playOneShot(soundPlayers.territoryCapture);
    }
  }

  requestAnimationFrame(function () {
    overlay.classList.add('is-visible');
  });

  castleCinematicTimer = setTimeout(function () {
    hideCastleCinematic();
  }, duration);
}


function hideCastleCinematic(immediate) {
  clearCastleCinematicTimers();
  var overlay = document.getElementById('castle-cinematic');
  if (!overlay) return;
  document.body.classList.remove('castle-cinematic-active');
  if (immediate) {
    overlay.className = 'castle-cinematic';
    return;
  }
  overlay.classList.remove('is-visible');
  castleCinematicCleanupTimer = setTimeout(function () {
    overlay.className = 'castle-cinematic';
  }, 360);
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

function buildCharacterDraftVisualHtml(id, name) {
  if (id === 'kossuth') {
    return '<span class="character-draft-card-image-wrap character-draft-card-image-wrap--szechenyi"><span class="character-draft-card-emblem">Sz</span></span>';
  }
  return '<span class="character-draft-card-image-wrap"><img class="character-draft-card-image" src="' + escapeHtml(CHARACTER_IMAGE_BY_ID[id]) + '" alt="' + escapeHtml(name) + '" loading="lazy"></span>';
}

function buildCharacterTrayVisualHtml(id, name) {
  if (id === 'kossuth') {
    return '<span class="character-tray-image character-tray-image--szechenyi"><span class="character-tray-emblem">Sz</span></span>';
  }
  return '<img class="character-tray-image" src="' + escapeHtml(CHARACTER_IMAGE_BY_ID[id]) + '" alt="' + escapeHtml(name) + '" loading="lazy">';
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
  var available = (state.game.availableCharacterIds || []).filter(function (id) { return id !== 'kossuth'; }).slice();
  options.innerHTML = available.map(function (id) {
    var def = getCharacterDefinition(id);
    if (!def) return '';
    return '<button type="button" class="character-draft-card' + (USER && currentPid === USER.pid ? '' : ' is-disabled') + '" data-character-id="' + escapeHtml(id) + '" ' + (USER && currentPid === USER.pid ? '' : 'disabled') + '>' + buildCharacterDraftVisualHtml(id, def.name) + '<span class="character-draft-card-body"><span class="character-draft-card-name">' + escapeHtml(def.name) + '</span><span class="character-draft-card-desc">' + escapeHtml(def.shortDescription) + '</span></span></button>';
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
  var cards = state.players.filter(function (player) { return !!player.characterId; }).sort(function (a, b) { return a.pid - b.pid; });
  tray.innerHTML = cards.map(function (player) {
    var def = getCharacterDefinition(player.characterId);
    var isOwn = Boolean(USER) && USER.pid === player.pid;
    if (!def) return '';
    return '<button type="button" class="character-tray-card' + (isOwn ? ' is-own' : ' is-readonly') + '" data-character-tray="' + player.pid + '" ' + (isOwn ? '' : 'aria-disabled="true"') + '><span class="character-tray-color" style="background:' + getOwnerColor(player.pid) + '"></span>' + buildCharacterTrayVisualHtml(player.characterId, def.name) + '<span class="character-tray-text"><span class="character-tray-name">' + escapeHtml(def.name) + '</span><span class="character-tray-owner">' + escapeHtml(getPlayerDisplayName(player)) + '</span></span>' + (isOwn ? ('<span class="character-tray-detail">' + escapeHtml(def.fullDescription) + '</span>') : '') + '</button>';
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

function clearScoreDeltaTimers(pid) {
  var timers = scoreDeltaRenderTimersByPid[pid];
  if (!timers || !timers.length) return;
  while (timers.length) {
    clearTimeout(timers.pop());
  }
}

function scheduleScoreDeltaRender(pid, visibleAt, expiresAt) {
  clearScoreDeltaTimers(pid);
  scoreDeltaRenderTimersByPid[pid] = [];

  function queue(at) {
    var wait = Math.max(0, at - Date.now());
    scoreDeltaRenderTimersByPid[pid].push(setTimeout(function () {
      renderPlayerCards();
    }, wait));
  }

  queue(visibleAt + 20);
  queue(expiresAt + 20);
}

function getScoreDeltaDisplayDelay() {
  if (questionModal && questionModal.classList && questionModal.classList.contains('is-open')) {
    return 5200;
  }
  if (activeQuestionId || currentQuestionData) {
    return 5200;
  }
  return 0;
}

function updateScoreDeltas(previousPlayers, nextPlayers) {
  previousScoreByPid = previousScoreByPid || {};
  latestScoreDeltaByPid = latestScoreDeltaByPid || {};
  (nextPlayers || []).forEach(function (player) {
    var prev = Object.prototype.hasOwnProperty.call(previousScoreByPid, player.pid) ? previousScoreByPid[player.pid] : player.score;
    var delta = player.score - prev;
    if (delta !== 0) {
      var now = Date.now();
      var delay = getScoreDeltaDisplayDelay();
      var visibleAt = now + delay;
      var expiresAt = visibleAt + 3200;
      latestScoreDeltaByPid[player.pid] = {
        value: delta,
        at: now,
        visibleAt: visibleAt,
        expiresAt: expiresAt
      };
      scheduleScoreDeltaRender(player.pid, visibleAt, expiresAt);
    }
    previousScoreByPid[player.pid] = player.score;
  });
}

function getActiveScoreDelta(pid) {
  var entry = latestScoreDeltaByPid[pid];
  if (!entry) return null;
  var now = Date.now();
  if (now < (entry.visibleAt || entry.at || 0)) return null;
  if (now > (entry.expiresAt || ((entry.at || 0) + 2600))) return null;
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
var previousScoreByPid = {};
var latestScoreDeltaByPid = {};
var scoreDeltaRenderTimersByPid = {};
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
characterSelect: new Audio(SOUND_BASE + '/character_select.mp3'),
szechenyiCasino: new Audio(SOUND_BASE + '/territory_capture.mp3')
};


soundPlayers.lobbyBg.loop = true;
soundPlayers.gameBg.loop = true;
soundPlayers.battleBg.loop = true;
soundPlayers.questionTimer.loop = true;

var GAME_CORNER_PROMO_LINK = 'https://kozepsulineked.com/products/30-napos-elofizetes-kozepsulineked';
var GAME_CORNER_PROMO_VIDEO = '/videos/game-corner-promo.mp4';
var QUESTION_HELP_ART_SRC = '/images/question-help-king.webp';
var QUESTION_SABOTAGE_ART_SRC = '/images/question-sabotage-clown.webp';
var CHARACTER_IMAGE_BY_ID = {
  einstein: '/images/character-einstein.webp',
  kossuth: '/images/character-kossuth.webp',
  napoleon: '/images/character-napoleon.webp',
  brutus: '/images/character-brutus.webp'
};
var CHARACTER_DEFS = {
  einstein: { id: 'einstein', name: 'Einstein', shortDescription: '6 segítséged van 3 helyett.', fullDescription: 'Einsteinként 6 KÖZÉPSULINEKED HELP-et kapsz a meccs teljes hosszára.' },
  kossuth: { id: 'kossuth', name: 'Széchényi', shortDescription: 'A Széchényi Kaszinót kérdés előtt aktiválhatod.', fullDescription: 'A kérdés előtt aktiválhatod a Széchényi Kaszinót. Ha ezzel szerzel területet, a bónusz +200 pont területenként és az így szerzett terület arannyá válik. Sikertelen próbálkozás esetén -200 pont jár.' },
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
var castleCinematicOverlay = ensureCastleCinematicOverlay();
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

function canUseKossuthGamble(question) {
  return Boolean(
    question &&
    question.context &&
    question.context.canUseKossuthGamble &&
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

  var buttonClass = kind === 'help' ? '.question-help-button' : (kind === 'brutus' ? '.question-brutus-button' : (kind === 'kossuth' ? '.question-kossuth-button' : '.question-sabotage-button'));
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
  var kossuthActive = Boolean(question && question.context && question.context.kossuthGambleArmed && USER && question.participants && question.participants.indexOf(USER.pid) !== -1);
  panel.classList.toggle('is-brutus-mirror', brutusActive);
  panel.classList.toggle('is-kossuth-gamble', kossuthActive);
}


function renderQuestionActions(question) {
  var host = getQuestionActionsHost();
  if (!host) return;
  host.innerHTML = '';

  var sabotageGroup = null;
  var brutusGroup = null;
  var helpGroup = null;
  var kossuthGroup = null;

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


  if (canUseKossuthGamble(question)) {
    kossuthGroup = document.createElement('div');
    kossuthGroup.className = 'question-action-group question-action-group--kossuth';

    var kossuthButton = document.createElement('button');
    kossuthButton.type = 'button';
    kossuthButton.className = 'question-action-button question-kossuth-button';
    kossuthButton.textContent = 'SZÉCHÉNYI KASZINÓ';
    kossuthButton.addEventListener('click', function () {
      kossuthButton.disabled = true;
      triggerQuestionActionEffect('kossuth');
      socket.emit('activateKossuthGamble');
      var note = element('question-note');
      if (note) {
        note.textContent = 'Széchényi Kaszinó aktiválva...';
        note.classList.remove('question-note-help');
      }
    });

    var kossuthCounter = document.createElement('div');
    kossuthCounter.className = 'question-action-counter question-kossuth-counter';
    kossuthCounter.textContent = question.context && question.context.flow === 'BATTLE'
      ? 'ATTACK BÓNUSZ'
      : 'FOGLALÁSI BÓNUSZ';

    kossuthGroup.appendChild(kossuthButton);
    kossuthGroup.appendChild(kossuthCounter);
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
  if (kossuthGroup) {
    host.appendChild(kossuthGroup);
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
  if (questionRevealTimer) {
    clearTimeout(questionRevealTimer);
    questionRevealTimer = null;
  }
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
  if (question.context && question.context.kossuthGambleArmed && canAnswer) {
    note.textContent = 'Széchényi Kaszinó aktív: sikeres területszerzésnél bónusz, kudarc esetén -200 pont.';
  }
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
  clearQuestionUiTimers();
  if (questionRevealTimer) {
    clearTimeout(questionRevealTimer);
    questionRevealTimer = null;
  }
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
        if (e.target._path && e.target._path.classList) {
          e.target._path.classList.add('territory-selectable-hover');
          if (selectableBattle) e.target._path.classList.add('territory-selectable-battle-hover');
        }
        if (e.target.bringToFront) e.target.bringToFront();
      } else {
        baseStyle.weight = Math.max(baseStyle.weight || 2, 3);
        baseStyle.fillOpacity = Math.min((baseStyle.fillOpacity || 0.7) + 0.03, 0.9);
        e.target.setStyle(baseStyle);
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
  var hasSzechenyiCasino = territoryHasSzechenyiCasino(tid);
  var ownerFill = territory.ownsto >= 0 ? (hasSzechenyiCasino ? '#d6a93a' : getOwnerColor(territory.ownsto)) : UNOWNED_FILL;
  var ownerStroke = territory.ownsto >= 0 ? (hasSzechenyiCasino ? '#fff0b2' : getOwnerStroke(territory.ownsto)) : UNOWNED_STROKE;

  var style = {
    weight: castle ? 4 : 2,
    opacity: 1,
    color: ownerStroke,
    dashArray: castle ? '' : '4 4',
    fillOpacity: territory.ownsto >= 0 ? 0.9 : 0.58,
    fillColor: ownerFill,
  };

  var isCurrentTurn = !gameFinished && state.game && USER && state.game.currentplayer === USER.pid;
  if (isCurrentTurn && state.game.phase === 'BASE_SELECTION' && isSelectableBase(tid)) {
    style.weight = 4;
    style.color = '#f3d8a3';
    style.fillColor = lightenHex(ownerFill, 0.18);
    style.fillOpacity = 0.72;
    style.dashArray = '';
  }

  if (isCurrentTurn && state.game.phase === 'EXPANSION_SELECTION') {
    var expansionHighlight = getExpansionHighlightState(tid);
    var isUnowned = territory.ownsto === -1;

    if (expansionHighlight.selectable) {
      style.weight = expansionHighlight.adjacentSelectable ? 6.5 : 5.5;
      style.color = expansionHighlight.adjacentSelectable ? '#fff3c8' : '#dfffd7';
      style.fillColor = expansionHighlight.adjacentSelectable
        ? lightenHex(getOwnerColor(USER.pid), 0.26)
        : rgba(getOwnerColor(USER.pid), 0.8);
      style.fillOpacity = expansionHighlight.adjacentSelectable ? 0.92 : 0.8;
      style.dashArray = '';
      style.className = expansionHighlight.adjacentSelectable
        ? 'territory-selectable territory-selectable-adjacent territory-elevated'
        : 'territory-selectable territory-selectable-fallback territory-elevated';
    } else if (isUnowned) {
      style.weight = 1.8;
      style.color = 'rgba(111,84,58,0.62)';
      style.fillColor = expansionHighlight.adjacentCount ? 'rgba(143,116,82,0.44)' : rgba(UNOWNED_FILL, 0.68);
      style.fillOpacity = expansionHighlight.adjacentCount ? 0.42 : 0.52;
      style.dashArray = '3 5';
      style.className = 'territory-unselectable';
    }
  }

  if (hasSzechenyiCasino) {
    style.weight = Math.max(style.weight, 4.2);
    style.fillOpacity = territory.ownsto >= 0 ? 0.94 : style.fillOpacity;
    style.className = ((style.className ? style.className + ' ' : '') + 'territory-szechenyi-casino').trim();
  }

  var napoleonEuropeActive = state.game && Number.isInteger(state.game.napoleonEuropeOwnerPid) && Array.isArray(state.game.napoleonEuropeTerritoryTids) && state.game.napoleonEuropeTerritoryTids.indexOf(tid) !== -1;
  if (napoleonEuropeActive) {
    style.weight = Math.max(style.weight, 4.5);
    style.color = '#9fd4ff';
    style.fillColor = territory.ownsto >= 0 ? '#4f7ed6' : '#3b5ea8';
    style.fillOpacity = territory.ownsto >= 0 ? 0.88 : 0.72;
    style.className = ((style.className ? style.className + ' ' : '') + 'territory-napoleon-europe').trim();
  }

  if (isCurrentTurn && state.game.phase === 'BATTLE_SELECTION' && isSelectableAttack(tid)) {
    style.weight = 6.5;
    style.color = '#ffe2a2';
    style.fillColor = rgba(getOwnerColor(USER.pid), 0.82);
    style.fillOpacity = 0.88;
    style.dashArray = '';
    style.className = 'territory-selectable territory-selectable-battle territory-elevated';
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
      var activeDelta = getActiveScoreDelta(player.pid);

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
        '<span class="player-mini-stat player-mini-stat--score"><strong>' + player.score + '</strong><em>PONT</em>' + (activeDelta ? ('<span class="player-score-delta ' + (activeDelta.value > 0 ? 'is-positive' : 'is-negative') + '">' + (activeDelta.value > 0 ? '+' : '') + activeDelta.value + '</span>') : '') + '</span>',
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
  hideCastleCinematic(true);
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
  if (state && state.game && state.game.maplevel && state.game.maplevel !== maplevel) {
    maplevel = state.game.maplevel;
    redrawMapLayerForLevel(maplevel);
  }
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








function getGeoJsonForMapLevel(level) {
  if (level === 'hungary13') return hungary13;
  if (level === 'medium') return countries30;
  return countries;
}

function buildBaseMapStyle() {
  return {
    fillColor: UNOWNED_FILL,
    weight: 2,
    opacity: 1,
    color: UNOWNED_STROKE,
    dashArray: '4 4',
    fillOpacity: 0.58,
  };
}

function redrawMapLayerForLevel(level) {
  if (countriesLayer) {
    map.removeLayer(countriesLayer);
    countriesLayer = null;
  }
  countriesLayer = L.geoJson(getGeoJsonForMapLevel(level), {
    style: buildBaseMapStyle,
    onEachFeature: countriesOnEachFeature
  }).addTo(map);
  if (state && state.territories && state.territories.length) {
    renderAllTerritories();
  }
}

function initializeMap() {
  redrawMapLayerForLevel(maplevel);
}







initializeMap();








socket.on('stateSnapshot', onStateSnapshot);
socket.on('castle:cinematic', function (payload) {
  showCastleCinematic(payload);
});
socket.on('question:start', function (question) {
  hideCastleCinematic(true);
  showQuestion(question);
  renderAllTerritories();
});

socket.on('kossuthGambleActivated', function (payload) {
  playOneShot(soundPlayers.szechenyiCasino);
  if (currentQuestionData && payload && payload.questionId === currentQuestionData.id && USER && typeof payload.byPid === 'number' && USER.pid === payload.byPid) {
    triggerQuestionActionEffect('kossuth', payload);
    currentQuestionData.context = currentQuestionData.context || {};
    currentQuestionData.context.kossuthGambleArmed = true;
    currentQuestionData.context.canUseKossuthGamble = false;
    applyQuestionVisualMode(currentQuestionData);
    renderQuestionActions(currentQuestionData);
    var note = element('question-note');
    if (note) {
      note.textContent = 'Széchényi Kaszinó aktív: arany kérdéskártya, sikeres területszerzésnél bónusz, kudarc esetén -200 pont.';
      note.classList.remove('question-note-help');
    }
  }
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