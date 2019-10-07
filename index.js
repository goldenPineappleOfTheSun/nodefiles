const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const _ = require('lodash');
const fs = require('fs');
const https = require('https');
const multer = require('multer');
const mime = require('mime');

let app = express();

var multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'folder/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + mime.getExtension(file.mimetype));
  }
});
var upload = multer({ storage: multerstorage });

app
    .get('/', (req, res) => {
        console.log('.')
        // после нажатия в этом файле появится список файлов и папок, лежащих в папке
        res.sendFile(path.join(__dirname+'/public/form.html'));        
    })
    .post('/uploadfile', upload.single("filedata"), (req, res) => {
        let filedata = req.file;
        console.log(filedata);     
        if(!filedata)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");      
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))