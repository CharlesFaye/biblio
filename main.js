

/**
 * A class to manage a collection of unique books.
 */
class uniqueArray {
    /**
     * Creates an instance of the class and initializes the books property as a Set.
     */
    constructor() {
        this.books = new Set();
    }

   
    /**
     * Adds a book to the collection if it is not already present.
     *
     * @param {Object} book - The book to be added to the collection.
     * @returns {boolean} - Returns true if the book was added, false if it was already in the collection.
     */
    add(book) {
        if (!this.books.has(book)) {
            this.books.add(book);
            return true;
        }
            return false;
       
    }

    /**
     * Removes a book from the collection.
     *
     * @param {Object} book - The book to be removed.
     * @returns {boolean} - Returns true if the book was successfully removed, otherwise false.
     */
    remove(book) {
        if (this.books.has(book)) {
            this.books.delete(book);
            return true;
        }
            return false;
        
    }
   
    /**
     * Returns an array of books.
     *
     * @returns {Array} An array containing the books.
     */
    display() {
        return Array.from(this.books);
    }
}
    
document.addEventListener('DOMContentLoaded', () => {
    const Unique_Array = new uniqueArray();
    const form = document.getElementById('itemForm');
    const input = document.getElementById('itemInput');
    const itemList = document.getElementById('itemList');
    const books = Array.from(document.querySelectorAll('aside li')).map(li => li.textContent.trim());

    initializeExistingItems(itemList, Unique_Array);

    const addButton = document.querySelector('#add');
    addButton.addEventListener('click', addElementToList);

  
    /**
     * Adds an event listener to the form that triggers the submitForm function when the form is submitted.
     */
    function addElementToList() {
        form.addEventListener('submit', submitForm);
    }

   
    /**
     * Handles the form submission event.
     * Prevents the default form submission behavior and processes the form data.
     * 
     * @param {Event} event - The form submission event.
     * 
     * The function performs the following actions:
     * - Prevents the default form submission.
     * - Retrieves the form data and extracts the value of the 'newBook' field.
     * - Checks if the 'newBook' field is empty or already exists in the 'books' array.
     * - If the 'newBook' field is valid and unique, it adds the new book to the list and creates a notification.
     * - Resets the form after processing.
     */
    function submitForm(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const newBook = data.get('newBook');

        if (newBook.length === 0 || newBook === "") {
            event.preventDefault();
        }
        else if (!books.includes(newBook)) {
            event.preventDefault();
            createBoxAlert();
        }
        else {
            if (newBook) {
                if (Unique_Array.add(newBook)) {
                    addBook(newBook)
                    createAddNotification();
                }
                else {
                    createAlertNotification();
                }
            }
        }
       document.querySelector('form').reset();
    }

    
    /**
     * Removes a book from the DOM and updates the book data.
     * 
     * This function attaches click event listeners to all elements with the class 'fa-trash-can'.
     * When an element is clicked, it removes the corresponding book from the DOM, updates the book data array,
     * removes the book from a unique array, and creates a notification about the removal.
     * The updated book data is then saved to local storage.
     * 
     * @param {Object} item - The book item to be removed.
     * @param {number} item.id - The unique identifier of the book item.
     */
    function removeBook(item) {
        const allTrashIcones = document.querySelectorAll('.fa-trash-can');
        allTrashIcones.forEach(icone => icone.addEventListener('click', () => {
            const dataArrIndex = bookData.findIndex(element => element.id === item.id)
            const bookParent = icone.parentElement;
            const bookTitle = bookParent.querySelector('.book_title').textContent;
            removeElementFromUniqueArray(Unique_Array, item);
            icone.parentElement.remove();
            bookData.splice(dataArrIndex, 1);
            createRemoveNotification(bookTitle);
            localStorage.setItem('data', JSON.stringify(bookData));
        }));
        
    }
    
  
    /**
     * Initializes existing items from a list and adds them to an array instance.
     * If the item is successfully added to the array instance, it is removed from the list.
     *
     * @param {HTMLElement} list - The DOM element containing the list of items.
     * @param {Object} arrayInstance - An instance of an object that has an `add` method to add items.
     */
    function initializeExistingItems(list, arrayInstance) {
        const items = list.querySelectorAll('#itemList li');
        items.forEach(item => {
            const book = item.childNodes[1].textContent.trim();
            if (arrayInstance.add(book)) {
                removeBook(book)
            }
        });
       
    }

   

    /**
     * Loads books from local storage and updates the DOM.
     * Retrieves book data from local storage, parses it, and adds each book to a unique array and the DOM.
     * If no data is found in local storage, an empty array is used.
     */
    function loadBooksFromLocalStorage() {
        const bookData = JSON.parse(localStorage.getItem('data')) || [];
        bookData.forEach(item => {
            Unique_Array.add(item.book);
            addElementToDOM(item.book);
        });
    }
 
    
    const bookData = JSON.parse(localStorage.getItem('data')) || [];


    const currentBook = {};
  
    /**
     * Adds a book to the bookData array and updates the local storage.
     * If the book already exists, it updates the existing book.
     * 
     * @param {Object} book - The book object to be added.
     * @param {string} book.id - The unique identifier for the book.
     * @param {string} book.book - The name of the book.
     */
    const addBook = (book) => {
        const bookArrIndex = bookData.findIndex((item) => item.id === currentBook.id);
        const bookObj = {
            id : `${input.value.toLowerCase().split('').join('-')}-${Date.now()}`,
            book : input.value
        }; 
      
        if (bookArrIndex === -1) {
            bookData.push(bookObj)
        }
        else {
            bookData[bookArrIndex] = currentBook;
        }  
        localStorage.setItem('data', JSON.stringify(bookData)); 
        addElementToDOM(book)  
    } 
    initializeExistingItems(itemList, Unique_Array);
    loadBooksFromLocalStorage()
   
    /**
     * Adds a new list item to the DOM with the specified value.
     * The list item includes a book title, star icons, and a trash icon.
     * 
     * @param {string} value - The title of the book to be added to the list.
     */
    function addElementToDOM(value) {
        
        const itemList = document.getElementById('itemList');
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-tags"></i><span class="book_title">${value}</span><i class="fa-solid fa-star first-star"></i><i class="fa-solid fa-star second-star"></i><i class="fa-solid fa-star third-star"></i><i class="fa-solid fa-star fourth-star"></i><i class="fa-regular fa-star fifth-star"></i><i class="fa-solid fa-trash-can"></i>`;
        itemList.appendChild(li);
        removeBook(value);
    }

    /**
     * Removes a specified book from a unique array instance.
     *
     * @param {Array} arrayInstance - The array instance from which to remove the book.
     * @param {*} book - The book to be removed from the array.
     */
    function removeElementFromUniqueArray(arrayInstance, book) {
        arrayInstance.remove(book);
    }
});

