'use strict';
// const DEEP_MERGE = require('deepmerge');
// const LODASH_MERGE = require('lodash.merge')

function deepCopy (result, val) {
  let nodes = [];
  let current = [val];
  while (current) {
    for (let key in current[0]) {
      if (current[0][key] && typeof current[0][key] === 'object') {
        let parent;
        if (current[1]) {
          current[1][key] = current[1][key] || {};
          parent = current[1][key];
        } else {
          result[key] = result[key] || {};
          parent = result[key];
        }
        nodes.push([current[0][key], parent]);
      } else {
        if (current[1]) current[1][key] = current[0][key];
        else result[key] = current[0][key];
      }
    }
    current = nodes.shift();
  }
  return result;
}

console.time('copy');
let result;
for (let i = 0; i < 100000; i++) {
  // result = DEEP_MERGE({}, {
  //   a: 'a',
  //   b: {
  //     a: {
  //       a: {
  //         a: 'a',
  //         b: {
  //           a: 'a',
  //           b: 'b'
  //         }
  //       }
  //     }
  //   },
  //   c: 'c',
  //   d: 'd',
  //   e: {
  //     a: {
  //       a: 'a',
  //       b: 'b',
  //       c: {
  //         a: 'a'
  //       }
  //     }
  //   }
  // }, { clone: true });
  result = LODASH_MERGE({}, {
    a: 'a',
    b: {
      a: {
        a: {
          a: 'a',
          b: {
            a: 'a',
            b: 'b'
          }
        }
      }
    },
    c: 'c',
    d: 'd',
    e: {
      a: {
        a: 'a',
        b: 'b',
        c: {
          a: 'a'
        }
      }
    }
  });
  // result = deepCopy({}, {
  //   a: 'a',
  //   b: {
  //     a: {
  //       a: {
  //         a: 'a',
  //         b: {
  //           a: 'a',
  //           b: 'b'
  //         }
  //       }
  //     }
  //   },
  //   c: 'c',
  //   d: 'd',
  //   e: {
  //     a: {
  //       a: 'a',
  //       b: 'b',
  //       c: {
  //         a: 'a'
  //       }
  //     }
  //   }
  // });
}
console.timeEnd('copy');
console.log(JSON.stringify(result, null, 2));

