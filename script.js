

let myLibrary = [];
let libraryByAuth;
let libraryByTitle;
let libraryByLength;
let libraryUnread;

const shelf = document.getElementById('shelf');
const addBookButton = document.getElementById('add');
const author = document.getElementById('author');
const title = document.getElementById('title');
const length = document.getElementById('length');


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

function sortBookDisplay(arr) {
  while(shelf.firstChild) {
    shelf.removeChild(shelf.firstChild);
  }
  arr.forEach(book => {
    updateDisplay(book);
  });
}

function createForm(form) {
  const submitBook = document.createElement('input');
  const title = document.createElement('input');
  const author = document.createElement('input');
  const pages = document.createElement('input');
  const isRead = document.createElement('input');
  const newLabel = document.createElement('label');
  submitBook.setAttribute('type','button');
  form.appendChild(title);
  title.value = '  Title';
  form.appendChild(author);
  author.value = '  Author';
  form.appendChild(pages);
  pages.value = '  Pages';
  form.appendChild(newLabel);
  newLabel.setAttribute('for', 'isRead');
  newLabel.innerText = 'Book Completed';
  newLabel.classList.add('switch');
  newLabel.appendChild(isRead);
  isRead.setAttribute('type', 'checkbox');
  isRead.setAttribute('id', 'isRead');
  form.appendChild(submitBook);
  submitBook.value = 'Add book';

}

function sortAuthor() {
  libraryByAuth = myLibrary.sort((a, b) => {
  let aNames = a.author.split(" ");
  let bNames = b.author.split(" ");
  if (aNames[1][0] < bNames[1][0]) {
    return -1
  } else {
    return 1
  }
});
}

function sortTitle() {
  libraryByTitle = myLibrary.sort((a, b) => {
    if (a.title[0] < b.title[0]) {
      return -1
    } else {
      return 1
    }
  });
}

function sortLength() {
  libraryByLength = myLibrary.sort((a, b) => {
    if (a.pages < b.pages) {
      return -1
    } else {
      return 1
    }
  });
}

addBookButton.addEventListener('mouseover', (e) => {
  addBookButton.classList.add('hover')
  let prevEvent = e;
  addBookButton.addEventListener('transitionend', () => { 
    if (addBookButton.classList.contains('hover')) {
    addBookButton.textContent = 'Add book +'
    prevEvent = undefined;
    }
  });
});

addBookButton.addEventListener('mouseleave', () => {
  addBookButton.classList.remove('hover')
  addBookButton.textContent = '+'
});

addBookButton.addEventListener('click', () => {
  const form = document.createElement('form');
  shelf.prepend(form);
  form.classList.add('book');
  createForm(form);
});

author.addEventListener('click', () => {
  sortAuthor();
  sortBookDisplay(libraryByAuth);
});

title.addEventListener('click', () => {
  sortTitle();
  sortBookDisplay(libraryByTitle);
});

length.addEventListener('click', () => {
  sortLength();
  sortBookDisplay(libraryByLength);
});




addBookToLibrary('Ghostwritten', 'David Mitchell', 496, true);
addBookToLibrary('Early Riser', 'Jasper Fforde', 413, true);
addBookToLibrary('The Shining', 'Stephen King', 688, false);
addBookToLibrary('Dune', 'Frank Herbert', 704, true);
addBookToLibrary('Sabriel', 'Garth Nix', 496, true);
addBookToLibrary('The Forever War', 'Joe Haldeman', 264, true);

