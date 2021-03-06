'use strict'

const expect = require('chai').expect
const request = require('supertest-as-promised')
const app = require('../app')

describe('Thing API:', () => {
  let thing

  describe('GET /api/things', () => {
    it('should respond with JSON array', () => {
      return request(app)
        .get('/api/things')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => expect(res.body).to.be.instanceOf(Array))
    })
  })

  describe('POST /api/things', () => {
    it('should respond with the newly created thing', () => {
      return request(app)
        .post('/api/things')
        .send({
          name: 'New Thing',
          info: 'This is the brand new thing!!!'
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name').that.equal('New Thing')
          expect(res.body).to.have.property('info').that.equal('This is the brand new thing!!!')
          thing = res.body
        })
    })
  })

  describe('GET /api/things/:id', () => {
    it('should respond with the requested thing', () => {
      return request(app)
        .get(`/api/things/${thing.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.id).to.equal(thing.id)
          expect(res.body.name).to.equal(thing.name)
          expect(res.body.info).to.equal(thing.info)
        })
    })
  })

  describe('PUT /api/things/:id', () => {
    it('should respond with the updated thing', () => {
      return request(app)
        .put(`/api/things/${thing.id}`)
        .send({
          name: 'Updated Thing',
          info: 'This is the updated thing!!!'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.id).to.equal(thing.id)
          expect(res.body.name).to.equal('Updated Thing')
          expect(res.body.info).to.equal('This is the updated thing!!!')
        })
    })
  })

  describe('DELETE /api/things/:id', () => {
    it('should respond with 204 on successful removal', () => {
      return request(app)
        .delete(`/api/things/${thing.id}`)
        .expect(204)
    })

    it('should respond with 404 when thing does not exist', () => {
      return request(app)
        .delete(`/api/things/${thing.id}`)
        .expect(404)
    })
  })
})
