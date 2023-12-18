import React from "react";
import Button from "../component/Button";

const handleClick = () => {
    console.log("test");
};

const TopPage = () => {
    return (
        <>
            <div>トップページ</div>
            <Button
                size="small"
                importance="low"
                text="Small Low"
                onClick={handleClick}
            />
            <Button
                size="medium"
                importance="medium"
                text="Medium Medium"
                onClick={handleClick}
            />
            <Button
                size="large"
                importance="high"
                text="Large High"
                onClick={handleClick}
            />
        </>
    );
};

export default TopPage;
