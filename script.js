const SUPABASE_URL =
    "https://duroflqocxilxpnziypr.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Qxq8Q7Ee3GFV309fpQGsfA_73i84qm_";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   DATABASE WORDS
========================================================= */

let dbWords = [];


async function loadWordsFromDatabase() {

    const {
        data,
        error
    } = await supabaseClient
        .from("words")
        .select("*")
        .order(
            "id",
            {
                ascending: true
            }
        );


    if (error) {

        console.error(
            "Words could not be loaded:",
            error
        );

        return false;

    }


    dbWords =
        (data || []).map(row => ({

            id:
                row.id,

            book_id:
                row.book_id,

            word: [

                row.word,
                row.meaning,
                row.example,
                row.example_translation,
                row.example2,
                row.example2_translation,
                row.example3,
                row.example3_translation

            ],

            difficulty:
                row.difficulty || "easy"

        }));


    console.log(
        "Loaded words from Supabase:",
        dbWords
    );


    return true;

}


/* =========================================================
   AUTH ELEMENTS
========================================================= */

const authScreen =
    document.querySelector("#auth-screen");

const emailInput =
    document.querySelector("#email");

const passwordInput =
    document.querySelector("#password");

const loginButton =
    document.querySelector("#login-button");

const signupButton =
    document.querySelector("#signup-button");

const authMessage =
    document.querySelector("#auth-message");

const guestButton =
    document.querySelector("#guest-button");

const logoutButton =
    document.querySelector("#logout-button");

const authSwitch =
    document.querySelector("#auth-switch");

const authTitle =
    document.querySelector("#auth-title");


let isGuest = false;

let isSignupMode = false;


/* =========================================================
   MOVIE / LIBRARY ELEMENTS
========================================================= */

const backCollectionButton =
    document.querySelector(
        "#back-collection-button"
    );

const previousButton =
    document.querySelector(
        "#previous-button"
    );

const nextButton =
    document.querySelector(
        "#next-button"
    );

const movieList =
    document.querySelector(
        ".movie-list"
    );

const vocabulary =
    document.querySelector(
        "#vocabulary"
    );
    const contentsPage =
    document.querySelector(
        "#contents-page"
    );

const contentsList =
    document.querySelector(
        "#contents-list"
    );

const contentsBookTitle =
    document.querySelector(
        "#contents-book-title"
    );

const backToLibrary =
    document.querySelector(
        "#back-to-library"
    );

const wordList =
    document.querySelector(
        "#word-list"
    );

const progress =
    document.querySelector(
        "#progress"
    );


/* =========================================================
   BOOK STATE
========================================================= */

let currentBookId = null;

let currentBookTitle = "";


/* =========================================================
   DIFFICULTY
========================================================= */

const difficultyLabels = {

    easy:
        "EASY",

    medium:
        "MEDIUM",

    advanced:
        "ADVANCED"

};


const difficultyRank = {

    easy:
        0,

    medium:
        1,

    advanced:
        2

};


/* =========================================================
   STUDY STATE
========================================================= */

const wordsPerPage = 4;

let currentPage = 0;

let studyWords = [];


/*
   Masteredはword_idを保存
*/

const masteredWords =
    new Set();


/* =========================================================
   BUILD STUDY WORDS
========================================================= */

function buildStudyWords() {

    studyWords =
        dbWords
            .map(
                (
                    item,
                    index
                ) => ({

                    id:
                        item.id,

                    book_id:
                        item.book_id,

                    word:
                        item.word,

                    index,

                    difficulty:
                        item.difficulty ||
                        "easy"

                })
            )
            .sort(
                (
                    a,
                    b
                ) =>

                    difficultyRank[
                        a.difficulty
                    ] -

                    difficultyRank[
                        b.difficulty
                    ]

                    ||

                    a.index -
                    b.index

            );

}


/* =========================================================
   OPEN VOCABULARY BOOK
========================================================= */

function openVocabularyBook(
    bookId,
    bookTitle
) {

    console.log(
        "Opening book:",
        bookId,
        bookTitle
    );


    const numericBookId =
        Number(bookId);


    if (
        !Number.isFinite(
            numericBookId
        )
    ) {

        console.error(
            "Invalid book ID:",
            bookId
        );

        return;

    }


    currentBookId =
        numericBookId;

    currentBookTitle =
        bookTitle || "";
    
    

    /*
       選択した本の単語だけ
    */

    studyWords =
        dbWords

            .filter(
                item =>
                    Number(
                        item.book_id
                    ) ===
                    currentBookId
            )

            .map(
                (
                    item,
                    index
                ) => ({

                    id:
                        item.id,

                    book_id:
                        item.book_id,

                    word:
                        item.word,

                    index,

                    difficulty:
                        item.difficulty ||
                        "easy"

                })
            )

            .sort(
                (
                    a,
                    b
                ) =>

                    difficultyRank[
                        a.difficulty
                    ] -

                    difficultyRank[
                        b.difficulty
                    ]

                    ||

                    a.index -
                    b.index

            );


    if (
        studyWords.length === 0
    ) {

        console.warn(
            "No words found for book:",
            currentBookId
        );

        return;

    }


    /*
       タイトル
    */

    const bookTitleElement =
        document.querySelector(
            "#book-title"
        );


    if (
        bookTitleElement
    ) {

        bookTitleElement.textContent =
            currentBookTitle;

    }


    /*
       Libraryを隠す
    */

    /*
   Contentsを隠す
*/

if (
    contentsPage
) {

    contentsPage.classList.add(
        "hidden"
    );

}


/*
   Libraryを隠す
*/

if (
    movieList
) {

    movieList.classList.add(
        "hidden"
    );

}


/*
   Vocabularyを表示
*/

if (
    vocabulary
) {

    vocabulary.classList.remove(
        "hidden"
    );

}


    currentPage = 0;


    renderPage();


    window.scrollTo({

        top: 0,

        behavior:
            "smooth"

    });

}


/* =========================================================
   AUTH SWITCH
========================================================= */

if (
    authSwitch
) {

    authSwitch.addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "show-signup-button"
            ) {

                isSignupMode =
                    true;


                authTitle.textContent =
                    "CREATE ACCOUNT";


                loginButton.classList.add(
                    "hidden"
                );


                signupButton.classList.remove(
                    "hidden"
                );


                authSwitch.innerHTML = `

                    Already have an account?

                    <button
                        id="show-login-button"
                        type="button"
                    >
                        Log in
                    </button>

                `;


                authMessage.textContent =
                    "";

            }


            if (
                event.target.id ===
                "show-login-button"
            ) {

                isSignupMode =
                    false;


                authTitle.textContent =
                    "CINEMA LANGUAGE";


                signupButton.classList.add(
                    "hidden"
                );


                loginButton.classList.remove(
                    "hidden"
                );


                authSwitch.innerHTML = `

                    Don't have an account?

                    <button
                        id="show-signup-button"
                        type="button"
                    >
                        Sign up
                    </button>

                `;


                authMessage.textContent =
                    "";

            }

        }
    );

}


