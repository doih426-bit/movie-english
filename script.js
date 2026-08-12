const SUPABASE_URL = "https://duroflqocxilxpnziypr.supabase.co";
const SUPABASE_KEY = "sb_publishable_Qxq8Q7Ee3GFV309fpQGsfA_73i84qm_";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
let dbWords = [];

async function loadWordsFromDatabase() {

    const {
        data,
        error
    } = await supabaseClient
        .from("words")
        .select("*")
        .order("id", {
            ascending: true
        });

    if (error) {

        console.error(
            "Words could not be loaded:",
            error
        );

        return false;
    }

    dbWords = data.map(row => ({
    id: row.id,
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
    difficulty: row.difficulty
}));

    console.log(
        "Loaded words from Supabase:",
        dbWords
    );

    return true;
}
loadWordsFromDatabase().then(() => {
    buildStudyWords();
    renderPage();
});

/* =========================
   AUTH
========================= */

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


/* =========================
   SWITCH TO SIGN UP
========================= */

authSwitch.addEventListener("click", event => {

    if (
        event.target.id ===
        "show-signup-button"
    ) {

        isSignupMode = true;

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

        authMessage.textContent = "";
    }


    if (
        event.target.id ===
        "show-login-button"
    ) {

        isSignupMode = false;

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

        authMessage.textContent = "";
    }

});

/* =========================
   SIGN UP
========================= */

signupButton.addEventListener(
    "click",
    async () => {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email || !password) {

            authMessage.textContent =
                "EmailとPasswordを入力してください。";

            return;
        }


        if (password.length < 6) {

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


        isGuest = false;

        authScreen.classList.add(
            "hidden"
        );

        logoutButton.classList.remove(
            "hidden"
        );

        authMessage.textContent = "";

        await loadMasteredWords();
    }
);

/* =========================
   LOGIN
========================= */

loginButton.addEventListener(
    "click",
    async () => {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email || !password) {

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


        isGuest = false;


        authScreen.classList.add(
            "hidden"
        );


        logoutButton.classList.remove(
            "hidden"
        );


        await loadMasteredWords();
    }
);


/* =========================
   CONTINUE WITHOUT LOGIN
========================= */

guestButton.addEventListener(
    "click",
    () => {

        isGuest = true;


        authScreen.classList.add(
            "hidden"
        );


        logoutButton.classList.add(
            "hidden"
        );


        console.log(
            "Using Movie English as guest."
        );


        currentPage = 0;

        renderPage();
    }
);


/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener(
    "click",
    async () => {

        const {
            error
        } =
            await supabaseClient.auth
                .signOut();


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


        isGuest = false;


        authScreen.classList.remove(
            "hidden"
        );


        logoutButton.classList.add(
            "hidden"
        );


        emailInput.value = "";

        passwordInput.value = "";

        authMessage.textContent = "";


        masteredWords.clear();

        currentPage = 0;

        renderPage();


        console.log(
            "Logged out."
        );
    }
);
/* =========================
   MOVIE ENGLISH
   SPIDER-MAN VOCABULARY
========================= */



/* =========================
   DIFFICULTY
========================= */



const difficultyLabels = {
    easy: "EASY",
    medium: "MEDIUM",
    advanced: "ADVANCED"
};

const difficultyRank = {
    easy: 0,
    medium: 1,
    advanced: 2
};


/* =========================
   SORT
========================= */

let studyWords = [];

function buildStudyWords() {

    studyWords = dbWords
    .map((item, index) => ({
        id: item.id,
        word: item.word,
        index,
        difficulty: item.difficulty || "easy"
    }))
        .sort(
            (a, b) =>
                difficultyRank[a.difficulty] -
                difficultyRank[b.difficulty] ||
                a.index - b.index
        );

    console.log(
        "Study words:",
        studyWords
    );
    console.log(
    "FIRST STUDY WORD DATA:",
    JSON.stringify(studyWords[0], null, 2)
);
}


/* =========================
   SETTINGS
========================= */

const wordsPerPage = 4;
let currentPage = 0;


/* =========================
   MASTERED STATE
========================= */

