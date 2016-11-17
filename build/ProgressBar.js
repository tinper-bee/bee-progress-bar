'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ROUND_PRECISION = 1000;

/**
 * 自定义验证children是<ProgressBar>的实例.
 * @props 实例后的propTypes
 * @propName 本身propTypes的属性名 即 children
 * @componentName 实例后的children名 期望是ProgressBar
 */
function onlyProgressBar(props, propName, componentName) {
  var children = props[propName];
  if (!children) {
    return null;
  }

  var error = null;

  _react2["default"].Children.forEach(children, function (child) {
    if (error) {
      return;
    }

    if (child.type === ProgressBar) {
      // eslint-disable-line no-use-before-define
      return;
    }

    var childIdentifier = _react2["default"].isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
    error = new Error('Children of ' + componentName + ' can contain only ProgressBar ' + ('components. Found ' + childIdentifier + '.'));
  });

  return error;
}

var propTypes = {
  min: _react.PropTypes.number,
  now: _react.PropTypes.number,
  max: _react.PropTypes.number,
  label: _react.PropTypes.node,
  srOnly: _react.PropTypes.bool,
  striped: _react.PropTypes.bool,
  active: _react.PropTypes.bool,
  children: onlyProgressBar,

  /**
   * @private
   */
  isChild: _react.PropTypes.bool
};

var defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

/**
 * 计算实际显示比例 
 * @now 显示的总数值
 * @min 最小数值
 * @max 最大数值
 */
function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

var clsPrefix = 'u-progress-bar';

var ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ProgressBar.prototype.renderProgressBar = function renderProgressBar(_ref) {
    var min = _ref.min;
    var now = _ref.now;
    var max = _ref.max;
    var label = _ref.label;
    var srOnly = _ref.srOnly;
    var striped = _ref.striped;
    var active = _ref.active;
    var colors = _ref.colors;
    var className = _ref.className;
    var style = _ref.style;

    var others = _objectWithoutProperties(_ref, ['min', 'now', 'max', 'label', 'srOnly', 'striped', 'active', 'colors', 'className', 'style']);

    var classes = {
      active: active,
      'u-progress-bar': true,
      'u-progress-bar-striped': active || striped
    };

    if (colors) {
      classes[clsPrefix + '-' + colors] = true;
    }
    //返回不敢wrapper的progressbar
    return _react2["default"].createElement(
      'div',
      _extends({}, others, {
        role: 'progressbar',
        className: (0, _classnames2["default"])(className, classes),
        style: _extends({ width: getPercentage(now, min, max) + '%' }, style),
        'u-valuenow': now,
        'u-valuemin': min,
        'u-valuemax': max
      }),
      srOnly ? _react2["default"].createElement(
        'span',
        { className: 'sr-only' },
        label
      ) : label
    );
  };

  ProgressBar.prototype.render = function render() {
    //先处理以组ProgressBar形式使用情况
    var _props = this.props;
    var isChild = _props.isChild;

    var props = _objectWithoutProperties(_props, ['isChild']);

    // 判断isChild是否为true,如果是true,直接渲染成bar


    if (isChild) {
      return this.renderProgressBar(props);
    }

    var min = props.min;
    var now = props.now;
    var max = props.max;
    var label = props.label;
    var srOnly = props.srOnly;
    var striped = props.striped;
    var active = props.active;
    var colors = props.colors;
    var className = props.className;
    var style = props.style;
    var children = props.children;

    var wrapperProps = _objectWithoutProperties(props, ['min', 'now', 'max', 'label', 'srOnly', 'striped', 'active', 'colors', 'className', 'style', 'children']);

    /**
    * 如果是单独直接用<ProgressBar /> 走children判断为false语句。
    * 如果以组的形式使用<ProgressBar><ProgressBar now={10} /><ProgressBar now={20}/></ProgressBar> 走判断语句为true，
    * 将children分别加上isChild=true的属性
    */


    return _react2["default"].createElement(
      'div',
      _extends({}, wrapperProps, {
        className: (0, _classnames2["default"])(className, 'u-progress')
      }),
      children ? _react2["default"].Children.map(children, function (child) {
        return (0, _react.cloneElement)(child, { isChild: true });
      }) : this.renderProgressBar({
        min: min, now: now, max: max, label: label, srOnly: srOnly, striped: striped, active: active, colors: colors, className: className, style: style
      })
    );
  };

  return ProgressBar;
}(_react2["default"].Component);

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

exports["default"] = ProgressBar;
module.exports = exports['default'];