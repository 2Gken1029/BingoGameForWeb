import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../css/Bingo/Show.module.css";
import NumberBox from "../../component/ForBingoGame/NumberBox";
import SelectedNumber from "../../component/ForBingoGame/SelectedNumber";
import RandomNumber from "../../component/ForBingoGame/RandomNumber";
import Button from "../../component/Button";
import Header from "../Header";
import SideBar from "../../component/ForBingoGame/SideBar";

const MAX_NUMBER = 75; // ビンゴの最大数値
const GRID = 15;

const Show = () => {
    const { control, setValue, getValues } = useForm({
        defaultValues: {
            winner: [], // 初期値として空の配列を設定
        },
    });
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

    const handleSuspend = () => {
        console.log(getValues("winner"));
    };

    const handleComplete = () => {
        console.log(getValues("winner"));
    };

    return (
        <>
            <Header currentPath="ゲーム" isGame={true} />
            <div>
                <form>
                    <SideBar control={control} setValue={setValue} />
                    <div className={styles.center}>
                        <div className={styles.selectNumberContainer}>
                            {isSelecting ? (
                                <RandomNumber />
                            ) : (
                                <SelectedNumber
                                    specifiedNumber={displayedNumber}
                                />
                            )}
                            <Button
                                size="medium"
                                text="スタート"
                                disabled={isSelecting}
                                onClick={pickRandomNumber}
                            />
                        </div>
                        <div>
                            {chunkedNumbers.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {row.map((number) => (
                                        <NumberBox
                                            key={number}
                                            number={number}
                                            selected={selectedNumbers.includes(
                                                number
                                            )}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.parentContainer}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                type="button"
                                size="large"
                                text="中断する"
                                onClick={handleSuspend}
                            />
                            <Button
                                type="button"
                                size="large"
                                text="完了する"
                                onClick={handleComplete}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Show;
