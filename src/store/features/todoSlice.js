import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
};

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  const response = await fetch(`http://localhost:4000/todos`);
  const data = await response.json();
  return data;
});

export const postTodos = createAsyncThunk("todos/postTodos", async (todo) => {
  const response = await fetch(`http://localhost:4000/todos`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
});

export const putTodos = createAsyncThunk(
  "todos/putTodos",
  async ({ id, updTodo }) => {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTodo),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async ({ id }) => {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = [...state.todos, ...action.payload];
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(postTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(postTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos.push(action.payload);
    });

    builder.addCase(putTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(putTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(putTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const { id, updTodo } = action.payload;
      console.log(action.payload, "Data came");
      let foundIndex = state.todos.findIndex((item) => item.id === id);
      if (foundIndex !== -1) {
        state.todos[foundIndex] = { ...state.todos[foundIndex], ...updTodo };
      }
      state.todos;
    });
    builder.addCase(deleteTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteTodos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
  },
});

export default todoSlice.reducer;
