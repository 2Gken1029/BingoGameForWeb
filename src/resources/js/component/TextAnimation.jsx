import React from "react";
import styles from "../../css/TextAnimation.module.css";

const TextAnimation = ({
    animationText = "左方向に文字が流れる",
    backGroundColor,
    textColor,
}) => {
    return (
        <div
            className={styles.textContainer}
            style={{ backgroundColor: backGroundColor }}
        >
            <div className={styles.animatedText} style={{ color: textColor }}>
                {animationText}
            </div>
        </div>
    );
};

export default TextAnimation;
