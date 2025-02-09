import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = "http://localhost:8083/api";

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Axios request interceptor for setting Authorization headers
api.interceptors.request.use(
    async (request) => {
        // Check if the request URL does not match the login or signup endpoints
        if (!/\/auth\/(login|signup)$/.test(request.url)) {
            const token = await AsyncStorage.getItem('token'); // Retrieve the token from AsyncStorage
           // const userId = await AsyncStorage.getItem('userId'); // Retrieve the logged-in user's ID

            if (token) {
                request.headers.Authorization = `Bearer ${token}`; // Attach the token to the request
            }
        }
        return request;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Axios response interceptor for handling token expiration or unauthorized access
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login screen)
            await AsyncStorage.removeItem('token'); // Clear the token
            // await AsyncStorage.removeItem('userId');

            // Optionally, redirect the user to the login screen
        }
        return Promise.reject(error);
    }
);

// const enrollInCourse = (courseId) => api.post('/courses/enroll', { courseId });
const getUserDetails = (username) => api.get(`/auth/username/${username}`);

// const enrollInCourse = (userId, courseId) => api.post(`/enrollments/enroll?userId=${userId}&courseId=${courseId}`);
 const enrollInCourse = (userId, courseId) => api.post('/enrollments/enroll',{userId, courseId});
// const registerForCompetition = (competitionId) => api.post(`/competitions/${competitionId}/register`);
 const registerForCompetition = (userId, competitionId) => api.post('registrations/register',{ userId, competitionId });

// Auth operations
const login = (loginData) => api.post('/auth/login', loginData);
const signup = (signupData) => api.post('/auth/signup', signupData);
// const refreshToken = (refreshTokenData) => api.post('/auth/refresh-token', refreshTokenData);
// const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
 const resetPassword = (token, newPassword) => api.post('/auth/reset-password', { token, newPassword });


// Payment API calls
const initializePayment = (paymentData) => api.post('/payments/initialize', paymentData);
const verifyPayment = (txRef) => api.get(`/payments/verify/${txRef}`);
// http://localhost:8083/api/posts?page =0&size=10
const getAllPosts = (page, size) => api.get(`/posts?page=${page}&size=${size}`);
const createPost = (post) => api.post(`/posts`, post);
const getPostById = (postId) => api.get(`/posts/${postId}`);
const getPostsByUserId = (userId) => api.get(`/posts/user/${userId}`);
const getCommentsByPostId = (postId) => api.get(`/comments/post/${postId}`);
const postComment = (postId, comment) => api.post(`/posts/${postId}/comments`, comment);

/*const initiatePayment = (paymentData) => api.post(`/payments/initiate-payment`, paymentData);
const verifyPayment = (verificationData) => api.post(`/payments/verify-payment`, verificationData);*/

// Competition management
const getAllCompetitions = () => api.get(`/competitions`);
const getCompetitionById = (competitionId) => api.get(`/competitions/${competitionId}`);
const createCompetition = (competitionData) => api.post('/competitions', competitionData);
const updateCompetition = (competitionId, competitionData) => api.put(`/competitions/${competitionId}`, competitionData);
const deleteCompetition = (competitionId) => api.delete(`/competitions/${competitionId}`);

// Vex Robotics operations
const getAllVexRobotics = () => api.get('/vex-robotics');
const createVexRobotics = (vexRobotData) => api.post('/vex-robotics', vexRobotData);
const deleteVexRoboticsById = (vexRobotId) => api.delete(`/vex-robotics/${vexRobotId}`);
const vexRoboticsById = (vexRobotId) => api.get(`/vex-robotics/${vexRobotId}`);

// Product CRUD operations
const getProducts = () => api.get('/products');
const createProduct = (productData) => api.post('/products', productData);
const updateProduct = (productId, productData) => api.put(`/products/${productId}`, productData);
const deleteProduct = (productId) => api.delete(`/products/${productId}`);
const getProductDetails = (productId) => api.get(`/products/${productId}`);

