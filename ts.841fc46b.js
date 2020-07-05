// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextPoopTime = exports.getNextDieTime = exports.getNextHungerTime = exports.NIGHT_LENGTH = exports.DAY_LENGTH = exports.SCENES = exports.RAIN_CHANCE = exports.ICONS = exports.TICK_RATE = void 0;
exports.TICK_RATE = 3000;
exports.ICONS = ["fish", "poop", "weather"];
exports.RAIN_CHANCE = 0.2;
exports.SCENES = ["day", "raining"];
exports.DAY_LENGTH = 30;
exports.NIGHT_LENGTH = 3;

exports.getNextHungerTime = clock => Math.floor(Math.random() * 1) + 8 + clock;

exports.getNextDieTime = clock => Math.floor(Math.random() * 3) + 5 + clock;

exports.getNextPoopTime = clock => Math.floor(Math.random() * 2) + 8 + clock;
},{}],"../.history/src/ts/utils_20200701140937.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClassOnElement = exports.createElementAndAddClickEventListener = void 0;

exports.createElementAndAddClickEventListener = (className, listener) => {
  const element = document.querySelector(className);

  if (element) {
    element.addEventListener("click", listener);
  }
};

exports.toggleClassOnElement = (ElementClassName, classNameToToggle) => {
  const element = document.querySelector(ElementClassName);

  if (element) {
    const classList = element.classList;
    classList.toggle(classNameToToggle);
  }
};
},{}],"ts/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClassOnElement = exports.createElementAndAddClickEventListener = void 0;

exports.createElementAndAddClickEventListener = (className, listener) => {
  const element = document.querySelector(className);

  if (element) {
    element.addEventListener("click", listener);
  }
};

exports.toggleClassOnElement = (ElementClassName, classNameToToggle, force) => {
  const element = document.querySelector(ElementClassName);

  if (element) {
    const classList = element.classList;
    classList.toggle(classNameToToggle, force);
  }
};
},{}],"ts/buttons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const utils_20200701140937_1 = require("./../../.history/src/ts/utils_20200701140937");

const utils_1 = require("./utils");

function initializeButtons(gameState) {
  utils_1.createElementAndAddClickEventListener(".start-button", startButtonClick);
  utils_1.createElementAndAddClickEventListener(".restart-button", restartButtonClick);
  utils_1.createElementAndAddClickEventListener(".feed-control", feedButtonClick);
  utils_1.createElementAndAddClickEventListener(".environment-control", environmentButtonClick);
  utils_1.createElementAndAddClickEventListener(".poop-control", poopButtonClick);

  function startButtonClick() {
    utils_20200701140937_1.toggleClassOnElement(".game-screen", "start-menu");
    gameState.startGame();
  }

  function restartButtonClick() {
    utils_20200701140937_1.toggleClassOnElement(".game-screen", "death-menu");
    gameState.startGame();
  }

  function feedButtonClick() {
    gameState.feed();
  }

  function environmentButtonClick() {
    gameState.changeWeather();
  }

  function poopButtonClick() {
    gameState.cleanUpPoop();
  }
}

exports.default = initializeButtons;
},{"./../../.history/src/ts/utils_20200701140937":"../.history/src/ts/utils_20200701140937.ts","./utils":"ts/utils.ts"}],"ts/ui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.togglePoopPile = exports.modEnvironmentButton = exports.modScene = exports.modSnail = void 0;

const utils_1 = require("./utils");

function modSnail(state) {
  const element = document.querySelector(".snail");

  if (element) {
    element.className = `snail ${state}`;
  }
}

exports.modSnail = modSnail;

function modScene(state) {
  const element = document.querySelector(".game-screen");

  if (element) {
    const classList = element.classList;
    const existingScene = [...classList].find(className => className.startsWith("scene-"));

    if (existingScene) {
      classList.toggle(existingScene, false);
    }

    classList.toggle(`scene-${state}`, true);
  }
}

exports.modScene = modScene;

function modEnvironmentButton(state) {
  const inverted = state === "raining" ? "day" : "raining";
  utils_1.toggleClassOnElement(".environment-control", inverted, true);
  utils_1.toggleClassOnElement(".environment-control", state, false);
}

exports.modEnvironmentButton = modEnvironmentButton;

function togglePoopPile(show) {
  const element = document.querySelector(".poop-pile");

  if (element) {
    element.classList.toggle("hidden", !show);
  }
}

exports.togglePoopPile = togglePoopPile;
},{"./utils":"ts/utils.ts"}],"ts/GameStates.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GameStates;

(function (GameStates) {
  GameStates[GameStates["INIT"] = 0] = "INIT";
  GameStates[GameStates["HATCHING"] = 1] = "HATCHING";
  GameStates[GameStates["IDLING"] = 3] = "IDLING";
  GameStates[GameStates["SLEEP"] = 4] = "SLEEP";
  GameStates[GameStates["FEEDING"] = 5] = "FEEDING";
  GameStates[GameStates["CELEBRATING"] = 6] = "CELEBRATING";
  GameStates[GameStates["POOPING"] = 7] = "POOPING";
  GameStates[GameStates["DEAD"] = 8] = "DEAD";
  GameStates[GameStates["HUNGRY"] = 9] = "HUNGRY";
  GameStates[GameStates["POOPED"] = 9] = "POOPED";
})(GameStates || (GameStates = {}));

