import React from "react";
import styles from "../../css/Label.module.css";

const Label = ({ name, children }) => {
    return (
        <>
            <div className={styles.labelText}>{name}</div>
            <div className={styles.childrenStyle}>{children}</div>
        </>
    );
};

export default Label;
