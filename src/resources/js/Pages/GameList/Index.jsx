import React from "react";
import Header from "../Header";
import GameList from "../../component/ForGameList/Table";

const Index = () => {
    return (
        <>
            <Header currentPath="ゲーム一覧" />
            <GameList />
        </>
    );
};

export default Index;
