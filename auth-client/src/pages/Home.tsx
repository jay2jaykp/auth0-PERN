import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { Axios, AxiosResponse } from "axios";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const Home: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todo, setTodo] = React.useState<string>("");
  const { token } = useContext(AuthContext);
  const { pushNotification } = useContext(NotificationContext);

  const getTodos = async () => {
    if (!token) return;
    const data = await api.get("/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTodos(data.data as Todo[]);
  };

  const addTodo = async () => {
    if (!token) return;
    if (todo === "") {
      pushNotification({
        message: "Please enter a todo",
        type: "error",
      });
      return;
    }
    const newTodo = await api.post(
      "/todos",
      {
        title: todo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (newTodo.status !== 201) {
      pushNotification({
        message: "Something went wrong",
        type: "error",
      });
      return;
    } else {
      pushNotification({
        message: "Todo added successfully",
        type: "success",
      });
      await getTodos();
      setTodo("");
    }
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = async (id: string) => {
    if (!token) return;
    let toggleTodo: AxiosResponse;
    if (todos.find((todo) => todo.id === id)?.completed) {
      toggleTodo = await api.put(
        `/todos/undone/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      toggleTodo = await api.put(
        `/todos/done/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    if (toggleTodo.status !== 200) {
      pushNotification({
        message: "Something went wrong",
        type: "error",
      });
      return;
    }
    await getTodos();
  };

  useEffect(() => {
    void getTodos();
  }, [token]);

  return (
    <div className="text-center ">
      <input
        type="text"
        placeholder="Enter your todo here..."
        className="my-4 input input-bordered w-full max-w-xs"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void addTodo();
          }
        }}
      />
      <button className="btn btn-primary m-2" onClick={() => void addTodo()}>
        {"Add Todo"}
      </button>
      <div className=" flex flex-col items-center justify-center">
        {todos.map((todo, index) => (
          <div
            className="flex items-center justify-between w-full max-w-xs"
            key={index}
          >
            <input
              type="checkbox"
              //   defaultChecked={todo.completed}
              checked={todo.completed}
              onClick={() => void toggleTodo(todo.id)}
            />
            <p
              className={`flex-grow mx-2 text-left ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </p>
            <button
              className="my-2 btn-sm btn btn-error"
              onClick={() => removeTodo(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
