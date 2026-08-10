/* =========================
   MOVIE ENGLISH
   SPIDER-MAN VOCABULARY
========================= */

const words = [
    ["actually", "実際に、本当に", "Who do you think is actually watching these?", "（実際に誰がこれを見ていると思う？）"],
    ["mutate", "突然変異する、変異する", "Some viruses can mutate quickly.", "（一部のウイルスは急速に変異することがある）"],
    ["mutating", "変異している、変異する", "You found a way to suppress mutating DNA, right?", "（変異しているDNAを抑える方法を見つけたんだよね？）"],
    ["get rid of", "〜を取り除く、なくす", "Could you get rid of the bad aspects?", "（悪い部分を取り除くことはできる？）"],
    ["aspect", "側面、面、要素", "There are good and bad aspects to everything.", "（何事にも良い面と悪い面がある）"],
    ["keep the good", "良い部分を残す", "Could you get rid of the bad aspects but keep the good?", "（悪い部分を取り除いて、良い部分は残せる？）"],
    ["decide", "決める、判断する", "How would you decide what parts of nature are good or bad?", "（自然のどの部分が良いか悪いか、どうやって判断する？）"],
    ["nature", "自然", "We should respect nature.", "（私たちは自然を尊重すべきだ）"],
    ["stumble across", "偶然見つける、偶然出会う", "I stumbled across an interesting book yesterday.", "（昨日、面白い本を偶然見つけた）"],
    ["find a way to ～", "〜する方法を見つける", "You found a way to suppress mutating DNA.", "（変異するDNAを抑える方法を見つけた）"],
    ["Who do you think ～?", "誰が〜だと思う？", "Who do you think is actually watching these?", "（実際に誰がこれを見ていると思う？）"],
    ["How would you ～?", "どうやって〜する？", "How would you decide what parts are good or bad?", "（どの部分が良いか悪いか、どうやって判断する？）"],
    ["part", "部分", "Which part do you like the most?", "（どの部分が一番好き？）"],
    ["good or bad", "良いか悪いか", "How do you know if something is good or bad?", "（何かが良いか悪いか、どうやって分かる？）"],
    ["suppress", "抑える", "The medicine helps suppress the symptoms.", "（その薬は症状を抑えるのに役立つ）"],
    ["keep", "保つ、残す", "You can keep the good parts.", "（良い部分は残すことができる）"],
    ["find", "見つける", "I need to find a better solution.", "（もっと良い解決策を見つける必要がある）"],
    ["way", "方法、やり方", "Is there another way to solve this problem?", "（この問題を解決する別の方法はある？）"],
    ["bad aspect", "悪い側面", "Every technology has a bad aspect.", "（どんな技術にも悪い側面がある）"],
    ["good aspect", "良い側面", "Let’s focus on the good aspects.", "（良い側面に目を向けよう）"],
    ["decide what ～", "何が〜かを決める", "It’s difficult to decide what is right.", "（何が正しいのかを決めるのは難しい）"],
    ["part of ～", "〜の一部", "Humans are part of nature.", "（人間は自然の一部だ）"],
    ["come across", "偶然見つける、出会う", "I came across this video online.", "（ネットでこの動画を偶然見つけた）"],
    ["board", "ボード、掲示板", "I wrote the idea on my board.", "（そのアイデアをボードに書いた）"],
    ["right?", "〜だよね？", "You know him, right?", "（彼のこと知ってるよね？）"],
    ["get rid of ～", "〜をなくす", "I want to get rid of this problem.", "（この問題をなくしたい）"],
    ["keep ～", "〜を保つ、残しておく", "Keep the good things.", "（良いものは残しておこう）"],
    ["stumble", "つまずく", "Be careful not to stumble.", "（つまずかないように気をつけて）"],
    ["across", "〜を横切って／〜に出くわして", "I came across an old photo.", "（古い写真を偶然見つけた）"]
];


/* =========================
   DIFFICULTY
========================= */

const difficultyByIndex = [
    "easy",
    "medium",
    "advanced",
    "easy",
    "medium",
    "medium",
    "easy",
    "easy",
    "medium",
    "medium",
    "medium",
    "medium",
    "easy",
    "easy",
    "advanced",
    "easy",
    "easy",
    "easy",
    "medium",
    "medium",
    "advanced",
    "easy",
    "medium",
    "easy",
    "easy",
    "easy",
    "easy",
    "medium",
    "advanced"
];

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

const studyWords = words
    .map((word, index) => ({
        word,
        index,
        difficulty: difficultyByIndex[index]
    }))
    .sort(
        (a, b) =>
            difficultyRank[a.difficulty] -
            difficultyRank[b.difficulty] ||
            a.index - b.index
    );


/* =========================
   SETTINGS
========================= */

const wordsPerPage = 4;

let currentPage = 0;

const masteredStorageKey =
    "movie-english-spiderman-mastered-v4";


/* =========================
   LOCAL STORAGE
========================= */

function loadMasteredWords() {
    try {
        const saved =
            localStorage.getItem(masteredStorageKey);

        if (!saved) {
            return new Set();
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return new Set();
        }

        return new Set(
            parsed
                .filter(
                    index =>
                        Number.isInteger(index) &&
                        index >= 0 &&
                        index < words.length
                )
        );

    } catch (error) {
        console.error(
            "Mastered data could not be loaded:",
            error
        );

        return new Set();
    }
}

const masteredWords = loadMasteredWords();


