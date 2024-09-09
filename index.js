// Get the date input field
const dobInput = document.getElementById('dob');

// Calculate the minimum and maximum date for age 18 to 55
const today = new Date();
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // 55 years ago
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // 18 years ago

// Set the min and max attributes on the date input field
dobInput.setAttribute('min', minDate);
dobInput.setAttribute('max', maxDate);

const form = document.getElementById('registrationForm');
const entriesTable = document.getElementById('entriesTable');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccepted = document.getElementById('terms').checked ? 'true' : 'false';

  // Create an entry object
  const entry = { name, email, password, dob, termsAccepted };

  // Save the entry to local storage
  saveEntryToLocalStorage(entry);

  // Add a new row to the table
  addEntryToTable(entry);

  // Clear form fields
  form.reset();
});

// Function to save entry to local storage
function saveEntryToLocalStorage(entry) {
  // Get existing entries from local storage or initialize as an empty array
  let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
  
  // Add the new entry to the array
  entries.push(entry);
  
  // Save the updated array back to local storage
  localStorage.setItem('user-entries', JSON.stringify(entries));
}

// Function to load entries from local storage and display them
function loadEntriesFromLocalStorage() {
  let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
  
  // Add each entry to the table
  entries.forEach(entry => {
    addEntryToTable(entry);
  });
}

// Function to add an entry to the table
function addEntryToTable(entry) {
  entriesTable.innerHTML += `
    <tr>
      <td class="border px-4 py-2">${entry.name}</td>
      <td class="border px-4 py-2">${entry.email}</td>
      <td class="border px-4 py-2">${entry.password}</td>
      <td class="border px-4 py-2">${entry.dob}</td>
      <td class="border px-4 py-2">${entry.termsAccepted}</td>
    </tr>
  `;
}