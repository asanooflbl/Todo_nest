import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTodos = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/todo/all?page=${pageNum}`);
      if (res.data.success) {
        setTodos(res.data.todos);
        setTotalPages(res.data.totalPages);
        setTotalCount(res.data.totalCount);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const addTodo = async (title, description) => {
    try {
      const res = await axios.post("/api/todo/add", {
        title,
        description,
      });

      if (res.data.success) {
        if (page === 1) {
          getTodos(1);
        } else {
          setPage(1);
        }
      }

      return res.data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateTodo = async (id, title, description, status) => {
    try {
      const data = {};
      if (title !== undefined) data.title = title;
      if (description !== undefined) data.description = description;
      if (status !== undefined) data.status = status;

      const res = await axios.patch(`/api/todo/update/${id}`, data);

      if (res.data.success) {
        getTodos(page);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`/api/todo/delete/${id}`);
      if (res.data.success) {
        getTodos(page);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos(page);
  }, [page]);

  return (
    <TodoContext.Provider
      value={{todos,loading,page,totalPages,totalCount,setPage,getTodos,addTodo,updateTodo,deleteTodo,}}>{children}
      </TodoContext.Provider>
  );
};


const useTodoContext = () => {
  return useContext(TodoContext);
};

export default useTodoContext;