const masteredWords = new Set();


/* =========================
   ELEMENTS
========================= */

const collectionButton =
    document.querySelector("#collection-button");

const openBookButton =
    document.querySelector("#open-book-button");

const backCollectionButton =
    document.querySelector("#back-collection-button");

const previousButton =
    document.querySelector("#previous-button");

const nextButton =
    document.querySelector("#next-button");

const movieList =
    document.querySelector(".movie-list");

const bookList =
    document.querySelector("#book-list");

const vocabulary =
    document.querySelector("#vocabulary");

const wordList =
    document.querySelector("#word-list");

const progress =
    document.querySelector("#progress");


/* =========================
   LOAD USER PROGRESS
========================= */

async function loadMasteredWords() {
    try {
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {
            console.error(
                "User is not logged in:",
                userError
            );
            return;
        }

        console.log(
            "Loading progress for:",
            user.id
        );

       const {
    data,
    error
} = await supabaseClient
    .from("user_word_progress")
    .select(`
        word_id,
        mastered
    `)
    .eq("user_id", user.id);

        if (error) {
            console.error(
                "Progress load error:",
                error
            );
            return;
        }

        console.log(
            "Loaded user progress:",
            data
        );

        masteredWords.clear();

        data.forEach(row => {

    if (row.mastered !== true) {
        return;
    }

    const index =
        studyWords.findIndex(
            item =>
                item.id === row.word_id
        );

    if (index !== -1) {
        masteredWords.add(index);
    }
});

        console.log(
            "Mastered word indexes:",
            [...masteredWords]
        );

        renderPage();

    } catch (error) {
        console.error(
            "Mastered data could not be loaded:",
            error
        );
    }
}


/* =========================
   SAVE USER PROGRESS
========================= */

async function setMastered(index, mastered) {

    /* GUEST */
    if (isGuest) {

        if (mastered) {
            masteredWords.add(index);
        } else {
            masteredWords.delete(index);
        }

        return true;
    }

    const wordId =
    studyWords[index].id;

    try {

        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {
            console.error(
                "User is not logged in:",
                userError
            );

            alert("ログインしてください。");

            return false;
        }

        /* EXISTING PROGRESS */

        const {
            data: existingProgress,
            error: progressError
        } = await supabaseClient
            .from("user_word_progress")
            .select("id")
            .eq("user_id", user.id)
            .eq("word_id", wordId)
            .maybeSingle();

        if (progressError) {

            console.error(
                "Progress lookup error:",
                progressError
            );

            alert(
                "学習記録の確認に失敗しました。"
            );

            return false;
        }


        /* UPDATE */

        if (existingProgress) {

            const {
                error: updateError
            } = await supabaseClient
                .from("user_word_progress")
                .update({
                    mastered: mastered
                })
                .eq(
                    "id",
                    existingProgress.id
                );

            if (updateError) {

                console.error(
                    "Progress update error:",
                    updateError
                );

                alert(
                    "Masteredの保存に失敗しました。"
                );

                return false;
            }

        }

        /* INSERT */

        else {

            const {
                error: insertError
            } = await supabaseClient
                .from("user_word_progress")
                .insert({
                    user_id: user.id,
                    word_id: wordId,
                    mastered: mastered
                });

            if (insertError) {

                console.error(
                    "Progress insert error:",
                    insertError
                );

                alert(
                    "Masteredの保存に失敗しました。"
                );

                return false;
            }
        }


        /* LOCAL STATE */

        if (mastered) {
            masteredWords.add(index);
        } else {
            masteredWords.delete(index);
        }

    console.log(
    "Saved progress:",
    {
        user_id: user.id,
        word_id: wordId,
        mastered: mastered
    }
);

        return true;

    } catch (error) {

        console.error(
            "Mastered data could not be saved:",
            error
        );

        alert(
            "Masteredの保存中にエラーが発生しました。"
        );

        return false;
    }
}


/* =========================
   PAGE RENDER
========================= */

