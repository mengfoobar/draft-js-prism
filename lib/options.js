var Immutable = require('immutable');
var React = require('react');
var extend = require('extend');

const SUPPORTED_CODE_BLOCKS=  require('./SupportedLangHelper.js').SupportedCodeBlocks

/**
 Filter block to only highlight code blocks

 @param {Draft.ContentBlock}
 @return {Boolean}
 */
function defaultFilter(block) {
    var blockType=block.getType();

    if(SUPPORTED_CODE_BLOCKS[blockType]){
        return SUPPORTED_CODE_BLOCKS[blockType]
    }
}

/**
 Return syntax for highlighting a code block

 @param {Draft.ContentBlock}
 @return {String}
 */
function defaultGetSyntax(block) {
    if (block.getData) {
        return block.getData().syntax;
    }

    return null;
}

/**
 Default render for token

 @param {Object} props
 @return {React.Element}
 */
function defaultRender(props) {
    props = extend({}, props, {
        className: 'prism-token token ' + props.type
    });

    return React.createElement(
        "span",
        props,
        props.children
    );
}

var PrismOptions = Immutable.Record({
    // Default language to use
    defaultSyntax:      null,

    // Filter block before highlighting
    filter:             defaultFilter,

    // Function to get syntax for a block
    getSyntax:          defaultGetSyntax,

    // Render a decorated text for a token
    render:             defaultRender
});

module.exports = PrismOptions;