// Service management
const getServices = () => api.get('/services');
const createService = (serviceData) => api.post('/services', serviceData);
const updateService = (serviceId, serviceData) => api.put(`/services/${serviceId}`, serviceData);
const deleteService = (serviceId) => api.delete(`/services/${serviceId}`);

// Course management
const getAllCourses = () => api.get('/courses');
const getCourseById = (courseId) => api.get(`/courses/${courseId}`);
const getCoursesByUserId = (userId) => api.get(`/courses/user/${userId}`);
const createCourse = (courseData) => api.post('/courses', courseData);
const updateCourse = (courseId, courseData) => api.put(`/courses/${courseId}`, courseData);
const deleteCourse = (courseId) => api.delete(`/courses/${courseId}`);


// Event management
const getEvents = () => api.get('/events');
const getEventById = (eventId) => api.get(`/events/${eventId}`);
const createEvent = (eventData) => api.post('/events', eventData);
const updateEvent = (eventId, eventData) => api.put(`/events/${eventId}`, eventData);
const deleteEvent = (eventId) => api.delete(`/events/${eventId}`);
const registerForEvents = (eventId) => api.post(`/events/${eventId}/register`);

// Resource management
const getResources = () => api.get('/resources');
const createResource = (resourceData) => api.post('/resources', resourceData);
const updateResource = (resourceId, resourceData) => api.put(`/resources/${resourceId}`, resourceData);
const deleteResource = (resourceId) => api.delete(`/resources/${resourceId}`);

// Partnership management
const getPartnerships = () => api.get('/partnerships');
const createPartnership = (partnershipData) => api.post('/partnerships', partnershipData);
const updatePartnership = (partnershipId, partnershipData) => api.put(`/partnerships/${partnershipId}`, partnershipData);
const deletePartnership = (partnershipId) => api.delete(`/partnerships/${partnershipId}`);

// Order management
const fetchOrders = () => api.get(`/orders`);
const updateOrderStatus = (orderId, status) => api.put(`/orders/${orderId}`, { status });

// Feedback CRUD operations
const getFeedbackByCourseId = (courseId) => api.get(`/feedback/course/${courseId}`);
const submitFeedback = (feedbackData) => api.post('/feedback', feedbackData);

// Community management
/*const getAllCommunityPosts = () => api.get(`/community-posts`);
const createCommunityPost = (post) => api.post(`/community-posts`, post);
const getCommentsByPostId = (postId) => api.get(`/community-posts/${postId}/comments`);
const postComment = (postId, comment) => api.post(`/community-posts/${postId}/comments`, comment);*/

// Quiz CRUD operations
const getQuizzes = () => api.get('/quizzes');
const createQuiz = (quizData) => api.post('/quizzes', quizData);
const getQuizById = (quizId) => api.get(`/quizzes/${quizId}`);

// Notification management
const getNotifications = (userId) => api.get(`/notifications/user/${userId}`);
const createNotification = (notificationData) => api.post('/notifications', notificationData);

// Meeting requests
const createMeetingRequest = (requestData) => api.post('/meeting-requests', requestData);
const getAllMeetingRequests = () => api.get('/meeting-requests');
const getMeetingRequestById = (requestId) => api.get(`/meeting-requests/${requestId}`);
const deleteMeetingRequest = (requestId) => api.delete(`/meeting-requests/${requestId}`);


// Career management
const createCareer = (careerData) => api.post('/careers', careerData);
const getCareerById = (careerId) => api.get(`/careers/${careerId}`);
const getAllCareers = () => api.get('/careers');
const deleteCareer = (careerId) => api.delete(`/careers/${careerId}`);

const createClient = (clientData) => api.post('/clients', clientData);
const getClientById = (clientId) => api.get(`clients/${clientId}`);
const getAllClients = () =>  api.get('/clients');
const deleteClient = (clientId) => api.delete(`/clients/${clientId}`);

// Team management API calls
const createTeam = (teamData) => api.post('/teams', teamData);
const getTeamById = (teamId) => api.get(`teams/${teamId}`);
const getAllTeams = () => api.get('/teams');
const deleteTeam = (teamId) => api.delete(`/teams/${teamId}`);


