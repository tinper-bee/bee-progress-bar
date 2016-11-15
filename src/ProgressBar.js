import classNames from 'classnames';
import React, { cloneElement, PropTypes } from 'react';


const ROUND_PRECISION = 1000;

/**
 * 自定义验证children是<ProgressBar>的实例.
 * @props 实例后的propTypes
 * @propName 本身propTypes的属性名 即 children
 * @componentName 实例后的children名 期望是ProgressBar
 */
function onlyProgressBar(props, propName, componentName) {
  const children = props[propName];
  if (!children) {
    return null;
  }

  let error = null;

  React.Children.forEach(children, child => {
    if (error) {
      return;
    }

    if (child.type === ProgressBar) { // eslint-disable-line no-use-before-define
      return;
    }

    const childIdentifier = React.isValidElement(child) ?
      child.type.displayName || child.type.name || child.type :
      child;
    error = new Error(
      `Children of ${componentName} can contain only ProgressBar ` +
      `components. Found ${childIdentifier}.`
    );
  });

  return error;
}

const propTypes = {
  min: PropTypes.number,
  now: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.node,
  srOnly: PropTypes.bool,
  striped: PropTypes.bool,
  active: PropTypes.bool,
  children: onlyProgressBar,

  /**
   * @private
   */
  isChild: PropTypes.bool,
};

const defaultProps = {
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
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

const clsPrefix = 'u-progress-bar';

class ProgressBar extends React.Component {
  renderProgressBar({
    min, now, max, label, srOnly, striped, active, colors, className, style, ...others
  }) {

    const classes = {
      active,
      'u-progress-bar': true,
      'u-progress-bar-striped': active || striped
    };

    if(colors) {
    	classes[`${clsPrefix}-${colors}`] = true;
    }
    //返回不敢wrapper的progressbar
    return (
      <div
        {...others}
        role="progressbar"
        className={classNames(className, classes)}
        style={{ width: `${getPercentage(now, min, max)}%`, ...style }}
        u-valuenow={now}
        u-valuemin={min}
        u-valuemax={max}
      >
        {srOnly ? <span className="sr-only">{label}</span> : label}
      </div>
    );
  }

  render() {
  	//先处理以组ProgressBar形式使用情况
    const { isChild, ...props } = this.props;

    // 判断isChild是否为true,如果是true,直接渲染成bar
    if (isChild) {
      return this.renderProgressBar(props);
    }

    const {
      min,
      now,
      max,
      label,
      srOnly,
      striped,
      active,
      colors,
      className,
      style,
      children,
      ...wrapperProps
    } = props;

    /**
	 * 如果是单独直接用<ProgressBar /> 走children判断为false语句。
	 * 如果以组的形式使用<ProgressBar><ProgressBar now={10} /><ProgressBar now={20}/></ProgressBar> 走判断语句为true，
	 * 将children分别加上isChild=true的属性
	 */
    return (
      <div
        {...wrapperProps}
        className={classNames(className, 'u-progress')}
      >
        {children ?
          React.Children.map(children, child => (
            cloneElement(child, { isChild: true }
          ))) :
          this.renderProgressBar({
            min, now, max, label, srOnly, striped, active, colors, className, style,
          })
        }
      </div>
    );
  }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default  ProgressBar;
