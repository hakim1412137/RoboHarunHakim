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
        // const excludedPattern = /^\/(auth\/(login|signup)|_blank)\/?$/;

        // Check if the request URL does not match the login or signup endpoints
         if (!/\/auth\/(login|signup)$/.test(request.url)) {
        //     if (!excludedPattern.test(request.url)) {

                const token = await AsyncStorage.getItem('token'); // Retrieve the token from AsyncStorage

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
// Add response interceptor
api.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response;
}, error => {
    console.error('Response Error:', error.response);
    return Promise.reject(error);
});

// Axios response interceptor for handling token expiration or unauthorized access
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login screen)
            await AsyncStorage.removeItem('token'); // Clear the token

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
const initializePayment1 = (paymentData) => api.post('/payments/initialize', paymentData);
const verifyPayment1 = (txRef) => api.get(`/payments/verify/${txRef}`);
const handlePaymentResult = (txRef) => api.get(`/payments/payment-result?tx_ref=${txRef}`);

// http://localhost:8083/api/posts?page =0&size=10
const getAllPosts = (page, size) => api.get(`/posts?page=${page}&size=${size}`);
const getPostById = (postId) => api.get(`/posts/${postId}`);
// const getCommentsByPostId = (postId) => api.get(`/comments/post/${postId}`);
 const getCommentsByPostId = (postId) => api.get(`/posts/${postId}/comments`);
// const getCommentsByPostId = (postId, page, size) => api.get(`/posts/${postId}/comments?page=${page}&size=${size}`);
const createPost = (post) => api.post(`/posts`, post);
const postComment = (postId, comment) => api.post(`/posts/${postId}/comments`, comment);
const getPostsByUserId = (userId) => api.get(`/posts/user/${userId}`);

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
const getSupports = () => api.get('/supports');
const createSupport = (supportData) => api.post('/supports',supportData);
const updateSupport = (supportId, supportData) => api.put(`/supports/${supportId}`, supportData);
const deleteSupport = (supportId) => api.delete(`/supports/${supportId}`);

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

// Resource management
const getJoinUs = () => api.get('/joinUs');
const createJoinUs = (JoinUsData) => api.post('/joinUs', JoinUsData);

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
    login,signup,getUserDetails,
    handlePaymentResult,
    // refreshTokeni,logoutUser,updateUserDetails,
    getJoinUs,createJoinUs,
    forgotPassword,resetPassword,
    initializePayment1, verifyPayment1,
    getTrainingsById, createTraining, updateTraining, deleteTraining,getAllTrainings,
    createTeam, getTeamById, getAllTeams, deleteTeam,
    createCareer,getCareerById,getAllCareers,deleteCareer,
    createClient,getClientById, getAllClients, deleteClient,
    getSupports,createSupport,updateSupport,deleteSupport,
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
};
