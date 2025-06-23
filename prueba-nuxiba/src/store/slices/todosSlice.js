import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTodosByUser, createTodo } from '../../../services/api.js';

export const fetchTodosByUser = createAsyncThunk('todos/fetchByUser', async (userId) => {
    return await getTodosByUser(userId);
});

export const addTodo = createAsyncThunk('todos/add', async (todo) => {
    return await createTodo(todo);
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodosByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                const newTodo = {
                    ...action.payload,
                    id: Date.now(), //crea un id nuevo para que no choque con la ya creada
                };
                state.items.unshift(newTodo);
            });
    },
});

export default todosSlice.reducer;
