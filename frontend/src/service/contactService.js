import api from './api';

const sendMessage = async (contactData) => {
  // contactData: { name, email, subject, message }
  const response = await api.post('/contact/send', contactData);
  return response.data; // Contains { message }
};

export const contactService = {
  sendMessage,
};