exports.default = GameStates;
},{}],"ts/gameState.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const ui_1 = require("./ui");

const constants_1 = require("./constants");

const GameStates_1 = __importDefault(require("./GameStates"));

const utils_1 = require("./utils");

class GameState {
  constructor() {
    this.current = GameStates_1.default.INIT;
    this.clock = 1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.timeToStartPooping = -1;
    this.timeToEndPooping = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.wakeTime = -1;
    this.scene = 0;
  }

  clearTimes() {
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.timeToStartPooping = -1;
    this.timeToEndPooping = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.wakeTime = -1;
  }

  startGame() {
    this.current = GameStates_1.default.IDLING;
    this.scene = Math.random() > constants_1.RAIN_CHANCE ? 0 : 1;
    ui_1.modScene(constants_1.SCENES[this.scene]);
    utils_1.toggleClassOnElement(".feed-control", "warning", false);
    utils_1.toggleClassOnElement(".poop-control", "warning", false);
    ui_1.modEnvironmentButton(constants_1.SCENES[this.scene]);
    ui_1.modSnail("");
    this.sleepTime = this.clock + constants_1.DAY_LENGTH;
    this.hungryTime = constants_1.getNextHungerTime(this.clock);
  }

  tick() {
    this.clock++;

    switch (this.clock) {
      case this.hungryTime:
        this.getHungry();
        break;

      case this.dieTime:
        this.die();
        break;

      case this.timeToStartCelebrating:
        this.startCelebrating();
        break;

      case this.timeToEndCelebrating:
        this.endCelebrating();
        break;

      case this.timeToStartPooping:
        this.startPooping();
        break;

      case this.timeToEndPooping:
        this.endPooping();
        break;

      case this.sleepTime:
        this.sleep();
        break;

      case this.wakeTime:
        this.wake();
        break;
    }
  }

  changeWeather() {
    if (this.current !== GameStates_1.default.SLEEP) {
      this.scene = (this.scene + 1) % constants_1.SCENES.length;
      ui_1.modScene(constants_1.SCENES[this.scene]);
      ui_1.modEnvironmentButton(constants_1.SCENES[this.scene]);
    }
  }

  cleanUpPoop() {
    if (this.current === GameStates_1.default.POOPED) {
      this.dieTime = -1;
      ui_1.togglePoopPile(false);
      this.hungryTime = constants_1.getNextHungerTime(this.clock);
      utils_1.toggleClassOnElement(".poop-control", "warning", false);
    }
  }

  sleep() {
    this.current = GameStates_1.default.SLEEP;
    ui_1.modSnail("sleeping");
    ui_1.modScene("night");
    this.clearTimes();
    utils_1.toggleClassOnElement(".feed-control", "warning", false);
    utils_1.toggleClassOnElement(".poop-control", "warning", false);
    this.wakeTime = this.clock + constants_1.NIGHT_LENGTH;
  }

  wake() {
    this.startGame();
  }

  getHungry() {
    this.current = GameStates_1.default.HUNGRY;
    this.dieTime = constants_1.getNextDieTime(this.clock);
    this.hungryTime = -1;
    utils_1.toggleClassOnElement(".feed-control", "warning", true);
    ui_1.modSnail("hungry");
  }

  die() {
    this.current = GameStates_1.default.DEAD;
    ui_1.modSnail("dead");
    this.clearTimes();
    utils_1.toggleClassOnElement(".game-screen", "death-menu");
  }

  startPooping() {
    this.current = GameStates_1.default.POOPING;
    this.timeToStartPooping = -1;
    this.timeToEndPooping = this.clock + 4;
    ui_1.modSnail("pooping");
  }

  endPooping() {
    this.current = GameStates_1.default.POOPED;
    this.timeToEndPooping = -1;
    this.dieTime = constants_1.getNextDieTime(this.clock);
    utils_1.toggleClassOnElement(".poop-control", "warning", true);
    ui_1.togglePoopPile(true);
    ui_1.modSnail("");
  }

  startCelebrating() {
    this.current = GameStates_1.default.CELEBRATING;
    ui_1.modSnail("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  }

  endCelebrating() {
    this.timeToStartCelebrating = -1;
    this.timeToStartPooping = constants_1.getNextPoopTime(this.clock);
    this.current = GameStates_1.default.IDLING;
    ui_1.modSnail("");
  }

  feed() {
    if (this.current !== GameStates_1.default.HUNGRY) {
      return;
    }

    this.current = GameStates_1.default.FEEDING;
    this.dieTime = -1;
    ui_1.modSnail("eating");
    utils_1.toggleClassOnElement(".feed-control", "warning", false);
    this.timeToStartCelebrating = this.clock + 2;
  }

}

exports.default = GameState;
},{"./ui":"ts/ui.ts","./constants":"ts/constants.ts","./GameStates":"ts/GameStates.ts","./utils":"ts/utils.ts"}],"ts/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const constants_1 = require("./constants");

const buttons_1 = __importDefault(require("./buttons"));

const gameState_1 = __importDefault(require("./gameState"));

(async function initialize() {
  const gameState = new gameState_1.default();
  buttons_1.default(gameState);
  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      gameState.tick();
      nextTimeToTick = now + constants_1.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
})();
},{"./constants":"ts/constants.ts","./buttons":"ts/buttons.ts","./gameState":"ts/gameState.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50327" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/index.ts"], null)
//# sourceMappingURL=/ts.841fc46b.js.map