const createTraining =(trainingData) =>api.post('/robotics-trainings', trainingData); // Create a new training
const getTrainingsById =  (trainingId) => api.get(`robotics-trainings/${trainingId}`); // Fetch all trainings
const getAllTrainings= () => api.get('/robotics-trainings');
const updateTraining =  (trainingId, trainingData) => api.put(`${trainingId}`, trainingData); // Update the specified training
const deleteTraining =  (trainingId) => api.delete(`robotics-trainings/${trainingId}`); // Delete the specified training


// Exporting all the methods for usage
export {
    login,signup,
    // refreshToken,
    forgotPassword,resetPassword,
    initializePayment, verifyPayment,
    getTrainingsById, createTraining, updateTraining, deleteTraining,getAllTrainings,
    createTeam, getTeamById, getAllTeams, deleteTeam,
    createCareer,getCareerById,getAllCareers,deleteCareer,
    createClient,getClientById, getAllClients, deleteClient,
    getUserDetails,
    // updateUserDetails,
    getAllCompetitions, getCompetitionById, registerForCompetition, createCompetition, updateCompetition, deleteCompetition,
    getAllVexRobotics, createVexRobotics, deleteVexRoboticsById, vexRoboticsById,
    getProducts, createProduct, updateProduct, deleteProduct, getProductDetails,
    getServices, createService, updateService, deleteService,
    getAllCourses, getCourseById, getCoursesByUserId, createCourse, updateCourse, deleteCourse,enrollInCourse,
    getEvents, createEvent, updateEvent, deleteEvent, registerForEvents,
    getResources, createResource, updateResource, deleteResource,
    getPartnerships, createPartnership, updatePartnership, deletePartnership,
    fetchOrders, updateOrderStatus, getFeedbackByCourseId,
    submitFeedback, getAllPosts, createPost, getCommentsByPostId, postComment,getPostById,getPostsByUserId,
    getQuizzes, createQuiz, getQuizById,
    getNotifications, createNotification,
    createMeetingRequest, getAllMeetingRequests,getMeetingRequestById,deleteMeetingRequest
    // , logoutUser
};

// User operations
// const getUserDetails = (username) => api.post('/auth/username', { username });
// const getUserDetails = (username) => api.get(`/auth/username/${username}`);
// const updateUserDetails = (userId, userData) => api.put(`/auth/${userId}`, userData);
// Logout function
/*const logoutUser = async () => {
    await AsyncStorage.removeItem('token'); // Clear the token
    // Optionally, redirect the user to the login screen
};*/
/*export const enrollInCourse = async (courseId) => {
   try {
       const userId = await AsyncStorage.getItem('userId'); // Retrieve the logged-in user's ID
       const response = await axios.post('/enrollments/enroll', { userId, courseId });
       return response.data;
   } catch (error) {
       throw error.response ? error.response.data : error;
   }
};*/
/*// Request interceptor
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token && !config.url.includes('/auth/')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});*/

/*// Create an instance of Axios
const api = axios.create({
    baseURL: 'http://localhost:8083/api', // Replace with your actual backend API URL
});*/
/*import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an instance of Axios
const api = axios.create({
    baseURL: 'http://localhost:8083/api', // Replace with your actual backend API URL
});

// Axios request interceptor for setting Authorization headers
// api.interceptors.request.use(
//     request => {
//         // Check if the request URL does not match the login or signup endpoints
//         if (!/\/auth\/(login|signup)$/.test(request.url)) {
//             const token = AsyncStorage.getItem('token').then((retToken) => {
//                 console.log(retToken, "Promise Key")
//                 if (token) {
//                     request.headers.Authorization = `Bearer ${token}`;
//                 }
//             }); // Change to AsyncStorage as localStorage is not available in React Native
//             console.log('Requesting:', request);
//             console.log('Token:', token);
//         }
//         return request;
//     },
//     error => {
//         console.error('Request error:', error);
//         return Promise.reject(error);
//     }
// );
// const token = await AsyncStorage.getItem('token');*/


