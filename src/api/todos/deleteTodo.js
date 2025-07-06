import axios from "axios";

export const deleteTodoApi = (id) => {
  return axios.delete(`http://localhost:9000/api/todolist/${id}`);
};