/* =========================================================
   SIGN UP
========================================================= */

if (
    signupButton
) {

    signupButton.addEventListener(
        "click",
        async () => {

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (
                !email ||
                !password
            ) {

                authMessage.textContent =
                    "EmailとPasswordを入力してください。";

                return;

            }


            if (
                password.length < 6
            ) {

                authMessage.textContent =
                    "Passwordは6文字以上で入力してください。";

                return;

            }


            authMessage.textContent =
                "アカウントを作成しています...";


            const {
                data,
                error
            } =
                await supabaseClient.auth.signUp({

                    email,

                    password

                });


            if (error) {

                console.error(
                    "Signup error:",
                    error
                );


                authMessage.textContent =
                    error.message;


                return;

            }


            console.log(
                "Created user:",
                data.user
            );


            isGuest =
                false;


            authScreen.classList.add(
                "hidden"
            );


            logoutButton.classList.remove(
                "hidden"
            );


            authMessage.textContent =
                "";


            await loadMasteredWords();

            await loadContentsForLibrary();

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

if (
    loginButton
) {

    loginButton.addEventListener(
        "click",
        async () => {

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (
                !email ||
                !password
            ) {

                authMessage.textContent =
                    "EmailとPasswordを入力してください。";

                return;

            }


            authMessage.textContent =
                "ログイン中...";


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email,

                        password

                    });


            if (error) {

                console.error(
                    "Login error:",
                    error
                );


                authMessage.textContent =
                    "ログインに失敗しました。EmailまたはPasswordを確認してください。";


                return;

            }


            console.log(
                "Logged in user:",
                data.user
            );


            isGuest =
                false;


            authScreen.classList.add(
                "hidden"
            );


            logoutButton.classList.remove(
                "hidden"
            );


            authMessage.textContent =
                "";


            await loadMasteredWords();

            await loadContentsForLibrary();

        }
    );

}


/* =========================================================
   GUEST
========================================================= */

if (
    guestButton
) {

    guestButton.addEventListener(
        "click",
        () => {

            isGuest =
                true;


            authScreen.classList.add(
                "hidden"
            );


            logoutButton.classList.add(
                "hidden"
            );


            masteredWords.clear();


            currentPage =
                0;


            loadContentsForLibrary();

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

if (
    logoutButton
) {

    logoutButton.addEventListener(
        "click",
        async () => {

            const {
                error
            } =
                await supabaseClient.auth.signOut();


            if (error) {

                console.error(
                    "Logout error:",
                    error
                );


                alert(
                    "ログアウトに失敗しました。"
                );


                return;

            }


            isGuest =
                false;


            authScreen.classList.remove(
                "hidden"
            );


            logoutButton.classList.add(
                "hidden"
            );


            emailInput.value =
                "";

            passwordInput.value =
                "";

            authMessage.textContent =
                "";


            masteredWords.clear();


            currentBookId =
                null;


            currentBookTitle =
                "";


            studyWords =
                [];


            currentPage =
                0;


            if (
                vocabulary
            ) {

                vocabulary.classList.add(
                    "hidden"
                );

            }


            if (
                movieList
            ) {

                movieList.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================================
   LOAD CONTENTS
========================================================= */

/* =========================================================
   LOAD CONTENTS
   本棚は1つだけ表示
========================================================= */
/* =========================================================
   LOAD CONTENTS FOR LIBRARY
   CINEMA STUDIES
   └── LEARN FROM SPIDER-MAN
   └── LEARN FROM AVENGERS
   └── LEARN FROM HARRY POTTER
========================================================= */

async function loadContentsForLibrary() {

    const contentList =
        document.querySelector(
            "#content-list"
        );

    if (!contentList) {

        console.error(
            "Content list not found."
        );

        return;
    }


    contentList.innerHTML =
        "";


    /* =====================================================
       LOAD CINEMA STUDIES
    ===================================================== */

    const {
        data: parentContents,
        error: parentError
    } =
        await supabaseClient
            .from("contents")
            .select(`
                id,
                title,
                description,
                collection_id,
                parent_content_id,
                color
            `)
            .eq(
                "collection_id",
                1
            )
            .is(
                "parent_content_id",
                null
            )
            .eq(
                "title",
                "CINEMA STUDIES"
            )
            .maybeSingle();


    if (parentError) {

        console.error(
            "Library parent content load error:",
            parentError
        );

        contentList.innerHTML = `
            <p>
                Failed to load CINEMA STUDIES.
            </p>
        `;

        return;
    }


    if (!parentContents) {

        contentList.innerHTML = `
            <p>
                CINEMA STUDIES not found.
            </p>
        `;

        return;
    }


    /* =====================================================
       LOAD CHILD CONTENTS
       CINEMA STUDIES
       └── LEARN FROM ...
    ===================================================== */

    const {
        data: childContents,
        error: childError
    } =
        await supabaseClient
            .from("contents")
            .select(`
                id,
                title,
                description,
                collection_id,
                parent_content_id,
                color
            `)
            .eq(
                "collection_id",
                1
            )
            .eq(
                "parent_content_id",
                parentContents.id
            )
            .order(
                "id",
                {
                    ascending: true
                }
            );


    if (childError) {

        console.error(
            "Library child contents load error:",
            childError
        );

        contentList.innerHTML = `
            <p>
                Failed to load library contents.
            </p>
        `;

        return;
    }


    /* =====================================================
       LIBRARY WRAPPER
    ===================================================== */

    const wrapper =
        document.createElement(
            "section"
        );

    wrapper.className =
        "content-item library-content";

    /* =====================================================
       BOOK ROOM
    ===================================================== */

    const bookRoom =
        document.createElement(
            "section"
        );

    bookRoom.className =
        "book-room";


    /* =====================================================
       PREVIOUS
    ===================================================== */

    const previousBookButton =
        document.createElement(
            "button"
        );

    previousBookButton.className =
        "nav-button nav-prev";

    previousBookButton.type =
        "button";

    previousBookButton.setAttribute(
        "aria-label",
        "Previous content"
    );

    previousBookButton.textContent =
        "‹";


    /* =====================================================
       BOOKSHELF
    ===================================================== */

    const bookshelfFrame =
        document.createElement(
            "div"
        );

    bookshelfFrame.className =
        "bookshelf-frame";


    const bookTrack =
        document.createElement(
            "div"
        );

    bookTrack.className =
        "book-track";


    bookshelfFrame.appendChild(
        bookTrack
    );


    /* =====================================================
       NEXT
    ===================================================== */

    const nextBookButton =
        document.createElement(
            "button"
        );

    nextBookButton.className =
        "nav-button nav-next";

    nextBookButton.type =
        "button";

    nextBookButton.setAttribute(
        "aria-label",
        "Next content"
    );

    nextBookButton.textContent =
        "›";


    /* =====================================================
       BOOK ROOM
    ===================================================== */

    bookRoom.appendChild(
        previousBookButton
    );

    bookRoom.appendChild(
        bookshelfFrame
    );

    bookRoom.appendChild(
        nextBookButton
    );

    wrapper.appendChild(
        bookRoom
    );


    contentList.appendChild(
        wrapper
    );


    /* =====================================================
       NO CHILD CONTENTS
    ===================================================== */

    if (
        !childContents ||
        childContents.length === 0
    ) {

        bookTrack.innerHTML = `
            <p>
                No contents registered.
            </p>
        `;

        return;
    }


    /* =====================================================
       CREATE BOOKSHELF
       CONTENTS = BOOKSHELF BOOKS
    ===================================================== */

    const bookElements = [];


    childContents.forEach(
        (
            content,
            index
        ) => {

            const element =
                document.createElement(
                    "article"
                );


            element.className =
                "book";


            element.dataset.index =
                index;


            element.dataset.contentId =
                content.id;


            element.style.setProperty(
    "--book-color",
    getBookColor(
        content
    )
);


            element.innerHTML = `
                <div class="book-cover">

                    <div class="book-spine"></div>

                    <div class="book-inner">

                        <div class="book-symbol">
                            ✦
                        </div>

                        <div class="book-title">
                            ${escapeHtml(
                                content.title
                            )}
                        </div>

                        <div class="book-rule"></div>

                        <div class="book-label">
                            CINEMA × LANGUAGE
                        </div>

                    </div>

                </div>
            `;


            /* =============================================
               CLICK
            ============================================= */

            element.addEventListener(
                "click",
                () => {

                    currentContentIndex =
                        Number(
                            element.dataset.index
                        );


                    updateBookshelf(
                        true
                    );


                    openContentsPage(
                        content.id,
                        content.title
                    );

                }
            );


            bookTrack.appendChild(
                element
            );


            bookElements.push(
                element
            );

        }
    );


    /* =====================================================
       CURRENT BOOK
    ===================================================== */

    let currentContentIndex = 0;


    /* =====================================================
       UPDATE BOOKSHELF
    ===================================================== */

    function updateBookshelf(
        smooth = true
    ) {

        const elements =
            [
                ...bookTrack.querySelectorAll(
                    ".book"
                )
            ];


        elements.forEach(
            (
                book,
                index
            ) => {

                book.classList.toggle(
                    "is-selected",
                    index ===
                    currentContentIndex
                );

            }
        );


        const target =
            elements[
                currentContentIndex
            ];


        if (!target) {
            return;
        }


        const frameRect =
            bookshelfFrame.getBoundingClientRect();


        const targetRect =
            target.getBoundingClientRect();


        const offset =
            (
                frameRect.left +
                frameRect.width / 2
            )
            -
            (
                targetRect.left +
                targetRect.width / 2
            );


        bookTrack.style.transition =
            smooth
                ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";


        bookTrack.style.transform =
            `translateX(${offset}px)`;

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    previousBookButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            currentContentIndex =
                Math.max(
                    0,
                    currentContentIndex - 1
                );


            updateBookshelf(
                true
            );

        }
    );


    /* =====================================================
       NEXT
    ===================================================== */

    nextBookButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            currentContentIndex =
                Math.min(
                    childContents.length - 1,
                    currentContentIndex + 1
                );


            updateBookshelf(
                true
            );

        }
    );


    /* =====================================================
       INITIAL POSITION
    ===================================================== */

    requestAnimationFrame(
        () => {

            updateBookshelf(
                false
            );

        }
    );

}
/* =========================================================
   UNIFIED BOOKSHELF
   すべての作品を1つの本棚にまとめる
========================================================= */
async function createUnifiedBookshelf(
    books,
    track,
    frame,
    previousButtonElement,
    nextButtonElement
) {
    track.innerHTML =
        "";
    /*
       BOOK ELEMENTS
    */
    const bookElements = [];
    /*
       本を作成
    */
    for (
        const book
        of books
    ) {
        const element =
            document.createElement(
                "article"
            );
        element.className =
            "book";
        element.dataset.index =
            bookElements.length;
        element.dataset.bookId =
            book.id;
        element.style.setProperty(
    "--book-color",
    getBookColor(
        book
    )
);
        /*
           DB上のタイトルではなく
           LEARN FROM + 作品名
        */
        let displayTitle =
            book.title || "";
        /*
           既存のタイトルから
           作品名を取得する処理は
           次の段階で整理する
        */
        if (
            displayTitle.includes(
                "BRAND NEW DAY"
            )
        ) {
            displayTitle =
                "SPIDER-MAN";
        } else if (
            displayTitle.includes(
                "AMAZING SPIDER-MAN"
            )
        ) {
            displayTitle =
                "SPIDER-MAN";
        } else if (
            displayTitle.includes(
                "HARRY POTTER"
            )
        ) {
            displayTitle =
                "HARRY POTTER";
        } else if (
            displayTitle.includes(
                "AVENGERS"
            )
        ) {
            displayTitle =
                "AVENGERS";
        }
        element.innerHTML = `
            <div class="book-cover">
                <div class="book-spine"></div>
                <div class="book-inner">
                    <div class="book-symbol">
                        ✦
                    </div>
                    <div class="book-title">
                        LEARN FROM
                        ${escapeHtml(
                            displayTitle
                        )}
                    </div>
                    <div class="book-rule"></div>
                    <div class="book-label">
                        CINEMA × LANGUAGE
                    </div>
                </div>
            </div>
        `;
        /*
           本をクリックしたら
           その本の単語帳を開く
        */
       element.addEventListener(
    "click",
    () => {

        currentBookIndex =
            Number(
                element.dataset.index
            );

        updateBookshelf(true);

        openContentsPage(
            book.id,
            book.title
        );

    }
);
        track.appendChild(
            element
        );
        bookElements.push(
            element
        );
    }
    /*
       本がない場合
    */
    if (
        bookElements.length === 0
    ) {
        return;
    }
    /*
       現在選択中
    */
    let currentBookIndex =
        0;
    /*
       BOOKSHELF UPDATE
    */
    function updateBookshelf(
        smooth = true
    ) {
        const elements =
            [
                ...track.querySelectorAll(
                    ".book"
                )
            ];
        elements.forEach(
            (
                book,
                index
            ) => {
                book.classList.toggle(
                    "is-selected",
                    index ===
                    currentBookIndex
                );
            }
        );
        const target =
            elements[
                currentBookIndex
            ];
        if (
            !target
        ) {
            return;
        }
        const frameRect =
            frame.getBoundingClientRect();
        const targetRect =
            target.getBoundingClientRect();
        const offset =
            (
                frameRect.left +
                frameRect.width / 2
            )
            -
            (
                targetRect.left +
                targetRect.width / 2
            );
        track.style.transition =
            smooth
                ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";
        track.style.transform =
            `translateX(${offset}px)`;
    }
    /*
       PREVIOUS
    */
    previousButtonElement.addEventListener(
        "click",
        event => {
            event.preventDefault();
            event.stopPropagation();
            currentBookIndex =
                Math.max(
                    0,
                    currentBookIndex - 1
                );
            updateBookshelf(
                true
            );
        }
    );
    /*
       NEXT
    */
    nextButtonElement.addEventListener(
        "click",
        event => {
            event.preventDefault();
            event.stopPropagation();
            currentBookIndex =
                Math.min(
                    books.length - 1,
                    currentBookIndex + 1
                );
            updateBookshelf(
                true
            );
        }
    );
    /*
       初期表示
    */
    requestAnimationFrame(
        () => {
            updateBookshelf(
                false
            );
        }
    );
}


/* =========================================================
   LOAD BOOKS
   BOOKSHELF-NEW STYLE
========================================================= */
async function loadBooksForContentFrontend(
    contentId,
    track,
    frame,
    previousButtonElement,
    nextButtonElement
) {
    const {
        data,
        error
    } = await supabaseClient
        .from("books")
        .select(`
            id,
            title,
            description,
            content_id,
            color
        `)
        .eq(
            "content_id",
            contentId
        )
        .order(
            "id",
            {
                ascending: true
            }
        );
    if (error) {
        console.error(
            "Frontend books load error:",
            error
        );
        return;
    }
    track.innerHTML = "";
    /*
       現在のユーザー
    */
    let user = null;
    if (!isGuest) {
        const {
            data: {
                session
            }
        } = await supabaseClient.auth.getSession();
        user =
            session?.user || null;
    }
    /*
       BOOK ID
    */
    const bookIds =
        (data || []).map(
            book => book.id
        );
    /*
       WORDS
    */
    let allWords = [];
    if (bookIds.length > 0) {
        const {
            data: wordRows,
            error: wordError
        } = await supabaseClient
            .from("words")
            .select(
                "id, book_id"
            )
            .in(
                "book_id",
                bookIds
            );
        if (wordError) {
            console.error(
                "Book words load error:",
                wordError
            );
        } else {
            allWords =
                wordRows || [];
        }
    }
    /*
       WORD IDS
    */
    const allWordIds =
        allWords.map(
            word => word.id
        );
    /*
       PROGRESS
    */
    let progressRows = [];
    if (
        user &&
        allWordIds.length > 0
    ) {
        const {
            data: progressData,
            error: progressError
        } = await supabaseClient
            .from(
                "user_word_progress"
            )
            .select(
                "word_id, mastered"
            )
            .eq(
                "user_id",
                user.id
            )
            .in(
                "word_id",
                allWordIds
            );
        if (progressError) {
            console.error(
                "Book progress load error:",
                progressError
            );
        } else {
            progressRows =
                progressData || [];
        }
    }
    /*
       MASTERED IDS
    */
    const masteredWordIdSet =
        new Set(
            progressRows
                .filter(
                    row =>
                        row.mastered === true
                )
                .map(
                    row =>
                        row.word_id
                )
        );
    /*
       BOOK → WORD IDS
    */
    const bookIdToWordIds = {};
    for (
        const bookId of bookIds
    ) {
        bookIdToWordIds[bookId] = [];
    }
    for (
        const word of allWords
    ) {
        if (
            bookIdToWordIds[word.book_id]
        ) {
            bookIdToWordIds[
                word.book_id
            ].push(
                word.id
            );
        }
    }
    /*
       BOOK ELEMENTS
    */
    const bookElements = [];
    for (
        const book of data || []
    ) {
        const wordIds =
            bookIdToWordIds[
                book.id
            ] || [];
        const totalWords =
            wordIds.length;
        const masteredCount =
            wordIds.filter(
                id =>
                    masteredWordIdSet.has(
                        id
                    )
            ).length;
        const progressPercent =
            totalWords > 0
                ? Math.round(
                    (
                        masteredCount /
                        totalWords
                    ) * 100
                )
                : 0;
        const element =
            document.createElement(
                "article"
            );
        element.className =
            "book";
        element.dataset.index =
            bookElements.length;
        element.dataset.bookId =
            book.id;
        element.style.setProperty(
            "--book-color",
            book.color || getBookColor(book.id)
        );
        element.innerHTML = `
            <div class="book-cover">
                <div class="book-spine"></div>
                <div class="book-inner">
                    <div class="book-symbol">
                        ✦
                    </div>
                    <div class="book-title">
                        ${escapeHtml(
                            book.title
                        )}
                    </div>
                    <div class="book-rule"></div>
                    <div class="book-label">
                        CINEMA × LANGUAGE
                    </div>
                </div>
            </div>
            <div
                class="book-progress"
                aria-hidden="true"
            >
                <span
                    class="book-progress-fill"
                    style="width: ${progressPercent}%"
                ></span>
            </div>
        `;
        /*
           BOOK CLICK
           本を押したら
           目次ページへ
        */
        element.addEventListener(
            "click",
            () => {
                currentBookIndex =
                    Number(
                        element.dataset.index
                    );
                updateBookshelf(
                    true
                );
                const selectedBook =
                    data[
                        currentBookIndex
                    ];
                if (
                    selectedBook
                ) {
                    openContentsPage(
                        selectedBook.id,
                        selectedBook.title
                    );
                }
            }
        );
        track.appendChild(
            element
        );
        bookElements.push(
            element
        );
    }
    /*
       BOOKがない
    */
    if (
        bookElements.length === 0
    ) {
        return;
    }
    /*
       現在選択中の本
    */
    let currentBookIndex = 0;
    /*
       BRAND NEW DAYを初期選択
    */
    const brandNewDayIndex =
        bookElements.findIndex(
            book =>
                book.textContent.includes(
                    "BRAND NEW DAY - NEW Trailer 4K"
                )
        );
    if (
        brandNewDayIndex >= 0
    ) {
        currentBookIndex =
            brandNewDayIndex;
    }
    /*
       BOOKSHELF UPDATE
    */
    function updateBookshelf(
        smooth = true
    ) {
        const elements =
            [
                ...track.querySelectorAll(
                    ".book"
                )
            ];
        elements.forEach(
            (
                book,
                index
            ) => {
                book.classList.toggle(
                    "is-selected",
                    index ===
                    currentBookIndex
                );
            }
        );
        const target =
            elements[
                currentBookIndex
            ];
        if (
            !target
        ) {
            return;
        }
        const frameRect =
            frame.getBoundingClientRect();
        const targetRect =
            target.getBoundingClientRect();
        const offset =
            (
                frameRect.left +
                frameRect.width / 2
            )
            -
            (
                targetRect.left +
                targetRect.width / 2
            );
        track.style.transition =
            smooth
                ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";
        track.style.transform =
            `translateX(${offset}px)`;
    }
    /*
       PREVIOUS
    */
    previousButtonElement.addEventListener(
        "click",
        event => {
            event.preventDefault();
            event.stopPropagation();
            currentBookIndex =
                Math.max(
                    0,
                    currentBookIndex - 1
                );
            updateBookshelf(
                true
            );
        }
    );
    /*
       NEXT
    */
    nextButtonElement.addEventListener(
        "click",
        event => {
            event.preventDefault();
            event.stopPropagation();
            currentBookIndex =
                Math.min(
                    data.length - 1,
                    currentBookIndex + 1
                );
            updateBookshelf(
                true
            );
        }
    );
    /*
       DRAG
    */
    let isDragging = false;
    let dragStartX = 0;
    let dragStartTransform = 0;
    function getTranslateX() {
        const transform =
            window.getComputedStyle(
                track
            ).transform;
        if (
            !transform ||
            transform === "none"
        ) {
            return 0;
        }
        const matrix =
            new DOMMatrix(
                transform
            );
        return matrix.m41;
    }
    frame.addEventListener(
        "mousedown",
        event => {
            if (
                event.target.closest(
                    ".book"
                )
            ) {
                return;
            }
            isDragging = true;
            dragStartX =
                event.clientX;
            dragStartTransform =
                getTranslateX();
            track.style.transition =
                "none";
            frame.classList.add(
                "is-dragging"
            );
            event.preventDefault();
        }
    );
    frame.addEventListener(
        "mousemove",
        event => {
            if (
                !isDragging
            ) {
                return;
            }
            const distance =
                event.clientX -
                dragStartX;
            track.style.transform =
                `translateX(${
                    dragStartTransform +
                    distance
                }px)`;
        }
    );
    frame.addEventListener(
        "mouseup",
        () => {
            if (
                !isDragging
            ) {
                return;
            }
            isDragging = false;
            frame.classList.remove(
                "is-dragging"
            );
            updateBookshelf(
                true
            );
        }
    );
    frame.addEventListener(
        "mouseleave",
        () => {
            if (
                !isDragging
            ) {
                return;
            }
            isDragging = false;
            frame.classList.remove(
                "is-dragging"
            );
            updateBookshelf(
                true
            );
        }
    );
    /*
       TOUCH DRAG
    */
    let touchStartX = 0;
    let touchStartTransform = 0;
    let isTouchDragging = false;
    frame.addEventListener(
        "touchstart",
        event => {
            if (
                event.touches.length !== 1
            ) {
                return;
            }
            touchStartX =
                event.touches[0].clientX;
            touchStartTransform =
                getTranslateX();
            isTouchDragging = true;
            track.style.transition =
                "none";
        },
        {
            passive: true
        }
    );
    frame.addEventListener(
        "touchmove",
        event => {
            if (
                !isTouchDragging ||
                event.touches.length !== 1
            ) {
                return;
            }
            const currentX =
                event.touches[0].clientX;
            const distance =
                currentX -
                touchStartX;
            track.style.transform =
                `translateX(${
                    touchStartTransform +
                    distance
                }px)`;
        },
        {
            passive: true
        }
    );
    frame.addEventListener(
        "touchend",
        () => {
            if (
                !isTouchDragging
            ) {
                return;
            }
            isTouchDragging = false;
            touchStartX = 0;
            track.style.transition =
                "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
            updateBookshelf(
                true
            );
        },
        {
            passive: true
        }
    );
    /*
       RESIZE
    */
    let resizeTimer = null;
    window.addEventListener(
        "resize",
        () => {
            clearTimeout(
                resizeTimer
            );
            resizeTimer =
                setTimeout(
                    () => {
                        updateBookshelf(
                            false
                        );
                    },
                    100
                );
        }
    );
    /*
       INITIAL
    */
    requestAnimationFrame(
        () => {
            updateBookshelf(
                false
            );
        }
    );
}



/* =========================================================
   OPEN CONTENTS PAGE
========================================================= */

/* =========================================================
   OPEN CONTENTS PAGE
   CONTENTSをクリック
   ↓
   そのCONTENTSに紐づくBOOKSを表示
========================================================= */

async function openContentsPage(
    contentId,
    contentTitle
) {

    console.log(
        "Opening content:",
        contentId,
        contentTitle
    );

    currentBookId =
        Number(contentId);

    currentBookTitle =
        contentTitle || "";
    
    currentContentId =
    Number(contentId);

currentContentTitle =
    contentTitle || "";


    /* =====================================================
       HIDE LIBRARY
    ===================================================== */

    if (movieList) {

        movieList.classList.add(
            "hidden"
        );

    }


    /* =====================================================
       HIDE VOCABULARY
    ===================================================== */

    if (vocabulary) {

        vocabulary.classList.add(
            "hidden"
        );

    }


    /* =====================================================
       SHOW CONTENTS PAGE
    ===================================================== */

    if (contentsPage) {

        contentsPage.classList.remove(
            "hidden"
        );

    }


    if (!contentsList) {

        return;

    }


    contentsList.innerHTML =
        "";


    /* =====================================================
       LOAD BOOKS UNDER THIS CONTENT
       
       contents.id = books.content_id
    ===================================================== */

    const {
        data: books,
        error: booksError
    } =
        await supabaseClient
            .from("books")
            .select(`
                id,
                title,
                description,
                content_id,
                color
            `)
            .eq(
                "content_id",
                contentId
            )
            .order(
                "id",
                {
                    ascending: true
                }
            );


    if (booksError) {

        console.error(
            "Books load error:",
            booksError
        );

        contentsList.innerHTML = `
            <p class="contents-error">
                Failed to load books.
            </p>
        `;

        return;

    }


    console.log(
        "Books for content:",
        books
    );
    /* =====================================================
   LOAD PROGRESS FOR CONTENTS
===================================================== */

const bookIds =
    (books || []).map(
        book => book.id
    );

let progressByBookId = {};

if (
    bookIds.length > 0
) {

    const {
        data: wordRows,
        error: wordError
    } =
        await supabaseClient
            .from("words")
            .select(`
                id,
                book_id
            `)
            .in(
                "book_id",
                bookIds
            );


    if (wordError) {

        console.error(
            "Contents word load error:",
            wordError
        );

    } else {

        /*
           BOOKごとの単語IDを作る
        */

        const bookIdToWordIds = {};

        for (
            const bookId
            of bookIds
        ) {

            bookIdToWordIds[bookId] =
                [];

        }


        for (
            const word
            of wordRows || []
        ) {

            if (
                bookIdToWordIds[word.book_id]
            ) {

                bookIdToWordIds[
                    word.book_id
                ].push(
                    word.id
                );

            }

        }


        /*
           全単語ID
        */

        const allWordIds =
            (wordRows || []).map(
                word => word.id
            );


        /*
           Mastered取得
        */

        let masteredWordIds =
    new Set();


const {
    data: {
        user: currentUser
    } = {}
} =
    await supabaseClient.auth.getUser();


if (
    currentUser &&
    allWordIds.length > 0
) {

            const {
                data: progressRows,
                error: progressError
            } =
                await supabaseClient
                    .from(
                        "user_word_progress"
                    )
                    .select(
                        "word_id, mastered"
                    )
                    .eq(
    "user_id",
    currentUser.id
)
                    .in(
                        "word_id",
                        allWordIds
                    );


            if (progressError) {

                console.error(
                    "Contents progress load error:",
                    progressError
                );

            } else {

                masteredWordIds =
                    new Set(
                        (progressRows || [])
                            .filter(
                                row =>
                                    row.mastered === true
                            )
                            .map(
                                row =>
                                    row.word_id
                            )
                    );

            }

        }


        /*
           BOOKごとの進捗率
        */

        for (
            const bookId
            of bookIds
        ) {

            const wordIds =
                bookIdToWordIds[
                    bookId
                ] || [];


            const totalWords =
                wordIds.length;


            const masteredCount =
                wordIds.filter(
                    wordId =>
                        masteredWordIds.has(
                            wordId
                        )
                ).length;


            const progressPercent =
                totalWords > 0
                    ? Math.round(
                        (
                            masteredCount /
                            totalWords
                        ) * 100
                    )
                    : 0;


            progressByBookId[
                bookId
            ] =
                progressPercent;

        }

    }

}


    /* =====================================================
       HEADER
    ===================================================== */

    const aboutText =
        contentTitle ||
        "Learn English through the language of cinema.";


    /* =====================================================
       BUILD CONTENTS
    ===================================================== */

    contentsList.innerHTML = `

        <header class="contents-header">

            <div class="small-label">
                CINEMA × LANGUAGE
            </div>

            <h1>
                ${escapeHtml(
                    contentTitle
                )}
            </h1>

            <p class="subtitle">
                Learn English through the language of cinema.
            </p>

            <div class="ornament">

                <span></span>

                <b>✦</b>

                <span></span>

            </div>

        </header>


        <section class="contents-heading">

            <h2>
                CONTENTS
            </h2>

            <div class="heading-line"></div>

        </section>


        <section class="contents-items">

            ${
                books && books.length > 0

                    ? books
                        .map(
                            (
                                book,
                                index
                            ) => {

                                return `

                                    <a
                                        class="contents-item"
                                        href="#"
                                        data-book-id="${book.id}"
                                    >

                                        <div class="chapter-number">

                                            ${String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}

                                        </div>


                                        <div class="chapter-info">

                                            <div class="chapter-title">

                                                ${escapeHtml(
                                                    book.title
                                                )}

                                            </div>

                                            <div class="contents-progress">

                                                <div class="contents-progress-header">

                                                    <span>
                                                        PROGRESS
                                                    </span>

                                                   <span class="contents-progress-percent">
    ${progressByBookId[book.id] || 0}%
</span>

                                                </div>

                                                <div class="contents-progress-track">

                                                    <div
                                                        class="contents-progress-fill"
                                                       style="width: ${progressByBookId[book.id] || 0}%"
                                                    ></div>

                                                </div>

                                            </div>

                                        </div>


                                    </a>

                                `;

                            }
                        )
                        .join("")

                    : `
                        <div class="contents-empty">

                            <p>
                                No books available yet.
                            </p>

                        </div>
                    `
            }

        </section>


        <footer class="contents-footer">

            <div class="footer-rule"></div>

            <div class="footer-content">

                <span>
                    MOVIE ENGLISH
                </span>

                <span>
                    ${escapeHtml(
                        contentTitle
                    )}
                </span>

            </div>

        </footer>

    `;


    /* =====================================================
       BOOK → VOCABULARY
    ===================================================== */

    const bookItems =
        contentsList.querySelectorAll(
            ".contents-item"
        );


    bookItems.forEach(
        bookElement => {

            bookElement.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const bookId =
                        Number(
                            bookElement.dataset.bookId
                        );


                    const selectedBook =
                        books.find(
                            book =>
                                book.id ===
                                bookId
                        );


                    if (!selectedBook) {

                        return;

                    }


                    openVocabularyBook(
                        selectedBook.id,
                        selectedBook.title
                    );

                }
            );

        }
    );


    /* =====================================================
       SCROLL TOP
    ===================================================== */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
    /* =====================================================
       TITLE → VOCABULARY
    ===================================================== */



    /* =====================================================
       SCROLL TOP
    ===================================================== */

    window.scrollTo({

        top: 0,

        behavior:
            "smooth"

    });


/* =========================================================
   BACK FROM CONTENTS
========================================================= */

if (backToLibrary) {

    backToLibrary.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            if (contentsPage) {

                contentsPage.classList.add(
                    "hidden"
                );

            }


            if (movieList) {

                movieList.classList.remove(
                    "hidden"
                );

            }


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        }
    );

}
/* =========================================================
   BOOK COLORS
========================================================= */

function getBookColor(
    book
) {

const colors = {

    navy:
        "#24364b",

    burgundy:
        "#63332b",

    forest:
        "#34483a",

    brown:
        "#49382a",

    black:
        "#302d29",

    olive:
        "#4a4932",

    purple:
        "#51405f",

    teal:
        "#315c5b",

    red:
        "#713333",

    blue:
        "#304f70"

};


    /*
       DBに保存されている
       colorを優先する
    */

    if (
        book &&
        book.color &&
        colors[book.color]
    ) {

        return colors[
            book.color
        ];

    }


    /*
       colorが未設定の場合は
       従来のbook.idによる
       自動カラーを使用
    */

    const fallbackColors = [

        "#63332b",

        "#492b28",

        "#3d3530",

        "#49382a",

        "#302d29",

        "#3b3430"

    ];


    const bookId =
        Number(
            book?.id
        );


    if (
        Number.isFinite(bookId)
    ) {

        return fallbackColors[
            (bookId - 1) %
            fallbackColors.length
        ];

    }


    return "#3d3530";

}


/* =========================================================
   LOAD MASTERED WORDS
========================================================= */

async function loadMasteredWords() {

    masteredWords.clear();


    if (
        isGuest
    ) {

        renderPage();

        return;

    }


    try {

        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth
                .getUser();


        if (
            !user
        ) {

            renderPage();

            return;

        }


        const {
            data,
            error
        } =
            await supabaseClient

                .from(
                    "user_word_progress"
                )

                .select(
                    "word_id, mastered"
                )

                .eq(
                    "user_id",
                    user.id
                );


        if (error) {

            console.error(
                "Progress load error:",
                error
            );


            renderPage();


            return;

        }


        (data || []).forEach(
            row => {

                if (
                    row.mastered === true
                ) {

                    masteredWords.add(
                        row.word_id
                    );

                }

            }
        );


        renderPage();

    } catch (
        error
    ) {

        console.error(
            "Mastered data could not be loaded:",
            error
        );

    }

}


/* =========================================================
   SAVE USER PROGRESS
========================================================= */

async function setMastered(
    index,
    mastered
) {

    const word =
        studyWords[index];


    if (!word) {

        console.error(
            "Word not found:",
            index
        );


        return false;

    }


    const wordId =
        word.id;


    /*
       GUEST
    */

    if (
        isGuest
    ) {

        if (
            mastered
        ) {

            masteredWords.add(
                wordId
            );

        } else {

            masteredWords.delete(
                wordId
            );

        }


        return true;

    }


    /*
       LOGIN USER
    */

    try {

        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth
                .getUser();


        if (
            !user
        ) {

            alert(
                "ログインしてください。"
            );


            return false;

        }


        const {
            data: existingProgress,
            error: progressError
        } =
            await supabaseClient

                .from(
                    "user_word_progress"
                )

                .select(
                    "id"
                )

                .eq(
                    "user_id",
                    user.id
                )

                .eq(
                    "word_id",
                    wordId
                )

                .maybeSingle();


        if (
            progressError
        ) {

            console.error(
                "Progress lookup error:",
                progressError
            );


            return false;

        }


        if (
            existingProgress
        ) {

            const {
                error
            } =
                await supabaseClient

                    .from(
                        "user_word_progress"
                    )

                    .update({

                        mastered:
                            mastered

                    })

                    .eq(
                        "id",
                        existingProgress.id
                    );


            if (error) {

                console.error(
                    "Progress update error:",
                    error
                );


                return false;

            }

        } else {

            const {
                error
            } =
                await supabaseClient

                    .from(
                        "user_word_progress"
                    )

                    .insert({

                        user_id:
                            user.id,

                        word_id:
                            wordId,

                        mastered:
                            mastered

                    });


            if (error) {

                console.error(
                    "Progress insert error:",
                    error
                );


                return false;

            }

        }


        if (
            mastered
        ) {

            masteredWords.add(
                wordId
            );

        } else {

            masteredWords.delete(
                wordId
            );

        }


        return true;

    } catch (
        error
    ) {

        console.error(
            "Mastered save error:",
            error
        );


        return false;

    }

}


/* =========================================================
   PAGE RENDER
========================================================= */

function renderPage(
    turnDirection = 0
) {

    if (
        !wordList
    ) {

        return;

    }


    const totalPages =
        Math.ceil(
            studyWords.length /
            wordsPerPage
        );


    currentPage =
        Math.min(
            Math.max(
                currentPage,
                0
            ),
            Math.max(
                totalPages - 1,
                0
            )
        );


    const masteredCount =
        studyWords.filter(
            item =>
                masteredWords.has(
                    item.id
                )
        ).length;


    const masteryPercentage =
        studyWords.length > 0

            ? Math.round(
                (
                    masteredCount /
                    studyWords.length
                ) * 100
            )

            : 0;


    const libraryProgress =
        document.querySelector(
            "#library-progress"
        );


    const libraryProgressBar =
        document.querySelector(
            "#library-progress-bar"
        );


    if (
        libraryProgress
    ) {

        libraryProgress.textContent =
            `${masteryPercentage}%`;

    }


    if (
        libraryProgressBar
    ) {

        libraryProgressBar.style.width =
            `${masteryPercentage}%`;

    }


    const start =
        currentPage *
        wordsPerPage;


    const pageWords =
        studyWords.slice(
            start,
            start + wordsPerPage
        );


    wordList.innerHTML =

        pageWords

            .map(
    ({
        word: wordData,
        id,
        difficulty
    }, pageIndex) => {

                    const [

                        word,
                        meaning,
                        example1,
                        translation1,
                        example2,
                        translation2,
                        example3,
                        translation3

                    ] = wordData;


                    const isMastered =
                        masteredWords.has(
                            id
                        );


                    return `

<li
    class="word-entry${
        isMastered
            ? " is-mastered"
            : ""
    }"
    data-word-index="${start + pageIndex}"
    data-word-id="${id}"
>
<span class="word-number">

        ${String(start + pageIndex + 1).padStart(2, "0")}

    </span>

    <button
        class="word-flip"
        type="button"
        aria-label="${escapeHtml(
            word
        )} の意味を表示"
        aria-pressed="false"
    >

        <span class="word-flip-inner">

            <span class="word-face word-front">

                <span class="word">

                    ${escapeHtml(
                        word
                    )}

                </span>

                <span
                    class="word-level level-${escapeHtml(
                        difficulty
                    )}"
                >

                    ${
                        difficultyLabels[
                            difficulty
                        ] ||
                        "EASY"
                    }

                </span>

                <div class="examples">

                    <div class="example-item">

                        <span class="example">

                            ${escapeHtml(
                                example1
                            )}

                        </span>

                    </div>

                    <div class="example-item">

                        <span class="example">

                            ${escapeHtml(
                                example2
                            )}

                        </span>

                    </div>

                    <div class="example-item">

                        <span class="example">

                            ${escapeHtml(
                                example3
                            )}

                        </span>

                    </div>

                </div>

            </span>


            <span class="word-face word-back">

                <span class="meaning">

                    ${escapeHtml(
                        meaning
                    )}

                </span>

                <div class="translations">

                    <div class="translation-item">

                        <span class="translation">

                            ${escapeHtml(
                                translation1
                            )}

                        </span>

                    </div>

                    <div class="translation-item">

                        <span class="translation">

                            ${escapeHtml(
                                translation2
                            )}

                        </span>

                    </div>

                    <div class="translation-item">

                        <span class="translation">

                            ${escapeHtml(
                                translation3
                            )}

                        </span>

                    </div>

                </div>

            </span>

        </span>

    </button>


    <span class="word-flip-hint">

        TAP TO FLIP

    </span>


    <button
        class="speak-button"
        type="button"
        data-speech="${escapeHtml(
            word
        )}"
        aria-label="${escapeHtml(
            word
        )} を再生"
        title="Word audio"
    >

        🔊

    </button>

<button
    class="master-button${isMastered ? " is-active" : ""}"
    type="button"
    aria-label="${isMastered ? "Mastered" : "Mark as mastered"}"
    title="${isMastered ? "Mastered" : "Mark as mastered"}"
>

    <span class="master-check">
        ✓
    </span>

</button>

</li>

`;

                }
            )

            .join("");
document.querySelectorAll('#vocabulary .word-entry').forEach(entry => {

    const english =
        entry.querySelector('.examples');

    const japanese =
        entry.querySelector('.translations');

    if (!english || !japanese) {
        return;
    }

    const diff =
        english.getBoundingClientRect().top -
        japanese.getBoundingClientRect().top;

    japanese.style.transform =
        `translateY(${diff}px)`;

});

    if (
        progress
    ) {

        progress.textContent =

            totalPages > 0

                ? `${currentPage + 1} / ${totalPages} ページ`

                : "0 / 0 ページ";

    }


    if (
        previousButton
    ) {

        previousButton.disabled =
            currentPage === 0;

    }


    if (
        nextButton
    ) {

        nextButton.disabled =
            totalPages === 0 ||
            currentPage ===
            totalPages - 1;

    }


    wordList.classList.remove(
        "page-turn-next",
        "page-turn-previous"
    );


    if (
        turnDirection
    ) {

        void wordList.offsetWidth;


        wordList.classList.add(

            turnDirection > 0

                ? "page-turn-next"

                : "page-turn-previous"

        );

    }

}


/* =========================================================
   BACK TO COLLECTION
========================================================= */

/* =========================================================
   BACK TO COLLECTION
========================================================= */

function goBackToCollection() {

    /*
       HIDE VOCABULARY READER
    */

    if (
        vocabulary
    ) {

        vocabulary.classList.add(
            "hidden"
        );

    }


    /*
       SHOW CONTENTS PAGE
    */

    if (
        contentsPage
    ) {

        contentsPage.classList.remove(
            "hidden"
        );

    }


    /*
       RESTORE CONTENTS / BOOK LIST
    */

    if (
        contentsList
    ) {

        contentsList.classList.remove(
            "hidden"
        );

    }


    /*
       RELOAD CONTENTS PAGE
       直前のCONTENTS一覧を再構築
    */

    if (
    currentContentId
) {

    openContentsPage(
        currentContentId,
        currentContentTitle
    );

}


    /*
       SCROLL TO TOP
    */

    window.scrollTo({

        top:
            0,

        behavior:
            "smooth"

    });

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function movePage(
    amount
) {

    const lastPage =
        Math.max(

            Math.ceil(
                studyWords.length /
                wordsPerPage
            ) - 1,

            0

        );


    const nextPage =
        Math.min(

            Math.max(

                currentPage +
                amount,

                0

            ),

            lastPage

        );


    if (
        nextPage ===
        currentPage
    ) {

        return;

    }


    currentPage =
        nextPage;


    renderPage(
        amount
    );

}


/* =========================================================
   SPEECH
========================================================= */

function speak(
    text
) {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        alert(
            "このブラウザでは音声再生に対応していません。"
        );


        return;

    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        "en-US";


    utterance.rate =
        0.82;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   BACK BUTTON
========================================================= */

if (
    backCollectionButton
) {

    backCollectionButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            goBackToCollection();

        }
    );

}


/* =========================================================
   PREVIOUS PAGE
========================================================= */

if (
    previousButton
) {

    previousButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            movePage(
                -1
            );

        }
    );

}


