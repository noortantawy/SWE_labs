const API_URL = 'http://localhost:5500/api/v1/employee';

function fetchEmployees() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';

      const list = data.data;
      list.forEach(item => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.setAttribute('data-id', item.id); // Attach the ID to the button
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        // Add event listener to the delete button
        deleteButton.addEventListener('click', function () {
          deleteEmployee(this.getAttribute('data-id'));
        });
      });
    })
    .catch(error => console.error('Error fetching employees:', error));
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function(event) {
  createEmployee(event); // Pass event to createEmployee function
});

// TODO
// add event listener to delete button

// TODO
function createEmployee(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  if (!name || !id) {
    alert('Please fill in all fields');
    return;
  }

  // Fetch the list of employees to check if the provided ID is unique
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const employees = data.data;

      // Check if the ID already exists in the list of employees
      const existingEmployee = employees.find(emp => emp.id === id);
      if (existingEmployee) {
        alert('ID already exists! Please choose a different ID.');
        return;
      }

      // If ID is unique, proceed with creating the employee
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name })
      })
        .then(response => response.json())
        .then(() => {
          fetchEmployees(); // Refresh the employee list
          document.getElementById('employeeForm').reset(); // Reset the form
        })
        .catch(error => console.error('Error adding employee:', error));
    })
    .catch(error => console.error('Error fetching employees:', error));
}


// TODO
function deleteEmployee (id){
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  .then(response => response.json())
  .then(() => fetchEmployees()) // Refresh the employee list after deletion
  .catch(error => console.error('Error deleting employee:', error));
}

fetchEmployees();