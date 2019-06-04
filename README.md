# joi-color
Extension to validate colors with [Joi](https://github.com/hapijs/joi)

It validates #rgba format.

Positive examples:
 - #234
 - #223344
 - #223344ee
 - #234e

 Or even some common color names. Inspired in https://doc.qt.io/qt-5/qml-color.html
 
 For all the colors, please check `src/common-colors`

# Usage

 Use it as a joi extension. Example:
 
 ```javascript
 const joi = require('joi')
 const joiColor = require('joi-color')

 const is = joi.extend(joiColor(joi))
 (...)
 const schema = is.string().color()
 ```

# Options

A single option is provided. In color function, a boolean defines whether the validation returns a common color name, or its hexadecimal representation.
Example:

 ```javascript
const validated = await is.validate({
  color: 'red',
},{
  color: is.string().color(true)
})
 ```

 `(validated.color === #ff0000)` is true