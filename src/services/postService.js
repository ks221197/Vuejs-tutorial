import http from "./index";

class PostService {
  get() {
    return http().get("/post");
  }

  // login(data) {
  //   return http().post(`/login/`, data);
  // }

  // logout(data) {
  //   return http().post("/logout", data);
  // }
}

export default new PostService();
