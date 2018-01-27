module.exports={
  occupySlice: function(targetArr, start, end, componentKey) {
    for (var ii = start; ii < end; ii++) {
      targetArr[ii] = componentKey;
    }
  }
}