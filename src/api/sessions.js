import api from './index';

export const createSession = (sessionData) => {
  return api.post('/api/sessions', sessionData);
};

export const getUserSessions = (userId) => {
  return api.get(`/api/sessions/user/${userId}`);
};

export const getSession = (sessionId) => {
  return api.get(`/api/sessions/${sessionId}`);
};

export const updateSession = (sessionId, sessionData) => {
  return api.put(`/api/sessions/${sessionId}`, sessionData);
};

export const addCriteriaToSession = (sessionId, criteria) => {
  return api.post(`/api/sessions/${sessionId}/criteria`, criteria);
};

export const deleteSession = (sessionId) => {
  return api.delete(`/api/sessions/${sessionId}`);
};
