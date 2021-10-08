import http from "./index";

class ExportService {
  upload(data) {
    return http().post("/upload", data);
  }

  export(data) {
    return http().post("/export", data);
  }

  download(file) {
    return http().get("/dump/" + file);
  }
}

export default new ExportService();
