// Mock Data for Requests
const requests = [
    { id: 'STU001', name: 'Alice Smith', book: 'Introduction to Algorithms', type: 'Education', date: '2023-10-24', status: 'Pending' },
    { id: 'STU002', name: 'Bob Jones', book: 'Clean Code', type: 'Education', date: '2023-10-25', status: 'Pending' },
    { id: 'STU003', name: 'Charlie Day', book: 'Harry Potter', type: 'Fiction', date: '2023-10-26', status: 'Pending' }
];

// Mock Data for Issued Books
const issuedBooks = [
    { id: 'STU005', name: 'David Lee', book: 'The Great Gatsby', type: 'Novel', date: '2023-10-20' },
    { id: 'STU008', name: 'Eva Green', book: 'Spider-Man: Blue', type: 'Comic', date: '2023-10-21' }
];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    renderRequests();
    renderIssuedBooks();
});

// Tab Switching Logic
window.switchTab = function(tabName, element) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    document.getElementById(tabName + '-section').style.display = 'block';

    // Update Nav Active State
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    if(element) {
        element.classList.add('active');
    }
};

// Render Requests Table
function renderRequests() {
    const tbody = document.getElementById('requestTableBody');
    tbody.innerHTML = '';

    requests.forEach((req, index) => {
        const row = `
            <tr>
                <td>${req.id}</td>
                <td>${req.book}</td>
                <td>${req.date}</td>
                <td><span class="status pending">${req.status}</span></td>
                <td>
                    <button class="action-btn approve" onclick="handleRequest(${index}, 'Approved')"><i class="fa-solid fa-check"></i></button>
                    <button class="action-btn reject" onclick="handleRequest(${index}, 'Rejected')"><i class="fa-solid fa-xmark"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Render Issued Books Table
function renderIssuedBooks() {
    const tbody = document.getElementById('issuedTableBody');
    tbody.innerHTML = '';

    issuedBooks.forEach(book => {
        const row = `
            <tr>
                <td>${book.name}</td>
                <td>${book.id}</td>
                <td>${book.book}</td>
                <td><span class="badge">${book.type}</span></td>
                <td>${book.date}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

window.handleRequest = function(index, action) {
    alert(`Request ${action}`);
    
    if (action === 'Approved') {
        // Move to issued list
        const req = requests[index];
        issuedBooks.push({ id: req.id, name: req.name, book: req.book, type: req.type, date: new Date().toISOString().split('T')[0] });
        renderIssuedBooks();
    }

    requests.splice(index, 1); // Remove from list
    renderRequests();
};

// Book Management Logic
const addBookBtn = document.getElementById('addBookBtn');
const addBookForm = document.getElementById('addBookForm');
const bookGrid = document.getElementById('bookGrid');

addBookBtn.addEventListener('click', toggleAddForm);

window.toggleAddForm = function() {
    if (addBookForm.style.display === 'block') {
        addBookForm.style.display = 'none';
    } else {
        addBookForm.style.display = 'block';
    }
};

window.addNewBook = function() {
    const title = document.getElementById('newBookTitle').value;
    const author = document.getElementById('newBookAuthor').value;
    const category = document.getElementById('newBookCategory').value;

    if(title && author) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-icon"><i class="fa-solid fa-book"></i></div>
            <div class="book-info">
                <h4>${title}</h4>
                <p>${author}</p>
                <span class="badge">${category}</span>
            </div>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        `;
        
        // Add delete functionality to new card
        bookCard.querySelector('.delete-btn').addEventListener('click', function() {
            bookCard.remove();
        });

        bookGrid.appendChild(bookCard);
        toggleAddForm();
        
        // Clear inputs
        document.getElementById('newBookTitle').value = '';
        document.getElementById('newBookAuthor').value = '';
        document.getElementById('newBookCategory').value = '';
    }
};

// Add delete listener to existing static books
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.book-card').remove();
    });
});