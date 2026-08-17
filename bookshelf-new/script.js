const books = [
    {
        title: "BRAND NEW DAY - NEW Trailer 4K",
        description: "English through cinema",
        color: "#63332b"
    },
    {
        title: "Spider-Man",
        description: "Words from the world of Peter Parker",
        color: "#492b28"
    },
    {
        title: "THE AMAZING SPIDER-MAN",
        description: "Learn English through film",
        color: "#3d3530"
    },
    {
        title: "AVENGERS",
        description: "English from the Marvel universe",
        color: "#49382a"
    },
    {
        title: "INCEPTION",
        description: "Cinema English collection",
        color: "#302d29"
    },
    {
        title: "INTERSTELLAR",
        description: "English through great cinema",
        color: "#3b3430"
    }
];


const track =
    document.querySelector("#book-track");

const selectedTitle =
    document.querySelector("#selected-title");

const selectedDescription =
    document.querySelector("#selected-description");

const previousButton =
    document.querySelector(".nav-prev");

const nextButton =
    document.querySelector(".nav-next");

const openButton =
    document.querySelector("#open-book");


let currentIndex = 0;


/* =========================================================
   CREATE BOOKS
========================================================= */

function createBooks() {

    track.innerHTML = "";

    books.forEach(
        (book, index) => {

            const element =
                document.createElement("article");

            element.className =
                "book";

            element.dataset.index =
                index;

            element.style.setProperty(
                "--book-color",
                book.color
            );

            element.innerHTML = `

                <div class="book-cover">

                    <div class="book-spine"></div>

                    <div class="book-inner">

                        <div class="book-symbol">
                            ✦
                        </div>

                        <div class="book-title">
                            ${book.title}
                        </div>

                        <div class="book-rule"></div>

                        <div class="book-label">
                            MOVIE ENGLISH
                        </div>

                    </div>

                </div>

            `;

            element.addEventListener(
                "click",
                () => {

                    currentIndex =
                        index;

                    updateBooks();

                }
            );

            track.appendChild(
                element
            );
        }
    );

    updateBooks();
}


/* =========================================================
   UPDATE
========================================================= */

function updateBooks() {

    const elements =
        [...track.querySelectorAll(".book")];

    elements.forEach(
        (book, index) => {

            book.classList.toggle(
                "is-selected",
                index === currentIndex
            );

        }
    );


    const selected =
        books[currentIndex];

    selectedTitle.textContent =
        selected.title;

    selectedDescription.textContent =
        selected.description;


    /*
       本を中央へ移動
    */

    const target =
        elements[currentIndex];

    if (target) {

        const trackRect =
            track.getBoundingClientRect();

        const targetRect =
            target.getBoundingClientRect();

        const offset =
            (
                trackRect.left +
                trackRect.width / 2
            )
            -
            (
                targetRect.left +
                targetRect.width / 2
            );

        track.style.transform =
            `translateX(${offset}px)`;

    }

}


/* =========================================================
   PREVIOUS
========================================================= */

previousButton.addEventListener(
    "click",
    () => {

        currentIndex =
            Math.max(
                0,
                currentIndex - 1
            );

        updateBooks();

    }
);


/* =========================================================
   NEXT
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        currentIndex =
            Math.min(
                books.length - 1,
                currentIndex + 1
            );

        updateBooks();

    }
);


/* =========================================================
   OPEN
========================================================= */

openButton.addEventListener(
    "click",
    () => {

        const book =
            books[currentIndex];

        alert(
            `OPEN: ${book.title}`
        );

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowLeft"
        ) {

            currentIndex =
                Math.max(
                    0,
                    currentIndex - 1
                );

            updateBooks();

        }

        if (
            event.key === "ArrowRight"
        ) {

            currentIndex =
                Math.min(
                    books.length - 1,
                    currentIndex + 1
                );

            updateBooks();

        }

    }
);


/* =========================================================
   START
========================================================= */

createBooks();