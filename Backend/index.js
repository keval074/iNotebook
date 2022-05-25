const express = require('express')
var cors = require('cors')

const app = express()
const connectToMongo = require('./db');
connectToMongo();
const port = 5000



app.use(cors())

// if i want use "req.body" from auth.js we must need to add these express.json()
app.use(express.json());

//Available routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

app.get('/', (req, res) => 
  res.send('Hello Keval!')
)

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})