/**
 * Creates an alert box with a message and an OK button.
 * The alert box is styled with specific dimensions, colors, and positioning.
 * When the OK button is clicked, the alert box is hidden.
 */
function createBoxAlert() {
    const section = document.querySelector('section');
    const div = document.createElement('div');
    const button = document.createElement('button');

    button.textContent = 'OK';
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.margin = "10px 0px 5px 280px";

    div.textContent = `Veuillez ajouter un livre qui fait déjà partie de la liste de vos livres disponibles. Autrement assurez-vous que l'entrée saisie est valide.`;
    div.style.fontSize = "1em";
    div.style.width = "320px";
    div.style.height = "100px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = 'relative';
    div.style.position = "absolute";
    div.style.top = '-140px';
    div.style.left = '50px';

    div.append(button);
    section.prepend(div);
    button.addEventListener('click', () => {div.style.display = "none"});

}

/**
 * Creates and displays a notification indicating that a new book has been successfully added to the favorites list.
 * The notification is displayed for 3 seconds before being hidden.
 */
function createAddNotification() {
    const form = document.querySelector('form');
    const data = new FormData(form);
    const newBook = data.get('newBook');
    const section = document.querySelector('section');
    const div = document.createElement('div');

    div.textContent = `Le livre ${newBook} a été ajouté avec succès dans la liste de vos favoris !`;
    div.style.fontSize = "1em";
    div.style.width = "320px";
    div.style.height = "80px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = '5px';
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = "relative";
    div.style.position = "absolute";
    div.style.top = "-100px";
    div.style.left = "50px";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
    section.prepend(div)

}

