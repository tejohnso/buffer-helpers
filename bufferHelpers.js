Buffer.prototype.isEqualTo = function(buf) {
   if (buf.length !== this.length) {return false;}
   var j = 0, k = this.length;
   for (j = 0; j < k; j += 1) {
      if (buf[j] !== this[j]) {return false;}
   }
   return true;
};

Buffer.prototype.extractSubsets = function(startDelim, endDelim) {
   
   if (typeof startDelim === 'string') {startDelim = new Buffer(startDelim);}
   if (typeof endDelim === 'string') {endDelim = new Buffer(endDelim);}
   var startDelimIdx = 0, endDelimIdx = 0;
   var startSearchLimit = this.length - startDelim.length - endDelim.length;
   var endSearchLimit = this.length - endDelim.length + 1;
   var ret = [];
   
   for (startDelimIdx = 0; startDelimIdx < startSearchLimit; startDelimIdx += 1) {
      if (this.slice(startDelimIdx, startDelimIdx + startDelim.length).isEqualTo(startDelim)) { 
         for (endDelimIdx = startDelimIdx + startDelim.length; endDelimIdx < endSearchLimit; endDelimIdx += 1) {
            if (this.slice(endDelimIdx, endDelimIdx + endDelim.length).isEqualTo(endDelim)) {break;} 
         }
         ret.push(this.slice(startDelimIdx + startDelim.length, endDelimIdx));
         startDelimIdx = endDelimIdx;
      }
   }
   return ret;
};
/*
var test = new Buffer('1234jkl2{{#jklsf}}abcdefghi{{#123}}asdfasdf');
var output = test.extractSubsets('{{#', '}}');
console.log(output); */

Buffer.prototype.extractSubsetsRecursive = function(startDelim, endDelim){
   if (typeof startDelim === 'string') {startDelim = new Buffer(startDelim);}
   if (typeof endDelim === 'string') {endDelim = new Buffer(endDelim);}
   var output = [];
   var startDelimLength = startDelim.length;
   var endDelimLength = endDelim.length;
   var endIndex = this.length - startDelimLength - endDelimLength;
   var thisBuffer = this;

   var tryIndex = function(index) {
      if (index >= endIndex) {return output;}
      if (delimiterStartsAtThisIndex(startDelim, startDelimLength, index)) {
         output.push(getInnerContent(index));
         return tryIndex(index + output[output.length - 1].length + endDelimLength);
      }
      return tryIndex(index + 1);
   };

   var delimiterStartsAtThisIndex = function(delim, delimLength, index) {
      if (thisBuffer.slice(index, index + delimLength).isEqualTo(delim)) {return true;}
      return false;
   };

   var getInnerContent = function(index) {
      return thisBuffer.slice(index + startDelimLength, getEndDelimiterIndex(index + startDelimLength));
   };

   var getEndDelimiterIndex = function(index) {
      if (delimiterStartsAtThisIndex(endDelim, endDelimLength, index)) {return index;}
      return getEndDelimiterIndex(index + 1);
   };

   return tryIndex(0);
};
   
/*var output = test.extractSubsetsRecursive('{{#', '}}');
console.log(output);*/
