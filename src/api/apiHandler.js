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
    .get("/api/profile/me")
    .then((apiRes) => apiRes)
    .catch(errorHandler)
  },

  modifyProfile(userInfo) {
    return service
      .patch("/api/profile/edit", userInfo)
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  deleteProfile() {
    return service
      .delete("/api/profile")
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  //Trips 
  getAllTrips() {
    return service  
      .get("/api/trip")
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  getOneTrip(id) {
    return service 
      .get("/api/trip/" + id)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },
  
  createTrip(data) {
    return service
    .post("/api/trip", data)
    .then((apiRes) => apiRes.data)
    .catch(errorHandler)
  },

  modifyTrip(id, data) {
    return service  
      .patch("/api/trip/" + id, data)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  deleteTrip(id) {
    return service
      .delete("/api/trip/" + id)
      .then((apiRes) => apiRes.data)
      .catch(errorHandler)
  },

  // new Tour DB
  getActivities(desti) {
    return service
      .get("/api/activity/destination/" + desti)
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },

  getOneActivity(id) {
    return service  
      .get("/api/activity/" + id)
      .then((apiRes) => apiRes)
  },

// OPENTRIPMAP API
  getPointsOfInterest(desti) {
    return service
      .get("api/openTripMap/" + desti)
      .then((apiRes) => apiRes)
      .catch(errorHandler)
  },
};