/**
 * Creates and displays a notification indicating that a book has been removed from the favorites list.
 *
 * @param {string} bookTitle - The title of the book that was removed.
 */
function createRemoveNotification(bookTitle) {
    const section = document.querySelector('section');
    const div = document.createElement('div');
    div.textContent = `Vous avez supprimé le livre « ${bookTitle} » de la liste de vos favoris !`;

    div.style.fontSize = "1em";
    div.style.width = "320px";
    div.style.height = "80px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = '5px';
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = "relative";
    div.style.position = "absolute";
    div.style.top = "-100px";
    div.style.left = "50px";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
    section.prepend(div)
}

/**
 * Creates an alert notification indicating that a book already exists in the favorites list.
 * The notification is displayed for 3 seconds and then disappears.
 * 
 * The function retrieves the book name from a form, creates a styled div element with the alert message,
 * and prepends it to a section element in the document.
 */
function createAlertNotification() {
    const form = document.querySelector('form');
    const section = document.querySelector('section');
    const data = new FormData(form);
    const newBook = data.get('newBook');
    const div = document.createElement('div');
    div.textContent = `Le livre « ${newBook} » existe déjà dans la liste de vos favoris !`;

    div.style.fontSize = "1em";
    div.style.width = "320px";
    div.style.height = "80px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = '5px';
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = "relative";
    div.style.position = "absolute";
    div.style.top = "-100px";
    div.style.left = "50px";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
    section.prepend(div)
}
 

/**
 * Creates a floating div box containing an image and a paragraph with information about the book 
 * "Comment se faire des amis" by Dale Carnegie. The div box is initially hidden and appears when 
 * the element with the ID 'dale_book' is hovered over.
 * 
 * The div box is styled with specific dimensions, positioning, and styles for the paragraph and image.
 * The paragraph contains a brief description of the book, and the image is sourced from "images/csda.png".
 * 
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out 
 * of the 'dale_book' element.
 */
function firstDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Comment se faire des amis » est un ouvrage de développement personnel écrit par Dale Carnegie 
    et publié pour la première fois en 1936. Ce livre est un best-seller traduit en 37 langues, vendu à plus de 40 
    millions d'exemplaires dans le monde et conseillé par les meilleures écoles de management. `;
    img.src = "images/csda.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "220px";
    div.style.top = "70px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "220px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const dale_book = document.getElementById('dale_book');
    dale_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    dale_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}


/**
 * Creates a floating box with an image and a description of the book "Père riche, père pauvre".
 * The box appears when the element with the ID 'kiyosaki_book' is hovered over and disappears when the mouse leaves.
 */
function secondDixBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Père riche, père pauvre » est un livre de Robert Kiyosaki et de Sharon Lechter paru en 1997.
     De style autobiographique, Robert Kiyosaki utilise un ensemble de paraboles et d'exemples tirés de son propre 
     parcours afin de souligner l'importance de développer son inteligence financière. `;
    img.src = "images/PR-PP.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "220px";
    div.style.top = "120px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "220px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const kiyosaki_book = document.getElementById('kiyosaki_book');
    kiyosaki_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    kiyosaki_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Creates a floating div box containing an image and a paragraph of text about the book 
 * "Une si longue lettre" by Mariama Bâ. The div box is initially hidden and appears when 
 * the element with the ID 'mariama_ba_book' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text 
 * and image. The text is displayed on the left side of the div, and the image is displayed 
 * on the right side.
 *
 * The function should be called to set up the div box and its event listeners.
 */
function thirdDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Une si longue lettre » de l'écrivaine sénégalaise Mariama Bâ est ou ouvrage paru pour la première
    fois en 1979. Dans cet ouvrage, l'auteure sénégalaise raconte l'histoire de Ramatoulaye, une femme sénégalaise, à travers
    une longue lettre qu'elle écrit à son amie d'enfance, Aissatou, après la mort de son mari Modou.`;
    img.src = "images/UneSiLongueLettre.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "230px";
    div.style.top = "160px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "230px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const mariama_ba_book = document.getElementById('mariama_ba_book');
    mariama_ba_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    mariama_ba_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Creates a floating div box containing an image and a paragraph with a description of the book
 * "Les contes d'Amadou Koumba" by Birago Diop. The div box is initially hidden and appears when
 * the element with the ID 'birago_book1' is hovered over.
 *
 * The div box is styled with specific dimensions, positions, and styles for the paragraph and image.
 * The paragraph contains a brief description of the book, and the image is sourced from "images/lcdk.png".
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'birago_book1' element.
 */
function fourthDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Les contes d'Amadou Koumba » de Birago Diop est un recueil de dix-neuf contes, originaires du Sénégal 
    et d'autres pays africains, traduits et transcrits en français par Birago Diop d'après les récits du griot Amadou, fils de 
    Koumba. Le recueil est publié pour la première fois en 1947.`;
    img.src = "images/lcdk.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "210px";
    div.style.top = "200px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "210px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const birago_book1 = document.getElementById('birago_book1');
    birago_book1.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    birago_book1.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}


/**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "Les nouveaux contes d'Amadou Koumba" by Birago Diop. The div box is initially hidden and
 * appears when the element with the ID 'birago_book2' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'birago_book2' element.
 */
function fifthDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Les nouveaux contes d'Amadou Koumba » de Birago Diop est un recueil de contes au Sénégal
    faisant suite aux contes d'Amadou Koumba, traduits et transcrits en français par Birago Diop d'après les récits du griot Amadou, fils de 
    Koumba et publié pour la première fois en 1958.`;
    img.src = "images/lncdk.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "210px";
    div.style.top = "240px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "210px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const birago_book2 = document.getElementById('birago_book2');
    birago_book2.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   birago_book2.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

 /**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "Leurres et Lueurs" by Birago Diop. The div box is initially hidden and
 * appears when the element with the ID 'birago_book3' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'birago_book3' element.
 */
function sixthDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Leurres et Lueurs » de Birago Diop est un recueil de nouvelles publié pour la première fois 
    en 1967. Le livre explore divers aspects de la vie aficaine à travers des récits imprégnés de la culture et des
    traditions orales sénégalaises.`;
    img.src = "images/LL.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "200px";
    div.style.top = "300px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "200px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const birago_book3 = document.getElementById('birago_book3');
    birago_book3.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   birago_book3.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}
 /**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "Amkoullel l'enfant peul" by Amadou Hampâté Bâ. The div box is initially hidden and
 * appears when the element with the ID 'hampate_book' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'hampate_book' element.
 */
 function seventhDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Amkoullel l'enfant peul » est une autobiographie de l'écrivain malien Amadou Hampâté Bâ, publié en 1991.
    Dans ce livre, l'auteur raconte son enfance et sa jeunesse en Afrique de l'Ouest, particulièrement au Mali, à la fin du XIXe et au 
    début du XXe siècle. `;
    img.src = "images/amadou.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "200px";
    div.style.top = "260px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "200px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const hampate_book = document.getElementById('hampate_book');
    hampate_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   hampate_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "Contes et Lavanes" by Birago Diop. The div box is initially hidden and
 * appears when the element with the ID 'coetla_book' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'coetla_book' element.
 */
function heighthDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Contes et Lavanes » est un autre ouvrage d'excellence de l'auteur sénégalais Birago Diop paru en 1963
    où le romancier y rassemble des histoires issues de la tradition orale des peuples de l'Afrique de l'Ouest notamment les Wolofs.`;
    img.src = "images/CoetLa.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "200px";
    div.style.top = "300px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "200px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const coetla_book = document.getElementById('coetla_book');
    coetla_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   coetla_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}
