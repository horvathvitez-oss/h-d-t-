(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  var SOUND_BASE = (document.body && document.body.getAttribute('data-sound-base')) || '/sounds';

  function createAudio(path, loop, volume) {
    var audio = new Audio(path);
    audio.preload = 'auto';
    audio.loop = Boolean(loop);
    if (typeof volume === 'number') {
      audio.volume = volume;
    }
    return audio;
  }

  function createPool(paths, copies, volume) {
    var pool = [];
    (paths || []).forEach(function (path) {
      for (var i = 0; i < copies; i += 1) {
        pool.push(createAudio(path, false, volume));
      }
    });
    return {
      items: pool,
      cursor: 0,
    };
  }

  function resetAudio(audio) {
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (error) {}
  }

  function safePlay(audio) {
    if (!audio) return;
    try {
      var promise = audio.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(function () {});
      }
    } catch (error) {}
  }

  function playFromPool(pool) {
    if (!pool || !pool.items || !pool.items.length) return;
    var audio = pool.items[pool.cursor % pool.items.length];
    pool.cursor = (pool.cursor + 1) % pool.items.length;
    try {
      audio.currentTime = 0;
    } catch (error) {}
    safePlay(audio);
  }

  function chooseRandomPool(pools) {
    if (!pools || !pools.length) return null;
    return pools[Math.floor(Math.random() * pools.length)];
  }

  var players = {
    lobbyBg: createAudio(SOUND_BASE + '/lobby_bg.mp3', true, 0.55),
    gameBg: createAudio(SOUND_BASE + '/game_bg.mp3', true, 0.45),
    battleBg: createAudio(SOUND_BASE + '/battle_bg.mp3', true, 0.50),
    questionTimer: createAudio(SOUND_BASE + '/question_timer.mp3', true, 0.42),

    popupBase: createPool([SOUND_BASE + '/popup_base.mp3'], 2, 0.95),
    popupExpansion: createPool([SOUND_BASE + '/popup_expansion.mp3'], 2, 0.95),
    popupBattle: createPool([SOUND_BASE + '/popup_battle.mp3'], 2, 0.95),

    actionClick: createPool([SOUND_BASE + '/action_click.mp3'], 4, 0.85),
    correctAction: createPool([SOUND_BASE + '/correct_action.mp3'], 4, 0.95),
    territoryCapture: createPool([SOUND_BASE + '/territory_capture.mp3'], 4, 0.95),
    attackEnemyAction: createPool([SOUND_BASE + '/attack_enemy_action.mp3'], 4, 0.95),

    goodCommon: [
      createPool([SOUND_BASE + '/answer_good_common_1.mp3'], 2, 0.95),
      createPool([SOUND_BASE + '/answer_good_common_2.mp3'], 2, 0.95)
    ],
    goodRare: [
      createPool([SOUND_BASE + '/answer_good_rare_1.mp3'], 2, 1.0)
    ],
    badCommon: [
      createPool([SOUND_BASE + '/answer_bad_common_1.mp3'], 2, 0.95),
      createPool([SOUND_BASE + '/answer_bad_common_2.mp3'], 2, 0.95)
    ],
    badRare: [
      createPool([SOUND_BASE + '/answer_bad_rare_1.mp3'], 2, 1.0),
      createPool([SOUND_BASE + '/answer_bad_rare_2.mp3'], 2, 1.0),
      createPool([SOUND_BASE + '/answer_bad_rare_3.mp3'], 2, 1.0)
    ]
  };

  var runtime = {
    unlocked: false,
    currentBg: null,
    goodVoiceCount: 0,
    badVoiceCount: 0,
    bgWatcher: null,
    lastGuessResolvedKey: null
  };

  // Override globals consumed by the existing gamelogic.js
  window.soundPlayers = soundPlayers = players;
  window.soundState = soundState = runtime;

  function stopAllBackground() {
    resetAudio(players.gameBg);
    resetAudio(players.battleBg);
  }

  function phaseGroup() {
    try {
      return typeof getCurrentPhaseGroup === 'function' ? getCurrentPhaseGroup() : 'WAIT';
    } catch (error) {
      return 'WAIT';
    }
  }

  function desiredBgKey() {
    if (typeof gameFinished !== 'undefined' && gameFinished) return null;
    var phase = phaseGroup();
    if (phase === 'WAIT' || phase === 'FINISHED') return null;
    if (phase === 'BATTLE') return 'battleBg';
    if (typeof state !== 'undefined' && state && state.game) return 'gameBg';
    return null;
  }

  function syncBackgroundMusic(force) {
    if (!runtime.unlocked) return;
    var wanted = desiredBgKey();
    var target = wanted ? players[wanted] : null;

    if (!wanted) {
      stopAllBackground();
      runtime.currentBg = null;
      return;
    }

    if (runtime.currentBg !== wanted || force) {
      stopAllBackground();
      runtime.currentBg = wanted;
    }

    if (target && (force || target.paused || target.ended || target.currentTime === 0)) {
      safePlay(target);
    }
  }

  function watchBackgroundMusic() {
    if (runtime.bgWatcher) return;
    runtime.bgWatcher = window.setInterval(function () {
      try {
        syncBackgroundMusic(false);
      } catch (error) {}
    }, 1200);
  }

  function unlockSound() {
    if (!runtime.unlocked) {
      runtime.unlocked = true;
      watchBackgroundMusic();
    }
    syncBackgroundMusic(true);
  }

  function playOneShot(audioOrPool) {
    if (!runtime.unlocked || !audioOrPool) return;
    if (audioOrPool.items) {
      playFromPool(audioOrPool);
      return;
    }
    if (audioOrPool instanceof HTMLAudioElement) {
      try {
        audioOrPool.currentTime = 0;
      } catch (error) {}
      safePlay(audioOrPool);
    }
  }

  function playPopupPhaseVoice(currentPhaseGroup) {
    if (!runtime.unlocked) return;
    if (currentPhaseGroup === 'BASE') playOneShot(players.popupBase);
    if (currentPhaseGroup === 'EXPANSION') playOneShot(players.popupExpansion);
    if (currentPhaseGroup === 'BATTLE') {
      playOneShot(players.popupBattle);
      window.setTimeout(function () {
        syncBackgroundMusic(true);
      }, 220);
    }
  }

  function startQuestionTimerSound() {
    if (!runtime.unlocked) return;
    if (players.questionTimer.paused || players.questionTimer.ended || players.questionTimer.currentTime === 0) {
      safePlay(players.questionTimer);
    }
  }

  function stopQuestionTimerSound() {
    resetAudio(players.questionTimer);
  }

  function playAnswerVoice(isCorrect) {
    if (!runtime.unlocked) return;
    if (isCorrect) {
      runtime.goodVoiceCount += 1;
      playFromPool(chooseRandomPool(runtime.goodVoiceCount % 4 === 0 ? players.goodRare : players.goodCommon));
    } else {
      runtime.badVoiceCount += 1;
      playFromPool(chooseRandomPool(runtime.badVoiceCount % 4 === 0 ? players.badRare : players.badCommon));
    }
  }

  function maybePlayTerritoryCaptureSound(previousState, nextState) {
    if (!runtime.unlocked || !previousState || !nextState || !previousState.territories || !nextState.territories) return;
    if (typeof USER === 'undefined' || !USER) return;

    var before = {};
    previousState.territories.forEach(function (territory) {
      before[territory.tid] = territory.ownsto;
    });

    var gained = nextState.territories.some(function (territory) {
      return Object.prototype.hasOwnProperty.call(before, territory.tid) &&
        before[territory.tid] !== USER.pid &&
        territory.ownsto === USER.pid;
    });

    if (gained) {
      playOneShot(players.territoryCapture);
    }
  }

  function maybePlayActionClick(event) {
    if (!runtime.unlocked) return;
    var target = event && event.target;
    if (!target || !target.closest) return;
    if (target.closest('button, a, input, textarea, select, label')) return;
    playOneShot(players.actionClick);
  }

  function getMyGuessWin(payload) {
    if (!payload || !payload.answers || typeof USER === 'undefined' || !USER) return null;
    var ranking = Object.keys(payload.answers).map(function (pidKey) {
      var answer = payload.answers[pidKey] || {};
      return {
        pid: Number(pidKey),
        distance: Number.isFinite(answer.distance) ? answer.distance : Number.POSITIVE_INFINITY,
        submittedAt: Number.isFinite(answer.submittedAt) ? answer.submittedAt : Number.POSITIVE_INFINITY
      };
    }).sort(function (a, b) {
      return a.distance - b.distance || a.submittedAt - b.submittedAt || a.pid - b.pid;
    });

    if (!ranking.length || !Number.isFinite(ranking[0].distance)) return null;
    return ranking[0].pid === USER.pid;
  }

  function keyForGuessReveal(payload) {
    try {
      return JSON.stringify({
        flow: payload && payload.flow,
        exactAnswer: payload && payload.exactAnswer,
        answers: payload && payload.answers
      });
    } catch (error) {
      return String(Date.now());
    }
  }

  // Wrap the existing showQuestionReveal so guess questions also get answer voices.
  if (typeof window.showQuestionReveal === 'function') {
    var originalShowQuestionReveal = window.showQuestionReveal;
    window.showQuestionReveal = function (payload) {
      var revealKey = keyForGuessReveal(payload);
      if (runtime.lastGuessResolvedKey !== revealKey) {
        runtime.lastGuessResolvedKey = revealKey;
        var didWinGuess = getMyGuessWin(payload);
        if (didWinGuess === true) {
          playOneShot(players.correctAction);
          playAnswerVoice(true);
        } else if (didWinGuess === false) {
          playAnswerVoice(false);
        }
      }
      return originalShowQuestionReveal.apply(this, arguments);
    };
  }

  // publish robust replacements used by existing handlers
  window.safePlay = safePlay;
  window.playOneShot = playOneShot;
  window.stopAudio = resetAudio;
  window.syncBackgroundMusic = syncBackgroundMusic;
  window.playPopupPhaseVoice = playPopupPhaseVoice;
  window.startQuestionTimerSound = startQuestionTimerSound;
  window.stopQuestionTimerSound = stopQuestionTimerSound;
  window.playAnswerVoice = playAnswerVoice;
  window.maybePlayTerritoryCaptureSound = maybePlayTerritoryCaptureSound;
  window.maybePlayActionClick = maybePlayActionClick;

  document.addEventListener('click', unlockSound, { once: true, capture: true });
  document.addEventListener('keydown', unlockSound, { once: true, capture: true });
  document.addEventListener('touchstart', unlockSound, { once: true, capture: true });
  window.addEventListener('focus', function () {
    syncBackgroundMusic(true);
  });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      syncBackgroundMusic(true);
    }
  });

  window.setTimeout(function () {
    syncBackgroundMusic(false);
  }, 0);
})();
