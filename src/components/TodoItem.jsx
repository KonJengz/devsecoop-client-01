import { Check, PenLine, X } from "lucide-react";
import { useState } from "react";
import { editTodoApi } from "../api/todos/editTodo";
import { toast } from "react-toastify";

function TodoItem({ todo, handleDelete, fetchTodoList }) {
  const [isEdit, setEdit] = useState(false);
  const [input, setInput] = useState({
    title: todo.title,
    descript: todo.descript,
    completed: todo.completed,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (id, data) => {
    try {
      await editTodoApi(id, data);
      toast.success("Edit todo success !!");
      fetchTodoList();
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("isEdit", isEdit);
  return (
    <div>
      <div className="flex gap-1 items-center">
        {/* <input type="checkbox" checked={todo.completed} /> */}
        {isEdit ? (
          <input
            className="bg-gray-200 px-4 py-2 outline-0"
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
        ) : (
          <h1>{todo.title}</h1>
        )}
      </div>
      <p>{todo.descript}</p>
      <div>
        {isEdit ? (
          <button onClick={() => handleEdit(todo.id, input)}>
            <Check width={16} />
          </button>
        ) : (
          <button onClick={() => setEdit((prev) => !prev)}>
            <PenLine width={16} />
          </button>
        )}

        <button onClick={() => handleDelete(todo.id)}>
          <X width={16} />
        </button>
      </div>
    </div>
  );
}
export default TodoItem;
