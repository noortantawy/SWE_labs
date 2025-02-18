const express = require('express') //imports express
const router = express.Router() //creates router instance

const { //imports controller functions
  createEmployee,
  deleteEmployee,
  getEmployees,
} = require('../controllers/employee')
//defines post and get and delete APIs
router.route('/').get(getEmployees).post(createEmployee)

router.route('/:id').delete(deleteEmployee)

module.exports = router //exports router so it can be used in main server file
