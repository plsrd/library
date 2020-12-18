

let myLibrary = [];
let libraryByAuth = [];
let libraryByTitle = [];
let libraryByLength = [];
let libraryUnread = [];
let isReadValue;

const shelf = document.getElementById('shelf');
const addBookButton = document.getElementById('add');

// Sort buttons
const author = document.getElementById('author');
const title = document.getElementById('title');
const length = document.getElementById('length');
const unread = document.getElementById('unread');

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead, index) {
  if (index === undefined) {
    let newBook = new Book(title, author, pages, isRead);
    if(isRead === false) {libraryUnread.push(newBook)}
    myLibrary.push(newBook);
    updateDisplay(newBook);
  } else {
    myLibrary[index].title = title;
    myLibrary[index].author = author;
    myLibrary[index].pages = pages;
    if(myLibrary[index].isRead !== isRead && isRead === false) {
      libraryUnread.push(myLibrary[index]);
    }
    libraryUnread = libraryUnread.filter(book => book.isRead === true);
    myLibrary[index].isRead = isRead;
    updateDisplay(myLibrary[index], index);
  }
}

function updateDisplay(book, index) {
  const container = document.createElement('div');
  const title = document.createElement('h2');
  const author = document.createElement('h3');
  const numPages = document.createElement('p');
  const read = document.createElement('img');
  const hr = document.createElement('hr');
  const bottomInfo = document.createElement('div');

  if (index === undefined) {
    shelf.appendChild(container);
    container.setAttribute('id', `${book.title}`);
  } else {
    if (index === 0) {
      shelf.prepend(container);
    } else {
      shelf.insertBefore(container, shelf.children[index]);
    }
    container.setAttribute('id', `${book.title}`);
  }

  const div = document.getElementById(`${book.title}`);

  div.className = 'book';
  div.appendChild(title);
  title.textContent = `${book.title}`;
  div.appendChild(hr);
  div.appendChild(author);
  author.textContent = `${book.author}`;
  div.appendChild(bottomInfo);
  bottomInfo.classList.add('bottomInfo');

  if(book.isRead === true) {
    bottomInfo.appendChild(read);
    read.setAttribute('src', '/images/check-mark.png')
  }

  bottomInfo.appendChild(numPages);

  numPages.textContent = `${book.pages} pages`;

  if(book.isRead !== true){
    numPages.classList.add('pagesOnly');
  }

  div.addEventListener('click', () => {
    if (document.getElementById('form') !== null ) { 
      return
    }
    editMode(div);
  });
  div.removeAttribute('id')
}

function editMode(div) {
  if (div.classList.contains('editMode')) {
    return;
  }
  div.classList.add('editMode');
  const titleValue = div.getElementsByTagName('h2')[0].textContent;
  const isReadValue = myLibrary.find(book => book.title === titleValue).isRead;
  const existingIndex = myLibrary.indexOf(myLibrary.find(book => book.title === titleValue));

  while(div.firstChild) {
    div.removeChild(div.firstChild);
  }

  createAddBookForm(div, existingIndex);
 
  if (isReadValue === true) {
    document.getElementById('isReadInput').checked = true;
  }

  document.getElementById('submit').textContent = 'Save'
}

function sortBookDisplay(arr) {
  while(shelf.firstChild) {
    shelf.removeChild(shelf.firstChild);
  }
  arr.forEach(book => {
    updateDisplay(book);
  });
}

function createTextInputField(parent, type) {
  const inputField = document.createElement('input');
  parent.appendChild(inputField);
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('id', `${type.toLowerCase()}Input`);
  inputField.placeholder = `${type}`;
  inputField.setAttribute('onfocus', "this.placeholder = ''")
  inputField.setAttribute('maxlength', '50')
}

function createToggleSwitch(parent) {
  const switchLabel = document.createElement('label');
  parent.appendChild(switchLabel);
  switchLabel.classList.add('switch');

  const isRead = document.createElement('input');
  switchLabel.appendChild(isRead);
  isRead.setAttribute('type', 'checkbox');
  isRead.setAttribute('id', 'isReadInput');

  const toggleDiv = document.createElement('div');
  switchLabel.appendChild(toggleDiv);
  toggleDiv.classList.add('slider');

  const on = document.createElement('span');
  toggleDiv.appendChild(on);
  on.classList.add('on');
  on.textContent = 'read';

  const off = document.createElement('span');
  toggleDiv.appendChild(off);
  off.classList.add('off');
  off.textContent = 'unread';
}

function createButton(parent, id, textContent) {
  const button = document.createElement('button');
  parent.appendChild(button);
  button.textContent = textContent
  button.setAttribute('id', id);
}

function createAddBookForm(form, index) {
  form.classList.add('form');  
  form.setAttribute('id', 'form');
  createButton(form, 'cancel', 'x');

  const inputDiv = document.createElement('div');
  form.appendChild(inputDiv);
  inputDiv.setAttribute('id', 'inputDiv');
  createTextInputField(inputDiv, 'Title');
  createTextInputField(inputDiv, 'Author');
  createTextInputField(inputDiv, 'Pages');

  if (index !== undefined) {
    document.getElementById('cancel').textContent = 'DEL';
    document.getElementById('titleInput').value = myLibrary[index].title;
    document.getElementById('authorInput').value = myLibrary[index].author;
    document.getElementById('pagesInput').value = myLibrary[index].pages;
  }

  createToggleSwitch(form);

  createButton(form, 'submit', 'Add book')
  
  const submitBook = document.getElementById('submit');
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const pagesInput = document.getElementById('pagesInput');
  const isRead = document.getElementById('isReadInput');

  const cancelButton = document.getElementById('cancel');
  cancelButton.addEventListener('click', () => {
    if (document.getElementById('cancel').textContent === 'DEL') {
      myLibrary.splice(index, 1);
      //add function to check if in libraryUnread and remove
    }
    shelf.removeChild(document.getElementById('form'));
  });


  submitBook.addEventListener('click', () => {
    if (titleInput.value === '') { 
      titleInput.classList.add('empty');
      return titleInput.placeholder = 'Add title';
    } else if (authorInput.value === '') { 
      authorInput.classList.add('empty');
      return authorInput.placeholder = 'Add author';
    } else if (pagesInput.value === '') { 
      pagesInput.value = 0; 
    }
    shelf.removeChild(document.getElementById('form'));
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, isRead.checked, index);
  });

}


function sortAuthor() {
  libraryByAuth = myLibrary.sort((a, b) => {
    let aNames = a.author.split(" ");
    let bNames = b.author.split(" ");
    if(aNames[1] === undefined) { aNames.push(" ")};
    if(aNames[1] === undefined) { aNames.push(" ")};
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
  const form = document.createElement('div');
  if (document.getElementById('form') !== null ) { 
    return
  } else {  
  shelf.prepend(form);
  form.classList.add('book');
  createAddBookForm(form);
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
  sortBookDisplay(libraryUnread);
});


addBookToLibrary('Early Riser', 'Jasper Fforde', 413, true);
addBookToLibrary('Ghostwritten', 'David Mitchell', 496, true);
addBookToLibrary('The Shining', 'Stephen King', 688, false);
addBookToLibrary('Dune', 'Frank Herbert', 704, true);
addBookToLibrary('Sabriel', 'Garth Nix', 496, true);
addBookToLibrary('The Forever War', 'Joe Haldeman', 264, true)
