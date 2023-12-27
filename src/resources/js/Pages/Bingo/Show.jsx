import React, { useState } from "react";
import NumberBox from "../../component/ForBingoGame/NumberBox";
import SelectedNumber from "../../component/ForBingoGame/SelectedNumber";
import RandomNumber from "../../component/ForBingoGame/RandomNumber";

const MAX_NUMBER = 75;
const GRID = 15;

const Show = () => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [displayedNumber, setDisplayedNumber] = useState(null);

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

    return (
        <>
            <button onClick={pickRandomNumber}>ボタン</button>
            {isSelecting ? (
                <RandomNumber />
            ) : (
                <SelectedNumber specifiedNumber={displayedNumber} />
            )}
            {chunkedNumbers.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {row.map((number) => (
                        <NumberBox
                            key={number}
                            number={number}
                            selected={selectedNumbers.includes(number)}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};

export default Show;
