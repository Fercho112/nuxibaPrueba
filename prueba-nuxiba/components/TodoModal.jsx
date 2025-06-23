import { X } from 'lucide-react'

const TodoModal = ({ onClose, todos = [], user }) => {
    if (!Array.isArray(todos) || todos.length === 0 || !user) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur-sm flex justify-center items-start pt-20">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] shadow-xl flex flex-col mb-10 mx-4">

                {/* header del modal */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">
                        Tareas de <span className="text-blue-600">{user.name}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-blue-700 hover:text-red-500 transition-colors duration-200 text-xl focus:outline-none"
                        aria-label="Cerrar"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* Lista de tareas */}
                <div className="overflow-y-auto px-6 py-4">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="border border-gray-200 p-3 mb-3 rounded-md flex justify-between items-center"
                        >
                            <p className={`text-sm ${todo.completed ? 'line-through text-green-600' : 'text-gray-800'}`}>
                                {todo.title}
                            </p>
                            <span
                                className={`text-xs px-2 py-1 rounded ${todo.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
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
