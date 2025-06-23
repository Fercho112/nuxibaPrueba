import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../src/store/slices/userSlice'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const UserList = ({ onOpenPosts, onOpenTodos }) => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if (loading) return <p>Cargando usuarios...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <>
            <Swiper rewind={true} navigation={true} modules={[Navigation]} className="mySwiper">
                {users.map((user) => (
                    <SwiperSlide key={user.id}>
                        <div className="h-full w-full flex flex-col justify-center items-center">
                            <div className="flex flex-col gap-y-5">
                                <div className="flex flex-col items-start">
                                    <p className="text-2xl font-extrabold">{user.name}</p>
                                    <p className="text-sm italic">@{user.username}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-lg">
                                        <span className="font-medium">Email :</span> {user.email}
                                    </p>
                                    <p>
                                        <span className="font-medium">Website:</span> {user.website || 'N/A'}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <button
                                        onClick={() => onOpenPosts(user)}
                                        type="button"
                                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    >
                                        Ver posts
                                    </button>
                                    <button
                                        onClick={() => onOpenTodos(user)}
                                        type="button"
                                        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    >
                                        ver todos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default UserList