function renderPage(turnDirection = 0) {
console.log("RENDER:", studyWords.length, studyWords);
console.log(
    "FIRST STUDY WORD:",
    JSON.stringify(studyWords[0], null, 2)
);
    const masteredCount =
         masteredWords.size;
    const totalPages =
        Math.ceil(
            studyWords.length /
            wordsPerPage
        );


    /* PAGE LIMIT */

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


    /* PROGRESS */

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


    if (libraryProgress) {
        libraryProgress.textContent =
            `${masteryPercentage}%`;
    }

    if (libraryProgressBar) {
        libraryProgressBar.style.width =
            `${masteryPercentage}%`;
    }


    /* WORDS */

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
    index,
    difficulty
}) => {

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
                        masteredWords.has(index);

                    return `
<li
    class="word-entry${isMastered ? " is-mastered" : ""}"
    data-word-index="${index}"
>
    <button
        class="word-flip"
        type="button"
        aria-label="${word} の意味を表示"
        aria-pressed="false"
    >
        <span class="word-flip-inner">

            <span class="word-face word-front">

                <span class="word">
                    ${word}
                </span>

                <span class="word-level level-${difficulty}">
                    ${difficultyLabels[difficulty]}
                </span>

                <div class="examples">

                    <div class="example-item">
                        <span class="example">
                            ${example1}
                        </span>
                    </div>

                    <div class="example-item">
                        <span class="example">
                            ${example2}
                        </span>
                    </div>

                    <div class="example-item">
                        <span class="example">
                            ${example3}
                        </span>
                    </div>

                </div>

            </span>


            <span class="word-face word-back">

                <span class="meaning">
                    ${meaning}
                </span>

                <div class="translations">

                    <div class="translation-item">
                        <span class="translation">
                            ${translation1}
                        </span>
                    </div>

                    <div class="translation-item">
                        <span class="translation">
                            ${translation2}
                        </span>
                    </div>

                    <div class="translation-item">
                        <span class="translation">
                            ${translation3}
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
        data-speech="${word}"
        aria-label="${word} を再生"
        title="Word audio"
    >
        🔊
    </button>


    ${
        isMastered
            ? `
<button
    class="cancel-button"
    type="button"
>
    Cancel
</button>
`
            : `
<button
    class="master-button"
    type="button"
>
    🕷 Mastered
</button>
`
    }

</li>
`;
                }
            )
            .join("");


    /* PAGE NUMBER */

    if (progress) {
    progress.textContent =
        `${currentPage + 1} / ${totalPages} ページ`;
}


    /* BUTTON STATE */

    previousButton.disabled =
        currentPage === 0;

    nextButton.disabled =
        currentPage ===
        totalPages - 1;


    /* PAGE ANIMATION */

    wordList.classList.remove(
        "page-turn-next",
        "page-turn-previous"
    );

    if (turnDirection) {

        void wordList.offsetWidth;

        wordList.classList.add(
            turnDirection > 0
                ? "page-turn-next"
                : "page-turn-previous"
        );
    }
}


/* =========================
   COLLECTION
========================= */

function openCollection() {
    const isOpen =
        collectionButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        // Close
        collectionButton.setAttribute(
            "aria-expanded",
            "false"
        );

        bookList.classList.remove("collection-opening");
        bookList.classList.add("collection-closing");

        setTimeout(() => {
            bookList.classList.add("hidden");
            bookList.classList.remove("collection-closing");
        }, 350);

    } else {
        // Open
        collectionButton.setAttribute(
            "aria-expanded",
            "true"
        );

        bookList.classList.remove("hidden");
        bookList.classList.remove("collection-closing");
        bookList.classList.add("collection-opening");

        setTimeout(() => {
            bookList.classList.remove("collection-opening");
        }, 400);
    }
}


/* =========================
   OPEN VOCABULARY BOOK
========================= */

