import { X } from 'lucide-react'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../src/store/slices/todosSlice';

const TodoModal = ({ todos = [], user, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            userId: user.id,
            title,
            completed,
        };

        dispatch(addTodo(newTodo));
        setTitle('');
        setCompleted(false);
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur-sm flex justify-center items-start pt-20">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] shadow-xl flex flex-col mb-10 mx-4">
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">
                        Tareas de <span className="text-blue-600">{user.name}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition-colors duration-200 text-xl"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="px-6 py-4 ">
                    <input
                        type="text"
                        placeholder="Tí tulo de la tarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded px-3 py-2 w-full mb-2"
                        required
                    />
                    <label className="flex items-center space-x-2 mb-2">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                        <span>Completada</span>
                    </label>
                    <button
                        type="submit"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Guardar tarea
                    </button>
                </form>

                {/* Lista de tareas */}
                <div className="overflow-y-auto px-6 py-4">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="border border-gray-300 p-3 mb-2 rounded-lg flex justify-between"
                        >
                            <span>{todo.title}</span>
                            <span
                                className={`text-sm font-medium ${todo.completed ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {todo.completed ? 'Completado' : 'Pendiente'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoModal;
