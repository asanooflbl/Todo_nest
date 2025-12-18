import { useState } from "react";
import useTodoContext from "../Context/Todocontext";
import { toast } from "react-toastify";

function Todo() {
  const { todos, loading, page, totalPages, totalCount, setPage, addTodo, updateTodo, deleteTodo } = useTodoContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    if (editId) {
      updateTodo(editId, title, description);
      toast.success("Todo updated successfully");
      setEditId(null);
    } else {
      addTodo(title, description);
      toast.success("Todo added successfully")
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setTitle(todo.title);
    setDescription(todo.description || "");
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
      toast.success("Todo deleted successfully");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateTodo(id, undefined, undefined, newStatus);
    toast.success("Status updated");
  };

  const getStatusColor = (status) => {
    if (status === "pending") return "bg-yellow-200 text-yellow-800";
    if (status === "in-progress") return "bg-blue-200 text-blue-800";
    if (status === "completed") return "bg-green-200 text-green-800";
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">My Todo List</h1>

    
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Todo" : "Add New Todo"}</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3"/>
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={!title || loading}
              className="bg-blue-500 text-white px-4 py-2 rounded flex-1 hover:bg-blue-600 disabled:opacity-50" >
              {editId ? "Update Todo" : "Add Todo"}</button>
            {editId && (
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
            )}
          </div>
        </div>
      </div>

    
      {loading && <p className="text-center text-gray-600">Loading...</p>}

    
      <div className="space-y-3">
        {todos.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-8">No todos yet. Add one above!</p>
        )}

        {todos.map((todo) => (
        <div key={todo._id} className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
             <h3 className="font-bold text-lg">{todo.title}</h3>
              {todo.description && (
                <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(todo.status)}`}>
                {todo.status}
              </span>
          </div>

            <div className="flex flex-wrap gap-2 items-center border-t pt-3">
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                disabled={loading}
                className="border px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <button onClick={() => handleEdit(todo)} disabled={loading}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 disabled:opacity-50">Edit</button>

              <button onClick={() => handleDelete(todo._id)}disabled={loading}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50">Delete</button>
            </div>
          </div>
        ))}
      </div>

      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6 bg-white shadow rounded-lg p-4">
          <button onClick={() => setPage(page - 1)} disabled={page === 1 || loading}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
          <span className="text-sm">Page {page} of {totalPages} (Total: {totalCount} todos)</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages || loading}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
        </div>
      )}
    </div>
  );
}

export default Todo;