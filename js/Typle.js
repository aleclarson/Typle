// Generated by CoffeeScript 1.11.1
var Null, Typle, Validator, formatType, isType, wrongType;

formatType = require("formatType");

Validator = require("Validator");

wrongType = require("wrongType");

isType = require("isType");

Null = require("Null");

Typle = Validator.Type("Typle", {
  init: function(types) {
    if (!Array.isArray(types)) {
      throw Error("Must provide an array of types!");
    }
    return this.types = types;
  },
  name: function() {
    return formatType(this.types);
  },
  test: function(value) {
    var index, numTypes, type, types;
    types = this.types;
    index = -1;
    numTypes = types.length;
    if (value == null) {
      while (++index < numTypes) {
        type = types[index];
        if (type instanceof Validator) {
          if (type.test(value)) {
            return true;
          }
        }
      }
      return false;
    }
    while (++index < numTypes) {
      type = types[index];
      if (type instanceof Validator) {
        if (type.test(value)) {
          return true;
        }
      } else if (type === value.constructor) {
        return true;
      }
    }
    return false;
  },
  assert: function(value, key) {
    if (this.test(value)) {
      return;
    }
    return wrongType(this.types, key);
  }
});

module.exports = Typle;
