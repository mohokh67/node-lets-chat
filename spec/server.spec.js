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