/* =========================================================
   NEXT PAGE
========================================================= */

if (
    nextButton
) {

    nextButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            movePage(
                1
            );

        }
    );

}


/* =========================================================
   WORD LIST
========================================================= */

if (
    wordList
) {

    wordList.addEventListener(
        "click",
        async event => {

            /*
               SOUND
            */

            const speakButton =
                event.target.closest(
                    ".speak-button"
                );


            if (
                speakButton
            ) {

                event.stopPropagation();


                speak(
                    speakButton.dataset.speech
                );


                return;

            }

/*
   MASTERED
*/

const masterButton =
    event.target.closest(
        ".master-button"
    );


if (
    masterButton
) {

    event.stopPropagation();


    const entry =
        masterButton.closest(
            ".word-entry"
        );


    if (!entry) {

        return;

    }


    const index =
        Number(
            entry.dataset.wordIndex
        );

    const id =
        Number(
            entry.dataset.wordId
        );


    const isMastered =
    masteredWords.has(
        id
    );

const nextMastered =
    !isMastered;


/*
   UIを先に更新
   DB通信を待たず、即座に線を反映
*/

if (
    nextMastered
) {

    masteredWords.add(
        id
    );

} else {

    masteredWords.delete(
        id
    );

}


renderPage();


/*
   DBへ保存
   UI更新後にバックグラウンドで実行
*/

const success =
    await setMastered(
        index,
        nextMastered
    );


/*
   保存失敗時だけ元に戻す
*/

if (
    !success
) {

    if (
        isMastered
    ) {

        masteredWords.add(
            id
        );

    } else {

        masteredWords.delete(
            id
        );

    }


    renderPage();

}


return;

}

            /*
               FLIP
            */

            const card =
                event.target.closest(
                    ".word-flip"
                );


            if (!card) {

                return;

            }


            const entry =
                card.closest(
                    ".word-entry"
                );


            if (
                entry &&
                entry.classList.contains(
                    "is-mastered"
                )
            ) {

                return;

            }

const hasRevealed =
    card.dataset.hasRevealed === "true";


const isFlipped =
    card.classList.toggle(
        "is-flipped"
    );


card.setAttribute(
    "aria-pressed",
    String(
        isFlipped
    )
);


const flipHint =
    entry
        ? entry.querySelector(
            ".word-flip-hint"
        )
        : null;


if (
    flipHint
) {

    if (
        isFlipped
    ) {

        flipHint.textContent =
            "TAP TO RETURN";


        card.dataset.hasRevealed =
            "true";

    } else {

        flipHint.textContent =
            hasRevealed
                ? "TAP TO REVEAL"
                : "TAP TO FLIP";

    }

}


            const wordElement =
                card.querySelector(
                    ".word"
                );


            if (
                wordElement
            ) {

                card.setAttribute(

                    "aria-label",

                    isFlipped

                        ? "英語面に戻す"

                        : `${wordElement.textContent.trim()} の意味を表示`

                );

            }

        }
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            vocabulary &&
            vocabulary.classList.contains(
                "hidden"
            )
        ) {

            return;

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            event.preventDefault();


            movePage(
                -1
            );

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            event.preventDefault();


            movePage(
                1
            );

        }

    }
);


