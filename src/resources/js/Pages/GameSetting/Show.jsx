import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useForm, useFieldArray } from "react-hook-form";
import Label from "../../component/Label";
import styles from "../../../css/GameSetting/Create.module.css";
import Header from "../Header";
import Button from "../../component/Button";
import { MdClear, MdAddCircleOutline } from "react-icons/md";

/**
 * 入力形式に従って、景品情報を編集
 * @param gameData データベースから取得した景品情報
 * @return prizeNames 入力形式に従った景品情報
 */
function getPrizeNames(gameData) {
    // 配列 `prize` を `number` 順にソート
    const sortedPrizes = gameData.sort((a, b) => a.number - b.number);
    // `prize_name` を作成
    const prizeNames = sortedPrizes.map((prize) => ({ name: prize.name }));

    return prizeNames;
}

const Show = () => {
    // バリデーションエラーを管理する定数
    const { game_detail: gameData, errors: validError } = usePage().props;
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            id: gameData["data"]["id"],
            name: gameData["data"]["name"],
            implementation_date: gameData["data"]["implementation_date"],
            prizes: getPrizeNames(gameData["data"]["prizes"]),
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    //景品情報フィールドの定義
    const { fields, append, remove } = useFieldArray({
        name: "prizes",
        control,
    });

    // 新しい景品情報フォームを追加
    const plusButtonClick = (e) => {
        e.preventDefault();
        append();
    };

    const onSubmit = (data) => {
        console.log(data);
        if (isSubmitting) {
            return; // 既に送信中の場合は無効
        }

        setIsSubmitting(true);

        try {
            router.put("/games/update", { ...data });

            // 一定時間は処理を受け付けないようにする
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
        } catch (error) {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header currentPath="大会情報編集" />
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label name={"大会名"}>
                        <input
                            className={styles.nameInput}
                            {...register("name")}
                        />
                        {validError && (
                            <p className={styles.errorMessage}>
                                {validError.name}
                            </p>
                        )}
                    </Label>
                    <Label name={"開催日"}>
                        <input
                            className={styles.dateInput}
                            type="date"
                            {...register("implementation_date")}
                        />
                        {validError && (
                            <p className={styles.errorMessage}>
                                {validError.implementation_date}
                            </p>
                        )}
                    </Label>
                    <Label name={"景品情報"}>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className={styles.prizeContainer}
                            >
                                <p className={styles.prizeRank}>{` ${
                                    index + 1
                                }位`}</p>
                                <input
                                    key={field.id}
                                    placeholder={` ${index + 1}位の景品`}
                                    className={styles.prizeInput}
                                    {...register(`prizes.${index}.name`)}
                                />
                                <MdClear
                                    style={{ marginLeft: "10px" }}
                                    size={30}
                                    onClick={() => {
                                        remove(index);
                                    }}
                                />
                                {validError &&
                                    validError[`prizes.${index}.name`] && (
                                        <p className={styles.errorMessage}>
                                            {validError[`prizes.${index}.name`]}
                                        </p>
                                    )}
                            </div>
                        ))}
                    </Label>
                    <div className={styles.plusButton}>
                        <MdAddCircleOutline
                            size={40}
                            onClick={plusButtonClick}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            size="medium"
                            text="保存"
                            type="submit"
                            disabled={isSubmitting}
                            onClick={onSubmit}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Show;
