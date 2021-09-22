import http from "./index";

class CommentService {
  get(postId) {
    return http().get(`/comment/post/` + postId);
  }

  getById(postId, commentId) {
    return http().get(`/comment/` + postId`/` + commentId);
  }

  create(data) {
    return http().post("/comment", data);
  }


}

export default new CommentService();
