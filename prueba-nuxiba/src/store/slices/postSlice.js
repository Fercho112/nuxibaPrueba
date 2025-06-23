import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserPost, getPostComment } from '../../../services/api.js'

export const fetchPostsWithComments = createAsyncThunk(
    'posts/fetchPostsWithComments',
    async (userId) => {
        const posts = await getUserPost(userId)

        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await getPostComment(post.id)
                return { ...post, comments }
            })
        )

        return postsWithComments
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearPosts: (state) => {
            state.items = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsWithComments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPostsWithComments.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchPostsWithComments.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { clearPosts } = postSlice.actions
export default postSlice.reducer
