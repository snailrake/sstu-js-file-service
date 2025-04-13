const fileService = require('./service');

exports.uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
    }
    res.status(200).json({ message: 'Файл успешно загружен', filename: req.file.filename });
};

exports.getImage = async (req, res) => {
    const filename = req.params.filename;
    try {
        const filePath = await fileService.getFilePath(filename);
        res.sendFile(filePath);
    } catch (err) {
        res.status(404).json({ message: 'Файл не найден' });
    }
};

exports.deleteImage = async (req, res) => {
    const filename = req.params.filename;
    try {
        await fileService.deleteFile(filename);
        res.status(200).json({ message: 'Файл успешно удалён' });
    } catch (err) {
        res.status(404).json({ message: 'Файл не найден или ошибка удаления' });
    }
};
