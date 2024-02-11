import React, { useState } from "react";
import styles from "../../../css/component/ForBingoGame/SideBar.module.css";
import { usePage } from "@inertiajs/react";
import { Controller } from "react-hook-form";

const SideBar = ({ control, setValue }) => {
    const { prize_data: prizeData } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    const PrizeTable = () => {
        return (
            <table className={styles.tableContainer}>
                <thead>
                    <tr className={styles.headerStyle}>
                        <th>順位</th>
                        <th>景品</th>
                        <th>当選者</th>
                    </tr>
                </thead>
                <tbody>
                    {prizeData.map((item) => (
                        <tr key={item.id} className={styles.cellStyle}>
                            <td className={styles.prizeNumberStyle}>
                                {item.prize_number}位
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <Controller
                                    name={`winner[${item.id - 1}]`}
                                    control={control}
                                    defaultValue={item.winner || ""}
                                    render={({ field }) => (
                                        <input
                                            className={styles.inputStyle}
                                            {...field}
                                            type="text"
                                            onChange={(e) =>
                                                setValue(
                                                    `winner[${item.id - 1}]`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            {isOpen ? (
                <div className={`${styles.container} ${styles.opened}`}>
                    <div className={styles.content}>
                        <PrizeTable />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.buttonText} onClick={onClick}>
                            景品
                            <br />←
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`${styles.container} ${styles.closed}`}>
                    <div className={styles.closeButtonContainer}>
                        <button className={styles.buttonText} onClick={onClick}>
                            景品
                            <br />→
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SideBar;
