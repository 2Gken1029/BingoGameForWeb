import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useForm, useFieldArray } from "react-hook-form";
import Label from "../../component/Label";
import styles from "../../../css/GameSetting/Create.module.css";
import Header from "../Header";
import Button from "../../component/Button";
import { MdClear, MdAddCircleOutline } from "react-icons/md";

const Create = () => {
    // バリデーションエラーを管理する定数
    const { errors: validError } = usePage().props;
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            prizes: [{ name: "" }],
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
            router.post("/games/create", { ...data });

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
            <Header currentPath="新規登録" />
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

export default Create;
