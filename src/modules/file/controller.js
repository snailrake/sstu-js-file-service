const fileService = require('./service');
const { sendLog } = require('../log/logging');

exports.uploadImage = async (req, res) => {
    if (!req.file) {
        await sendLog('Ошибка: файл не загружен');
        return res.status(400).json({ message: 'Файл не загружен' });
    }
    await sendLog(`Файл ${req.file.filename} успешно загружен`);
    res.status(200).json({ message: 'Файл успешно загружен', filename: req.file.filename });
};

exports.getImage = async (req, res) => {
    const filename = req.params.filename;
    try {
        const filePath = await fileService.getFilePath(filename);
        await sendLog(`Файл ${filename} успешно получен`);
        res.sendFile(filePath);
    } catch (err) {
        await sendLog(`Ошибка: файл ${filename} не найден`);
        res.status(404).json({ message: 'Файл не найден' });
    }
};

exports.deleteImage = async (req, res) => {
    const filename = req.params.filename;
    try {
        await fileService.deleteFile(filename);
        await sendLog(`Файл ${filename} успешно удалён`);
        res.status(200).json({ message: 'Файл успешно удалён' });
    } catch (err) {
        await sendLog(`Ошибка: файл ${filename} не найден или не удалён`);
        res.status(404).json({ message: 'Файл не найден или ошибка удаления' });
    }
};
