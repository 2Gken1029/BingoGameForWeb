import React from "react";
import { router, usePage } from "@inertiajs/react";
import Header from "../Header";
import GameList from "../../component/ForGameList/Table";

const Index = () => {
    const { game_list: gameList } = usePage().props;

    console.log(gameList);

    return (
        <>
            <Header />
            <GameList />
        </>
    );
};

export default Index;
