# The Odin Project: Library

This app was created for the Javascript section of The Odin Project coursework. It's a simple, minimalist version of a book tracker that allows you to add, edit, and sort your personal library. 

---

### Assignment

A complete description can be found [here](https://www.theodinproject.com/courses/javascript/lessons/library).

- [x] If you haven’t already, set up your project with skeleton HTML/CSS and JS files.  
- [x] All of your book objects are going to be stored in a simple array, so add a function to the script (not the  constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:

  ```lang-js
  let myLibrary = [];
  function Book() {
      // the constructor...
  }
  function addBookToLibrary() {
  // do stuff here
  }
  ```

- [x] Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
- [x] Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.
- [x] Add a button on each book’s display to remove the book from the library.
    1. You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
- [x] Add a button on each book’s display to change its read status.
    1. To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
- [ ] Optional -we haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page all of their books will disappear! If you want, you are capable of adding some persistence to this library app using one of the following techniques:
    1. localStorage [docs here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the whole library array to localStorage every time a new book is created, and another function that looks for that array in localStorage when your app is first loaded. (make sure your app doesn’t crash if the array isn’t there!)
    2. Firebase [check it out!](https://firebase.google.com/docs/?authuser=0) is an online database that can be set up relatively easily, allowing you to save your data to a server in the cloud! Teaching you how to use it is beyond the scope of this tutorial, but it is almost definitely within your skill set. If you’re interested, check out this [video](https://www.youtube.com/watch?v=noB98K6A0TY) to see what it’s all about.

### To Be Completed

  1. Complete option back-end connection.
  2. Refactor code to be more object-oriented (my constructor needs some work 💩 )
  3. Eventually, add a statistics bit that would show number of books completed/logged.
  4. Add a 'currently reading' flag
  5. Change out simple read/not read toggle for a % complete option.

  ---

### Getting Started
This is a web-based vanilla js/html/css app, so simply follow the link [here](https://racheallarimer.github.io/library/).
