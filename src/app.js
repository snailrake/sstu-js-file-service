const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключаем маршруты файлового хранилища
const fileRoutes = require('./modules/file/routes');
app.use('/file', fileRoutes);

module.exports = app;
