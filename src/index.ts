import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
    console.log('Express server started on port: ' + port);
});
