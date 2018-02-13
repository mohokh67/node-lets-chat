var request = require('request')

describe('Get messages', () => {
    it('should return 200 OK', (done) => { // add done makes it async
        request.get('http://localhost:3002/messages', (error, response) => {
            //we need to run the server by nodemon ./server.js
            expect(response.statusCode).toEqual(200)
            done();
        })  
    })

    it('should not return an empty list', (done) => { // add done makes it async
        request.get('http://localhost:3002/messages', (error, response) => {
            //we need to run the server by nodemon ./server.js
            expect(JSON.parse(response.body).length).toBeGreaterThan(0);
            done();
        })  
    })
})

describe('Get messages from user', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:3002/messages', (error, response) => {
            expect(response.statusCode).toEqual(200)
            done();
        })  
    })

    it('should not return an empty list', (done) => {
        request.get('http://localhost:3002/messages/MoHo', (error, response) => {
            expect(JSON.parse(response.body).length).toBeGreaterThan(0);
            done();
        })  
    })

    it('should be MoHo', (done) => {
        request.get('http://localhost:3002/messages/MoHo', (error, response) => {
            expect(JSON.parse(response.body)[0].name).toEqual('MoHo');
            done();
        })  
    })
})