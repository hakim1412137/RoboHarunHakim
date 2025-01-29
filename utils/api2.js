import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from "../context/AuthContext";

const BASE_URL = 'http://localhost:8083/api2'; // Replace with your actual api2 base URL

const api2 = {
    // Improved api2 Fetch with JWT
    useAuth: async (url, options = {}) => {
        const token = await AsyncStorage.getItem('jwt');
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
        return fetch(url, { ...options, headers });
    },
    // User Management
    getUserById: async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return await response.json();
    },
    registerUser: async (userData) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    },
    loginUser: async (credentials) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    },
    // Student Registration
    registerStudent: async (studentData) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });
        return await response.json();
    },
    // Fetch enrolled courses for a specific user
    getEnrolledCourses: async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}/enrolled-courses`);
        if (!response.ok) throw new Error('Failed to fetch enrolled courses');
        return await response.json();
    },
    // Fetch order history for a specific user
    getOrderHistory: async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}/order-history`);
        if (!response.ok) throw new Error('Failed to fetch order history');
        return await response.json();
    },
    // Message Management
    fetchMessages: async (orderId) => {
        const response = await fetch(`${BASE_URL}/messages/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        return await response.json();
    },
    sendMessage: async (messageData) => {
        const response = await fetch(`${BASE_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });
        if (!response.ok) throw new Error('Failed to send message');
        return await response.json();
    },
    // Product Management
    getAllProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`);
        return await response.json();
    },
    getProductById: async (productId) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        return await response.json();
    },
    createProduct: async (productData) => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        return await response.json();
    },
    updateProduct: async (productId, productData) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        return await response.json();
    },
    deleteProduct: async (productId) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'DELETE',
        });
        return await response.json();
    },
    // Course Management
    getAllCourses: async () => {
        const response = await fetch(`${BASE_URL}/courses`);
        return await response.json();
    },
    createCourse: async (courseData) => {
        const response = await fetch(`${BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });
        return await response.json();
    },
    getCoursesById: async (courseId) => {
        const response = await fetch(`${BASE_URL}/courses/${courseId}`);
        return await response.json();
    },
    // Competition Management
    getAllCompetitions: async () => {
      const response = await fetch(`${BASE_URL}/competitions`);
        return await response.json();
    },
    getCompetitionById: async (competitionId) => {
        const response = await fetch(`${BASE_URL}/competitions/${competitionId}`);
        return await response.json();
    },
    registerForCompetition: async (competitionId, userId) => {
        const response = await fetch(`${BASE_URL}/competitions/${competitionId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        return await response.json();
    },
    // Notification Management
    getNotifications: async (userId) => {
        const response = await fetch(`${BASE_URL}/notifications/user/${userId}`);
        return await response.json();
    },
    createNotification: async (notificationData) => {
        const response = await fetch(`${BASE_URL}/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData),
        });
        return await response.json();
    },
    // Community Management
    getAllCommunityPosts: async () => {
        const response = await fetch(`${BASE_URL}/community-posts`);
        return await response.json();
    },
    createCommunityPost: async (post) => {
        const response = await fetch(`${BASE_URL}/community-posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        return await response.json();
    },
    getCommentsByPostId: async (postId) => {
        const response = await fetch(`${BASE_URL}/community-posts/${postId}/comments`);
        return await response.json();
    },
    postComment: async (postId, comment) => {
        const response = await fetch(`${BASE_URL}/community-posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        return await response.json();
    },
    // Feedback Management
    createFeedback: async (feedbackData) => {
        const response = await fetch(`${BASE_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        });
        return await response.json();
    },
    // Event Management
    getAllEvents: async () => {
        const response = await fetch(`${BASE_URL}/events`);
        return await response.json();
    },
    getEventById: async (eventId) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`);
        return await response.json();
    },
    createEvent: async (eventData) => {
        const response = await fetch(`${BASE_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        return await response.json();
    },
    updateEvent: async (eventId, eventData) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        return await response.json();
    },
    deleteEvent: async (eventId) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`, {
            method: 'DELETE',
        });
        return await response.json();
    },
    // Payment Management
    createPayment: async (paymentData) => {
        const response = await fetch(`${BASE_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        return await response.json();
    },
    initiatePayment: async (paymentData) => {
        const response = await fetch(`${BASE_URL}/payments/initiate-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        return await response.json();
    },
    verifyPayment: async (verificationData) => {
        const response = await fetch(`${BASE_URL}/payments/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verificationData),
        });
        return await response.json();
    },
    // Meeting Requests
      // Meeting Requests
        createMeetingRequest: async (requestData) => {
            const response = await fetch(`${BASE_URL}/meeting-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            return await response.json();
        },

        getAllMeetingRequests: async () => {
            const response = await fetch(`${BASE_URL}/meeting-requests`);
            return await response.json();
        },
        // Resource Management
        getAllResources: async () => {
            const response = await fetch(`${BASE_URL}/resources`);
            return await response.json();
        },

        createResource: async (resourceData) => {
            const response = await fetch(`${BASE_URL}/resources`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resourceData),
            });
            return await response.json();
        },

        updateResource: async (resourceId, resourceData) => {
            const response = await fetch(`${BASE_URL}/resources/${resourceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resourceData),
            });
            return await response.json();
        },

        deleteResource: async (resourceId) => {
            const response = await fetch(`${BASE_URL}/resources/${resourceId}`, {
                method: 'DELETE',
            });
            return await response.json();
        },

        // Quiz Management
        getAllQuizzes: async () => {
            const response = await fetch(`${BASE_URL}/quizzes`);
            return await response.json();
        },

        createQuiz: async (quizData) => {
            const response = await fetch(`${BASE_URL}/quizzes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            });
            return await response.json();
        },

        getQuizById: async (quizId) => {
            const response = await fetch(`${BASE_URL}/quizzes/${quizId}`);
            return await response.json();
        },
    };

    export default api2;
