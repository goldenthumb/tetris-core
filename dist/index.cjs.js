'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var EventEmitter = _interopDefault(require('event-emitter'));
var _ = _interopDefault(require('lodash'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Stage =
/*#__PURE__*/
function () {
  function Stage(_ref) {
    var maxStage = _ref.maxStage,
        speed = _ref.speed;

    _classCallCheck(this, Stage);

    this._options = {
      maxStage: maxStage,
      speed: speed
    };
    this._speed = speed.min;
    this._stage = 0;
    this._emitter = new EventEmitter();
  }

  _createClass(Stage, [{
    key: "on",
    value: function on(eventName, listener) {
      this._emitter.on(eventName, listener);
    }
  }, {
    key: "next",
    value: function next() {
      if (this._stage++ < this._options.maxStage) {
        this._setSpeed();
      }
    }
  }, {
    key: "_setSpeed",
    value: function _setSpeed() {
      var _this$_options$speed = this._options.speed,
          min = _this$_options$speed.min,
          max = _this$_options$speed.max;
      this._speed = min - (min - max) * (this._stage / this._options.maxStage);

      this._emitter.emit('update', {
        stage: this._stage,
        speed: this._speed
      });
    }
  }, {
    key: "getState",
    value: function getState() {
      return {
        stage: this._stage
      };
    }
  }]);

  return Stage;
}();

var Block =
/*#__PURE__*/
function () {
  function Block(blocks) {
    _classCallCheck(this, Block);

    this._width = null;
    this._height = null;
    this._block = blocks[_.random(0, blocks.length - 1)];
    this._typeSize = Object.entries(this._block.types).length;
    this._type = _.random(0, this._typeSize - 1);

    this._setBlockSize();
  }

  _createClass(Block, [{
    key: "rotate",
    value: function rotate() {
      var isClockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      isClockwise ? this._clockwise() : this._anticlockwise();

      this._setBlockSize();

      return this;
    }
  }, {
    key: "colorize",
    value: function colorize() {
      var _this = this;

      return _.cloneDeep(this._block.types[this._type]).map(function (line) {
        return line.map(function (cell, i) {
          if (line[i] === 1) return _this._block.color;else return 0;
        });
      });
    }
  }, {
    key: "_clockwise",
    value: function _clockwise() {
      if (++this._type > this._typeSize - 1) {
        this._type = 0;
      }
    }
  }, {
    key: "_anticlockwise",
    value: function _anticlockwise() {
      if (--this._type < 0) {
        this._type = this._typeSize - 1;
      }
    }
  }, {
    key: "_setBlockSize",
    value: function _setBlockSize() {
      this._height = this._block.types[this._type].length;
      this._width = this._block.types[this._type][0].length;
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
  }]);

  return Block;
}();

var Data =
/*#__PURE__*/
function (_Array) {
  _inherits(Data, _Array);

  function Data(_ref) {
    var _this;

    var rows = _ref.rows,
        cols = _ref.cols;

    _classCallCheck(this, Data);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Data).call(this));
    _this.rows = rows;
    _this.cols = cols;
    return _this;
  }

  _createClass(Data, [{
    key: "initialize",
    value: function initialize() {
      for (var i = 0; i < this.rows; i++) {
        this[i] = new Array(this.cols).fill(0);
      }

      return this;
    }
  }, {
    key: "set",
    value: function set(data) {
      var _this2 = this;

      if (data.length !== this.rows) {
        throw new Error('rows is not valid');
      }

      data.forEach(function (row, i) {
        if (row.length !== _this2.cols) {
          throw new Error('cols is not valid');
        }

        _this2[i] = row;
      });
      return this;
    }
  }]);

  return Data;
}(_wrapNativeSuper(Array));

var isEmpty = function isEmpty(value) {
  return value === 0 || value === undefined || value === null;
};
var circulateTwoDArray = function circulateTwoDArray(array, fn) {
  array.forEach(function (row, y) {
    row.forEach(function (col, x) {
      fn(y, x, array);
    });
  });
};
var isConflictTwoDArray = function isConflictTwoDArray(a, b) {
  var result = false;
  circulateTwoDArray(a, function (y, x) {
    if (!isEmpty(a[y][x]) && !isEmpty(b[y][x])) result = true;
  });
  return result;
};
var cloneTwoDArray = function cloneTwoDArray(data) {
  var newData = new Data({
    rows: data.length,
    cols: data[0].length
  }).initialize();
  circulateTwoDArray(data, function (y, x) {
    newData[y][x] = data[y][x];
  });
  return newData;
};

var BlockManager =
/*#__PURE__*/
function () {
  function BlockManager(_ref, blocks) {
    var rows = _ref.rows,
        cols = _ref.cols,
        startPoint = _ref.startPoint;

    _classCallCheck(this, BlockManager);

    this._startPoint = startPoint;
    this._displaySize = {
      rows: rows,
      cols: cols
    };
    this._blocks = blocks;
    this._emitter = new EventEmitter();
    this._block = null;
    this._nextBlock = null;
    this._position = null;
    this._nextPosition = null;
    this._current = new Data(this._displaySize).initialize();
    this._total = new Data(this._displaySize).initialize();
    this._display = new Data(this._displaySize).initialize();
    this.change();
  }

  _createClass(BlockManager, [{
    key: "on",
    value: function on(eventName, listener) {
      this._emitter.on(eventName, listener);
    }
  }, {
    key: "change",
    value: function change() {
      this._block = this._nextBlock || new Block(this._blocks);
      this._position = this._startPoint;
      this._nextPosition = this._startPoint;
      this._nextBlock = new Block(this._blocks);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate() {
      this._block.rotate();

      this._nextPosition = this._position;

      if (!this._isAvailable()) {
        this._block.rotate(false);

        return;
      }

      this._setDisplay();
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      var _this$_position = this._position,
          x = _this$_position.x,
          y = _this$_position.y;
      this._nextPosition = {
        x: x,
        y: y + 1
      };
      if (!this._isAvailable()) return;

      this._setDisplay();
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      var _this$_position2 = this._position,
          x = _this$_position2.x,
          y = _this$_position2.y;
      this._nextPosition = {
        x: x - 1,
        y: y
      };
      if (!this._isAvailable()) return;

      this._setDisplay();
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      var _this$_position3 = this._position,
          x = _this$_position3.x,
          y = _this$_position3.y;
      this._nextPosition = {
        x: x + 1,
        y: y
      };
      if (!this._isAvailable()) return;

      this._setDisplay();
    }
  }, {
    key: "getState",
    value: function getState() {
      return {
        display: this._display,
        nextBlock: this._nextBlock.colorize()
      };
    }
  }, {
    key: "_isAvailable",
    value: function _isAvailable() {
      var _this = this;

      if (this._isEdge()) return false;

      if (this._isOnTheBottom() || this._isConflict()) {
        if (this._position.y < 0) {
          this._emitter.emit('end');

          return false;
        }

        circulateTwoDArray(this._block.colorize(), function (y, x, block) {
          var blockY = _this._position.y + y;
          var blockX = _this._position.x + x;

          if (!isEmpty(block[y][x])) {
            _this._total[blockY][blockX] = block[y][x];
          }
        });

        this._clearLine();

        this.change().moveDown();
      }

      return true;
    }
  }, {
    key: "_clearLine",
    value: function _clearLine() {
      var _this2 = this;

      var clearLine = 0;

      this._total.forEach(function (row, i) {
        if (_.every(row)) {
          clearLine++;

          var line = _.fill(row, 0);

          _this2._total.splice(i, 1);

          _this2._total.unshift(line);
        }
      });

      if (clearLine) {
        this._emitter.emit('clear', clearLine);
      }
    }
  }, {
    key: "_setDisplay",
    value: function _setDisplay() {
      var _this3 = this;

      this._position = this._nextPosition;
      circulateTwoDArray(this._block.colorize(), function (y, x, block) {
        if (!isEmpty(block[y][x])) {
          _this3._current[_this3._position.y + y][_this3._position.x + x] = block[y][x];
        }
      });
      this._display = this._merge(cloneTwoDArray(this._total), this._current);
      this._current = new Data(this._displaySize).initialize();

      this._emitter.emit('render', this.getState());
    }
  }, {
    key: "_isEdge",
    value: function _isEdge() {
      return this._nextPosition.x < 0 || this._block.height + this._nextPosition.y > this._total.rows + 1 || this._block.width + this._nextPosition.x > this._total.cols;
    }
  }, {
    key: "_isOnTheBottom",
    value: function _isOnTheBottom() {
      return this._nextPosition.y + this._block.height > this._total.rows;
    }
  }, {
    key: "_isConflict",
    value: function _isConflict() {
      var _this4 = this;

      var current = new Data(this._displaySize).initialize();
      circulateTwoDArray(this._block.colorize(), function (y, x, block) {
        if (!isEmpty(block[y][x])) {
          current[_this4._nextPosition.y + y][_this4._nextPosition.x + x] = block[y][x];
        }
      });
      return isConflictTwoDArray(this._total, current);
    }
  }, {
    key: "_merge",
    value: function _merge(total, append) {
      circulateTwoDArray(total, function (y, x) {
        if (!isEmpty(append[y][x])) total[y][x] = append[y][x];
      });
      return total;
    }
  }]);

  return BlockManager;
}();

var Score =
/*#__PURE__*/
function () {
  function Score() {
    _classCallCheck(this, Score);

    this._total = 0;
    this._emitter = new EventEmitter();
  }

  _createClass(Score, [{
    key: "on",
    value: function on(eventName, listener) {
      this._emitter.on(eventName, listener);
    }
  }, {
    key: "add",
    value: function add(line) {
      var stage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var score = parseInt(stage * 5 * Math.pow(2, line));
      this._total += score;

      this._emitter.emit('update', this._total);

      return this._total;
    }
  }, {
    key: "getState",
    value: function getState() {
      return {
        score: this._total
      };
    }
  }]);

  return Score;
}();

var TetrisCore =
/*#__PURE__*/
function () {
  function TetrisCore() {
    var OPTIONS$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPTIONS$$1;

    _classCallCheck(this, TetrisCore);

    this._stage = new Stage(OPTIONS$$1.stage);
    this._block = new BlockManager(OPTIONS$$1.display, OPTIONS$$1.blocks);
    this._score = new Score();
    this._emitter = new EventEmitter();
    this._scoreRate = OPTIONS$$1.stage.scoreRate;
    this._interval = null;
    this._state = {
      stage: 1,
      score: 0,
      speed: OPTIONS$$1.stage.speed.min,
      nextBlock: null,
      display: null
    };

    this._attachEvents();
  }

  _createClass(TetrisCore, [{
    key: "on",
    value: function on(eventName, listener) {
      this._emitter.on(eventName, listener);
    }
  }, {
    key: "start",
    value: function start() {
      this._stage.next();
    }
  }, {
    key: "rotate",
    value: function rotate() {
      this._block.rotate();
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this._block.moveDown();
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this._block.moveLeft();
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this._block.moveRight();
    }
  }, {
    key: "getState",
    value: function getState() {
      return this._state;
    }
  }, {
    key: "_attachEvents",
    value: function _attachEvents() {
      var _this = this;

      this._block.on('render', function (data) {
        return _this._setState(data);
      });

      this._score.on('update', function (score) {
        return _this._setState({
          score: score
        });
      });

      this._stage.on('update', function (_ref) {
        var stage = _ref.stage,
            speed = _ref.speed;

        _this._setState({
          stage: stage,
          speed: speed
        });

        clearInterval(_this._interval);
        _this._interval = setInterval(function () {
          return _this._block.moveDown();
        }, speed);
      });

      this._block.on('clear', function (line) {
        var stage = _this._state.stage;

        var total = _this._score.add(line, stage);

        if (total > stage * _this._scoreRate) _this._stage.next();
      });

      this._block.on('end', function () {
        clearInterval(_this._interval);

        _this._emitter.emit('end');
      });
    }
  }, {
    key: "_setState",
    value: function _setState(state) {
      this._state = _objectSpread({}, this._state, state);

      this._emitter.emit('render', this._state);
    }
  }]);

  return TetrisCore;
}();

module.exports = TetrisCore;
