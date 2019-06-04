const colorMap = require('./common_colors')

const RGBA_REGEX = /#(([0-9A-Fa-f]{3,4}\b)|([0-9A-Fa-f]{6}\b)|([0-9A-Fa-f]{8})\b)/

module.exports = function (joi) {
  return{
    base: joi.string(),
    name: 'string',
    language: {
      color: 'does not match the #rgba regex or any of the common-colors',
    },
    rules: [
      {
        name: 'color',
        params: {
          convert: joi.boolean(),
        },

        validate(params, value, state, options) {
          const rgbaColor = colorMap[value]

          if(rgbaColor){
            if(params.convert){
              return rgbaColor
            }
            return value
          }

          if(value.match(RGBA_REGEX)){
            return value
          }
          
          return this.createError('string.color', {value}, state, options)
        },
      },
    ],
  }
}
