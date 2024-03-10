import React, { useState } from "react";
import Button from "../component/Button";
import { router } from "@inertiajs/react";
import styles from "../../css/TopPage.module.css";
import logo from "../../image/bingoImage.png";

const TopPage = () => {
    const [indexDisabled, setIndexDisabled] = useState(false);
    const [settingDisabled, setSettingDisabled] = useState(false);

    const transitionGameIndex = () => {
        setIndexDisabled(true);
        router.get("/games"); // GameList
    };

    const transitionGameSetting = () => {
        setSettingDisabled(true);
        router.get("/games/setting"); // GameSetting
    };

    return (
        <div className={styles.container}>
            <div>
                <img src={logo} className={styles.logo} alt="logo" />
            </div>
            <Button
                size="large"
                text="ゲーム一覧"
                textColor={"white"}
                disabled={indexDisabled}
                onClick={transitionGameIndex}
            />
            <Button
                size="large"
                text="新規作成"
                textColor={"white"}
                disabled={settingDisabled}
                onClick={transitionGameSetting}
            />
        </div>
    );
};

export default TopPage;
