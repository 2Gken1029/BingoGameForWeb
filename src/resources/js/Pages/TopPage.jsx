import React from "react";
import Button from "../component/Button";
import { router } from "@inertiajs/react";

const transitionGameIndex = () => {
    router.get("/games"); // GameList
};

const transitionGameSetting = () => {
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

const TopPage = () => {
    return (
        <>
            <div>トップページ</div>
            <Button
                size="medium"
                text="GameList"
                onClick={transitionGameIndex}
            />
            <Button
                size="medium"
                text="GameSetting"
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
