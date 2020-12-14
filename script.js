/*addBookToLibrary('Ghostwritten', 'David Mitchell', 496, true);
addBookToLibrary('Early Riser', 'Jasper Fforde', 413, true);
addBookToLibrary('The Shining', 'Stephen King', 688, false);
addBookToLibrary('Dune', 'Frank Herbert', 704, true);
addBookToLibrary('Sabriel', 'Garth Nix', 496, true);
addBookToLibrary('The Forever War', 'Joe Haldeman', 264, true);*/

let myLibrary = [];

function Book() {
  this.info = function() {
    (this.isRead) ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not yet read`
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = Object.create(Book);
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.isRead = isRead;
  myLibrary.push(newBook);
  updateDisplay(newBook);
}

const shelf = document.getElementById('shelf');

function updateDisplay(book) {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const author = document.createElement('p');
  const numPages = document.createElement('p');
  const read = document.createElement('input');
  shelf.appendChild(div);
  div.className = 'book';
  div.appendChild(title);
  title.textContent = `${book.title}`;
  div.appendChild(author);
  author.textContent = `${book.author}`;
  div.appendChild(numPages);
  numPages.textContent = `${book.pages}`;
  div.appendChild(read);
  read.setAttribute('type', 'checkbox');
  (book.isRead) ? read.checked = true : read.checked = false;
}

const addBookButton = document.querySelector('button');

addBookButton.addEventListener('mouseover', () => {
  addBookButton.classList.add('hover')
  addBookButton.textContent = 'Add book +'
})
