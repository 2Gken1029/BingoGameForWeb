import React, { useState } from "react";
import Button from "../component/Button";
import { router } from "@inertiajs/react";

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

    const transitionBingoIndex = () => {
        router.get("/bingo"); // StartPage
    };

    const transitionBingoGame = () => {
        router.get("/bingo/game"); // Bingo
    };

    const transitionPrizeIndex = () => {
        router.get("/prize"); // PrizeList
    };

    return (
        <>
            <div>トップページ</div>
            <Button
                size="medium"
                text="GameList"
                textColor={"white"}
                disabled={disabled}
                onClick={transitionGameIndex}
            />
            <Button
                size="medium"
                text="GameSetting"
                textColor={"white"}
                disabled={disabled}
                onClick={transitionGameSetting}
            />
            {/* <Button
                size="medium"
                text="BingoIndex"
                onClick={transitionBingoIndex}
            /> */}
            {/* <Button
                size="medium"
                text="BingoGame"
                onClick={transitionBingoGame}
            /> */}
            {/* <Button
                size="medium"
                text="PrizeIndex"
                onClick={transitionPrizeIndex}
            /> */}
        </>
    );
};

export default TopPage;
