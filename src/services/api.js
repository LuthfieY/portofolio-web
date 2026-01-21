// In production, backend is served from /api, in development use VITE_API_URL or backend port
export const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? window.location.origin : 'http://localhost:8000');

const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            // Only redirect if not already on the login page to avoid refreshing the login form on failure
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(error.detail || 'API request failed');
    }
    return response.json();
};

export const api = {
    login: async (username, password) => {
        // Uses form-urlencoded for OAuth2 password flow compatibility
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });
        return handleResponse(response);
    },

    getProjects: async () => {
        const response = await fetch(`${API_URL}/api/project/`, {
            method: 'GET',
        });
        // Public endpoint, so handleResponse is fine (it won't 401 usually, but good to have)
        return handleResponse(response);
    },

    createProject: async (formData) => {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/api/project/`, {
            method: 'POST',
            headers: headers,
            body: formData, // Sending FormData directly
        });
        return handleResponse(response);
    },

    updateProject: async (id, projectData) => {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // If projectData is FormData, let browser set Content-Type
        // If it's plain object, convert to JSON and set Content-Type
        let body = projectData;
        if (!(projectData instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(projectData);
        }

        const response = await fetch(`${API_URL}/api/project/${id}`, {
            method: 'PUT',
            headers: headers,
            body: body,
        });
        return handleResponse(response);
    },

    deleteProject: async (id) => {
        const response = await fetch(`${API_URL}/api/project/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        // Delete might return 204 No Content, which json() fails on. 
        if (response.status === 204) return true;
        return handleResponse(response);
    }
};