/*// Interceptor to include the token in the headers
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token'); // Get the token from storage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
    console.log(config)
    return config;
}, (error) => {
    return Promise.reject(error);
});*/
/*api.interceptors.request.use(
    request => {
        // Check if the request URL does NOT match the authentication endpoints for signin and signup
        if (!/\/auth\/(login|register)$/.test(request.url)) {
            // If a token exists in local storage, attach it to the Authorization header
            const token = localStorage.getItem('token');
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
                // This allows the server to authenticate the user for protected routes
            }
        }

        // Return the modified request object to proceed with the request
        return request;
    },
    error => {
        // Handle request errors if any
        console.error('Request error:', error);
        return Promise.reject(error); // Reject the promise for any request error
    }
);*/
// const login = async (username,password) => {
//     const response = await axios.post('http://localhost:8083/api/auth/login',{username, password}, {
//         headers: { 'Content-Type': 'application/json' }
//     });
//     return response; // Returning the whole response in case you want additional info later
// };


/*
export const fetchVexRobotics = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const fetchVexRoboticsById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const createVexRobotics = async (data) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
};

export const deleteVexRoboticsById = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
};

*/
/*

Choosing between using the Fetch API and Axios d
epends on your specific needs and preferences, but here are some considerations for both to help you decide:

1. Fetch API
Native Support: Fetch is built into modern browsers and Node.js, meaning no additional libraries are required.
Promise-Based: Fetch uses Promises, allowing you to write concise, modern asynchronous code.
Streaming: Fetch supports streaming of request and response bodies.
Better Control: You have more control over the request settings, such as specifying mode, credentials, and cache options.
Downsides:
No Built-In Timeout: Fetch does not support timeout natively, so you would need to implement it yourself.
Error Handling: Fetch does not reject the Promise on HTTP error statuses (like 404 or 500). You have to manually check the response.ok flag.
Less Intuitive: Some users may find Fetch's API less intuitive, especially when dealing with JSON, as you need to call .json() explicitly.
2. Axios
Simplified API: Axios has a more straightforward and user-friendly API for making HTTP requests.
Automatic JSON Handling: Axios automatically transforms requests and responses into JSON, reducing boilerplate code.
Interceptors: Axios allows the use of interceptors to easily modify requests or responses before they are handled.
Built-In Timeout: You can easily set timeouts for requests.
Better Error Handling: Axios automatically rejects the Promise for HTTP error statuses, simplifying error handling.
Downsides:
Additional Library: Axios requires an additional library to be included in your project, which adds to the bundle size.
Browser Compatibility: Though Axios works in most browsers, it's essential to ensure compatibility with your target environments.
Recommendations
For Simplicity & Convenience: If you are looking for a simplified approach with powerful features, including automatic JSON handling and interceptors, Axios is recommended.
For a Lightweight Solution: If you prefer not to add an external dependency and are comfortable with handling promises and errors yourself, the Fetch API is a great choice.
import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
    baseURL: 'http://localhost:8083/api', // Replace with your actual backend API URL
});

// Interceptors for adding JWT to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Adjust based on where you store your token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// User Authentication
const lgnup = (username, password) => api.post('/auth/signup', { username, password });
const getogin = (username, password) => api.post('/auth/login', { username, password });
const siUserDetails = (userId) => api.get(`/users/${userId}`);
const updateUserDetails = (userId, userData) => api.put(`/users/${userId}`, userData);

// Product CRUD Operations
const getProducts = () => api.get('/products');
const createProduct = (productData) => api.post('/products', productData);
const updateProduct = (productId, productData) => api.put(`/products/${productId}`, productData);
const deleteProduct = (productId) => api.delete(`/products/${productId}`);
const getProductDetails = (productId) => api.get(`/products/${productId}`); // Fetch details of a specific product



// Event CRUD Operations
const getEvents = () => api.get('/events');
const createEvent = (eventData) => api.post('/events', eventData);
const updateEvent = (eventId, eventData) => api.put(`/events/${eventId}`, eventData);
const deleteEvent = (eventId) => api.delete(`/events/${eventId}`);

// Resource CRUD Operations
const getResources = () => api.get('/resources');
const createResource = (resourceData) => api.post('/resources', resourceData);
const updateResource = (resourceId, resourceData) => api.put(`/resources/${resourceId}`, resourceData);
const deleteResource = (resourceId) => api.delete(`/resources/${resourceId}`);

 const getPartnership  = () => api.get('/partnerships');
const createPartnership = (partnershipData) => api.post('/partnerships', partnershipsData);
const updatePartnership = (partnershipId, partnershipData) => api.put(`/partnerships/${partnershipId}`, partnershipData);
const deletePartnership = (partnershipId) => api.delete(`/partnerships/${partnershipId}`);

const fetchOrders = () => api.get(`/orders`);
const updateOrderStatus = (orderId, status) => api.put(`/orders/${orderId}`, {status});

const initiatePayment = (paymentData) => api.post(`/payments/initiate-payment`, paymentData);
const verifyPayment = (verificationData) =>api.post(`/payments/verify-payment`, verificationData);


// Feedback CRUD Operations
const getFeedbackByCourseId = (courseId) => api.get(`/feedback/course/${courseId}`);
const submitFeedback = (feedbackData) => api.post('/feedback', feedbackData);

// Quiz CRUD Operations
const getQuizzes = () => api.get('/quizzes');
const createQuiz = (quizData) => api.post('/quizzes', quizData);
const getQuizById = (quizId) => api.get(`/quizzes/${quizId}`);

// Payment Management
const createPayment = (paymentData) => api.post('/payments', paymentData);

// Notification Management
const getNotifications = (userId) => api.get(`/notifications/user/${userId}`);
const createNotification = (notificationData) => api.post('/notifications', notificationData);

// Export all methods for use in your components
export {
    login,signup,getUserDetails,updateUserDetails,
    getProducts,createProduct,updateProduct,deleteProduct,getProductDetails,
    getServices,createService,updateService,deleteService,
    getCourses,createCourse,updateCourse,deleteCourse,
    getEvents,createEvent,updateEvent,deleteEvent,
    getResources,createResource,updateResource,deleteResource,
    getFeedbackByCourseId,submitFeedback,
    getQuizzes,createQuiz,getQuizById,
    createPayment,
    getNotifications,createNotification,
    getPartnership,createPartnership,updatePartnership,deletePartnership,
    fetchOrders,updateOrderStatus,
    initiatePayment,verifyPayment
};
*/

