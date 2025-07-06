import axios from "axios";

export const editTodoApi = (id, data) => {
  return axios.put(`http://localhost:9000/api/todolist/${id}`, data);
};
