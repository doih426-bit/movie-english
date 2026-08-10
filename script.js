const SUPABASE_URL = "https://duroflqocxilxpnziypr.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_Qxq8Q7Ee3GFV309fpQGsfA_73i84qm_";
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
/* =========================
   MOVIE ENGLISH
   SPIDER-MAN VOCABULARY
========================= */
const words = [
    ["actually", "実際に、本当に", "Who do you think is actually watching these?", "（実際に誰がこれを見ていると思う？）", "I actually enjoyed the movie.", "（私は実際、その映画を楽しんだ）", "She actually knows him.", "（彼女は実際に彼のことを知っている）"],
    ["mutate", "突然変異する、変異する", "Some viruses can mutate quickly.", "（一部のウイルスは急速に変異することがある）", "Viruses can mutate over time.", "（ウイルスは時間とともに変異することがある）", "The virus may mutate again.", "（そのウイルスは再び変異するかもしれない）"],
    ["mutating", "変異している、変異する", "You found a way to suppress mutating DNA, right?", "（変異しているDNAを抑える方法を見つけたんだよね？）", "The scientists are studying mutating cells.", "（科学者たちは変異している細胞を研究している）", "Mutating genes can cause serious problems.", "（変異する遺伝子は深刻な問題を引き起こすことがある）"],
    ["get rid of", "〜を取り除く、なくす", "Could you get rid of the bad aspects?", "（悪い部分を取り除くことはできる？）", "I need to get rid of these old clothes.", "（この古い服を処分しないといけない）", "How can we get rid of this problem?", "（どうすればこの問題をなくせる？）"],
    ["aspect", "側面、面、要素", "There are good and bad aspects to everything.", "（何事にも良い面と悪い面がある）", "The social aspect of the job is important.", "（その仕事の社会的な側面は重要だ）", "We need to consider every aspect of the problem.", "（その問題のあらゆる側面を考える必要がある）"],
    ["keep the good", "良い部分を残す", "Could you get rid of the bad aspects but keep the good?", "（悪い部分を取り除いて、良い部分は残せる？）", "Let's keep the good and change the bad.", "（良い部分は残して、悪い部分を変えよう）", "We should keep the good parts of the old system.", "（古いシステムの良い部分は残すべきだ）"],
    ["decide", "決める、判断する", "How would you decide what parts of nature are good or bad?", "（自然のどの部分が良いか悪いか、どうやって判断する？）", "I haven't decided yet.", "（まだ決めていない）", "You need to decide what you really want.", "（本当に何が欲しいのか決める必要がある）"],
    ["nature", "自然", "We should respect nature.", "（私たちは自然を尊重すべきだ）", "I love spending time in nature.", "（自然の中で過ごすのが好きだ）", "Nature can be both beautiful and dangerous.", "（自然は美しくもあり危険でもある）"],
    ["stumble across", "偶然見つける、偶然出会う", "I stumbled across an interesting book yesterday.", "（昨日、面白い本を偶然見つけた）", "I stumbled across an old friend online.", "（ネットで昔の友達を偶然見つけた）", "We stumbled across a small café while walking.", "（歩いている途中で小さなカフェを偶然見つけた）"],
    ["find a way to ～", "〜する方法を見つける", "You found a way to suppress mutating DNA.", "（変異するDNAを抑える方法を見つけた）", "We need to find a way to solve this problem.", "（この問題を解決する方法を見つける必要がある）", "I'll find a way to make it work.", "（うまくいく方法を見つけるよ）"],
    ["Who do you think ～?", "誰が〜だと思う？", "Who do you think is actually watching these?", "（実際に誰がこれを見ていると思う？）", "Who do you think will win?", "（誰が勝つと思う？）", "Who do you think she is?", "（彼女は誰だと思う？）"],
    ["How would you ～?", "どうやって〜する？", "How would you decide what parts are good or bad?", "（どの部分が良いか悪いか、どうやって判断する？）", "How would you solve this problem?", "（あなたならこの問題をどう解決する？）", "How would you explain this to a child?", "（これを子どもにどう説明する？）"],
    ["part", "部分", "Which part do you like the most?", "（どの部分が一番好き？）", "This is my favorite part of the movie.", "（ここは映画の中で一番好きな部分だ）", "I didn't understand that part.", "（その部分が理解できなかった）"],
    ["good or bad", "良いか悪いか", "How do you know if something is good or bad?", "（何かが良いか悪いか、どうやって分かる？）", "It's hard to tell if it's good or bad.", "（それが良いのか悪いのか判断するのは難しい）", "You can't always tell what's good or bad.", "（何が良いか悪いか、いつも判断できるとは限らない）"],
    ["suppress", "抑える", "The medicine helps suppress the symptoms.", "（その薬は症状を抑えるのに役立つ）", "This drug can suppress inflammation.", "（この薬は炎症を抑えることができる）", "He tried to suppress his anger.", "（彼は怒りを抑えようとした）"],
    ["keep", "保つ、残す", "You can keep the good parts.", "（良い部分は残すことができる）", "Keep the door open.", "（ドアを開けたままにしておいて）", "Can I keep this book?", "（この本をもらってもいい？）"],
    ["find", "見つける", "I need to find a better solution.", "（もっと良い解決策を見つける必要がある）", "Did you find your keys?", "（鍵見つかった？）", "I found a great restaurant nearby.", "（近くに良いレストランを見つけた）"],
    ["way", "方法、やり方", "Is there another way to solve this problem?", "（この問題を解決する別の方法はある？）", "There's no easy way to do this.", "（これを簡単にやる方法はない）", "I know a better way.", "（もっと良いやり方を知っているよ）"],
    ["bad aspect", "悪い側面", "Every technology has a bad aspect.", "（どんな技術にも悪い側面がある）", "We shouldn't ignore the bad aspects.", "（悪い側面を無視すべきではない）", "There are some bad aspects to social media.", "（SNSにはいくつか悪い側面がある）"],
    ["good aspect", "良い側面", "Let’s focus on the good aspects.", "（良い側面に目を向けよう）", "One good aspect of this job is the flexibility.", "（その仕事の良い点の一つは柔軟性だ）", "We should look at the good aspects too.", "（良い側面も見るべきだ）"],
    ["decide what ～", "何が〜かを決める", "It’s difficult to decide what is right.", "（何が正しいのかを決めるのは難しい）", "You have to decide what is most important.", "（何が一番重要なのか決めなければならない）", "It's hard to decide what to choose.", "（何を選ぶべきか決めるのは難しい）"],
    ["part of ～", "〜の一部", "Humans are part of nature.", "（人間は自然の一部だ）", "This is part of the plan.", "（これは計画の一部だ）", "Everyone wants to be part of something.", "（誰もが何かの一部になりたいと思っている）"],
    ["come across", "偶然見つける、出会う", "I came across this video online.", "（ネットでこの動画を偶然見つけた）", "I came across an interesting article.", "（面白い記事を偶然見つけた）", "She came across an old friend at the station.", "（彼女は駅で昔の友達に偶然会った）"],
    ["board", "ボード、掲示板", "I wrote the idea on my board.", "（そのアイデアをボードに書いた）", "There's a new message on the board.", "（ボードに新しいメッセージがある）", "He put a picture on the board.", "（彼はボードに写真を貼った）"],
    ["right?", "〜だよね？", "You know him, right?", "（彼のこと知ってるよね？）", "It's a beautiful day, right?", "（いい天気だよね？）", "You're coming with us, right?", "（一緒に来るんだよね？）"],
    ["get rid of ～", "〜をなくす", "I want to get rid of this problem.", "（この問題をなくしたい）", "I need to get rid of some old files.", "（古いファイルをいくつか削除しないといけない）", "Let's get rid of anything we don't need.", "（必要ないものは全部処分しよう）"],
    ["keep ～", "〜を保つ、残しておく", "Keep the good things.", "（良いものは残しておこう）", "Keep this secret, okay?", "（この秘密は守ってね）", "You can keep the change.", "（お釣りは取っておいていいよ）"],
    ["stumble", "つまずく", "Be careful not to stumble.", "（つまずかないように気をつけて）", "I stumbled on the stairs.", "（階段でつまずいた）", "He stumbled while walking.", "（彼は歩いているときにつまずいた）"],
    ["across", "〜を横切って／〜に出くわして", "I came across an old photo.", "（古い写真を偶然見つけた）", "We walked across the bridge.", "（私たちは橋を渡って歩いた）", "I saw her across the street.", "（通りの向こう側に彼女が見えた）"]
];
/* =========================
   DIFFICULTY
========================= */
const difficultyByIndex = [
    "easy", "medium", "advanced", "easy", "medium",
    "medium", "easy", "easy", "medium", "medium",
    "medium", "medium", "easy", "easy", "advanced",
    "easy", "easy", "easy", "medium", "medium",
    "advanced", "easy", "medium", "easy", "easy",
    "easy", "easy", "medium", "advanced"
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
/* =========================
   SUPABASE MASTERED
========================= */
const masteredWords = new Set();
/*
   SupabaseからMastered状態を取得
*/
async function loadMasteredWords() {
    try {
        const { data, error } =
            await supabaseClient
                .from("words")
                .select("word, mastered");
        if (error) {
            console.error(
                "Supabase load error:",
                error
            );
            return;
        }
        masteredWords.clear();
        data.forEach(row => {
            if (row.mastered === true) {
                const index =
                    words.findIndex(
                        item =>
                            item[0] === row.word
                    );
                if (index !== -1) {
                    masteredWords.add(index);
                }
            }
        });
        renderPage();
    } catch (error) {
        console.error(
            "Mastered data could not be loaded:",
            error
        );
    }
}
/*
   Mastered状態をSupabaseに保存
*/
async function setMastered(
    index,
    mastered
) {
    const wordName =
        words[index][0];
    try {
        const { data, error } =
            await supabaseClient
                .from("words")
                .update({
                    mastered: mastered
                })
                .eq("word", wordName)
                .select();
        if (error) {
            console.error(
                "Supabase update error:",
                error
            );
            alert(
                "Masteredの保存に失敗しました。"
            );
            return false;
        }
        if (!data || data.length === 0) {
            console.error(
                "Word was not found in Supabase:",
                wordName
            );
            alert(
                `Supabaseのwordsテーブルに「${wordName}」がありません。`
            );
            return false;
        }
        if (mastered) {
            masteredWords.add(index);
        } else {
            masteredWords.delete(index);
        }
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
   ELEMENTS
========================= */
const collectionButton =
    document.querySelector(
        "#collection-button"
    );
const backLibraryButton =
    document.querySelector(
        "#back-library-button"
    );
const openBookButton =
    document.querySelector(
        "#open-book-button"
    );
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
const bookList =
    document.querySelector(
        "#book-list"
    );
const vocabulary =
    document.querySelector(
        "#vocabulary"
    );
const wordList =
    document.querySelector(
        "#word-list"
    );
const progress =
    document.querySelector(
        "#progress"
    );
const libraryCount =
    document.querySelector(
        "#library-count"
    );
/* =========================
   PAGE RENDER
========================= */
function renderPage(
    turnDirection = 0
) {
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
        masteredWords.size;
    if (libraryCount) {
        libraryCount.textContent =
            `${words.length} words & phrases · ${masteredCount} mastered`;
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
                    word: [
                        word,
                        meaning,
                        example1,
                        translation1,
                        example2,
                        translation2,
                        example3,
                        translation3
                    ],
                    index,
                    difficulty
                }) => {
                    const isMastered =
                        masteredWords.has(
                            index
                        );
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
    if (progress) {
        progress.textContent =
            `${currentPage + 1} / ${totalPages} ページ · ${masteredCount} 語覚えた`;
    }
    previousButton.disabled =
        currentPage === 0;
    nextButton.disabled =
        currentPage ===
        totalPages - 1;
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
    movieList.classList.add(
        "hidden"
    );
    bookList.classList.remove(
        "hidden"
    );
    vocabulary.classList.add(
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
function goBackToLibrary() {
    vocabulary.classList.add(
        "hidden"
    );
    bookList.classList.add(
        "hidden"
    );
    movieList.classList.remove(
        "hidden"
    );
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
function goBackToCollection() {
    vocabulary.classList.add(
        "hidden"
    );
    bookList.classList.remove(
        "hidden"
    );
    movieList.classList.add(
        "hidden"
    );
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
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
   INITIAL
========================= */
renderPage();
/*
   ページを読み込んだら
   SupabaseからMastered状態を取得
*/
loadMasteredWords();