const request = require("supertest");
const app = require("../app");
const data = require("../data/index");
const connection = require("../connection");
const { seed } = require("../seed");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe("app", () => {
  describe("GET/api", () => {
    it("200: GET responds with server ok message", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toBe("all good here");
        });
    });
    it("404: GET responds with error", () => {
      return request(app)
        .get("/bananas")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("error");
        });
    });
  });
  describe("GET/api/restaurants", () => {
    it("200: GET responds with restaurants data", () => {
      return request(app)
        .get("/api/restaurants")
        .expect(200)
        .then(({ body }) => {
          body.restaurants.forEach((restaurants) => {
            expect(restaurants).toEqual(
              expect.objectContaining({
                restaurant_id: expect.any(Number),
                restaurant_name: expect.any(String),
                area_id: expect.any(Number),
                cuisine: expect.any(String),
                website: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("POST/api/restaurants", () => {
    it("201: POST responds with newly inserted restaurant", () => {
      const restaurantBody = {
        restaurant_name: "The Codfather",
        area_id: 2,
        cuisine: "British",
        website: "www.thecodfather.com",
      };
      return request(app)
        .post("/api/restaurants")
        .send(restaurantBody)
        .expect(201)
        .then(({ body }) => {
          //console.log(body) Shows newly posted restaurant
          expect(body.restaurant).toEqual({
            restaurant_id: 9,
            ...restaurantBody,
          });
        });
    });
    it("400: POST responds with bad request", () => {
      const restaurantBody = {
        restaurant_nameee: "The Codfather",
        area_id: 2,
        cuisine: "British",
        website: "www.thecodfather.com",
      };
      return request(app)
        .post("/api/restaurants")
        .send(restaurantBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid Data");
          console.log(body.msg);
        });
    });
  });
});
describe("DELETE /api/restaurants/:restaurant_id", () => {
  it("204: DELETE the specified restaurant from the database and responds with an empty object", () => {
    return request(app)
      .delete("/api/restaurants/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  it("200: Should have length of 8 with one restaurant gone", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then((response) => {
        expect(response.body.restaurants).toBeInstanceOf(Array);
        expect(response.body.restaurants).toHaveLength(8);
      });
  });

  it.skip("404: should respond with error when an end point ID does not exist", () => {
    return request(app)
      .delete("/api/restaurants/88")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("restaurant_id 88 does not exist");
      });
  });

  describe.skip("PATCH: api/restaurants/:restaurant_id", () => {
    it("200: should respond with updated restaurant object", () => {
      return request(app)
        .patch("/api/restaurant/3")
        .send({ area_id: 2 })
        .expect(200)
        .then((restaurant) => {
          expect(restaurant.area.id).toBe(2);
        });
    });
  });
});
