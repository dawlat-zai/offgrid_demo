const express = require('express')
const AuthRouter = require('./routes/AuthRouter')
const ChartRouter = require('./routes/ChartRouter')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./middleware/auth')

dotenv.config()

const app = express()

// Bodyparser middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(cors())

app.use('/api/v1', AuthRouter)
app.use('/api/v1', auth, ChartRouter)

let port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('app is running')
})
