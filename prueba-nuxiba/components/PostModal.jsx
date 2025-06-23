import { X } from 'lucide-react'

const PostModal = ({ onClose, posts = [], user }) => {
    if (!Array.isArray(posts) || posts.length === 0 || !user) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur-sm flex justify-center items-start pt-20">
            {/* Modal container */}
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] shadow-xl flex flex-col mb-10 mx-4">

                {/* header de modal */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">
                        Publicaciones de <span className="text-blue-600">{user.name}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-blue-700 hover:text-red-500 transition-colors duration-200 text-xl focus:outline-none"
                        aria-label="Cerrar"
                    >
                        <X size={28} />
                    </button>

                </div>

                <div className="overflow-y-auto px-6 py-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="border border-gray-300 p-4 mb-4 rounded-lg"
                        >
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-700 mb-2">{post.body}</p>

                            <h4 className="mt-2 font-medium text-sm">Comentarios:</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {post.comments.map((comment) => (
                                    <li key={comment.id}>
                                        <strong>{comment.name}:</strong> {comment.body}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostModal
