const SUPABASE_URL =
    "https://duroflqocxilxpnziypr.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Qxq8Q7Ee3GFV309fpQGsfA_73i84qm_";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


/* =========================================================
   CONFIG
========================================================= */

const ADMIN_USER_IDS = [
    "32bc338a-8a62-4fc5-bf15-301a3c370564"
];


/*
 * Password reset email の戻り先。
 *
 * localhost で開発するとき：
 * http://localhost:3000/
 *
 * GitHub Pages に公開するとき：
 * https://doih426-bit.github.io/movie-english/
 *
 * 現在は localhost を使用。
 */
const PASSWORD_RESET_REDIRECT =
    "http://localhost:3000/admin.html";


/* =========================================================
   ELEMENTS
========================================================= */

const loginSection =
    document.querySelector(
        "#login-section"
    );


const loginEmail =
    document.querySelector(
        "#login-email"
    );


const loginPassword =
    document.querySelector(
        "#login-password"
    );


const loginButton =
    document.querySelector(
        "#login-button"
    );


const forgotPasswordButton =
    document.querySelector(
        "#forgot-password-button"
    );


const loginStatus =
    document.querySelector(
        "#login-status"
    );


const forgotPasswordSection =
    document.querySelector(
        "#forgot-password-section"
    );


const resetEmail =
    document.querySelector(
        "#reset-email"
    );


const sendResetButton =
    document.querySelector(
        "#send-reset-button"
    );


const backToLoginButton =
    document.querySelector(
        "#back-to-login-button"
    );


const resetStatus =
    document.querySelector(
        "#reset-status"
    );


const updatePasswordSection =
    document.querySelector(
        "#update-password-section"
    );


const newPassword =
    document.querySelector(
        "#new-password"
    );


const confirmPassword =
    document.querySelector(
        "#confirm-password"
    );


const updatePasswordButton =
    document.querySelector(
        "#update-password-button"
    );


const updatePasswordStatus =
    document.querySelector(
        "#update-password-status"
    );


const logoutButton =
    document.querySelector(
        "#logout-button"
    );


const adminContent =
    document.querySelector(
        "#admin-content"
    );


const contentList =
    document.querySelector(
        "#content-list"
    );


const childContentSection =
    document.querySelector(
        "#child-content-section"
    );


const selectedParentTitle =
    document.querySelector(
        "#selected-parent-title"
    );


const childContentList =
    document.querySelector(
        "#child-content-list"
    );


const addChildContentButton =
    document.querySelector(
        "#add-child-content-button"
    );


const bookManagementSection =
    document.querySelector(
        "#book-management-section"
    );


const selectedContentTitle =
    document.querySelector(
        "#selected-content-title"
    );


const contentBookList =
    document.querySelector(
        "#content-book-list"
    );


const addBookButton =
    document.querySelector(
        "#add-book-button"
    );


const bookSelect =
    document.querySelector(
        "#book-select"
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


const wordList =
    document.querySelector(
        "#word-list"
    );


const wordCount =
    document.querySelector(
        "#word-count"
    );


const editSection =
    document.querySelector(
        "#edit-section"
    );


const editId =
    document.querySelector(
        "#edit-id"
    );


const editWord =
    document.querySelector(
        "#edit-word"
    );


const editMeaning =
    document.querySelector(
        "#edit-meaning"
    );


const editExample =
    document.querySelector(
        "#edit-example"
    );


const editExampleTranslation =
    document.querySelector(
        "#edit-example-translation"
    );


const editExample2 =
    document.querySelector(
        "#edit-example2"
    );


const editExample2Translation =
    document.querySelector(
        "#edit-example2-translation"
    );


const editExample3 =
    document.querySelector(
        "#edit-example3"
    );


const editExample3Translation =
    document.querySelector(
        "#edit-example3-translation"
    );


const editDifficulty =
    document.querySelector(
        "#edit-difficulty"
    );


const cancelEditButton =
    document.querySelector(
        "#cancel-edit-button"
    );


const updateWordButton =
    document.querySelector(
        "#update-word-button"
    );

const editBookSection =
    document.querySelector(
        "#edit-book-section"
    );

const editBookId =
    document.querySelector(
        "#edit-book-id"
    );

const editBookTitle =
    document.querySelector(
        "#edit-book-title"
    );

const editBookColor =
    document.querySelector(
        "#edit-book-color"
    );

const cancelEditBookButton =
    document.querySelector(
        "#cancel-edit-book-button"
    );

const updateBookButton =
    document.querySelector(
        "#update-book-button"
    );

const editBookStatus =
    document.querySelector(
        "#edit-book-status"
    );
const editContentSection =
    document.querySelector(
        "#edit-content-section"
    );


const editContentId =
    document.querySelector(
        "#edit-content-id"
    );


const editContentTitle =
    document.querySelector(
        "#edit-content-title"
    );


const editContentDescription =
    document.querySelector(
        "#edit-content-description"
    );


const editContentColor =
    document.querySelector(
        "#edit-content-color"
    );


const editContentStatus =
    document.querySelector(
        "#edit-content-status"
    );


const cancelEditContentButton =
    document.querySelector(
        "#cancel-edit-content-button"
    );


const updateContentButton =
    document.querySelector(
        "#update-content-button"
    );

/* =========================================================
   STATE
========================================================= */

let selectedParentContentId =
    null;


let selectedContentId =
    null;


let selectedBookId =
    null;


let vocabularyData =
    [];


let isPasswordRecovery =
    false;


let isInitializing =
    true;


/* =========================================================
   UTILITY
========================================================= */

function isAdminUser(
    user
) {

    if (!user) {
        return false;
    }


    return ADMIN_USER_IDS.includes(
        user.id
    );

}


function getAuthHashParams() {

    const hash =
        window.location.hash;


    if (
        !hash ||
        hash.length <= 1
    ) {

        return {};

    }


    const params =
        new URLSearchParams(
            hash.substring(1)
        );


    return Object.fromEntries(
        params.entries()
    );

}


function isRecoveryUrl() {

    const params =
        getAuthHashParams();


    return (
        params.type ===
        "recovery"
    );

}


function clearRecoveryHash() {

    /*
     * パスワード変更後などに
     * access_token がURLに残り続けるのを防ぐ。
     */

    if (
        window.location.hash
    ) {

        history.replaceState(
            null,
            document.title,
            window.location.pathname +
            window.location.search
        );

    }

}


/* =========================================================
   SCREEN CONTROL
========================================================= */

function showLogin() {

    loginSection.classList.remove(
        "hidden"
    );


    forgotPasswordSection.classList.add(
        "hidden"
    );


    updatePasswordSection.classList.add(
        "hidden"
    );


    adminContent.classList.add(
        "hidden"
    );

}


function showForgotPassword() {

    loginSection.classList.add(
        "hidden"
    );


    forgotPasswordSection.classList.remove(
        "hidden"
    );


    updatePasswordSection.classList.add(
        "hidden"
    );


    adminContent.classList.add(
        "hidden"
    );

}


function showUpdatePassword() {

    loginSection.classList.add(
        "hidden"
    );


    forgotPasswordSection.classList.add(
        "hidden"
    );


    updatePasswordSection.classList.remove(
        "hidden"
    );


    adminContent.classList.add(
        "hidden"
    );

}


function showAdmin() {

    loginSection.classList.add(
        "hidden"
    );


    forgotPasswordSection.classList.add(
        "hidden"
    );


    updatePasswordSection.classList.add(
        "hidden"
    );


    adminContent.classList.remove(
        "hidden"
    );

}


/* =========================================================
   SESSION / AUTH
========================================================= */

async function checkSession() {

    try {

        /*
         * recovery URL の場合は、
         * 管理画面ではなくパスワード変更画面を優先。
         */

        if (
            isRecoveryUrl()
        ) {

            isPasswordRecovery =
                true;

            showUpdatePassword();

            return false;

        }


        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            showLogin();

            return false;

        }


        const session =
            data?.session;


        if (!session) {

            showLogin();

            return false;

        }


        const user =
            session.user;


        console.log(
            "CURRENT USER:",
            user
        );


        console.log(
            "CURRENT USER ID:",
            user.id
        );


        if (
            !isAdminUser(user)
        ) {

            console.warn(
                "Unauthorized admin access:",
                user.id
            );


            await supabaseClient.auth.signOut();


            loginStatus.textContent =
                "このアカウントには管理者権限がありません。";


            loginStatus.className =
                "status-message error";


            showLogin();

            return false;

        }


        showAdmin();

        return true;

    } catch (error) {

        console.error(
            "checkSession error:",
            error
        );


        showLogin();

        return false;

    }

}


/* =========================================================
   LOGIN
========================================================= */

loginButton.addEventListener(
    "click",
    async () => {

        const email =
            loginEmail.value.trim();


        const password =
            loginPassword.value;


        if (!email) {

            loginStatus.textContent =
                "Emailを入力してください。";


            loginStatus.className =
                "status-message error";


            return;

        }


        if (!password) {

            loginStatus.textContent =
                "Passwordを入力してください。";


            loginStatus.className =
                "status-message error";


            return;

        }


        loginButton.disabled =
            true;


        loginButton.textContent =
            "Signing In...";


        loginStatus.textContent =
            "ログインしています...";


        loginStatus.className =
            "status-message";


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email:
                            email,

                        password:
                            password

                    });


            if (error) {
                throw error;
            }


            if (!data?.user) {

                throw new Error(
                    "ユーザー情報を取得できませんでした。"
                );

            }


            console.log(
                "LOGIN USER:",
                data.user
            );


            if (
                !isAdminUser(
                    data.user
                )
            ) {

                await supabaseClient.auth.signOut();


                throw new Error(
                    "このアカウントには管理者権限がありません。"
                );

            }


            loginStatus.textContent =
                "";


            showAdmin();


            await loadContents();

        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            loginStatus.textContent =
                error.message ||
                "ログインに失敗しました。";


            loginStatus.className =
                "status-message error";

        } finally {

            loginButton.disabled =
                false;


            loginButton.textContent =
                "Sign In";

        }

    }
);


/* =========================================================
   FORGOT PASSWORD
========================================================= */

forgotPasswordButton.addEventListener(
    "click",
    () => {

        resetEmail.value =
            loginEmail.value.trim();


        resetStatus.textContent =
            "";


        resetStatus.className =
            "status-message";


        showForgotPassword();

    }
);


/* =========================================================
   BACK TO LOGIN
========================================================= */

backToLoginButton.addEventListener(
    "click",
    () => {

        resetStatus.textContent =
            "";


        loginStatus.textContent =
            "";


        loginStatus.className =
            "status-message";


        showLogin();

    }
);


/* =========================================================
   SEND PASSWORD RESET EMAIL
========================================================= */

sendResetButton.addEventListener(
    "click",
    async () => {

        const email =
            resetEmail.value.trim();


        if (!email) {

            resetStatus.textContent =
                "Emailを入力してください。";


            resetStatus.className =
                "status-message error";


            return;

        }


        sendResetButton.disabled =
            true;


        sendResetButton.textContent =
            "Sending...";


        resetStatus.textContent =
            "リセットメールを送信しています...";


        resetStatus.className =
            "status-message";


        try {

            const {
                error
            } =
                await supabaseClient.auth
                    .resetPasswordForEmail(
                        email,
                        {
                            redirectTo:
                                PASSWORD_RESET_REDIRECT
                        }
                    );


            if (error) {
                throw error;
            }


            resetStatus.textContent =
                "パスワード再設定用のメールを送信しました。メールをご確認ください。";


            resetStatus.className =
                "status-message success";

        } catch (error) {

            console.error(
                "Password reset error:",
                error
            );


            resetStatus.textContent =
                error.message ||
                "メールの送信に失敗しました。";


            resetStatus.className =
                "status-message error";

        } finally {

            sendResetButton.disabled =
                false;


            sendResetButton.textContent =
                "Send Reset Link";

        }

    }
);


/* =========================================================
   ENTER KEY LOGIN
========================================================= */

loginPassword.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            loginButton.click();

        }

    }
);


/* =========================================================
   PASSWORD UPDATE
========================================================= */

updatePasswordButton.addEventListener(
    "click",
    async () => {

        const password =
            newPassword.value;


        const confirm =
            confirmPassword.value;


        if (!password) {

            updatePasswordStatus.textContent =
                "新しいパスワードを入力してください。";


            updatePasswordStatus.className =
                "status-message error";


            return;

        }


        if (
            password.length < 6
        ) {

            updatePasswordStatus.textContent =
                "パスワードは6文字以上にしてください。";


            updatePasswordStatus.className =
                "status-message error";


            return;

        }


        if (
            password !==
            confirm
        ) {

            updatePasswordStatus.textContent =
                "パスワードが一致しません。";


            updatePasswordStatus.className =
                "status-message error";


            return;

        }


        updatePasswordButton.disabled =
            true;


        updatePasswordButton.textContent =
            "Updating...";


        updatePasswordStatus.textContent =
            "パスワードを更新しています...";


        updatePasswordStatus.className =
            "status-message";


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .updateUser({
                        password:
                            password
                    });


            if (error) {
                throw error;
            }


            const user =
                data?.user;


            if (!user) {

                throw new Error(
                    "ユーザー情報を取得できませんでした。"
                );

            }


            if (
                !isAdminUser(user)
            ) {

                await supabaseClient.auth.signOut();


                throw new Error(
                    "このアカウントには管理者権限がありません。"
                );

            }


            updatePasswordStatus.textContent =
                "パスワードを変更しました。";


            updatePasswordStatus.className =
                "status-message success";


            newPassword.value =
                "";


            confirmPassword.value =
                "";


            /*
             * 少しだけ成功メッセージを表示してから
             * セッションを終了してログイン画面へ。
             */

            setTimeout(
                async () => {

                    await supabaseClient.auth.signOut();


                    isPasswordRecovery =
                        false;


                    clearRecoveryHash();


                    loginEmail.value =
                        user.email ||
                        "";


                    loginPassword.value =
                        "";


                    loginStatus.textContent =
                        "パスワードを変更しました。新しいパスワードでログインしてください。";


                    loginStatus.className =
                        "status-message success";


                    showLogin();

                },
                1200
            );

        } catch (error) {

            console.error(
                "Update password error:",
                error
            );


            updatePasswordStatus.textContent =
                error.message ||
                "パスワードの変更に失敗しました。";


            updatePasswordStatus.className =
                "status-message error";

        } finally {

            updatePasswordButton.disabled =
                false;


            updatePasswordButton.textContent =
                "Update Password";

        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await supabaseClient.auth.signOut();

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }


        selectedParentContentId =
            null;


        selectedContentId =
            null;


        selectedBookId =
            null;


        isPasswordRecovery =
            false;


        loginPassword.value =
            "";


        loginStatus.textContent =
            "ログアウトしました。";


        loginStatus.className =
            "status-message success";


        showLogin();

    }
);


/* =========================================================
   AUTH STATE CHANGE
========================================================= */

/*
 * 重要：
 *
 * 以前のコードでは onAuthStateChange が2つあり、
 *
 *   1つ目 → PASSWORD_RECOVERY を処理
 *   2つ目 → session があれば showAdmin()
 *
 * となっていたため、パスワード再設定画面を
 * 管理画面が上書きする可能性がありました。
 *
 * ここでは1つだけにします。
 */

supabaseClient.auth.onAuthStateChange(
    async (
        event,
        session
    ) => {

        console.log(
            "AUTH EVENT:",
            event
        );


        console.log(
            "AUTH SESSION:",
            session
        );


        /* -----------------------------------------
           PASSWORD RECOVERY
        ----------------------------------------- */

        if (
            event ===
            "PASSWORD_RECOVERY"
        ) {

            isPasswordRecovery =
                true;


            showUpdatePassword();


            return;

        }


        /* -----------------------------------------
           SIGNED OUT
        ----------------------------------------- */

        if (
            event ===
            "SIGNED_OUT"
        ) {

            if (
                !isPasswordRecovery
            ) {

                showLogin();

            }


            return;

        }


        /* -----------------------------------------
           RECOVERY中は管理画面へ行かない
        ----------------------------------------- */

        if (
            isPasswordRecovery
        ) {

            showUpdatePassword();

            return;

        }


        /* -----------------------------------------
           SESSIONなし
        ----------------------------------------- */

        if (!session) {

            showLogin();

            return;

        }


        /* -----------------------------------------
           USER
        ----------------------------------------- */

        const user =
            session.user;


        /* -----------------------------------------
           ADMIN CHECK
        ----------------------------------------- */

        if (
            !isAdminUser(user)
        ) {

            console.warn(
                "Unauthorized user:",
                user.id
            );


            await supabaseClient.auth.signOut();


            loginStatus.textContent =
                "このアカウントには管理者権限がありません。";


            loginStatus.className =
                "status-message error";


            showLogin();


            return;

        }


        /* -----------------------------------------
           AUTHENTICATED ADMIN
        ----------------------------------------- */

        if (
            event ===
            "SIGNED_IN" ||
            event ===
            "INITIAL_SESSION" ||
            event ===
            "TOKEN_REFRESHED" ||
            event ===
            "USER_UPDATED"
        ) {

            showAdmin();

        }

    }
);


/* =========================================================
   LOAD PARENT CONTENT
========================================================= */

async function loadContents() {

    contentList.innerHTML =
        "<p>Loading contents...</p>";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("contents")
            .select(`
                id,
                title,
                description,
                collection_id,
                parent_content_id
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


    if (error) {

        console.error(
            "CINEMA STUDIES load error:",
            error
        );


        contentList.innerHTML =
            "<p>Failed to load CINEMA STUDIES.</p>";


        return;

    }


    if (!data) {

        contentList.innerHTML =
            "<p>CINEMA STUDIES not found.</p>";


        return;

    }


    contentList.innerHTML = `

        <div
            class="content-item"
            data-content-id="${data.id}"
        >

            <div>
                ${escapeHtml(
                    data.title
                )}
            </div>

        </div>

    `;

}


/* =========================================================
   SELECT PARENT CONTENT
========================================================= */

contentList.addEventListener(
    "click",
    async event => {

        const item =
            event.target.closest(
                ".content-item"
            );


        if (!item) {
            return;
        }


        selectedParentContentId =
            Number(
                item.dataset.contentId
            );


        selectedContentId =
            null;


        selectedBookId =
            null;


        selectedParentTitle.textContent =
            item.textContent.trim();


        childContentSection.classList.remove(
            "hidden"
        );


        bookManagementSection.classList.add(
            "hidden"
        );


        editSection.classList.add(
            "hidden"
        );


        await loadChildContents(
            selectedParentContentId
        );


        childContentSection.scrollIntoView({
            behavior:
                "smooth",

            block:
                "start"
        });

    }
);


/* =========================================================
   LOAD CHILD CONTENTS
========================================================= */

async function loadChildContents(
    parentContentId
) {

    childContentList.innerHTML =
        "<p>Loading contents...</p>";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("contents")
            .select(`
                id,
                title,
                description,
                collection_id,
                parent_content_id
            `)
            .eq(
                "parent_content_id",
                parentContentId
            )
            .order(
                "id",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "Child contents load error:",
            error
        );


        childContentList.innerHTML =
            "<p>Failed to load contents.</p>";


        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        childContentList.innerHTML =
            "<p>No contents registered.</p>";


        return;

    }


  
childContentList.innerHTML =
    data
        .map(
            (
                content,
                index
            ) => `

                <div
                    class="child-content-item"
                    data-content-id="${content.id}"
                >

                    <div
                        class="child-content-number"
                    >
                        CONTENTS ${String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )}
                    </div>

                    <div
                        class="child-content-title"
                    >
                        ${escapeHtml(
                            content.title
                        )}
                    </div>

                    <div
                        class="child-content-actions"
                    >

                        <button
                            type="button"
                            class="edit-content-button"
                            data-content-id="${content.id}"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            class="delete-content-button"
                            data-content-id="${content.id}"
                            data-content-title="${escapeHtml(
                                content.title
                            )}"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `
        )
        .join("");
    }
 /* =========================================================
    EDIT / DELETE CHILD CONTENT
 ========================================================= */

childContentList.addEventListener(
    "click",
    async event => {

        const editButton =
            event.target.closest(
                ".edit-content-button"
            );

        const deleteButton =
            event.target.closest(
                ".delete-content-button"
            );


        /*
           EDIT
        */

        if (editButton) {

            const contentId =
                editButton.dataset.contentId;

            try {

                await requireAdminSession();

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from("contents")
                        .select(`
                            id,
                            title,
                            description,
                            color
                        `)
                        .eq(
                            "id",
                            contentId
                        )
                        .single();


                if (error) {
                    throw error;
                }


                editContentId.value =
                    data.id;

                editContentTitle.value =
                    data.title || "";

                editContentDescription.value =
    data.description || "";

editContentColor.value =
    data.color || "navy";

editContentStatus.textContent =
    "";

                editContentSection.classList.remove(
                    "hidden"
                );

                editContentSection.scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "start"
                });


            } catch (error) {

                console.error(
                    "Content edit load error:",
                    error
                );

                alert(
                    "CONTENTSの取得に失敗しました。\n\n" +
                    error.message
                );

            }

            return;

        }


        /*
           DELETE
        */

        if (deleteButton) {

            const contentId =
                deleteButton.dataset.contentId;

            const contentTitle =
                deleteButton.dataset.contentTitle;


            const confirmed =
                confirm(
                    `「${contentTitle}」を削除しますか？`
                );


            if (!confirmed) {
                return;
            }


            deleteButton.disabled =
                true;

            deleteButton.textContent =
                "Deleting...";


            try {

                await requireAdminSession();


                const {
                    error
                } =
                    await supabaseClient
                        .from("contents")
                        .delete()
                        .eq(
                            "id",
                            contentId
                        );


                if (error) {
                    throw error;
                }


                await loadChildContents(
                    selectedParentContentId
                );


            } catch (error) {

                console.error(
                    "Content delete error:",
                    error
                );

                alert(
                    "CONTENTSの削除に失敗しました。\n\n" +
                    error.message
                );


                deleteButton.disabled =
                    false;

                deleteButton.textContent =
                    "Delete";

            }

        }

    }
);


/*
   SAVE EDIT
*/

updateContentButton.addEventListener(
    "click",
    async () => {

        const contentId =
            editContentId.value;

        const color =
    editContentColor.value;

        const title =
            editContentTitle.value.trim();

        const description =
            editContentDescription.value.trim();


        if (!contentId) {

            alert(
                "編集するCONTENTSが選択されていません。"
            );

            return;

        }


        if (!title) {

            editContentStatus.textContent =
                "タイトルを入力してください。";

            editContentStatus.className =
                "status-message error";

            return;

        }


        updateContentButton.disabled =
            true;

        updateContentButton.textContent =
            "Saving...";


        try {

            await requireAdminSession();


            const {
                error
            } =
                await supabaseClient
                    .from("contents")
                    .update({
    title:
        title,

    description:
        description,

    color:
        color
})
                    .eq(
                        "id",
                        contentId
                    );


            if (error) {
                throw error;
            }


            editContentStatus.textContent =
                "CONTENTSを更新しました。";

            editContentStatus.className =
                "status-message success";


            await loadChildContents(
                selectedParentContentId
            );


            setTimeout(
                () => {

                    editContentSection.classList.add(
                        "hidden"
                    );

                },
                700
            );


        } catch (error) {

            console.error(
                "Content update error:",
                error
            );

            editContentStatus.textContent =
                error.message ||
                "CONTENTSの更新に失敗しました。";

            editContentStatus.className =
                "status-message error";

        } finally {

            updateContentButton.disabled =
                false;

            updateContentButton.textContent =
                "Save Changes";

        }

    }
);


/*
   CANCEL EDIT
*/

cancelEditContentButton.addEventListener(
    "click",
    () => {

        editContentSection.classList.add(
            "hidden"
        );

        editContentStatus.textContent =
            "";

    }
);
/* =========================================================
   ADD CHILD CONTENT
========================================================= */

addChildContentButton.addEventListener(
    "click",
    async () => {

        if (
            !selectedParentContentId
        ) {

            alert(
                "親コンテンツを選択してください。"
            );


            return;

        }


        const movieTitle =
    prompt(
        "作品名を入力してください。\n例：Avengers"
    );


if (!movieTitle) {
    return;
}


const cleanMovieTitle =
    movieTitle.trim();


if (!cleanMovieTitle) {
    return;
}


/*
   CONTENT COLOR
*/

const color =
    prompt(
        "Content Colorを入力してください。\n\n" +
        "navy\n" +
        "burgundy\n" +
        "forest\n" +
        "brown\n" +
        "charcoal\n" +
        "purple\n" +
        "olive\n" +
        "darkred\n\n" +
        "何も入力しなければ navy"
    );


const selectedColor =
    color &&
    color.trim()
        ? color.trim().toLowerCase()
        : "navy";


        const title =
            `LEARN FROM ${cleanMovieTitle}`;


        const description =
            `Learn English through ${cleanMovieTitle}`;


        addChildContentButton.disabled =
            true;


        addChildContentButton.textContent =
            "Adding...";


        try {

            await requireAdminSession();


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("contents")
                    .insert({

    collection_id:
        1,

    title:
        title,

    description:
        description,

    color:
        selectedColor,

    parent_content_id:
        selectedParentContentId

})
                    .select()
                    .single();


            if (error) {
                throw error;
            }


            console.log(
                "New child content:",
                data
            );


            alert(
                "コンテンツを追加しました。"
            );


            await loadChildContents(
                selectedParentContentId
            );


        } catch (error) {

            console.error(
                "Child content insert error:",
                error
            );


            alert(
                "コンテンツの追加に失敗しました。\n\n" +
                error.message
            );

        } finally {

            addChildContentButton.disabled =
                false;


            addChildContentButton.textContent =
                "＋ Add Content";

        }

    }
);


/* =========================================================
   SELECT CHILD CONTENT
========================================================= */

childContentList.addEventListener(
    "click",
    async event => {

        const item =
            event.target.closest(
                ".child-content-item"
            );


        if (!item) {
            return;
        }


        selectedContentId =
            Number(
                item.dataset.contentId
            );


        selectedBookId =
            null;


        selectedContentTitle.textContent =
            item.querySelector(
                ".child-content-title"
            )?.textContent ||
            item.textContent.trim();


        bookManagementSection.classList.remove(
            "hidden"
        );


        await loadBooksForContent(
            selectedContentId
        );


        bookManagementSection.scrollIntoView({
            behavior:
                "smooth",

            block:
                "start"
        });

    }
);


/* =========================================================
   LOAD BOOKS
========================================================= */

async function loadBooksForContent(
    contentId,
    preferredBookId = null
) {

    contentBookList.innerHTML =
        "<p>Loading vocabulary books...</p>";


    const {
        data,
        error
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
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "Books load error:",
            error
        );


        contentBookList.innerHTML =
            "<p>Failed to load vocabulary books.</p>";


        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        contentBookList.innerHTML =
            "<p>No vocabulary books registered.</p>";


        bookSelect.innerHTML = `
            <option value="">
                No vocabulary books
            </option>
        `;


        selectedBookId =
            null;


        wordList.innerHTML =
            "<p>No vocabulary book selected.</p>";


        wordCount.textContent =
            "0 items";


        return;

    }


    contentBookList.innerHTML =
    data
        .map(
            book => `

                <div
                    class="content-book-item"
                    data-book-id="${book.id}"
                >

                    <div class="content-book-info">

                        <div
                            class="content-book-color"
                            data-color="${escapeHtml(
                                book.color || "navy"
                            )}"
                        ></div>

                        <span>
                            ${escapeHtml(
                                book.title
                            )}
                        </span>

                    </div>

                    <div
                        class="content-book-actions"
                    >

                        <button
                            type="button"
                            class="edit-book-button"
                            data-book-id="${book.id}"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            class="delete-book-button"
                            data-book-id="${book.id}"
                            data-book-title="${escapeHtml(
                                book.title
                            )}"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `
        )
        .join("");


    bookSelect.innerHTML = `
        <option value="">
            Select a vocabulary book
        </option>
    `;


    data.forEach(
        book => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                book.id;


            option.textContent =
                book.title;


            bookSelect.appendChild(
                option
            );

        }
    );


    if (
        preferredBookId
    ) {

        const exists =
            data.some(
                book =>
                    Number(
                        book.id
                    ) ===
                    Number(
                        preferredBookId
                    )
            );


        if (exists) {

            selectedBookId =
                Number(
                    preferredBookId
                );


            bookSelect.value =
                String(
                    preferredBookId
                );


            await loadWords();

        }

    }

}


/* =========================================================
   BOOK CLICK
========================================================= */

