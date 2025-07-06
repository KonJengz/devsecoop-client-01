import axios from "axios";

export const addTodoApi = (data) => {
  return axios.post("http://localhost:9000/api/todolist", data);
};
