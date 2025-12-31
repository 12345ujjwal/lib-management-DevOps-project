// Mock Data
const myBooks = [
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', issueDate: '2023-10-20', dueDate: '2023-11-03', status: 'Issued' },
    { title: 'Clean Code', author: 'Robert C. Martin', issueDate: '2023-10-22', dueDate: '2023-11-05', status: 'Issued' }
];

const catalog = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction' },
    { title: 'Design Patterns', author: 'Erich Gamma', category: 'Education' },
    { title: 'Harry Potter', author: 'J.K. Rowling', category: 'Fiction' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Education' }
];

document.addEventListener('DOMContentLoaded', () => {
    renderMyBooks();
    renderCatalog();
});

window.switchTab = function(tabName, element) {
    document.querySelectorAll('.dashboard-section').forEach(section => section.style.display = 'none');
    document.getElementById(tabName + '-section').style.display = 'block';
    
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    if(element) element.classList.add('active');
};

function renderMyBooks() {
    const tbody = document.getElementById('myBooksTableBody');
    tbody.innerHTML = '';
    myBooks.forEach(book => {
        const row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.issueDate}</td>
                <td>${book.dueDate}</td>
                <td><span class="status pending" style="background: rgba(74, 222, 128, 0.1); color: #4ade80;">${book.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    grid.innerHTML = '';
    catalog.forEach(book => {
        const card = `
            <div class="book-card">
                <div class="book-icon"><i class="fa-solid fa-book"></i></div>
                <div class="book-info">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                    <span class="badge">${book.category}</span>
                </div>
                <button class="action-btn" onclick="requestBook('${book.title}')" style="color: var(--primary-color); position: absolute; top: 10px; right: 10px;">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        grid.innerHTML += card;
    });
}

window.requestBook = function(title) {
    alert(`Request sent for: ${title}`);
    // In a real app, this would send data to the backend/librarian
};