const URI = "https://jsonplaceholder.typicode.com/"

export const getUsers = async () => {
    const response = await fetch(URI + 'users')

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json()
}

export const getUserPost = async (userId) => {
    const response = await fetch(URI + `users/${userId}/posts`)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json()
}

//https://jsonplaceholder.typicode.com/post/(postId)/comments

export const getPostComment = async (postId) => {
    const response = await fetch(URI + `post/${postId}/comments`)

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json()
}

export const getTodosByUser = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};



// ! http todo
export const createTodo = async (todoData) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
    });

    if (!response.ok) {
        throw new Error('Failed to create todo');
    }

    return response.json();
};


