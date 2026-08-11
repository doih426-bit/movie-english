/* =========================
   SAVE USER PROGRESS
========================= */
/* =========================
   MASTEREDを個人別に保存
========================= */
async function setMastered(index, mastered) {
    const wordName = words[index][0];
    try {
        // 現在ログインしているユーザーを取得
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
        // wordsテーブルから、この単語のIDを取得
        // 同じ単語が複数登録されている可能性があるため
        // .single() は使わず、最初の1件を取得する
        const {
            data: wordDataList,
            error: wordError
        } = await supabaseClient
            .from("words")
            .select("id, word")
            .eq("word", wordName)
            .limit(1);
        if (
            wordError ||
            !wordDataList ||
            wordDataList.length === 0
        ) {
            console.error(
                "Word lookup error:",
                wordError
            );
            alert(
                `wordsテーブルに「${wordName}」が見つかりません。`
            );
            return false;
        }
        // 最初に見つかった単語を使用
        const wordData = wordDataList[0];
        const wordId = wordData.id;
        console.log(
            "Using word:",
            wordData
        );
        // すでにこのユーザーの記録があるか確認
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
        // すでに記録がある → UPDATE
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
        // 記録がない → INSERT
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
        // 画面上の状態も更新
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
                word: wordName,
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