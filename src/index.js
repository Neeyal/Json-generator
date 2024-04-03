import express from 'express'
import bodyParser from 'body-parser'
import open from 'open'
import weatherData from './api/wheather.js'
import jsonGenerator from './api/handle.js'

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
    res.send(response)
})

app.get('/weather', async (req, res) => {
    const data = await weatherData()
    res.json(data)
})

app.listen(port, () => {
    open(`http://localhost:${port}`)
    console.log(`Server running at http://localhost:${port}`)
})