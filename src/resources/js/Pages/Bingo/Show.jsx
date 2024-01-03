import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import styles from "../../../css/Bingo/Show.module.css";
import NumberBox from "../../component/ForBingoGame/NumberBox";
import SelectedNumber from "../../component/ForBingoGame/SelectedNumber";
import RandomNumber from "../../component/ForBingoGame/RandomNumber";
import TextAnimation from "../../component/TextAnimation";
import Button from "../../component/Button";

const MAX_NUMBER = 75;
const GRID = 15;

const Show = () => {
    const { prize_data: prizeData } = usePage().props;
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [displayedNumber, setDisplayedNumber] = useState(0);

    // 指定数の配列を作成
    const numbers = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);
    const [originalNumbers, setOriginalNumber] = useState(numbers);

    const [isSelecting, setIsSelecting] = useState(false);

    const chunkArray = (array, size) => {
        return Array.from(
            { length: Math.ceil(array.length / size) },
            (_, index) => {
                const start = index * size;
                return array.slice(start, start + size);
            }
        );
    };

    const chunkedNumbers = chunkArray(numbers, GRID);

    const pickRandomNumber = () => {
        if (originalNumbers.length > 0) {
            setIsSelecting(true);
            const selectIndex = Math.floor(
                Math.random() * originalNumbers.length
            );
            const selectNumber = originalNumbers.splice(selectIndex, 1)[0];

            setTimeout(() => {
                setOriginalNumber(originalNumbers); // 選ばれた数値を削除
                setDisplayedNumber(selectNumber);
                setSelectedNumbers([...selectedNumbers, selectNumber]);
                setIsSelecting(false);
            }, 3000);
        } else {
            console.log("All Clear");
        }
    };

    const prizeText = () => {
        let prizeText = "";
        prizeData.map((prize) => {
            prizeText += prize.prize_number + "位：" + prize.name + "　";
        });
        return prizeText;
    };

    return (
        <>
            <div className={styles.selectNumberContainer}>
                {isSelecting ? (
                    <RandomNumber />
                ) : (
                    <SelectedNumber specifiedNumber={displayedNumber} />
                )}
                <Button
                    height={40}
                    width={200}
                    text="スタート"
                    backgroundColor={"skyblue"}
                    disabled={isSelecting}
                    disabledTime={3000}
                    onClick={pickRandomNumber}
                />
            </div>
            {chunkedNumbers.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    {row.map((number) => (
                        <NumberBox
                            key={number}
                            number={number}
                            selected={selectedNumbers.includes(number)}
                        />
                    ))}
                </div>
            ))}
            <div className={styles.animationContainer}>
                <TextAnimation animationText={prizeText()} />
            </div>
        </>
    );
};

export default Show;
