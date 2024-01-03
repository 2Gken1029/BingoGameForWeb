import React from "react";
import { usePage } from "@inertiajs/react";
import Header from "../Header";
import PrizeList from "../../component/ForPrizeList/Table";

const Index = () => {
    return (
        <>
            <Header />
            <PrizeList />
        </>
    );
};

export default Index;
