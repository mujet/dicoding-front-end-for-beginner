const books = [];
const RENDER_EVENT = 'render-book';

const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser anda tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

document.addEventListener('DOMContentLoaded', function () {
    const submitBook = document.getElementById('formAddBook');
    submitBook.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    const searchSubmit = document.getElementById("formSearchBook");
    searchSubmit.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function addBook() {
    const bookTitle = document.getElementById('inputTitle').value;
    const bookAuthor = document.getElementById('inputAuthor').value;
    const bookYear = document.getElementById('inputYear').value;
    const bookStatus = document.getElementById('inputFinish').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, bookStatus);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete,
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const unfinishedBookList = document.getElementById('unfinished');
    unfinishedBookList.innerHTML = '';

    const finishedBookList = document.getElementById('finished');
    finishedBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete)
            unfinishedBookList.append(bookElement);
        else
            finishedBookList.append(bookElement);
    }
});

function makeBook(bookObject) {
    const titleData = document.createElement('h3');
    titleData.innerText = bookObject.title;

    const authorData = document.createElement('p');
    authorData.innerText = bookObject.author;

    const yearData = document.createElement('p');
    yearData.innerText = bookObject.year;

    const container = document.createElement('div');
    container.classList.add('book', 'card');
    container.append(titleData, authorData, yearData);
    container.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isComplete) {
        const buttonUndo = document.createElement('i');
        buttonUndo.classList.add('fa-solid', 'fa-arrow-rotate-left');
        buttonUndo.addEventListener('click', function () {
            addBookToUnfinished(bookObject.id);
        });

        const buttonDelete = document.createElement('i');
        buttonDelete.classList.add('fa-regular', 'fa-trash-can');
        buttonDelete.addEventListener('click', function () {
            bookRemove(bookObject.id);
        });

        container.append(buttonUndo, buttonDelete);

    } else {
        const buttonFinish = document.createElement('i');
        buttonFinish.classList.add('fa-solid', 'fa-check');
        buttonFinish.addEventListener('click', function () {
            addBookToFinished(bookObject.id);
        });

        const buttonDelete = document.createElement('i');
        buttonDelete.classList.add('fa-regular', 'fa-trash-can');
        buttonDelete.addEventListener('click', function () {
            bookRemove(bookObject.id);
        });

        container.append(buttonFinish, buttonDelete);
    }

    return container;
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function addBookToFinished(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function addBookToUnfinished(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function bookRemove(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;
    if (confirm("Are you sure you want to delete this item?")) {
        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
    } else {
        return;
    }


    saveData();
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function searchBook() {
    let searchValue = document.getElementById("inputSearch").value.toUpperCase();
    let bookList = document.getElementsByClassName("book");
    for (let i = 0; i < bookList.length; i++) {
        let titleSearch = bookList[i].getElementsByTagName("h3");
        if (titleSearch[0].innerHTML.toUpperCase().indexOf(searchValue) > -1) {
            bookList[i].style.display = "";
        } else {
            bookList[i].style.display = "none";
        }
    }
}