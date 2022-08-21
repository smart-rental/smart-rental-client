import axios from "axios";

const url = "http://localhost:5000";
const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

// User
export const createUser = (userInfo) => axios.post(`${url}/api/users`, userInfo);
export const getUsers = () => axios.get(`${url}/api/auth`);
export const getUser = (userId) => axios.get(`${url}/api/auth/${userId}`);
export const validateUser = (userInfo) => axios.post(`${url}/api/auth`, userInfo);
export const updateUser = (id, userInfo) => axios.patch(`${url}/api/users/${id}`, userInfo)
// Property
export const addProperty = (id, propertyToAdd) => axios.post(`${url}/api/property/${id}`, propertyToAdd);
export const getProperties = (id) => axios.get( `${url}/api/property/${id}`);
export const getAllProperties = (page) => axios.get(`${url}/api/property`, {params: { page }})
export const getProperty = (ownerId, propertyId) => axios.get( `${url}/api/property/${ownerId}/${propertyId}`);
export const getPropertyByID = (propertyId) => axios.get( `${url}/api/property/locate/${propertyId}`);
export const deleteProperty = (id) => axios.delete( `${url}/api/property/${id}`);
export const editProperty = (ownerId, id, propertyToEdit) => axios.patch( `${url}/api/property/update/${ownerId}/${id}`, propertyToEdit);
export const addTenant = (ownerId, propertyId, tenantToAdd) => axios.post(`${url}/api/property/addTenant/${ownerId}/${propertyId}`, tenantToAdd);
export const deleteTenant = (ownerId, propertyId) => axios.post(`${url}/api/property/deleteTenant/${ownerId}/${propertyId}`);
//Issue
export const retrieveIssues = (tenantId) => axios.get(`${url}/api/issue/${tenantId}`);
export const retrieveIssue = (issueId) => axios.get(`${url}/api/issue/oneIssue/${issueId}`);
export const retrieveIssueFromProperty = (propertyId) => axios.get(`${url}/api/issue/property/${propertyId}`);
export const addIssue = (tenantId, issue) => axios.post(`${url}/api/issue/${tenantId}`, issue);
export const deleteIssue = (tenantId, issueId) => axios.delete(`${url}/api/issue/${tenantId}/${issueId}`);
export const updateIssue = (issueId, issueToEdit) => axios.patch(`${url}/api/issue/update/${issueId}`, issueToEdit);
//Applications
export const retrieveApplication = (propertyId) => axios.get(`${url}/api/application/${propertyId}`);
export const addApplication = (propertyId, application) => axios.post(`${url}/api/application/apply/${propertyId}`, application);
export const deleteApplication = (applicationId) => axios.delete(`${url}/api/application/delete/${applicationId}`);
//Stripe
export const stripeAccountDeletion = (ownerId) => axios.delete(`${url}/api/connect/delete/${ownerId}`);
export const stripeAccountCreation = (ownerId) => axios.post(`${url}/api/connect/${ownerId}`);
export const stripeAutoPaymentCreation = (userId) => axios.post(`${url}/api/connect/checkout-session/${userId}`);
export const stripeAutoPaymentDeletion = (userId) => axios.delete(`${url}/api/connect/${userId}`);
//Google Maps
export const getGeocode = (address) => axios.get(`${googleAPIUrl}`, {
    params: {
        address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
});