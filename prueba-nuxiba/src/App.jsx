import './App.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserList from '../components/UserList'
import PostModal from '../components/PostModal'
import TodoModal from "../components/TodoModal";

import { setSelectedUser } from '../src/store/slices/userSlice'
import { fetchPostsWithComments } from '../src/store/slices/postSlice'
import { fetchTodosByUser } from '../src/store/slices/todosSlice'

function App() {
  const dispatch = useDispatch()
  const [isPostModalOpen, setPostModalOpen] = useState(false)
  const [isTodoModalOpen, setTodoModalOpen] = useState(false)
  const [selectedUser, setSelectedUserLocal] = useState(null)

  const posts = useSelector((state) => state.posts.items)
  const todos = useSelector((state) => state.todos.items)

  const handleOpenPosts = (user) => {
    setSelectedUserLocal(user)
    dispatch(setSelectedUser(user))
    dispatch(fetchPostsWithComments(user.id))
    setPostModalOpen(true)
  }

  const handleOpenTodos = (user) => {
    setSelectedUserLocal(user)
    dispatch(setSelectedUser(user))
    dispatch(fetchTodosByUser(user.id))
    setTodoModalOpen(true)
  }

  return (
    <div className='flex flex-col h-dvh'>
      <UserList
        onOpenPosts={handleOpenPosts}
        onOpenTodos={handleOpenTodos}
      />

      {isPostModalOpen && (
        <PostModal
          posts={posts}
          user={selectedUser}
          onClose={() => setPostModalOpen(false)}
        />
      )}

      {isTodoModalOpen && (
        <TodoModal
          todos={todos}
          user={selectedUser}
          onClose={() => setTodoModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
