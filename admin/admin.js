const SUPABASE_URL =
    "https://duroflqocxilxpnziypr.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Qxq8Q7Ee3GFV309fpQGsfA_73i84qm_";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


const bulkInput =
    document.querySelector(
        "#bulk-input"
    );

const previewButton =
    document.querySelector(
        "#preview-button"
    );

const previewSection =
    document.querySelector(
        "#preview-section"
    );

const previewList =
    document.querySelector(
        "#preview-list"
    );

const previewCount =
    document.querySelector(
        "#preview-count"
    );

const saveButton =
    document.querySelector(
        "#save-button"
    );

const statusMessage =
    document.querySelector(
        "#status-message"
    );


let vocabularyData = [];


/* =========================
   PARSE
========================= */

function parseVocabulary(text) {

    const lines =
        text
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);


    const results = [];


    lines.forEach(
        (line, lineIndex) => {

            const parts =
                line
                    .split("|")
                    .map(
                        item =>
                            item.trim()
                    );


            if (parts.length !== 9) {

                throw new Error(
                    `${lineIndex + 1}行目: 9項目必要です。現在 ${parts.length}項目です。`
                );
            }


            const [
                word,
                meaning,
                example,
                exampleTranslation,
                example2,
                example2Translation,
                example3,
                example3Translation,
                difficulty
            ] = parts;


            if (!word) {
                throw new Error(
                    `${lineIndex + 1}行目: wordが空です。`
                );
            }


            if (
                ![
                    "easy",
                    "medium",
                    "advanced"
                ].includes(difficulty)
            ) {
                throw new Error(
                    `${lineIndex + 1}行目: difficultyは easy / medium / advanced のいずれかです。`
                );
            }


            results.push({
                word,
                meaning,
                example,
                example_translation:
                    exampleTranslation,
                example2,
                example2_translation:
                    example2Translation,
                example3,
                example3_translation:
                    example3Translation,
                difficulty
            });

        }
    );


    return results;
}


/* =========================
   PREVIEW
========================= */

previewButton.addEventListener(
    "click",
    () => {

        statusMessage.textContent = "";
        statusMessage.className =
            "status-message";


        try {

            vocabularyData =
                parseVocabulary(
                    bulkInput.value
                );


            previewList.innerHTML =
    vocabularyData
        .map(
            item => `
<div class="preview-item">

    <div class="preview-word">
        ${escapeHtml(item.word)}
    </div>

    <div class="preview-meaning">
        ${escapeHtml(item.meaning)}
    </div>


    <div class="preview-examples">

        <div class="preview-example-item">

            <div class="preview-example">
                ${escapeHtml(item.example)}
            </div>

            <div class="preview-translation">
                ${escapeHtml(item.example_translation)}
            </div>

        </div>


        <div class="preview-example-item">

            <div class="preview-example">
                ${escapeHtml(item.example2)}
            </div>

            <div class="preview-translation">
                ${escapeHtml(item.example2_translation)}
            </div>

        </div>


        <div class="preview-example-item">

            <div class="preview-example">
                ${escapeHtml(item.example3)}
            </div>

            <div class="preview-translation">
                ${escapeHtml(item.example3_translation)}
            </div>

        </div>

    </div>


    <div class="preview-difficulty">
        ${escapeHtml(item.difficulty.toUpperCase())}
    </div>

</div>
`
        )
        .join("");
        
            previewCount.textContent =
                `${vocabularyData.length} items`;

            previewSection.classList.remove(
                "hidden"
            );

        } catch (error) {

            statusMessage.textContent =
                error.message;

            statusMessage.className =
                "status-message error";

            previewSection.classList.remove(
                "hidden"
            );
        }

    }
);


/* =========================
   SAVE
========================= */

saveButton.addEventListener(
    "click",
    async () => {

        if (
            vocabularyData.length === 0
        ) {
            return;
        }


        saveButton.disabled = true;

        statusMessage.textContent =
            "登録しています...";

        statusMessage.className =
            "status-message";


        try {

            const {
                data: {
                    user
                },
                error: authError
            } =
                await supabaseClient.auth.getUser();


            if (
                authError ||
                !user
            ) {
                throw new Error(
                    "ログインしてください。"
                );
            }


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("words")
                    .upsert(
                        vocabularyData,
                        {
                            onConflict: "word",
                            ignoreDuplicates: true
                        }
                    )
                    .select();


            if (error) {
                throw error;
            }


            statusMessage.textContent =
                `${vocabularyData.length}件を登録しました。`;

            statusMessage.className =
                "status-message success";


            bulkInput.value = "";

            vocabularyData = [];

        } catch (error) {

            console.error(
                "Bulk insert error:",
                error
            );

            statusMessage.textContent =
                error.message ||
                "登録に失敗しました。";

            statusMessage.className =
                "status-message error";

        } finally {

            saveButton.disabled = false;

        }

    }
);


/* =========================
   ESCAPE HTML
========================= */

function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}