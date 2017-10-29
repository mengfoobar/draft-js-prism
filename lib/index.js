var Immutable = require('immutable');
var Prism = require('./prism');
var traverse = require('traverse');

var PrismOptions = require('./options');

var SUPPORTED_LANG = require('./supportedLang').SupportedLanguages;

function PrismDecorator(options) {
  this.options = PrismOptions(options || {});
  this.highlighted = {};
}

/**
 * Return list of decoration IDs per character
 *
 * @param {ContentBlock}
 * @return {List<String>}
 */
PrismDecorator.prototype.getDecorations = function(block) {
  var tokens,
    token,
    tokenId,
    resultId,
    offset = 0;
  var filter = this.options.get('filter');
  var getSyntax = this.options.get('getSyntax');
  var blockKey = block.getKey();
  var blockText = block.getText();
  var decorations = Array(blockText.length).fill(null);

  this.highlighted[blockKey] = {};

  if (!filter(block)) {
    return Immutable.List(decorations);
  }

  var defaultSyntax = getSyntax(block) || this.options.get('defaultSyntax');

  var syntax = getLanguageOfBlockType(block.getType()) || defaultSyntax;

  // Allow for no syntax highlighting
  if (syntax == null) {
    return Immutable.List(decorations);
  }

  // Parse text using Prism
  var grammar = Prism.languages[syntax];
  tokens = Prism.tokenize(blockText, grammar);

  if (syntax === 'markup') {
    var leaves = traverse(tokens).reduce(function(acc, x) {
      if (this.isLeaf) {
        var newNode = null;
        if (this.key === 'content') {
          newNode = {
            content: x,
            length: x.length,
            type: this.parent.node.type
          };
        } else if (!isNaN(this.key)) {
          newNode = { content: x, length: x.length };
          if (!this.parent.isRoot) {
            newNode.type = this.parent.parent.node.type;
          }
        }
        if (newNode) acc.push(newNode);
      }
      return acc;
    }, []);

    tokens = leaves;
  }

  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i];

    if (typeof token === 'string') {
      offset += token.length;
    } else {
      tokenId = 'tok' + offset;
      resultId = blockKey + '-' + tokenId;

      this.highlighted[blockKey][tokenId] = token;

      occupySlice(decorations, offset, offset + token.length, resultId);
      offset += token.length;
    }
  }

  return Immutable.List(decorations);
};

/**
 * Return component to render a decoration
 *
 * @param {String}
 * @return {Function}
 */
PrismDecorator.prototype.getComponentForKey = function(key) {
  return this.options.get('render');
};

/**
 * Return props to render a decoration
 *
 * @param {String}
 * @return {Object}
 */
PrismDecorator.prototype.getPropsForKey = function(key) {
  var parts = key.split('-');
  var blockKey = parts[0];
  var tokId = parts[1];
  var token = this.highlighted[blockKey][tokId];

  return {
    type: token.type
  };
};

function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

function getLanguageOfBlockType(blockType) {
  if (blockType) {
    var arr = blockType.split('-');
    var language = arr[arr.length - 1];
    if (SUPPORTED_LANG.hasOwnProperty(language)) {
      return language;
    }
  }
  return;
}

module.exports = PrismDecorator;
