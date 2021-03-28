import express from 'express'
import path from 'path'
import cors from 'cors'
import multer from 'multer'
// import fs from 'fs'
import fs from 'fs/promises'
import generateMesh from './golem'

const app = express()
app.use(cors())

const upload = multer({ storage: multer.memoryStorage() })

app.post('/upload', upload.array('zip'), async (req, res) => {
    console.log('text body', req.body)
    const {micmacScript, email} = req.body
    const files = req.files as Express.Multer.File[]
    const zip = files.pop()
    console.log('zip file',  zip)

    if(zip && micmacScript && email) {
        const fileName = 'download.zip'
        const filePath = path.join(__dirname, fileName)
        await fs.writeFile(filePath, zip.buffer)
        res.send()

        try {
            await generateMesh(fileName)
        } catch(error) {
            // TODO send error email
        }


    } else {
        res.sendStatus(400)
    }

});

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});
