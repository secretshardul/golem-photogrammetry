import express from 'express'
import cors from 'cors'
import multer from 'multer'

const app = express()
app.use(cors())

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.array('zip'), (req, res) => {
    console.log('text body', req.body)
    const {micmacScript, email} = req.body
    const files = req.files as Express.Multer.File[]
    const zip = files.pop()
    console.log('zip file',  zip)
    res.send()
});

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});
