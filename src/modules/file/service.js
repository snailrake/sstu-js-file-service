const fs = require('fs');
const path = require('path');
const util = require('util');
const axios = require('axios');
const unlinkAsync = util.promisify(fs.unlink);

const uploadDirectory = path.join(process.cwd(), 'uploads');

exports.getFilePath = (filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(uploadDirectory, filename);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return reject(new Error('File does not exist'));
            }
            resolve(filePath);
        });
    });
};

exports.deleteFile = async (filename) => {
    const filePath = path.join(uploadDirectory, filename);
    await unlinkAsync(filePath);
};

// Пример функции для отправки логов (если потребуется вызывать её из контроллера)
// (Однако основное логирование реализовано через middleware)
exports.logRequest = async (req, res) => {
    const startTime = new Date().toISOString();
    try {
        await axios.post(process.env.LOG_SERVICE_URL || 'http://localhost:4000/log', {
            method: req.method,
            url: req.originalUrl,
            startTime: startTime,
            endTime: new Date().toISOString(),
            status: res.statusCode
        });
    } catch (err) {
        console.error('Ошибка логирования:', err.message);
    }
};