function saveMasteredWords() {
    try {
        localStorage.setItem(
            masteredStorageKey,
            JSON.stringify([...masteredWords])
        );

        return true;

    } catch (error) {
        console.error(
            "Mastered data could not be saved:",
            error
        );

        return false;
    }
}


/* =========================
   ELEMENTS
========================= */

const collectionButton =
    document.querySelector("#collection-button");

const backLibraryButton =
    document.querySelector("#back-library-button");

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

const libraryCount =
    document.querySelector("#library-count");


/* =========================
   SAFETY CHECK
========================= */

if (
    !collectionButton ||
    !backLibraryButton ||
    !openBookButton ||
    !backCollectionButton ||
    !previousButton ||
    !nextButton ||
    !movieList ||
    !bookList ||
    !vocabulary ||
    !wordList
) {
    console.error(
        "Movie English: HTML elements are missing."
    );
}


/* =========================
   PAGE RENDER
========================= */

function renderPage(turnDirection = 0) {

    const totalPages =
        Math.ceil(
            studyWords.length / wordsPerPage
        );

    if (currentPage >= totalPages) {
        currentPage =
            Math.max(0, totalPages - 1);
    }

    if (currentPage < 0) {
        currentPage = 0;
    }


    const masteredCount =
        masteredWords.size;


    if (libraryCount) {
        libraryCount.textContent =
            `${words.length} words & phrases · ${masteredCount} mastered`;
    }


    const start =
        currentPage * wordsPerPage;

    const pageWords =
        studyWords.slice(
            start,
            start + wordsPerPage
        );


    wordList.innerHTML =
        pageWords
            .map(
                ({
                    word: [
                        word,
                        meaning,
                        example,
                        translation
                    ],
                    index,
                    difficulty
                }) => {

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

                <span class="example">
                    ${example}
                </span>

                <span class="word-flip-hint">
                    TAP TO FLIP
                </span>

            </span>


            <span class="word-face word-back">

                <span class="meaning">
                    ${meaning}
                </span>

                <span class="translation">
                    ${translation}
                </span>

                <span class="word-flip-hint">
                    TAP TO RETURN
                </span>

            </span>

        </span>

    </button>


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


    if (progress) {
        progress.textContent =
            `${currentPage + 1} / ${totalPages} ページ · ${masteredCount} 語覚えた`;
    }


    previousButton.disabled =
        currentPage === 0;

    nextButton.disabled =
        currentPage === totalPages - 1;


    /* ページアニメーション */

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
   NAVIGATION
========================= */

function openCollection() {

    movieList.classList.add("hidden");

    bookList.classList.remove("hidden");

    vocabulary.classList.add("hidden");

    collectionButton.setAttribute(
        "aria-expanded",
        "true"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goBackToLibrary() {

    vocabulary.classList.add("hidden");

    bookList.classList.add("hidden");

    movieList.classList.remove("hidden");

    collectionButton.setAttribute(
        "aria-expanded",
        "false"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function openBook() {

    movieList.classList.add("hidden");

    bookList.classList.add("hidden");

    vocabulary.classList.remove("hidden");

    currentPage = 0;

    renderPage();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goBackToCollection() {

    vocabulary.classList.add("hidden");

    bookList.classList.remove("hidden");

    movieList.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function movePage(amount) {

    const lastPage =
        Math.ceil(
            studyWords.length / wordsPerPage
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
        nextPage === currentPage
    ) {
        return;
    }

    currentPage = nextPage;

    renderPage(amount);
}


/* =========================
   SPEECH
========================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        alert("このブラウザでは音声再生に対応していません。");
        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.82;

    window.speechSynthesis.speak(
        utterance
    );
}


/* =========================
   BUTTON EVENTS
========================= */

collectionButton.addEventListener(
    "click",
    openCollection
);


backLibraryButton.addEventListener(
    "click",
    goBackToLibrary
);


openBookButton.addEventListener(
    "click",
    openBook
);


backCollectionButton.addEventListener(
    "click",
    goBackToCollection
);


previousButton.addEventListener(
    "click",
    () => movePage(-1)
);


nextButton.addEventListener(
    "click",
    () => movePage(1)
);


/* =========================
   WORD LIST EVENTS
========================= */

wordList.addEventListener(
    "click",
    event => {

        /* -------------------------
           音声
        -------------------------- */

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


        /* -------------------------
           Cancel
        -------------------------- */

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

            if (!entry) return;

            const index =
                Number(
                    entry.dataset.wordIndex
                );

            masteredWords.delete(index);

            saveMasteredWords();

            renderPage();

            return;
        }


        /* -------------------------
           Mastered
        -------------------------- */

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

            if (!entry) return;

            const index =
                Number(
                    entry.dataset.wordIndex
                );

            masteredWords.add(index);

            saveMasteredWords();

            renderPage();

            return;
        }


        /* -------------------------
           Flip
        -------------------------- */

        const card =
            event.target.closest(
                ".word-flip"
            );

        if (!card) return;


        const entry =
            card.closest(".word-entry");

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

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            movePage(-1);
        }

        if (event.key === "ArrowRight") {
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
            event.changedTouches[0].clientX;

        const touchEndY =
            event.changedTouches[0].clientY;


        const deltaX =
            touchEndX - touchStartX;

        const deltaY =
            touchEndY - touchStartY;


        const elapsed =
            Date.now() - touchStartTime;


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
   INITIAL
========================= */

renderPage();