const employee = [
  { id: '1', name: 'Noor Tantawy' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; 
  //finds employee by id
  const index = employee.findIndex(emp => emp.id === id.toString());
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }

  employee.splice(index, 1); //removes employee from array
  //splice() method in js changes the contents by an array by removing, replacing and/or adding new
  res.status(200).json({ success: true, message: `Employee ${id} deleted` });
};

// TODO

exports.createEmployee = async (req, res, next) => {
  const { name, id } = req.body; // retrieve both name and id
  //checks if a name and id are provided
  if (!name || !id) {
    return res.status(400).json({ success: false, message: "Employee name and ID are required" });
  }
  const existingEmployee = employee.find(emp => emp.id === id.toString());
  
  if (existingEmployee) {
    return res.status(400).json({ success: false, message: `Employee ID ${id} already exists` });
  }
  // Create new employee with the user-provided ID
  const newEmployee = { id, name };

  // Add new employee to the employee array
  employee.push(newEmployee);
  // Return created employee
  res.status(201).json({ success: true, data: newEmployee });
};