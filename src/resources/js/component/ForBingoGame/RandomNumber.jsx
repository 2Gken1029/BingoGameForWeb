import React, { useState, useEffect } from "react";
import styles from "../../../css/component/ForBingoGame/CircleNumber.module.css";
import { formatNumber } from "../util";

const RandomNumber = () => {
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomNumber(generateRandomNumber());
        }, 250); // 500ミリ秒ごとに更新

        // コンポーネントがアンマウントされたときにクリーンアップ
        return () => clearInterval(intervalId);
    }, []); // 空の配列を渡すことで初回のみ実行される

    function generateRandomNumber() {
        return Math.floor(Math.random() * 76); // 0から75のランダムな整数
    }

    return (
        <div className={styles.container}>
            <div className={styles.circleNumber}>
                {formatNumber(randomNumber)}
            </div>
        </div>
    );
};

export default RandomNumber;
