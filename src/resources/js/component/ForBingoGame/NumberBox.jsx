import React from "react";
import styles from "../../../css/component/NumberBox.module.css";

const NumberBox = ({ number, selected }) => {
    const formatNumber = () => {
        if (number < 10) {
            return "0" + String(number);
        } else {
            return String(number);
        }
    };

    return (
        <div className={selected ? styles.selectedNumber : styles.container}>
            {formatNumber()}
        </div>
    );
};

export default NumberBox;
