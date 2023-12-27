import React from "react";
import styles from "../../../css/component/ForBingoGame/NumberBox.module.css";
import { formatNumber } from "../util";

const NumberBox = ({ number, selected }) => {
    return (
        <div className={selected ? styles.selectedNumber : styles.container}>
            {formatNumber(number)}
        </div>
    );
};

export default NumberBox;
