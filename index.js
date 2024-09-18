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

// Load entries from local storage when the page loads
window.addEventListener('load', loadEntriesFromLocalStorage);

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
  let entries = JSON.parse(localStorage.getItem('user-entries')) || [];
  
  // Add the new entry to the array
  entries.push(entry);
  
  // Save the updated array back to local storage
  localStorage.setItem('user-entries', JSON.stringify(entries));
}

// Function to load entries from local storage and display them
function loadEntriesFromLocalStorage() {
  let entries = JSON.parse(localStorage.getItem('user-entries')) || [];
  
  // Clear the table body to prevent duplicates
  entriesTable.innerHTML = '';

  // Add each entry to the table
  entries.forEach(entry => {
    addEntryToTable(entry);
  });
}

// Function to add an entry to the table
function addEntryToTable(entry) {
  // Create a new row and cells
  let row = entriesTable.insertRow();
  let cellName = row.insertCell(0);
  let cellEmail = row.insertCell(1);
  let cellPassword = row.insertCell(2);
  let cellDob = row.insertCell(3);
  let cellTerms = row.insertCell(4);
  
  // Set the text content of the cells
  cellName.textContent = entry.name;
  cellEmail.textContent = entry.email;
  cellPassword.textContent = entry.password;
  cellDob.textContent = entry.dob;
  cellTerms.textContent = entry.termsAccepted;
}
