import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodosByUser, createTodo } from '../../../services/api.js'


// Thunk para obtener tareas de un usuario
export const fetchTodosByUser = createAsyncThunk(
    "todos/fetchTodosByUser",
    async (userId, thunkAPI) => {
        try {
            const todos = await getTodosByUser(userId);
            return todos.sort((a, b) => b.id - a.id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Thunk para agregar una nueva tarea
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (todoData, thunkAPI) => {
        try {
            const newTodo = await createTodo(todoData);
            return newTodo;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearTodos: (state) => {
            state.items = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchTodosByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTodosByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodosByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Agregamos nueva tarea
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items = [action.payload, ...state.items];
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;