import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../../../services/api'

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await getUsers()
    return response
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        selectedUser: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { setSelectedUser } = userSlice.actions
export default userSlice.reducer