/**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "La Plus Secrète Mémoire des hommes" by Mbougar Sarr. The div box is initially hidden and
 * appears when the element with the ID 'mbougar_book' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'mbougar_book' element.
 */
function ninthDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« La Plus Secrète Mémoire des hommes » est un livre du romancier sénégalais Mouhamed Mbougar Sarr paru en 2021
    aux éditions Philippe Rey et Jimsaan. Dans la foulée, son ouvrage remporte le prix Goncourt 2021 au premier tour du scrutin. 
    Le roman du jeune auteur explore les thèmes de la littérature, de la mémoire et de l'identité.`;
    img.src = "images/mbougar.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "250px";
    div.style.top = "340px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "250px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const mbougar_book = document.getElementById('mbougar_book');
    mbougar_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   mbougar_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "Nations, nègres et culture" by Cheikh Anta Diop. The div box is initially hidden and
 * appears when the element with the ID 'diop_book' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'diop_book' element.
 */
function tenthDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Nations nègres et culture » de Cheikh Anta Diop est une oeuvre pionnière qui explore l'histoire et la contribution
    des civilisations africaines à l'histoire mondiale. Publié pour la première fois en 1955, le livre défend l'idée que l'Égypte ancienne
    était une civilisation aficaine et qu'elle a eu une influence significative sur les cultures et les civilisations qui ont 
    suivies, notamment en Grèce et à Rome. `;
    img.src = "images/CAD.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "280px"
    div.style.top = "380px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "285px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const diop_book = document.getElementById('diop_book');
    diop_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   diop_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Creates a floating div box containing an image and a paragraph with text about the book
 * "Les onze lois de la réussite" by Anthony Robbins. The div box is initially hidden and
 * appears when the element with the ID 'robbins_book' is hovered over.
 *
 * The div box is styled with specific dimensions, positioning, and styles for the text and image.
 * The paragraph is styled to be italic, justified, and float to the left, while the image floats to the right.
 *
 * The function sets up event listeners to show the div box on mouse enter and hide it on mouse out
 * of the 'robbins_book' element.
 */
function eleventhDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Les onze lois de la réussite » d'Anthony Robbins est un guide de développement personnel et de leadership paru en 2011 dans lequel 
    le célèbre coach de vie et conférencier motivateur, y présente des principes et des stratégies destinés à aider les lecteurs 
    à atteindre le succès dans divers aspects de leur vie. `;
    img.src = "images/robbins.png"

    body.style.position = "relative";
    div.style.position = "absolute";
    p.style.width = "250px";
    p.style.height = "200px";
    p.style.marginLeft = "10px";
    p.style.fontSize = "1em";
    p.style.fontStyle = "italic";
    p.style.textAlign = "justify";
    p.style.float = "left";
    img.style.float = "right";
    img.style.width = "200px";
    img.style.height = "230px"
    div.style.top = "420px";
    div.style.right = "80px";
    div.style.width = "500px";
    div.style.height = "230px";
    div.style.backgroundColor = "white";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";

    div.appendChild(p);
    div.appendChild(img);
    body.appendChild(div);

    document.addEventListener('DOMContentLoaded', () => {
        div.style.display = "none";
    });

    const robbins_book = document.getElementById('robbins_book');
    robbins_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   robbins_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}


//Call DivBox functions
firstDivBox()
secondDixBox()
thirdDivBox()
fourthDivBox()
fifthDivBox()
sixthDivBox()
seventhDivBox()
heighthDivBox()
ninthDivBox()
tenthDivBox()
eleventhDivBox()

/**
 * A reference to the DOM element with the class 'current-year'.
 * This element is expected to display or be associated with the current year.
 * @type {Element}
 */
const currentYear = document.querySelector('.current-year');
const date = new Date();
const getDate = date.getFullYear();
currentYear.textContent = getDate;
   

 

   

   

   

 


   

 

   

   

   

 

   