function openBook() {

    console.log(
        "Opening vocabulary book..."
    );

    movieList.classList.add(
        "hidden"
    );

    bookList.classList.add(
        "hidden"
    );

    vocabulary.classList.remove(
        "hidden"
    );

    currentPage = 0;

    renderPage();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   BACK TO COLLECTION
========================= */

function goBackToCollection() {

    console.log(
        "Going back to collection..."
    );

    vocabulary.classList.add(
        "hidden"
    );

    movieList.classList.remove(
        "hidden"
    );

    bookList.classList.remove(
        "hidden"
    );

    collectionButton.setAttribute(
        "aria-expanded",
        "true"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   PAGE NAVIGATION
========================= */

function movePage(amount) {

    const lastPage =
        Math.ceil(
            studyWords.length /
            wordsPerPage
        ) - 1;


    const nextPage =
        Math.min(
            Math.max(
                currentPage + amount,
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


/* =========================
   SPEECH
========================= */

function speak(text) {

    if (
        !("speechSynthesis" in window)
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


/* =========================
   BUTTON EVENTS
========================= */


/* COLLECTION OPEN */

collectionButton.addEventListener(
    "click",
    event => {

        event.preventDefault();

        openCollection();
    }
);


/* OPEN BOOK */

openBookButton.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        openBook();
    }
);


/* BACK TO COLLECTION */

backCollectionButton.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        goBackToCollection();
    }
);


/* PREVIOUS */

previousButton.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        movePage(-1);
    }
);


/* NEXT */

nextButton.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        console.log(
            "NEXT clicked"
        );

        movePage(1);
    }
);


/* =========================
   WORD LIST EVENTS
========================= */

wordList.addEventListener(
    "click",
    async event => {

        /* SOUND */

        const speakButton =
            event.target.closest(
                ".speak-button"
            );

        if (speakButton) {

            event.stopPropagation();

            speak(
                speakButton.dataset.speech
            );

            return;
        }


        /* CANCEL */

        const cancelButton =
            event.target.closest(
                ".cancel-button"
            );

        if (cancelButton) {

            event.stopPropagation();

            const entry =
                cancelButton.closest(
                    ".word-entry"
                );

            if (!entry) {
                return;
            }

            const index =
                Number(
                    entry.dataset.wordIndex
                );

            const success =
                await setMastered(
                    index,
                    false
                );

            if (success) {
                renderPage();
            }

            return;
        }


        /* MASTERED */

        const masterButton =
            event.target.closest(
                ".master-button"
            );

        if (masterButton) {

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

            const success =
                await setMastered(
                    index,
                    true
                );

            if (success) {
                renderPage();
            }

            return;
        }


        /* FLIP */

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


        const isFlipped =
            card.classList.toggle(
                "is-flipped"
            );


        card.setAttribute(
            "aria-pressed",
            String(isFlipped)
        );


        const flipHint =
            entry
                ? entry.querySelector(
                    ".word-flip-hint"
                )
                : null;


        if (flipHint) {

            flipHint.textContent =
                isFlipped
                    ? "TAP TO RETURN"
                    : "TAP TO FLIP";
        }


        const wordElement =
            card.querySelector(
                ".word"
            );


        if (wordElement) {

            card.setAttribute(
                "aria-label",
                isFlipped
                    ? "英語面に戻す"
                    : `${wordElement.textContent.trim()} の意味を表示`
            );
        }
    }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
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

            movePage(-1);
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            event.preventDefault();

            movePage(1);
        }
    }
);


/* =========================
   MOBILE SWIPE
========================= */

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;


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


        touchStartX = 0;
        touchStartY = 0;
        touchStartTime = 0;


        if (elapsed > 700) {
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


        if (deltaX < 0) {

            movePage(1);

        } else {

            movePage(-1);
        }
    },
    {
        passive: true
    }
);


/* =========================
   INITIAL RENDER
========================= */

renderPage();


/* =========================
   AUTH INITIALIZATION
========================= */

async function initializeAuth() {

    const {
        data: { session }
    } =
        await supabaseClient.auth.getSession();


    if (session) {

        console.log(
            "Existing session:",
            session.user
        );

        isGuest = false;

        authScreen.classList.add(
            "hidden"
        );

        logoutButton.classList.remove(
            "hidden"
        );

        await loadMasteredWords();

    } else {

        console.log(
            "No logged-in user."
        );

        isGuest = false;

        authScreen.classList.remove(
            "hidden"
        );

        logoutButton.classList.add(
            "hidden"
        );
    }
}


initializeAuth();