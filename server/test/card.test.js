'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const expect = chai.expect
const urlApi = 'http://localhost:3000/api'
chai.use(chaiHttp);

const Card = require('../models/card.model')
describe('Route create new kanban', function() {
    let arr = ['to-do', 'doing', 'done']
    let newTitle = faker.lorem.sentence()
    let newContent = faker.lorem.sentences()
    let newDate = faker.date.future()
    let newStatus = arr[Math.ceil(Math.random() * 3)]
    let newPerson = faker.name.firstname()
    it('expect to return new kanban title and description', function(done) {
        chai.request(urlApi)
            .post('/cards')
            .send({
                title: newTitle,
                content: newContent,
                due_date: newDate,
                status: newStatus,
                in_charge: newPerson
            })
            .end(function(req, res) {
                expect(res.body.title).to.be.equal(newTitle)
                expect(res.body.content).to.be.equal(newContent)
                expect(res.body.due_date).to.be.equal(newDate)
                expect(res.body.status).to.be.equal(newStatus)
                expect(res.body.in_charge).to.be.equal(newPerson)
                done()
            })
    })
})
