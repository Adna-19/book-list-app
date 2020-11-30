# BOOK List App

I created this book list app using javascript.
This app contains a form to submit information
about a book and a table that contains all the
books entered. Books are stored in localStorage
of the browser.

### Basically the code consists of a Book class and 6 functions:

```
BOOK

showAlertMessage(message, type)
addToBookListAndLocalStorage(book)
getBooksFromLocalStorage()
addToBooksTable(book)
emptyAllField()
removeBookFromListAndLocalStorage(e)
```
- **BOOK(title, author, isbn)-** A class to represent book in the code. it takes the title,
author and isbn number of a book and creates an instance for each book.

- **showAlertMessage(message, type)-** This function creates an alert div and inserts it before 
the form. you have to provide the message you want to display and the type of message(success, 
info, danger, warning). it vanishes the alert after 3 seconds.

- **addToBookListAndLocalStorage(book)-** it takes the book object as a parameter. first it
get all the previously stored books from `getBooksFromLocalStorage()`, if any, then it pushes the provided book in that books list and updates the localstorage, otherwise pushes the book in 
empty books list. after this it calls `addToBooksTable(book)` function to add that book in 
the table, displayed on page.

- **getBooksFromLocalStorage()-** it first checks whether their is any item in localstorage
with name **books**, if it exists then it returns that list, otherwise returns an empty 
books list.

- **addToBooksTable(book)-** it takes a book object, creates a new tr element, inserts
all the book attributes in that tr with td. at last grabs the table and append that tr
to table as child element.

- **emptyAllField()-** after successfully adding book in the localstorage and table.
this function is invoked to empty all the form-fields.

- **removeBookFromListAndLocalStorage(e)-** it takes an event as parameter. first it checks
whether the target event contains delete class, if it does. then first it deletes the book
from localstorage by grabbing isbn of a book. then it deletes the book from DOM.