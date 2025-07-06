import { useEffect, useState } from "react";
import { addTodoApi } from "../api/todos/addTodo";
import { toast } from "react-toastify";
import { getTodoApi } from "../api/todos/getTodo";
import { deleteTodoApi } from "../api/todos/deleteTodo";
import TodoItem from "../components/TodoItem";
// import { log } from "console";
import { editTodoApi } from "../api/todos/editTodo";

const initialInput = {
  title: "",
  descript: "",
  completed: false,
};

function TodoListPage() {
  const [input, setInput] = useState(initialInput);
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTodoList = async () => {
    try {
      const res = await getTodoApi();
      console.log("res", res);
      setTodos(res.data.todolist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  //   console.log({ input });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // validate data

      // create todo
      await addTodoApi(input);

      toast.success("create todo success !!");
      setInput(initialInput);
      fetchTodoList();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodoApi(id);
      toast.success("delete todo success !!");
      fetchTodoList();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-1/3 mx-auto p-12">
      <h1 className="text-4xl text-center">My TodoList</h1>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="bg-gray-200 px-4 py-2 outline-0"
            type="text"
            placeholder="คุณมีอะไรต้องทำบ้าง..."
            name="title"
            value={input.title}
            onChange={handleChange}
          />
          <textarea
            className="bg-gray-200 px-4 py-2 outline-0"
            name="descript"
            placeholder="ใส่รายละเอียดของงาน"
            value={input.descript}
            onChange={handleChange}
          ></textarea>
          {/* <input
            name="completed"
            type="checkbox"
            value={input.completed}
            onChange={handleChange}
          /> */}
          <button className="px-4 cursor-pointer hover:bg-pink-700 py-2 bg-pink-600 text-white">
            Add
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {todos.map((todo) => (
          // {TodoItem(3,6)}
          <TodoItem
            fetchTodoList={fetchTodoList}
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoListPage;
