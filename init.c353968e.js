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
})({"ts/ui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeModal = exports.togglePoopBag = exports.modeScene = exports.modFox = void 0;

function modFox(state) {
  const element = document.querySelector(".fox");

  if (element) {
    element.className = `fox fox-${state}`;
  }
}

exports.modFox = modFox;

function modeScene(state) {
  const element = document.querySelector(".game");

  if (element) {
    element.className = `game ${state}`;
  }
}

exports.modeScene = modeScene;

function togglePoopBag(show) {
  const element = document.querySelector(".poop-bag");

  if (element) {
    element.classList.toggle("hidden", !show);
  }
}

exports.togglePoopBag = togglePoopBag;

function writeModal(text = "") {
  const element = document.querySelector(".modal");

  if (element) {
    element.innerHTML = `<div class="modal-inner">${text}</div>`;
  }
}

exports.writeModal = writeModal;
},{}],"ts/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextPoopTime = exports.getNextDieTime = exports.getNextHungerTime = exports.NIGHT_LENGTH = exports.DAY_LENGTH = exports.SCENES = exports.RAIN_CHANCE = exports.ICONS = exports.TICK_RATE = void 0;
exports.TICK_RATE = 3000;
exports.ICONS = ["fish", "poop", "weather"];
exports.RAIN_CHANCE = 0.2;
exports.SCENES = ["day", "rain"];
exports.DAY_LENGTH = 60;
exports.NIGHT_LENGTH = 3;

exports.getNextHungerTime = clock => Math.floor(Math.random() * 3) + 8 + clock;

exports.getNextDieTime = clock => Math.floor(Math.random() * 2) + 3 + clock;

exports.getNextPoopTime = clock => Math.floor(Math.random() * 3) + 8 + clock;
},{}],"ts/gameStates.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GameState;

(function (GameState) {
  GameState[GameState["INIT"] = 0] = "INIT";
  GameState[GameState["HATCHING"] = 1] = "HATCHING";
  GameState[GameState["IDLING"] = 3] = "IDLING";
  GameState[GameState["SLEEP"] = 4] = "SLEEP";
  GameState[GameState["FEEDING"] = 5] = "FEEDING";
  GameState[GameState["CELEBRATING"] = 6] = "CELEBRATING";
  GameState[GameState["POOPING"] = 7] = "POOPING";
  GameState[GameState["DEAD"] = 8] = "DEAD";
  GameState[GameState["HUNGRY"] = 9] = "HUNGRY";
})(GameState || (GameState = {}));

exports.default = GameState;
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
exports.handleUserAction = void 0;

const ui_1 = require("./ui");

const constants_1 = require("./constants");

const gameStates_1 = __importDefault(require("./gameStates"));