contentBookList.addEventListener(
    "click",
    async event => {

        const editButton =
            event.target.closest(
                ".edit-book-button"
            );

        if (!editButton) {
            return;
        }

        const bookId =
            editButton.dataset.bookId;

        try {

            await requireAdminSession();

            const {
                data,
                error
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
                        "id",
                        bookId
                    )
                    .single();

            if (error) {
                throw error;
            }

            editBookId.value =
                data.id;

            editBookTitle.value =
                data.title || "";

            editBookColor.value =
                data.color || "navy";

            editBookStatus.textContent =
                "";

            editBookSection.classList.remove(
                "hidden"
            );

            editBookSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } catch (error) {

            console.error(
                "Book edit load error:",
                error
            );

            alert(
                "単語帳データの取得に失敗しました。\n\n" +
                error.message
            );

        }

    }
);
updateBookButton.addEventListener(
    "click",
    async () => {

        const bookId =
            editBookId.value;

        const title =
            editBookTitle.value.trim();

        const color =
            editBookColor.value;

        if (!bookId) {

            alert(
                "編集する単語帳が選択されていません。"
            );

            return;

        }

        if (!title) {

            editBookStatus.textContent =
                "タイトルを入力してください。";

            editBookStatus.className =
                "status-message error";

            return;

        }

        updateBookButton.disabled =
            true;

        updateBookButton.textContent =
            "Saving...";

        try {

            await requireAdminSession();

            const {
                error
            } =
                await supabaseClient
                    .from("books")
                    .update({

                        title:
                            title,

                        color:
                            color

                    })
                    .eq(
                        "id",
                        bookId
                    );

            if (error) {
                throw error;
            }

            editBookStatus.textContent =
                "単語帳を更新しました。";

            editBookStatus.className =
                "status-message success";

            await loadBooksForContent(
                selectedContentId,
                bookId
            );

            setTimeout(
                () => {

                    editBookSection.classList.add(
                        "hidden"
                    );

                },
                700
            );

        } catch (error) {

            console.error(
                "Book update error:",
                error
            );

            editBookStatus.textContent =
                error.message ||
                "単語帳の更新に失敗しました。";

            editBookStatus.className =
                "status-message error";

        } finally {

            updateBookButton.disabled =
                false;

            updateBookButton.textContent =
                "Save Changes";

        }

    }
);
cancelEditBookButton.addEventListener(
    "click",
    () => {

        editBookSection.classList.add(
            "hidden"
        );

        editBookStatus.textContent =
            "";

    }
);
contentBookList.addEventListener(
    "click",
    async event => {

        const deleteButton =
            event.target.closest(
                ".delete-book-button"
            );

        if (!deleteButton) {
            return;
        }

        const bookId =
            deleteButton.dataset.bookId;

        const bookTitle =
            deleteButton.dataset.bookTitle;

        const confirmed =
            confirm(
                `「${bookTitle}」を削除しますか？\n\nこの単語帳に登録されている単語も削除される可能性があります。`
            );

        if (!confirmed) {
            return;
        }

        deleteButton.disabled =
            true;

        deleteButton.textContent =
            "Deleting...";

        try {

            await requireAdminSession();

            /*
             * 先に words を削除
             */
            const {
                error: wordsError
            } =
                await supabaseClient
                    .from("words")
                    .delete()
                    .eq(
                        "book_id",
                        bookId
                    );

            if (wordsError) {
                throw wordsError;
            }

            /*
             * その後 books を削除
             */
            const {
                error
            } =
                await supabaseClient
                    .from("books")
                    .delete()
                    .eq(
                        "id",
                        bookId
                    );

            if (error) {
                throw error;
            }

            /*
             * 編集画面を閉じる
             */
            editBookSection.classList.add(
                "hidden"
            );

            /*
             * 本棚を再読み込み
             */
            await loadBooksForContent(
                selectedContentId
            );

            alert(
                "単語帳を削除しました。"
            );

        } catch (error) {

            console.error(
                "Book delete error:",
                error
            );

            alert(
                "単語帳の削除に失敗しました。\n\n" +
                error.message
            );

            deleteButton.disabled =
                false;

            deleteButton.textContent =
                "Delete";

        }

    }
);

/* =========================================================
   BOOK SELECT
========================================================= */

bookSelect.addEventListener(
    "change",
    async () => {

        const value =
            bookSelect.value;


        if (!value) {

            selectedBookId =
                null;


            wordList.innerHTML =
                "<p>Vocabulary bookを選択してください。</p>";


            wordCount.textContent =
                "0 items";


            return;

        }


        selectedBookId =
            Number(
                value
            );


        await loadWords();

    }
);


/* =========================================================
   ADD BOOK
========================================================= */

addBookButton.addEventListener(
    "click",
    async () => {

        if (!selectedContentId) {

            alert(
                "CONTENTSを選択してください。"
            );


            return;

        }


        const title =
            prompt(
                "新しい単語帳の名前を入力してください。"
            );


        if (!title) {
            return;
        }


        const description =
            prompt(
                "単語帳の説明を入力してください。"
            ) || "";


        addBookButton.disabled =
            true;


        addBookButton.textContent =
            "Adding...";


        try {

            await requireAdminSession();


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("books")
                    .insert({

                        title:
                            title.trim(),

                        description:
                            description.trim(),

                        content_id:
                            selectedContentId

                    })
                    .select()
                    .single();


            if (error) {
                throw error;
            }


            alert(
                "単語帳を追加しました。"
            );


            await loadBooksForContent(
                selectedContentId,
                data.id
            );


        } catch (error) {

            console.error(
                "Book insert error:",
                error
            );


            alert(
                "単語帳の追加に失敗しました。\n\n" +
                error.message
            );

        } finally {

            addBookButton.disabled =
                false;


            addBookButton.textContent =
                "＋ Add Vocabulary Book";

        }

    }
);


/* =========================================================
   LOAD WORDS
========================================================= */