/*// Add a request interceptor to conditionally attach tokens for authenticated requests.
api.interceptors.request.use(
    request => {
        // Check if the request URL does NOT match the authentication endpoints for signin and signup
        if (!/\/auth\/(login|register)$/.test(request.url)) {
            // If a token exists in local storage, attach it to the Authorization header
            const token = localStorage.getItem('token');
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
                // This allows the server to authenticate the user for protected routes
            }
        }

        // Return the modified request object to proceed with the request
        return request;
    },
    error => {
        // Handle request errors if any
        console.error('Request error:', error);
        return Promise.reject(error); // Reject the promise for any request error
    }
);*/

// export default axiosInstance; // Export the configured Axios instance for use in other parts of the application
// Create an instance of Axios
/*const api = axios.create({
    baseURL: 'http://localhost:8083/api', // Replace with your actual backend API URL
});*/

/*// Interceptors for adding JWT to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Adjust based on where you store your token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

/*// Interceptors for adding JWT to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Adjust based on where you store your token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

/*// User Authentication
const login = (username, password) => {
const headers = {
    'Content-Type': 'application/json', // This header is usually needed
    // Add other headers if necessary, for example:
    // 'Authorization': 'Bearer SOME_TOKEN', // If you need to pass an auth token
};
    return api.post('/auth/login', { username, password }, { headers });
};*/

