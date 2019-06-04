const Joi = require('joi')
const joiColor = require('../src/color')

const is = Joi.extend([joiColor(Joi)])
async function validate({color}){
  return is.validate({color},{color: is.string().color()})
}

function assertJoiError(error){
  error.isJoi.should.deep.equal(true)
  error.details.length.should.equal(1)
  error.details[0].should.deep.contain({
    type: 'string.color',
    message: '"color" does not match the #rgba regex or any of the common-colors'
  })
}

describe('Joi color',async function(){
  describe('positive', async function(){
    it('should validate 3 letters', async function(){
      const color = '#fff'
      const validated = await validate({color})
      validated.should.deep.equal({color})
    })
    it('should validate 4 digit', async function(){
      const color = '#3333'
      const validated = await validate({color})
      validated.should.deep.equal({color})
    })
    it('should validate 6 letters', async function(){
      const color = '#ffffff'
      const validated = await validate({color})
      validated.should.deep.equal({color})
    })
    it('should validate 8 digit', async function(){
      const color = '#33333333'
      const validated = await validate({color})
      validated.should.deep.equal({color})
    })
    it('should validate common color', async function(){
      const color = 'red'
      const validated = await validate({color})
      validated.should.deep.equal({color})
    })
    it('should convert common color', async function(){
      const color = 'red'
      const validated = await is.validate({color},{color: is.string().color(true)})
      validated.should.deep.equal({
        color: '#ff0000'
      })
    })
    it('should validate twice', async function(){
      const color1 = '#33333333'
      const validated1 = await validate({color: color1})
      validated1.should.deep.equal({color: color1})
      
      const color2 = '#3345fde1'
      const validated2 = await validate({color: color2})
      validated2.should.deep.equal({color: color2})
    })
  })

  describe('negative', async function(){
    it('should invalidate 1 digit', async function(){
      const color = '#3'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
    it('should invalidate 2 digits', async function(){
      const color = '#33'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
    it('should invalidate 5 letters', async function(){
      const color = '#aaaaa'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
    it('should invalidate 7 digits', async function(){
      const color = '#3333333'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
    it('should invalidate 9 digits', async function(){
      const color = '#3333333'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
    it('should invalidate missing #', async function(){
      const color = '333333'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
    it('should invalidate missing #', async function(){
      const color = 'redWithStripes'
      try{
        await validate({color})
        should.fail()
      }catch(error){
        assertJoiError(error)
      }
    })
  })
})