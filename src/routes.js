const express = require('express');
const router = express.Router();
const employeeModel = require('./models/employee');

router.get('/', async (req, res) => {
  try {
    const employees = await employeeModel.getBenchedEmployees();
    res.render('index', { title: 'BenchCoach', employees, userName:"Taylor Smith" });
  } catch (err) {
    res.status(500).send('Error fetching employees');
  }
});

router.get('/employee/:id', async (req, res) => {
  try {
    const employee = await employeeModel.getEmployeeById(req.params.id);
    res.render('partials/employee-details', { employee });
  } catch (err) {
    res.status(500).send('Error fetching employee');
  }
});

router.post('/employee', async (req, res) => {
  try {
    await employeeModel.addEmployee(req.body);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding employee');
  }
});

module.exports = router;