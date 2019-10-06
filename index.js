const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const _ = require('lodash');
const fs = require('fs');

let app = express();

app.all('/updatelist', (req, res) => {
        console.log('...');
        fs.readdir('folder/', (err, items) => {
            fs.writeFile('folder/list.txt', '', (err) => {})

            Promise.all(_.map(items, async (item) => {
                return new Promise((resolve) => {
                    fs.appendFile('folder/list.txt', item + '\r\n', (err) => {
                        console.log('f');
                        setTimeout(resolve, 1000);
                    });   
                })
            }))
            .then(() => {
                console.log('!');
                res.writeHead(301, {Location: '/'});
                res.end();
            })
            
        })
    })

app.get('/', (req, res) => {
        console.log('.')
        // после нажатия в этом файле появится список файлов и папок, лежащих в папке
        res.send('<a href="/updatelist">Обновить list.txt</a>');        
    })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))