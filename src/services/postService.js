import http from "./index";

class PostService {
  get() {
    return http().get("/post");
  }

  getById(id) {
    return http().get(`/post/` + id);
  }

  create(data) {
    return http().post("/post", data);
  }

  // login(data) {
  //   return http().post(`/login/`, data);
  // }

  // logout(data) {
  //   return http().post("/logout", data);
  // }
}

export default new PostService();
