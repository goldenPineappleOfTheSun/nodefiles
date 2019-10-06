const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const _ = require('lodash');
const fs = require('fs');
const https = require('https');

let app = express();

app.all('/downloadfromurl', (req, res) => {
        console.log('...');
        let file = fs.createWriteStream('folder/bd.jpg');
        let stream = https.get("https://media.distractify.com/brand-img/aN4TJYbm8/1280x671/belle-delphine-bath-water-1563550232731.jpg", 
            function(httpres) {
                httpres.pipe(file);
            });
        stream.on('finish', function() {
            res.writeHead(301, {Location: '/'});
            res.end();
        });
    })

app.get('/', (req, res) => {
        console.log('.')
        // после нажатия в этом файле появится список файлов и папок, лежащих в папке
        res.send('<a href="/downloadfromurl">download</a>');        
    })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))