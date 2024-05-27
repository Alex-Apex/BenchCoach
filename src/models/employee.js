const sql = require('mssql');

const getEmployees = async () => {
  try {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM Employees');
    return result.recordset;
  } catch (err) {
    console.error('Error fetching employees:', err);
    throw err;
  }
};

const getEmployeeById = async (id) => {
  try {
    const request = new sql.Request();
    const result = await request.input('id', sql.Int, id).query('SELECT * FROM Employees WHERE id = @id');
    return result.recordset[0];
  } catch (err) {
    console.error('Error fetching employee:', err);
    throw err;
  }
};

const addEmployee = async (employee) => {
  try {
    const { name, role, skills, availabilityDate, contactInfo } = employee;
    const request = new sql.Request();
    await request
      .input('name', sql.NVarChar, name)
      .input('role', sql.NVarChar, role)
      .input('skills', sql.NVarChar, skills)
      .input('availabilityDate', sql.Date, availabilityDate)
      .input('contactInfo', sql.NVarChar, contactInfo)
      .query('INSERT INTO Employees (name, role, skills, availabilityDate, contactInfo) VALUES (@name, @role, @skills, @availabilityDate, @contactInfo)');
  } catch (err) {
    console.error('Error adding employee:', err);
    throw err;
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
};