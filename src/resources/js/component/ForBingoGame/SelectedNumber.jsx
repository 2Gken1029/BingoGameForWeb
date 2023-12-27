import React from "react";
import styles from "../../../css/component/ForBingoGame/CircleNumber.module.css";
import { formatNumber } from "../util";

const SelectedNumber = ({ specifiedNumber }) => {
    return (
        <div className={styles.container}>
            <div className={styles.circleNumber}>
                {formatNumber(specifiedNumber)}
            </div>
        </div>
    );
};

export default SelectedNumber;