/* =========================================================
   MOBILE SWIPE
========================================================= */

let touchStartX = 0;

let touchStartY = 0;

let touchStartTime = 0;


if (
    vocabulary
) {

    vocabulary.addEventListener(
        "touchstart",
        event => {

            if (
                event.touches.length !== 1
            ) {

                return;

            }


            touchStartX =
                event.touches[0].clientX;


            touchStartY =
                event.touches[0].clientY;


            touchStartTime =
                Date.now();

        },
        {
            passive: true
        }
    );


    vocabulary.addEventListener(
        "touchend",
        event => {

            if (
                !touchStartX &&
                !touchStartY
            ) {

                return;

            }


            const touchEndX =
                event.changedTouches[0]
                    .clientX;


            const touchEndY =
                event.changedTouches[0]
                    .clientY;


            const deltaX =
                touchEndX -
                touchStartX;


            const deltaY =
                touchEndY -
                touchStartY;


            const elapsed =
                Date.now() -
                touchStartTime;


            touchStartX =
                0;


            touchStartY =
                0;


            touchStartTime =
                0;


            if (
                elapsed > 700
            ) {

                return;

            }


            if (
                Math.abs(deltaX) < 60
            ) {

                return;

            }


            if (
                Math.abs(deltaX) <=
                Math.abs(deltaY) * 1.3
            ) {

                return;

            }


            if (
                deltaX < 0
            ) {

                movePage(
                    1
                );

            } else {

                movePage(
                    -1
                );

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   AUTH INITIALIZATION
========================================================= */

async function initializeAuth() {

    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth
            .getSession();


    if (
        session
    ) {

        isGuest =
            false;


        authScreen.classList.add(
            "hidden"
        );


        logoutButton.classList.remove(
            "hidden"
        );


        await loadMasteredWords();

    } else {

        isGuest =
            false;


        authScreen.classList.remove(
            "hidden"
        );


        logoutButton.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   INITIAL DATABASE
========================================================= */

async function initializeDatabase() {

    const success =
        await loadWordsFromDatabase();


    if (!success) {

        return false;

    }


    buildStudyWords();


    return true;

}


/* =========================================================
   START APP
========================================================= */

(async function startApp() {

    const databaseReady =
        await initializeDatabase();


    if (!databaseReady) {

        console.error(
            "Database initialization failed."
        );


        return;

    }


    await initializeAuth();


    await loadContentsForLibrary();

})();
