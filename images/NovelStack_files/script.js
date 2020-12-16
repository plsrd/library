

let myLibrary = [];
let libraryByAuth;
let libraryByTitle;
let libraryByLength;
let libraryUnread;

const shelf = document.getElementById('shelf');
const addBookButton = document.getElementById('add');
// Sort buttions
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
  newBook.isRead = (isRead === 'on');
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
    bottomInfo.appendChild(read);
    read.setAttribute('src', '/images/check-mark.png')
  }
  bottomInfo.appendChild(numPages);
  numPages.textContent = `${book.pages} pages`;
  if(book.isRead !== true){
    numPages.classList.add('pagesOnly');
  }
  div.addEventListener('click', () => {
    editMode(div);
  })
}

  function editMode(div) {
    const titleValue = div.getElementsByTagName('h2')[0].textContent;
    const authorValue = div.getElementsByTagName('h3')[0].textContent;
    const pagesValue = div.getElementsByTagName('p')[0].textContent.split(' ')[0];
    let isReadValue;
    if (div.getElementsByTagName('img') !== undefined) {
      isReadValue = true;
    } else {
      isReadValue = false;
    }
    while(div.firstChild) {
      div.removeChild(div.firstChild);
    }
    console.log(isReadValue);
    createEditForm(div, titleValue, authorValue, pagesValue, isReadValue);
    
}

function createEditForm(div, titleValue, authorValue, pagesValue, isReadValue){
  const editTitle = document.createElement('input');
  const editAuthor = document.createElement('input');
  const editPages = document.createElement('input');
  const switchLabel = document.createElement('label');
  const isRead = document.createElement('input');
  const toggleDiv = document.createElement('div');
  const on = document.createElement('span');
  const off = document.createElement('span');
  const hr = document.createElement('hr');
  div.appendChild(editTitle);
  editTitle.classList.add('editTitle');
  editTitle.placeholder = titleValue;
  div.appendChild(hr);
  div.appendChild(editAuthor);
  editAuthor.placeholder = authorValue;
  div.appendChild(switchLabel);
  switchLabel.classList.add('switch');
  switchLabel.appendChild(isRead);
  isRead.setAttribute('type', 'checkbox');
  switchLabel.appendChild(toggleDiv);
  toggleDiv.classList.add('slider');
  toggleDiv.appendChild(on);
  on.classList.add('on');
  on.textContent = 'read';
  toggleDiv.appendChild(off);
  off.classList.add('off');
  off.textContent = 'unread';
  if(isReadValue === true) {
    isRead.checked = true;
  }
  div.appendChild(editPages);
  editPages.placeholder = pagesValue;

}


function sortBookDisplay(arr) {
  while(shelf.firstChild) {
    shelf.removeChild(shelf.firstChild);
  }
  arr.forEach(book => {
    updateDisplay(book);
  });
}

function createAddBookForm(form) {
  const submitBook = document.createElement('input');
  const titleInput = document.createElement('input');
  const authorInput = document.createElement('input');
  const pagesInput = document.createElement('input');
  const inputDiv = document.createElement('div');
  const cancelButton = document.createElement('button');
  const switchLabel = document.createElement('label');
  const isRead = document.createElement('input');
  const toggleDiv = document.createElement('div');
  const on = document.createElement('span');
  const off = document.createElement('span');
  form.setAttribute('id', 'form');
  form.appendChild(cancelButton);
  cancelButton.textContent = 'x';
  cancelButton.setAttribute('id', 'cancel');
  form.appendChild(inputDiv);
  inputDiv.appendChild(titleInput);
  titleInput.placeholder = 'Title';
  titleInput.setAttribute('onfocus', "this.placeholder = ''")
  titleInput.setAttribute('type', 'text');
  inputDiv.appendChild(authorInput);
  authorInput.placeholder = 'Author';
  authorInput.setAttribute('onfocus', "this.placeholder = ''")
  authorInput.setAttribute('type', 'text');
  inputDiv.appendChild(pagesInput);
  inputDiv.setAttribute('id', 'inputDiv');
  pagesInput.placeholder = 'Number of pages';
  pagesInput.setAttribute('onfocus', "this.placeholder = ''")
  pagesInput.setAttribute('type', 'text');
  form.appendChild(switchLabel);
  switchLabel.classList.add('switch');
  switchLabel.appendChild(isRead);
  isRead.setAttribute('type', 'checkbox');
  switchLabel.appendChild(toggleDiv);
  toggleDiv.classList.add('slider');
  toggleDiv.appendChild(on);
  on.classList.add('on');
  on.textContent = 'read';
  toggleDiv.appendChild(off);
  off.classList.add('off');
  off.textContent = 'unread';
  form.appendChild(submitBook);
  submitBook.setAttribute('type', 'button');
  submitBook.setAttribute('id', 'submit');
  submitBook.value = 'Add book';
  submitBook.addEventListener('click', () => {
    shelf.removeChild(document.getElementById('form'));
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, isRead.value);
  });

  cancelButton.addEventListener('click', () => {
    shelf.removeChild(document.getElementById('form'));
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

function sortUnread() {
  libraryUnread = myLibrary.slice();
  libraryUnread = libraryUnread.filter(book => book.isRead === false);
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
  sortUnread();
  sortBookDisplay(libraryUnread);
});

/*books.forEach(bookDiv => {
  bookDiv.addEventListener('click', () => {
    console.log(bookDiv);
  })
})*/

addBookToLibrary('Ghostwritten', 'David Mitchell', 496, 'on');
addBookToLibrary('Early Riser', 'Jasper Fforde', 413, 'on');
addBookToLibrary('The Shining', 'Stephen King', 688, 'off');
addBookToLibrary('Dune', 'Frank Herbert', 704, 'on');
addBookToLibrary('Sabriel', 'Garth Nix', 496, 'on');
addBookToLibrary('The Forever War', 'Joe Haldeman', 264, 'on');




