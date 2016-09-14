
formatType = require "formatType"
Validator = require "Validator"
wrongType = require "wrongType"
isType = require "isType"
Null = require "Null"

Typle = Validator.Type "Typle",

  init: (types) ->

    if not Array.isArray types
      throw Error "Must provide an array of types!"

    @types = types

  name: -> formatType @types

  test: (value) ->
    {types} = this

    index = -1
    numTypes = types.length

    if not value?
      while ++index < numTypes
        type = types[index]
        if type instanceof Validator
          return yes if type.test value
      return no

    while ++index < numTypes
      type = types[index]
      if type instanceof Validator
        return yes if type.test value
      else if type is value.constructor
        return yes
    return no

  assert: (value, key) ->
    return if @test value
    return wrongType @types, key

module.exports = Typle
