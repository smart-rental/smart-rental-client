import axios from "axios";

const url = 'https://smart-rentals-server.herokuapp.com/';
const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

// User
export const createUser = (userInfo) => axios.post(`${url}/users`, userInfo);
export const getUsers = () => axios.get(`${url}/auth`);
export const getUser = (userId) => axios.get(`${url}/auth/${userId}`);
export const validateUser = (userInfo) => axios.post(`${url}/auth`, userInfo);
export const updateUser = (id, userInfo) => axios.patch(`${url}/users/${id}`, userInfo)
// Property
export const addProperty = (id, propertyToAdd) => axios.post(`${url}/property/${id}`, propertyToAdd);
export const getProperties = (id) => axios.get( `${url}/property/${id}`);
export const getAllProperties = (page) => axios.get(`${url}/property`, {params: { page }})
export const getProperty = (ownerId, propertyId) => axios.get( `${url}/property/${ownerId}/${propertyId}`);
export const getPropertyByID = (propertyId) => axios.get( `${url}/property/locate/${propertyId}`);
export const deleteProperty = (id) => axios.delete( `${url}/property/${id}`);
export const editProperty = (ownerId, id, propertyToEdit) => axios.patch( `${url}/property/update/${ownerId}/${id}`, propertyToEdit);
export const addTenant = (ownerId, propertyId, tenantToAdd) => axios.post(`${url}/property/addTenant/${ownerId}/${propertyId}`, tenantToAdd);
export const deleteTenant = (ownerId, propertyId) => axios.post(`${url}/property/deleteTenant/${ownerId}/${propertyId}`);
//Issue
export const retrieveIssues = (tenantId) => axios.get(`${url}/issue/${tenantId}`);
export const retrieveIssue = (issueId) => axios.get(`${url}/issue/oneIssue/${issueId}`);
export const retrieveIssueFromProperty = (propertyId) => axios.get(`${url}/issue/property/${propertyId}`);
export const addIssue = (tenantId, issue) => axios.post(`${url}/issue/${tenantId}`, issue);
export const deleteIssue = (tenantId, issueId) => axios.delete(`${url}/issue/${tenantId}/${issueId}`);
export const updateIssue = (issueId, issueToEdit) => axios.patch(`${url}/issue/update/${issueId}`, issueToEdit);
//Applications
export const retrieveApplication = (propertyId) => axios.get(`${url}/application/${propertyId}`);
export const addApplication = (propertyId, application) => axios.post(`${url}/application/apply/${propertyId}`, application);
export const deleteApplication = (applicationId) => axios.delete(`${url}/application/delete/${applicationId}`);
//Stripe
export const stripeAccountDeletion = (ownerId) => axios.delete(`${url}/connect/delete/${ownerId}`);
export const stripeAccountCreation = (ownerId) => axios.post(`${url}/connect/${ownerId}`);
export const stripeAutoPaymentCreation = (userId) => axios.post(`${url}/connect/checkout-session/${userId}`);
export const stripeAutoPaymentDeletion = (userId) => axios.delete(`${url}/connect/${userId}`);
//Google Maps
export const getGeocode = (address) => axios.get(`${googleAPIUrl}`, {
    params: {
        address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
});