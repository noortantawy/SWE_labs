require('colors')
const express = require('express')
const app = express()
const cors = require('cors')

// Body parser
app.use(express.json())
app.use(cors())


const employeeRoutes = require('./routes/employee')

// Mount routers
app.use('/api/v1/employee', employeeRoutes)

const PORT = 5500

app.listen(PORT, console.log(`Server running on port ${PORT}`.bgBlue))