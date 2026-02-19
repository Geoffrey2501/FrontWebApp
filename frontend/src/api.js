import axios from 'axios';

//const API_URL = 'http://127.0.0.1:5000'; // À ajuster selon ton serveur Flask
const API_URL = '';

// Enums du sujet
export const CATEGORIES = {
    SOC: 'Jeux de société', FIG: 'Figurines', CON: 'Construction',
    EXT: 'Extérieur', EVL: 'Éveil', LIV: 'Livres'
};
export const AGE_RANGES = { BB: '0-3 ans', PE: '3-6 ans', EN: '6-10 ans', AD: '10+ ans' };
export const CONDITIONS = { N: 'Neuf', TB: 'Très bon état', B: 'Bon état' };

const api = axios.create({ baseURL: API_URL });

export const subscriberAPI = {
    register: (data) => api.post('/subscriber/register', data),
    getBox: (email) => api.get(`/subscriber/box?email=${email}`),
    getHistory: (email) => api.get(`/subscriber/history?email=${email}`),
};

export const adminAPI = {
    getArticles: (page = 1) => api.get(`/admin/articles?page=${page}`),
    addArticle: (data) => api.post('/admin/articles', data),
    createCampaign: (maxWeight) => api.post('/admin/campaigns', { max_weight_per_box: maxWeight }),
    optimizeCampaign: (id) => api.post(`/admin/campaigns/${id}/optimize`),
    getBoxes: (id) => api.get(`/admin/campaigns/${id}/boxes`),
    validateBox: (campId, subId) => api.post(`/admin/campaigns/${campId}/boxes/${subId}/validate`),
    getDashboard: () => api.get('/admin/dashboard'),
};