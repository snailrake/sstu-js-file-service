const axios = require('axios');
const LOG_SERVICE_URL = process.env.LOG_SERVICE_URL || 'http://localhost:4000/log';

exports.sendLog = async (message) => {
    const logData = {
        message: message,
        timestamp: new Date().toISOString()
    };
    try {
        await axios.post(LOG_SERVICE_URL, logData);
    } catch (err) {
        console.error('Ошибка логирования:', err.message);
    }
};