/*
// src/services/api2.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:8083/api2'; // Replace with your actual api2 base URL

const api22= {
    // Improved api2 Fetch with JWT
fetchWithAuth: async (url, options = {}) => {
        const token = await AsyncStorage.getItem('jwt');
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
        return fetch(url, { ...options, headers });
    },
 // User Management
 getUserById: async (userId) => {
         const response = await fetch(`${BASE_URL}/users/${userId}`);
         if (!response.ok) throw new Error('Failed to fetch user');
         return await response.json();
     },

registerUser: async (userData) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
},
loginUser: async (credentials) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    },

registerStudent: async (studentData) => {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });
            return await response.json();
        },
  // Fetch enrolled courses for a specific user
getEnrolledCourses: async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}/enrolled-courses`);
        if (!response.ok) throw new Error('Failed to fetch enrolled courses');
        return await response.json();
    },

    // Fetch order history for a specific user
getOrderHistory: async (userId) => {
        const response = await fetch(`${BASE_URL}/users/${userId}/order-history`);
        if (!response.ok) throw new Error('Failed to fetch order history');
        return await response.json();
    },

     // Message Management
fetchMessages: async (orderId) => {
        const response = await fetch(`${BASE_URL}/messages/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        return await response.json();
    },

sendMessage: async (messageData) => {
        const response = await fetch(`${BASE_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });
        if (!response.ok) throw new Error('Failed to send message');
        return await response.json();
    },

getAllProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`);
        return await response.json();
    },

getProductById: async (productId) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        return await response.json();
 },
createProduct: async (productData) => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        return await response.json();
    },

updateProduct: async (productId, productData) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        return await response.json();
    },

deleteProduct: async (productId) => {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'DELETE',
        });
        return await response.json();
    },

getAllCourses: async () => {
        const response = await fetch(`${BASE_URL}/courses`);
        return await response.json();
    },

getCourseById: async (courseId) => {
        const response = await fetch(`${BASE_URL}/courses/${courseId}`);
        return await response.json();
    },

createCourse: async (courseData) => {
        const response = await fetch(`${BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });
        return await response.json();
    },

getAllCompetitions: async () => {
        const response = await fetch(`${BASE_URL}/competitions`);
        return await response.json();
    },

getCompetitionById: async (competitionId) => {
        const response = await fetch(`${BASE_URL}/competitions/${competitionId}`);
        return await response.json();
    },

registerForCompetition: async (competitionId, userId) => {
        const response = await fetch(`${BASE_URL}/competitions/${competitionId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        return await response.json();
    },
// Notifications Management
getNotifications: async (userId) => {
        const response = await fetch(`${BASE_URL}/notifications/user/${userId}`);
        return await response.json();
    },

createNotification: async (notificationData) => {
        const response = await fetch(`${BASE_URL}/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData),
        });
        return await response.json();
    },

getAllNotifications: async (userData) =>  {
        const response = await fetch(`${BASE_URL}/notifications`);
         return await response.json();
},

getAllCommunityPosts: async () => {
        const response = await fetch(`${BASE_URL}/community-posts`);
        return await response.json();
    },

createCommunityPost: async (post) => {
        const response = await fetch(`${BASE_URL}/community-posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        return await response.json();
    },
getAllPosts: async () => {
        const response = await fetch(`${BASE_URL}/community-posts`);
        return await response.json();
    },

createPost: async (post) => {
        const response = await fetch(`${BASE_URL}/community-posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        return await response.json();
    },

getCommentsByPostId: async (postId) => {
        const response = await fetch(`${BASE_URL}/community-posts/${postId}/comments`);
        return await response.json();
    },

postComment: async (postId, comment) => {
        const response = await fetch(`${BASE_URL}/community-posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        return await response.json();
    },
    // Feedback
createFeedback: async (feedbackData) => {
        const response = await fetch(`${BASE_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
        });
        return await response.json();
    },
    // Event Management
getAllEvents: async () => {
        const response = await fetch(`${BASE_URL}/events`);
        return await response.json();
    },

getEventById: async (eventId) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`);
        return await response.json();
    },

createEvent: async (eventData) => {
        const response = await fetch(`${BASE_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        return await response.json();
    },

updateEvent: async (eventId, eventData) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        return await response.json();
    },

deleteEvent: async (eventId) => {
        const response = await fetch(`${BASE_URL}/events/${eventId}`, {
            method: 'DELETE',
        });
        return await response.json();
    },

createPayment: async (paymentData) => {
        const response = await fetch(`${BASE_URL}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        return await response.json();
    },

initiatePayment: async (paymentData) => {
            const response = await fetch(`${BASE_URL}/payments/initiate-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            return await response.json();
},

verifyPayment: async (verificationData) => {
            const response = await fetch(`${BASE_URL}/payments/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verificationData),
            });
            return await response.json();
},
    // Meeting Requests
createMeetingRequest: async (requestData) => {
        const response = await fetch(`${BASE_URL}/meeting-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        return await response.json();
    },

getAllMeetingRequests: async () => {
        const response = await fetch(`${BASE_URL}/meeting-requests`);
        return await response.json();
    },
    // Resource Management
getAllResources: async () => {
        const response = await fetch(`${BASE_URL}/resources`);
        return await response.json();
    },

createResource: async (resourceData) => {
        const response = await fetch(`${BASE_URL}/resources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resourceData),
        });
        return await response.json();
    },

updateResource: async (resourceId, resourceData) => {
        const response = await fetch(`${BASE_URL}/resources/${resourceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resourceData),
        });
        return await response.json();
    },

deleteResource: async (resourceId) => {
        const response = await fetch(`${BASE_URL}/resources/${resourceId}`, {
            method: 'DELETE',
        });
        return await response.json();
    },

    // Quiz Management
getAllQuizzes: async () => {
        const response = await fetch(`${BASE_URL}/quizzes`);
        return await response.json();
    },

createQuiz: async (quizData) => {
        const response = await fetch(`${BASE_URL}/quizzes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData),
        });
        return await response.json();
    },

getQuizById: async (quizId) => {
        const response = await fetch(`${BASE_URL}/quizzes/${quizId}`);
        return await response.json();
    },
};

export default api22;
*/