const gameState = {
  current: gameStates_1.default.INIT,
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  scene: 0,

  tick() {
    this.clock++;

    switch (this.clock) {
      case this.sleepTime:
        this.wake();
        break;

      case this.hungryTime:
        this.sleep();
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

      case this.poopTime:
        this.poop();
    }
  },

  startGame() {
    this.current = gameStates_1.default.HATCHING;
    this.wakeTime = this.clock + 3;
    ui_1.modFox("egg");
    ui_1.modeScene("day");
    ui_1.writeModal();
  },

  wake() {
    this.current = gameStates_1.default.IDLING;
    this.wakeTime = -1;
    ui_1.modFox("idling");
    this.scene = Math.random() > constants_1.RAIN_CHANCE ? 0 : 1;
    ui_1.modeScene(constants_1.SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + constants_1.DAY_LENGTH;
    this.hungryTime = constants_1.getNextHungerTime(this.clock);
  },

  handleUserAction(icon) {
    if ([gameStates_1.default.SLEEP, gameStates_1.default.FEEDING, gameStates_1.default.CELEBRATING, gameStates_1.default.HATCHING].includes(this.current)) {
      return;
    }

    if (this.current === gameStates_1.default.INIT || this.current === gameStates_1.default.DEAD) {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;

      case "poop":
        this.cleanUpPoop();
        break;

      case "fish":
        this.feed();
        break;

      default:
        break;
    }
  },

  changeWeather() {
    this.scene = (this.scene + 1) % constants_1.SCENES.length;
    ui_1.modeScene(constants_1.SCENES[this.scene]);
    this.determineFoxState();
  },

  cleanUpPoop() {
    if (this.current === gameStates_1.default.POOPING) {
      this.dieTime = -1;
      ui_1.togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = constants_1.getNextHungerTime(this.clock);
    }
  },

  poop() {
    this.current = gameStates_1.default.POOPING;
    this.poopTime = -1;
    this.dieTime = constants_1.getNextDieTime(this.clock);
    ui_1.modFox("pooping");
  },

  sleep() {
    this.current = gameStates_1.default.SLEEP;
    ui_1.modFox("sleep");
    ui_1.modeScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + constants_1.NIGHT_LENGTH;
  },

  getHungry() {
    this.current = gameStates_1.default.HUNGRY;
    this.dieTime = constants_1.getNextDieTime(this.clock);
    this.hungryTime = -1;
    ui_1.modFox("hungry");
  },

  die() {
    this.current = gameStates_1.default.DEAD;
    ui_1.modeScene("dead");
    ui_1.modFox("dead");
    this.clearTimes();
    ui_1.writeModal("The fox died :( <br/> Press the middle button to start");
  },

  startCelebrating() {
    this.current = gameStates_1.default.CELEBRATING;
    ui_1.modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },

  endCelebrating() {
    this.timeToStartCelebrating = -1;
    this.current = gameStates_1.default.IDLING;
    this.determineFoxState();
    ui_1.togglePoopBag(false);
  },

  determineFoxState() {
    if (this.current === gameStates_1.default.IDLING) {
      if (constants_1.SCENES[this.scene] === "rain") {
        ui_1.modFox("rain");
      } else {
        ui_1.modFox("idling");
      }
    }
  },

  feed() {
    if (this.current !== gameStates_1.default.HUNGRY) {
      return;
    }

    this.current = gameStates_1.default.FEEDING;
    this.dieTime = -1;
    this.poopTime = constants_1.getNextPoopTime(this.clock);
    ui_1.modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },

  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  }

};
exports.handleUserAction = gameState.handleUserAction.bind(gameState);
exports.default = gameState;
},{"./ui":"ts/ui.ts","./constants":"ts/constants.ts","./gameStates":"ts/gameStates.ts"}],"ts/buttons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const constants_1 = require("./constants");

const toggleHighlighted = (icon, show) => {
  const element = document.querySelector(`.${constants_1.ICONS[icon]}-icon`);

  if (element) {
    const classList = element.classList;
    classList.toggle("highlighted", show);
  }
};

function initButtons(handleUserAction) {
  let selectedIcon = 0;

  function buttonClick({
    target
  }) {
    if (target instanceof Element) {
      if (target.classList.contains("left-btn")) {
        toggleHighlighted(selectedIcon, false);
        selectedIcon = (2 + selectedIcon) % constants_1.ICONS.length;
        toggleHighlighted(selectedIcon, true);
      } else if (target.classList.contains("right-btn")) {
        toggleHighlighted(selectedIcon, false);
        selectedIcon = (1 + selectedIcon) % constants_1.ICONS.length;
        toggleHighlighted(selectedIcon, true);
      } else {
        handleUserAction(constants_1.ICONS[selectedIcon]);
      }
    }
  }

  const buttonElement = document.querySelector(".buttons");

  if (buttonElement) {
    buttonElement.addEventListener("click", buttonClick);
  }
}

exports.default = initButtons;
},{"./constants":"ts/constants.ts"}],"ts/init.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const gameState_1 = __importStar(require("./gameState"));

const constants_1 = require("./constants");

const buttons_1 = __importDefault(require("./buttons"));

(async function init() {
  buttons_1.default(gameState_1.handleUserAction);
  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      gameState_1.default.tick();
      nextTimeToTick = now + constants_1.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
})();
},{"./gameState":"ts/gameState.ts","./constants":"ts/constants.ts","./buttons":"ts/buttons.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53023" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/init.ts"], null)
//# sourceMappingURL=/init.c353968e.js.map