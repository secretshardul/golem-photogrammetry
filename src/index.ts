import express from 'express'
import path from 'path'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs/promises'
import generateMesh from './golem'
import { sendFailureMail } from './emailController'

const app = express()
app.use(cors())
app.use(express.static(__dirname + '/public'))

const upload = multer({ storage: multer.memoryStorage() })

app.get('/download', (req, res) => {
    const { fileName } = req.query
    console.log('sending file', fileName)

    if(fileName && typeof(fileName) === 'string') {
        const file = path.join(__dirname, 'response', fileName)
        res.download(file) // Set disposition and send it.
    } else {
        res.sendStatus(404)
    }
})

app.post('/', upload.array('zip'), async (req, res) => {

    console.log('text body', req.body)
    const {micmacScript, email} = req.body
    const files = req.files as Express.Multer.File[]
    const zip = files.pop()
    console.log('zip file', zip)

    res.redirect('/success.html')
    await sendFailureMail(email)

    // if(zip && micmacScript && email) {
    //     const filePath = path.join(__dirname, zip.originalname)
    //     const instructions = micmacScript.split('\n') as string[]
    //     console.log('Instructions', instructions)
    //     await fs.writeFile(filePath, zip.buffer)
    //     res.redirect('/success.html')

    //     try {
    //         await generateMesh(zip.originalname, instructions)
    //     } catch(error) {
    //         console.log(error)
    //         // TODO send error email
    //     }
    // } else {
    //     res.sendStatus(400)
    // }

})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port)
})
