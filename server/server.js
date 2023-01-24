require('dotenv').config()

const express = require('express');
const app = express();
const DB = require('./config/db.connect');
const AppRoutes = require('../server/routes');

const fs = require('fs')
const cors = require('cors');

const dir_names = ['heroes', 'users', 'awards']

fs.mkdir(`../client/dist/images`, (err) => {
    console.log(err)
})

dir_names.forEach((name => {
    fs.mkdir(`../client/dist/images/${name}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Директории изображений успешно созданы')
        }
    })
}))

const fileUpload = require('express-fileupload');
const path = require('path');

app.use(express.static(path.resolve('../client/dist/')))
app.use(express.json())
app.use(fileUpload({}))
app.use(cors());

app.use('/', AppRoutes.UserRoutes);
app.use('/', AppRoutes.HeroRoutes);
app.use('/', AppRoutes.AdminRoutes);

const PORT = process.env.PORT || 5000

const StartApp = async () => {
    try {
        // await DB.sync({force: true})
        await DB.sync()
        await app.get('/*', (req, res) => {
            res.sendFile(path.resolve('../client/dist/index.html'))
        })
        await app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
    }
}

StartApp();
