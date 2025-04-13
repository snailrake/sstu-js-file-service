const fileService = require('./service');

exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
    }
    res.status(200).json({ message: 'Файл успешно загружен', filename: req.file.filename });
};

exports.getImage = (req, res) => {
    const filename = req.params.filename;
    fileService.getFilePath(filename)
        .then(filePath => res.sendFile(filePath))
        .catch(err => res.status(404).json({ message: 'Файл не найден' }));
};

exports.deleteImage = (req, res) => {
    const filename = req.params.filename;
    fileService.deleteFile(filename)
        .then(() => res.status(200).json({ message: 'Файл успешно удалён' }))
        .catch(err => res.status(404).json({ message: 'Файл не найден или ошибка удаления' }));
};
