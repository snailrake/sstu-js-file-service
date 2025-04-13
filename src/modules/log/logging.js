const axios = require('axios');
const LOG_SERVICE_URL = process.env.LOG_SERVICE_URL || 'http://localhost:4000/log';

module.exports = (req, res, next) => {
    const startTime = new Date();
    res.on('finish', async () => {
        const endTime = new Date();
        const logData = {
            method: req.method,
            url: req.originalUrl,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            status: res.statusCode
        };
        try {
            await axios.post(LOG_SERVICE_URL, logData);
        } catch (err) {
            console.error('Ошибка отправки лога:', err.message);
        }
    });
    next();
};
