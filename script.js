

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
const unread = document.getElementById('unread');


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
  const author = document.createElement('h3');
  const numPages = document.createElement('p');
  const read = document.createElement('img');
  const hr = document.createElement('hr');
  const bottomInfo = document.createElement('div');
  shelf.appendChild(div);
  div.className = 'book';
  div.appendChild(title);
  title.textContent = `${book.title}`;
  div.appendChild(hr);
  div.appendChild(author);
  author.textContent = `${book.author}`;
  div.appendChild(bottomInfo);
  bottomInfo.classList.add('bottomInfo');
  if(book.isRead === true) {
    bottomInfo.appendChild(read)
    read.setAttribute('src', '/images/check-mark.png')
  }
  bottomInfo.appendChild(numPages);
  numPages.textContent = `${book.pages} pages`;
  if(book.isRead !== true){
    numPages.classList.add('pagesOnly');
  }
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
  const inputDiv = document.createElement('div');
  const cancelButton = document.createElement('button');
  const switchLabel = document.createElement('label');
  const toggle = document.createElement('input');
  const toggleDiv = document.createElement('div');
  const on = document.createElement('span');
  const off = document.createElement('span');

  form.appendChild(cancelButton);
  cancelButton.textContent = 'x';
  cancelButton.setAttribute('id', 'cancel');

  form.appendChild(inputDiv);
  inputDiv.appendChild(title);
  title.placeholder = 'Title';
  title.setAttribute('onfocus', "this.placeholder = ''")
  title.setAttribute('type', 'text');

  inputDiv.appendChild(author);
  author.placeholder = 'Author';
  author.setAttribute('onfocus', "this.placeholder = ''")
  author.setAttribute('type', 'text');

  inputDiv.appendChild(pages);
  inputDiv.setAttribute('id', 'inputDiv');
  pages.placeholder = 'Number of Pages';
  pages.setAttribute('onfocus', "this.placeholder = ''")
  pages.setAttribute('type', 'text');

  form.appendChild(switchLabel);
  switchLabel.classList.add('switch');

  switchLabel.appendChild(toggle);
  toggle.setAttribute('type', 'checkbox');

  switchLabel.appendChild(toggleDiv);
  toggleDiv.classList.add('slider');

  toggleDiv.appendChild(on);
  on.classList.add('on');
  on.textContent = 'read';

  toggleDiv.appendChild(off);
  off.classList.add('off');
  off.textContent = 'unread';

  form.appendChild(submitBook);
  submitBook.setAttribute('type', 'submit');
  submitBook.setAttribute('id', 'submit');
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

function sortUnread() {
  libraryUnread = myLibrary.filter(book => book.isRead === false);
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
  if (shelf.querySelector('form') !== null ) { 
    return
  } else {  
  shelf.prepend(form);
  form.classList.add('book');
  createForm(form);
  }
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

unread.addEventListener('click', () => {
  sortUnread();
  sortBookDisplay(libraryUnread);
});



addBookToLibrary('Ghostwritten', 'David Mitchell', 496, true);
addBookToLibrary('Early Riser', 'Jasper Fforde', 413, true);
addBookToLibrary('The Shining', 'Stephen King', 688, false);
addBookToLibrary('Dune', 'Frank Herbert', 704, true);
addBookToLibrary('Sabriel', 'Garth Nix', 496, true);
addBookToLibrary('The Forever War', 'Joe Haldeman', 264, true);

