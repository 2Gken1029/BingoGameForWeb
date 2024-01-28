import React from "react";

/**
 * ボタン共通コンポーネント
 * <Button size="medium" text="Medium Medium" onClick={() => { void() }} />
 */
const Button = ({
    size = "medium",
    type = "button",
    disabled,
    backgroundColor = "darkgray",
    textColor,
    text,
    onClick = () => {},
}) => {
    const getSizeStyle = () => {
        switch (size) {
            case "small":
                return { fontSize: "1.0rem", height: "30px", width: "80px" };
            case "medium":
                return { fontSize: "1.5rem", height: "50px", width: "140px" };
            case "large":
                return { fontSize: "2.0rem", height: "70px", width: "200px" };
            default:
                return {};
        }
    };

    // 背景色に応じて適切なテキスト色を決定
    const determineTextColor = () => {
        if (backgroundColor) {
            const isColorName = !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(
                backgroundColor
            );

            if (isColorName) {
                // 色名の場合は、DOMを使ってRGBに変換する
                const tempDiv = document.createElement("div");
                tempDiv.style.color = backgroundColor;
                document.body.appendChild(tempDiv);
                backgroundColor = window.getComputedStyle(tempDiv).color;
                document.body.removeChild(tempDiv);
            }

            const rgb = backgroundColor
                .substring(4, backgroundColor.length - 1)
                .replace(/ /g, "")
                .split(",");

            const brightness =
                (parseInt(rgb[0]) * 299 +
                    parseInt(rgb[1]) * 587 +
                    parseInt(rgb[2]) * 114) /
                1000;

            return brightness > 128 ? "black" : "white";
        } else {
            return "black";
        }
    };

    return (
        <button
            style={{
                ...getSizeStyle(),
                backgroundColor: backgroundColor,
                color: textColor ? textColor : determineTextColor(),
                border: "none",
                fontWeight: "bold",
                padding: 7,
                opacity: disabled ? 0.5 : 1, // ボタンが無効のときの透明度
                cursor: disabled ? "not-allowed" : "pointer", // ボタンが無効のときのカーソル
            }}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
