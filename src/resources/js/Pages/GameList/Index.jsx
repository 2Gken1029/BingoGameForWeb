import React from "react";
import { router, usePage } from "@inertiajs/react";
import Header from "../Header";
import GameList from "../../component/ForGameList/Table";

const Index = () => {
    return (
        <>
            <Header />
            <GameList />
        </>
    );
};

export default Index;
