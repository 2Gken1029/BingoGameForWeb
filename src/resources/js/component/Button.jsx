import React, { useState, useEffect } from "react";

const Button = ({ size = "medium", importance = "medium", text, onClick }) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => {
        if (!disabled) {
            setDisabled(true);
            onClick();
        }
    };

    useEffect(() => {
        if (disabled) {
            const timeoutId = setTimeout(() => {
                setDisabled(false);
            }, 1000); // 1秒後にボタンを再有効化
            return () => clearTimeout(timeoutId);
        }
    }, [disabled]);

    const getSizeStyle = () => {
        switch (size) {
            case "small":
                return { fontSize: "0.8rem" };
            case "medium":
                return { fontSize: "1rem" };
            case "large":
                return { fontSize: "1.2rem" };
            default:
                return {};
        }
    };

    const getImportanceStyle = () => {
        switch (importance) {
            case "low":
                return { color: "green" };
            case "medium":
                return { color: "orange" };
            case "high":
                return { color: "red" };
            default:
                return {};
        }
    };

    return (
        <button
            style={{
                ...getSizeStyle(),
                ...getImportanceStyle(),
                opacity: disabled ? 0.5 : 1, // ボタンが無効のときの透明度
                cursor: disabled ? "not-allowed" : "pointer", // ボタンが無効のときのカーソル
            }}
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
