const {occupySlice} = require('../utils')

const javascript = require('./javascript')

module.exports = {
  javascript,
  base:function(tokens, block, highlighted){
    let decorations = Array(block.getText().length).fill(null);
    let offset = 0;
    const blockKey = block.getKey()
    
    for (var i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (typeof token === 'string') {
        offset += token.length;
      } else {
        const tokenId = 'tok' + offset;
        const resultId = blockKey + '-' + tokenId;

        highlighted[blockKey][tokenId] = token;

        occupySlice(decorations, offset, offset + token.length, resultId);
        offset += token.length;
      }
    }
    return decorations
  }
}