async function loadWords() {

    if (!selectedBookId) {

        wordList.innerHTML =
            "<p>Vocabulary bookを選択してください。</p>";


        wordCount.textContent =
            "0 items";


        return;

    }


    wordList.innerHTML =
        "<p>Loading...</p>";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("words")
            .select(`
                id,
                book_id,
                word,
                meaning,
                example,
                example_translation,
                example2,
                example2_translation,
                example3,
                example3_translation,
                difficulty
            `)
            .eq(
                "book_id",
                selectedBookId
            )
            .order(
                "id",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "Words load error:",
            error
        );


        wordList.innerHTML =
            "<p>Failed to load words.</p>";


        wordCount.textContent =
            "0 items";


        return;

    }


    const words =
        data || [];


    wordCount.textContent =
        `${words.length} items`;


    if (
        words.length === 0
    ) {

        wordList.innerHTML =
            "<p>No words registered in this vocabulary book.</p>";


        return;

    }


    wordList.innerHTML =
        words
            .map(
                item => `

                    <div
                        class="registered-word"
                    >

                        <div
                            class="registered-word-main"
                        >

                            <div
                                class="registered-word-title"
                            >
                                ${escapeHtml(
                                    item.word
                                )}
                            </div>


                            <div
                                class="registered-word-meaning"
                            >
                                ${escapeHtml(
                                    item.meaning
                                )}
                            </div>

                        </div>


                        <div
                            class="registered-word-actions"
                        >

                            <div
                                class="registered-word-difficulty"
                            >
                                ${escapeHtml(
                                    (
                                        item.difficulty ||
                                        ""
                                    ).toUpperCase()
                                )}
                            </div>


                            <button
                                type="button"
                                class="edit-word-button"
                                data-id="${item.id}"
                            >
                                Edit
                            </button>


                            <button
                                type="button"
                                class="delete-word-button"
                                data-id="${item.id}"
                                data-word="${escapeHtml(
                                    item.word
                                )}"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   PARSE VOCABULARY
========================================================= */

function parseVocabulary(
    text
) {

    const lines =
        text
            .split("\n")
            .map(
                line =>
                    line.trim()
            )
            .filter(Boolean);


    const results =
        [];


    lines.forEach(
        (
            line,
            lineIndex
        ) => {

            const parts =
                line
                    .split("|")
                    .map(
                        item =>
                            item.trim()
                    );


            if (
                parts.length !== 9
            ) {

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
            ] =
                parts;


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
                ].includes(
                    difficulty
                )
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


/* =========================================================
   PREVIEW
========================================================= */

previewButton.addEventListener(
    "click",
    () => {

        statusMessage.textContent =
            "";


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

                            <div
                                class="preview-item"
                            >

                                <div
                                    class="preview-word"
                                >
                                    ${escapeHtml(
                                        item.word
                                    )}
                                </div>


                                <div
                                    class="preview-meaning"
                                >
                                    ${escapeHtml(
                                        item.meaning
                                    )}
                                </div>


                                <div
                                    class="preview-examples"
                                >

                                    <div
                                        class="preview-example-item"
                                    >

                                        <div
                                            class="preview-example"
                                        >
                                            ${escapeHtml(
                                                item.example
                                            )}
                                        </div>


                                        <div
                                            class="preview-translation"
                                        >
                                            ${escapeHtml(
                                                item.example_translation
                                            )}
                                        </div>

                                    </div>


                                    <div
                                        class="preview-example-item"
                                    >

                                        <div
                                            class="preview-example"
                                        >
                                            ${escapeHtml(
                                                item.example2
                                            )}
                                        </div>


                                        <div
                                            class="preview-translation"
                                        >
                                            ${escapeHtml(
                                                item.example2_translation
                                            )}
                                        </div>

                                    </div>


                                    <div
                                        class="preview-example-item"
                                    >

                                        <div
                                            class="preview-example"
                                        >
                                            ${escapeHtml(
                                                item.example3
                                            )}
                                        </div>


                                        <div
                                            class="preview-translation"
                                        >
                                            ${escapeHtml(
                                                item.example3_translation
                                            )}
                                        </div>

                                    </div>

                                </div>


                                <div
                                    class="preview-difficulty"
                                >
                                    ${escapeHtml(
                                        item.difficulty.toUpperCase()
                                    )}
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

            vocabularyData =
                [];


            previewList.innerHTML =
                "";


            previewCount.textContent =
                "0 items";


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


/* =========================================================
   SAVE WORDS
========================================================= */

saveButton.addEventListener(
    "click",
    async () => {

        if (!selectedBookId) {

            statusMessage.textContent =
                "Vocabulary Bookを選択してください。";


            statusMessage.className =
                "status-message error";


            return;

        }


        if (
            vocabularyData.length === 0
        ) {

            statusMessage.textContent =
                "登録する単語がありません。";


            statusMessage.className =
                "status-message error";


            return;

        }


        saveButton.disabled =
            true;


        statusMessage.textContent =
            "登録しています...";


        statusMessage.className =
            "status-message";


        try {

            await requireAdminSession();


            const {
                data: existingWords,
                error: existingError
            } =
                await supabaseClient
                    .from("words")
                    .select(
                        "word"
                    )
                    .eq(
                        "book_id",
                        selectedBookId
                    );


            if (existingError) {
                throw existingError;
            }


            const existingSet =
                new Set(
                    (
                        existingWords ||
                        []
                    )
                        .map(
                            item =>
                                item.word
                                    .trim()
                                    .toLowerCase()
                        )
                );


            const wordsToInsert =
                vocabularyData
                    .filter(
                        item =>
                            !existingSet.has(
                                item.word
                                    .trim()
                                    .toLowerCase()
                            )
                    )
                    .map(
                        item => ({

                            ...item,

                            book_id:
                                selectedBookId

                        })
                    );


            if (
                wordsToInsert.length ===
                0
            ) {

                statusMessage.textContent =
                    "すべて既にこの単語帳に登録されています。";


                statusMessage.className =
                    "status-message";


                return;

            }


            const {
                data,
                error
            } =
                await supabaseClient
                    .from("words")
                    .insert(
                        wordsToInsert
                    )
                    .select();


            if (error) {
                throw error;
            }


            statusMessage.textContent =
                `${data.length}件を登録しました。`;


            statusMessage.className =
                "status-message success";


            bulkInput.value =
                "";


            vocabularyData =
                [];


            previewList.innerHTML =
                "";


            previewCount.textContent =
                "0 items";


            previewSection.classList.add(
                "hidden"
            );


            await loadWords();

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

            saveButton.disabled =
                false;

        }

    }
);


/* =========================================================
   EDIT WORD
========================================================= */

wordList.addEventListener(
    "click",
    async event => {

        const button =
            event.target.closest(
                ".edit-word-button"
            );


        if (!button) {
            return;
        }


        const wordId =
            button.dataset.id;


        const {
            data,
            error
        } =
            await supabaseClient
                .from("words")
                .select(`
                    id,
                    book_id,
                    word,
                    meaning,
                    example,
                    example_translation,
                    example2,
                    example2_translation,
                    example3,
                    example3_translation,
                    difficulty
                `)
                .eq(
                    "id",
                    wordId
                )
                .single();


        if (error) {

            console.error(
                "Edit load error:",
                error
            );


            alert(
                "単語データの取得に失敗しました。"
            );


            return;

        }


        editId.value =
            data.id;


        editWord.value =
            data.word || "";


        editMeaning.value =
            data.meaning || "";


        editExample.value =
            data.example || "";


        editExampleTranslation.value =
            data.example_translation ||
            "";


        editExample2.value =
            data.example2 || "";


        editExample2Translation.value =
            data.example2_translation ||
            "";


        editExample3.value =
            data.example3 || "";


        editExample3Translation.value =
            data.example3_translation ||
            "";


        editDifficulty.value =
            data.difficulty ||
            "easy";


        editSection.classList.remove(
            "hidden"
        );


        editSection.scrollIntoView({
            behavior:
                "smooth",

            block:
                "start"
        });

    }
);


/* =========================================================
   UPDATE WORD
========================================================= */

updateWordButton.addEventListener(
    "click",
    async () => {

        const wordId =
            editId.value;


        if (!wordId) {

            alert(
                "編集する単語が選択されていません。"
            );


            return;

        }


        updateWordButton.disabled =
            true;


        updateWordButton.textContent =
            "Saving...";


        try {

            await requireAdminSession();


            const {
                error
            } =
                await supabaseClient
                    .from("words")
                    .update({

                        word:
                            editWord.value.trim(),

                        meaning:
                            editMeaning.value.trim(),

                        example:
                            editExample.value.trim(),

                        example_translation:
                            editExampleTranslation.value.trim(),

                        example2:
                            editExample2.value.trim(),

                        example2_translation:
                            editExample2Translation.value.trim(),

                        example3:
                            editExample3.value.trim(),

                        example3_translation:
                            editExample3Translation.value.trim(),

                        difficulty:
                            editDifficulty.value

                    })
                    .eq(
                        "id",
                        wordId
                    );


            if (error) {
                throw error;
            }


            alert(
                "単語を更新しました。"
            );


            editSection.classList.add(
                "hidden"
            );


            await loadWords();

        } catch (error) {

            console.error(
                "Word update error:",
                error
            );


            alert(
                "単語の更新に失敗しました。\n\n" +
                error.message
            );

        } finally {

            updateWordButton.disabled =
                false;


            updateWordButton.textContent =
                "Save Changes";

        }

    }
);


/* =========================================================
   CANCEL EDIT
========================================================= */

cancelEditButton.addEventListener(
    "click",
    () => {

        editSection.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   DELETE WORD
========================================================= */

wordList.addEventListener(
    "click",
    async event => {

        const button =
            event.target.closest(
                ".delete-word-button"
            );


        if (!button) {
            return;
        }


        const wordId =
            button.dataset.id;


        const wordName =
            button.dataset.word;


        const confirmed =
            confirm(
                `「${wordName}」を削除しますか？`
            );


        if (!confirmed) {
            return;
        }


        button.disabled =
            true;


        button.textContent =
            "Deleting...";


        try {

            await requireAdminSession();


            const {
                error
            } =
                await supabaseClient
                    .from("words")
                    .delete()
                    .eq(
                        "id",
                        wordId
                    );


            if (error) {
                throw error;
            }


            await loadWords();

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );


            alert(
                "削除に失敗しました。\n\n" +
                error.message
            );


            button.disabled =
                false;


            button.textContent =
                "Delete";

        }

    }
);


/* =========================================================
   REQUIRE ADMIN SESSION
========================================================= */

async function requireAdminSession() {

    const {
        data,
        error
    } =
        await supabaseClient.auth.getUser();


    if (
        error ||
        !data?.user
    ) {

        throw new Error(
            "ログインセッションがありません。"
        );

    }


    if (
        !isAdminUser(
            data.user
        )
    ) {

        await supabaseClient.auth.signOut();


        showLogin();


        throw new Error(
            "このアカウントには管理者権限がありません。"
        );

    }


    return data.user;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
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


/* =========================================================
   INITIALIZE
========================================================= */

(async function initialize() {

    console.log(
        "Movie English Admin initializing..."
    );


    /*
     * Supabaseの認証イベントが処理される前に
     * recovery URL を確認。
     */

    if (
        isRecoveryUrl()
    ) {

        console.log(
            "PASSWORD RECOVERY URL detected."
        );


        isPasswordRecovery =
            true;


        showUpdatePassword();


        /*
         * ここではreturnしない。
         *
         * SupabaseがURLのaccess_tokenを処理して
         * recovery sessionを作る必要があるため。
         */

    }


    const loggedIn =
        await checkSession();


    if (
        loggedIn &&
        !isPasswordRecovery
    ) {

        await loadContents();

    }


    isInitializing =
        false;


    console.log(
        "Movie English Admin initialized."
    );

})();