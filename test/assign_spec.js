'use strict';
const chai = require('chai');
const expect = chai.expect;
const deepAssign = require('../bin').DEEP_ASSIGN;

describe('deep assign functionality', function () {
  it('should be able to make a copy of an object given an empty object as its first argument', () => {
    let data = {
      some: {
        object: {
          with: {
            value: true
          }
        }
      },
      and: {
        another: 'field'
      },
      also: {
        an: {
          array: ['1', '2', '3']
        }
      }
    };
    let result = deepAssign({}, data);
    expect(result).to.deep.equal(data);
  });
  it('should be able to assign values deeply nested', () => {
    let initial = {
      a: {
        nested: {
          value: true
        }
      }
    };
    let data = {
      a: {
        nested: {
          other_value: true
        }
      }
    };
    let final = deepAssign(initial, data);
    expect(final).to.deep.equal({
      a: {
        nested: {
          value: true,
          other_value: true
        }
      }
    });
  });
  it('should be a clone of value with no references to original object', () => {
    let data = {
      a: {
        b: {
          c: 'd',
          e: 'f'
        }
      }
    };
    let result = deepAssign({}, data);
    expect(result).to.deep.equal(data);
    result.a.c = true;
    result.a.b.g = 'h';
    expect(data.a.c).to.be.undefined;
    expect(data.a.b.g).to.be.undefined;
  });
  it('should be able to recursively merge multiple objects', () => {
    let data1 = {
      a: {
        b: {
          c: true
        }
      }
    };
    let data2 = {
      b: {
        c: {
          d: true
        }
      },
      a: {
        b: {
          d: true
        }
      }
    };
    let result = deepAssign({}, data1, data2);
    expect(result).to.deep.equal({
      a: {
        b: {
          c: true,
          d: true
        }
      },
      b: {
        c: {
          d: true
        }
      }
    });
  });
  it('should be able to handle falsy values', () => {
    let data = {
      some: {
        object: {
          with: {
            value: true
          }
        }
      },
      and: {
        another: 'field'
      },
      also: {
        an: {
          array: ['1', '2', '3']
        }
      }
    };
    let result = deepAssign({}, undefined, data);
    expect(result).to.deep.equal(data);
  });
});