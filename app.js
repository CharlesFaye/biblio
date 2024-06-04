
/**
 * Create an class called uniqueArray 
 */
class uniqueArray {
    constructor() {
        /**
         * A set of unique items
         * @type {Object} 
         */
        this.books = new Set();
    }

    /**
     * Create an method to add a book
     * @param {string} book 
     * @returns {boolean}
     */
    add(book) {
        if (!this.books.has(book)) {
            this.books.add(book);
            return true;
        }
            return false;
       
    }

    /**
     * Create an method to remove the book
     * @param {string} book 
     * @returns {boolean}
     */
    remove(book) {
        if (this.books.has(book)) {
            this.books.delete(book);
            return true;
        }
            return false;
        
    }
    /**
     * Return an array of books
     * @returns {Array}
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
     * Add the element to the list of favorite books
     */
    function addElementToList() {
        form.addEventListener('submit', submitForm);
    }

    /**
     * Submit the form
     * @param {SubmitEvent} event 
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
                    addElementToDOM(newBook);
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
     * Take a book as a input and delete it to the list of favorite books
     * @param {HTMLLIElement} item
     */
    function removeBook(item) {
        const allTrashIcones = document.querySelectorAll('.fa-trash-can');
        allTrashIcones.forEach(icone => icone.addEventListener('click', () => {
            const bookParent = icone.parentElement;
            const bookTitle = bookParent.querySelector('.book_title').textContent;
            removeElementFromUniqueArray(Unique_Array, item);
            icone.parentElement.remove();
            createRemoveNotification(bookTitle);
        }));
    }
    
    /**
     * Initialize the existing li items into the list
     * @param {HTMLUListElement} list 
     * @param {Object} arrayInstance 
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
     * Create an HTML li element that will be added to the list of favorite books
     * @param {HTMLLIElement} book 
     */
    function addElementToDOM(book) {
        const section = document.querySelector('section');
        const li = document.createElement('li');
        const firstStarIcone = document.createElement('i');
        const secondStarIcone = document.createElement('i');
        const thirdStarIcone = document.createElement('i');
        const fourthStarIcone = document.createElement('i');
        const fifthStarIcone = document.createElement('i');
        const trashIcone = document.createElement('i');

        firstStarIcone.setAttribute('class', 'fa-solid fa-star first-star');
        secondStarIcone.setAttribute('class', 'fa-solid fa-star second-star');
        thirdStarIcone.setAttribute('class', 'fa-solid fa-star third-star');
        fourthStarIcone.setAttribute('class', 'fa-solid fa-star fourth-star');
        fifthStarIcone.setAttribute('class', 'fa-regular fa-star fifth-star');
        trashIcone.setAttribute('class', 'fa-solid fa-trash-can');

        li.innerHTML = `<i class="fa-solid fa-tags"></i><span class="book_title">${book}</span>`;
        li.append(firstStarIcone, secondStarIcone, thirdStarIcone, fourthStarIcone, fifthStarIcone, trashIcone);

        itemList.appendChild(li);
        section.append(itemList);
        removeBook(book);
    }

    /**
     * Remove the item from the set i.e uniqueArray
     * @param {Object} arrayInstance 
     * @param {HTMLLIElement} book 
     */
    function removeElementFromUniqueArray(arrayInstance, book) {
        arrayInstance.remove(book);
    }
});
/**
 * A box alert which going to be unveiled if the entry isn't correct
 */
