const get = require('lodash.get')
const {occupySlice} = require('../utils')

module.exports = function(tokens, highlighted, block, editorState){
  const blockKey = block.getKey()
  const beforeBlock = editorState.getCurrentContent().getBlockBefore(blockKey);
  let decorations = Array(block.getText().length).fill(null);
  
  if(block.getText().includes('*/') ||
    (beforeBlock 
      && !beforeBlock.getText().includes('*/') 
      && get(highlighted, `${beforeBlock.getKey()}.tok0.type`, '')==='comment')){

    const token = {
      alias: undefined,
      content: block.getText(),
      greedy: false,
      length: block.getLength(),
      type: "comment"
    }

    const tokenId = 'tok0'
    const resultId = blockKey + '-' + tokenId;
    
    highlighted[blockKey] = {}
    highlighted[blockKey][tokenId] = token;
    
    occupySlice(decorations, 0, 0 + token.length, resultId);
    return decorations
  }else{
    return null
  }
}