import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

// Profile 
  getProfile() {
    return service
    .get("/profile/me")
    .then((apiRes) => apiRes.data)
    .catch(errorHandler)
  },

  modifyProfile(userInfo) {
    return service
      .patch("/profile/edit", userInfo)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  deleteProfile() {
    return service
      .delete("/profile")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  //Trips 
  getAllTrips() {
    return service  
      .get("/trip")
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  getOneTrip(id) {
    return service 
      .get("/trip/" + id)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },
  
  createTrip(data) {
    return service
    .post("/trip", data)
    .then((apiRes) => apiRes.data)
    .catch(errorHandler)
  },

  modifyTrip(id, data) {
    return service  
      .patch("/trip/" + id, data)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  deleteTrip(id) {
    return service
      .delete("/trip/" + id)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  // AMADEUS API 
  getParisActivities() {
    return service
      .get("api/amadeus/activities/paris")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getLondonActivities() {
    return service
      .get("api/amadeus/activities/london")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getBerlinActivities() {
    return service
      .get("api/amadeus/activities/berlin")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },
  getBarcelonaActivities() {
    return service
      .get("api/amadeus/activities/barcelona")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getOneActivity(id) {
    return service  
      .get("/api/amadeus/activity/" + id)
      .then((apiRes) => apiRes)
  },

// OPENTRIPMAP API
  getParisPointsOfInterest() {
    return service
      .get("api/openTripMap/paris")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getLondonPointsOfInterest() {
    return service
      .get("api/openTripMap/london")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getBerlinPointsOfInterest() {
    return service
      .get("api/openTripMap/berlin")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getBarcelonaPointsOfInterest() {
    return service
      .get("api/openTripMap/barcelona")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  }
 
};
