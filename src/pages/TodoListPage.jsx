import { useEffect, useState } from "react";
import { addTodoApi } from "../api/todos/addTodo";
import { toast } from "react-toastify";
import { getTodoApi } from "../api/todos/getTodo";
import { PenLine, X } from "lucide-react";
// import { log } from "console";

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
          <div key={todo.id}>
            <div className="flex gap-1 items-center">
              <input type="checkbox" checked={todo.completed} />
              <h1>{todo.title}</h1>
            </div>
            <p>{todo.descript}</p>
            <div>
              <button>
                <PenLine width={16} />
              </button>
              <button>
                <X width={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoListPage;
