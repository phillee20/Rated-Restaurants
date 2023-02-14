const request = require('supertest');
const app = require('../app');

describe('app', () => {
    describe('GET/api', () => {
        it('200: GET responds with server ok message', () => {
            return request(app)
                .get("/api")
                .expect(200)
                .then((response) => {
                    expect(response.body.msg).toBe("all good here")
                });
        })
        it('404: GET responds with error', () => {
            return request(app)
                .get("/bananas")
                .expect(404)
                .then((response) => {
                    expect(response.body.msg).toBe("error")
                });
        })
    })
})