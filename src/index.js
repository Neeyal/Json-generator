import express from 'express'
import bodyParser from 'body-parser'
import open from 'open'
import jsonGenerator from './handle.js'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('ui'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + './ui/index.html')
})

app.post('/generate', (req, res) => {
    const formData = req.body
    const data = jsonGenerator(formData)
    const response = `${data}`
    // Send the response
    res.send(response)
})
app.listen(port, () => {
    open(`http://localhost:${port}`)
    console.log(`Server running at http://localhost:${port}`)
})