# Node Buffer helper functions


## Install

    npm install buffer-helpers

## Usage

require('bufferHelpers');

Helper functions will be loaded onto Buffer.prototype

* isEqualTo(buf) - compares calling buffer to buf and returns true if they are equal
* extractSubsets(startDelim, endDelim) - returns an array of Buffers containing all of the occurences between startDelim and endDelim
* extractSubsetsRecursive(startDelim, endDelim) - a recursive version

