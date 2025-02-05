/**
 * Original code at https://github.com/SunHuawei/stylelint-force-app-name-prefix
 *
 * @author @SunHuawei What modified:
 *
 *   - Use `.uc-` prefix instead of `.uc `
 *   - Add support for tag prefixes: `uc-`
 */
var _ = require('lodash');
var stylelint = require('stylelint');

var ruleName = 'plugin/stylelint-force-app-name-prefix';

var optionsSchema = {
  appName: _.isString,
};

const messages = stylelint.utils.ruleMessages(ruleName, {
  invalid: (selector, appName) => 'Selector "' + selector + '" is out of control, please wrap within .' + appName,
  invalidKeyFrames: (keyframesName, appName) =>
    'Keyframes name "' + keyframesName + '" is out of control, please prefix with ' + appName + '-',
  invalidFontFace: (fontFamily, appName) =>
    'Custom font-family "' + fontFamily + '" is out of control, please prefix with ' + appName + '-',
});

function findTopParentSelector(node) {
  if (node.parent.type === 'root' || node.parent.type === 'atrule') {
    return node.selector;
  } else {
    return findTopParentSelector(node.parent);
  }
}

function isInsideAtRule(node) {
  if (node.parent.type === 'atrule') {
    return true;
  } else if (node.parent.type === 'root') {
    return false;
  } else {
    return findTopParentSelector(node.parent);
  }
}

module.exports = stylelint.createPlugin(ruleName, function (options) {
  return function (root, result) {
    if (!options) return;
    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: options,
      possible: optionsSchema,
    });
    if (!validOptions) return;

    const whiteList = ['.' + options.appName, /^:.*/];

    root.walkAtRules('keyframes', (rule) => {
      const keyframesName = rule.params;

      if (keyframesName.indexOf(options.appName + '-') === -1) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: rule,
          message: messages.invalidKeyFrames(keyframesName, options.appName),
        });
      }
    });

    root.walkAtRules('font-face', (rule) => {
      rule.walkDecls('font-family', (decl) => {
        if (decl.value.indexOf(options.appName + '-') === -1) {
          stylelint.utils.report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: messages.invalidFontFace(decl.value, options.appName),
          });
        }
      });
    });

    root.walkRules((rule) => {
      if (isInsideAtRule(rule)) return;
      const topParentSelector = findTopParentSelector(rule);
      if (
        whiteList.find(function (whiteRule) {
          if (whiteRule instanceof RegExp) {
            return whiteRule.test(topParentSelector);
          } else {
            return whiteRule === topParentSelector;
          }
        })
      ) {
        // in white list, skipped
        return;
      }

      if (
        topParentSelector.indexOf('.' + options.appName + '-') === 0 ||
        topParentSelector.indexOf(options.appName + '-') === 0
      ) {
        // good
      } else {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: rule,
          message: messages.invalid(rule.selector, options.appName),
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
