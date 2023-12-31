import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import Label from "../../component/Label";
import styles from "../../../css/GameSetting/Create.module.css";
import Header from "../Header";

const PLACEHOLDER_TEXT = `1位の景品\n2位の景品\n3位の景品\n　・　\n　・　\n　・　\n`;

const Create = () => {
    const { register, handleSubmit } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // バリデーションエラーを管理する定数
    const { errors: validError } = usePage().props;
    const onSubmit = (data) => {
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
            <Header />
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
                        <textarea
                            placeholder={PLACEHOLDER_TEXT}
                            className={styles.prizeInput}
                            {...register("prizes")}
                        />
                        {validError && (
                            <p className={styles.errorMessage}>
                                {validError.prizes}
                            </p>
                        )}
                    </Label>
                    <div className={styles.buttonContainer}>
                        <input
                            className={
                                isSubmitting
                                    ? styles.submittingButton
                                    : styles.submitButton
                            }
                            disabled={isSubmitting}
                            type="submit"
                            value={"保存"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Create;
