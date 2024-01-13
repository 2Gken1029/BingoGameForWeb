import React, { useState } from "react";
import Button from "../component/Button";
import { router } from "@inertiajs/react";
import styles from "../../css/TopPage.module.css";

const TopPage = () => {
    const [disabled, setDisabled] = useState(false);

    const transitionGameIndex = () => {
        setDisabled(true);
        router.get("/games"); // GameList
    };

    const transitionGameSetting = () => {
        setDisabled(true);
        router.get("/games/setting"); // GameSetting
    };

    return (
        <div className={styles.container}>
            <div>アイコン</div>
            <Button
                size="large"
                text="ゲーム一覧"
                textColor={"white"}
                disabled={disabled}
                onClick={transitionGameIndex}
            />
            <Button
                size="large"
                text="新規作成"
                textColor={"white"}
                disabled={disabled}
                onClick={transitionGameSetting}
            />
        </div>
    );
};

export default TopPage;
