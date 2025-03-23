import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust the URL based on your backend setup

export const fetchUserData = async () => {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
};

export const fetchDeviceData = async () => {
    const response = await axios.get(`${API_URL}/devices`);
    return response.data;
};