function createBoxAlert() {
    const section = document.querySelector('section');
    const div = document.createElement('div');
    const button = document.createElement('button');

    button.textContent = 'OK';
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.margin = "5px 0px 5px 380px";

    div.textContent = `Veuillez ajouter un livre qui fait déjà partie de la liste de vos livres disponibles. Autrement assurez-vous que l'entrée saisie est valide.`;
    div.style.fontSize = "1em";
    div.style.width = "450px";
    div.style.height = "70px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = "5px";
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = 'relative';
    div.style.position = "absolute";
    div.style.top = '-120px';
    div.style.left = '250px';

    div.append(button);
    section.prepend(div);
    button.addEventListener('click', () => {div.style.display = "none"});

}
/**
 * Create an function called createAddNotification that will show a message 
 * which will notify that the input book has succesfully been added to the 
 * list of favorite books.
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
    div.style.height = "40px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = '5px';
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = "relative";
    div.style.position = "absolute";
    div.style.top = "-80px";
    div.style.left = "250px";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
    section.prepend(div)

}
/**
 * Create an function named createRemoveNotification that will returns a message of the deleted book
 * @param {HTMLLIElement} bookTitle 
 */
function createRemoveNotification(bookTitle) {
    const section = document.querySelector('section');
    const div = document.createElement('div');
    div.textContent = `Vous avez supprimé le livre « ${bookTitle} » de la liste de vos favoris !`;

    div.style.fontSize = "1em";
    div.style.width = "320px";
    div.style.height = "40px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = '5px';
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = "relative";
    div.style.position = "absolute";
    div.style.top = "-80px";
    div.style.left = "250px";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
    section.prepend(div)
}
/**
 * Create an function called createAlertNotification that will display an alert showing that the input book has already been added to the favorite books
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
    div.style.height = "40px";
    div.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    div.style.borderRadius = '5px';
    div.style.padding = "15px";
    div.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.2)";
    div.style.backgroundColor = "white";
    section.style.position = "relative";
    div.style.position = "absolute";
    div.style.top = "-80px";
    div.style.left = "250px";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
    section.prepend(div)
}
 
/**
 * Create an function named firstDivBox that will return a content i.e an description of the book 
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
    img.style.height = "200px";
    div.style.top = "70px";
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

    const dale_book = document.getElementById('dale_book');
    dale_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    dale_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Create an function called secondDivBox in order to add an description to Robert Kiyosaki's book
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
    img.style.height = "200px";
    div.style.top = "120px";
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

    const kiyosaki_book = document.getElementById('kiyosaki_book');
    kiyosaki_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    kiyosaki_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}
/**
 * Create an function called thirdDivBox that will add an description to the book
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
    img.style.height = "200px";
    div.style.top = "160px";
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

    const mariama_ba_book = document.getElementById('mariama_ba_book');
    mariama_ba_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    mariama_ba_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}
/**
 * Create an function that will an description to the book
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
    img.style.height = "200px";
    div.style.top = "200px";
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

    const birago_book1 = document.getElementById('birago_book1');
    birago_book1.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

    birago_book1.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Create an function that will an description to the book
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
    img.style.height = "200px";
    div.style.top = "240px";
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

    const birago_book2 = document.getElementById('birago_book2');
    birago_book2.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   birago_book2.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

 /**
 * Create an function that will an description to the book
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
 * Create an function that will an description to the book
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
 * Create an function that will an description to the book
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
 * Create an function that will an description to the book
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
    img.style.height = "200px";
    div.style.top = "340px";
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

    const mbougar_book = document.getElementById('mbougar_book');
    mbougar_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   mbougar_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Create an function that will an description to the book
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
    img.style.height = "230px"
    div.style.top = "380px";
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

    const diop_book = document.getElementById('diop_book');
    diop_book.addEventListener('mouseenter', () => {
        div.style.display = "inline-block";
    });

   diop_book.addEventListener('mouseout', () => {
        div.style.display = "none";
    });
}

/**
 * Create an function that will an description to the book
 */
function eleventhDivBox() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    p.textContent = `« Les onze lois de la réussite » d'Anthony Robbins, également connu sous le nom de « Unlimited Power : 
    The New Science of Personal Achievement » est un guide de développement personnel et de leadership paru en 2011 dans lequel 
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


   

 

   

   

   

 


   

 

   

   

   

 

   

