import axios from "axios";

export const getTodoApi = () => {
  return axios.get(`http://localhost:9000/api/todolist`);
};
