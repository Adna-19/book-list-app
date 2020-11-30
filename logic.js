class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    const books = getBooksFromLocalStorage();
    books.forEach((book) => addToBooksTable(book));
});

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default form-submission

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        showAlertMessage('Please fill all the fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);
        addToBookListAndLocalStorage(book);
        emptyAllField();
    }
});

function showAlertMessage(message, type) {
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // remove alert after 3 sec
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function addToBookListAndLocalStorage(book) {
    // add to localstorage
    const books = getBooksFromLocalStorage();
    books.push(book);
    localStorage.setItem('books' ,JSON.stringify(books));

    // add to booklist
    addToBooksTable(book);

    showAlertMessage('Book added successfully', 'success');
}

function getBooksFromLocalStorage() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else { books = JSON.parse(localStorage.getItem('books')); }
    return books;
}

function addToBooksTable(book) {
    const list = document.querySelector('#book-list');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(newRow);
}

function emptyAllField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

document.querySelector('#book-list').addEventListener('click', removeBookFromListAndLocalStorage);

function removeBookFromListAndLocalStorage(e) {
    
    if(e.target.classList.contains('delete')){
        // remove from localStorage
        e.target.parentElement.parentElement.remove();
        
        // remove from Book List
        const targetISBN = e.target.parentElement.previousElementSibling.textContent;
        const books = getBooksFromLocalStorage();
        books.forEach((book, index) => {
            if(book.isbn == targetISBN) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
        showAlertMessage('Book has been deleted', 'danger');
    }
}