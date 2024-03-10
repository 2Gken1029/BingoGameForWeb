import React from "react";
import { router, usePage } from "@inertiajs/react";
import styles from "../../../css/Table.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../Button";

const GameList = () => {
    const { game_list: gameList } = usePage().props;
    const tableData = gameList.data;
    const totalPage = gameList.last_page;
    const currentPage = gameList.current_page;

    // ページネーションのボタンがクリックされた時の処理
    const handlePageClick = (pageNumber) => {
        const queryParams = {
            page: pageNumber,
        };
        router.get("games", queryParams);
    };

    /** テーブルヘッダの作成 */
    const header = {
        status: "ステータス",
        name: "大会名",
        implementation_date: "開催予定日",
        game_header: "",
        prize_header: "",
        start_header: "",
    };
    const tableHeaders = Object.values(header).map((key) => (
        <th className={styles.customHeader} key={key}>
            {key}
        </th>
    ));

    /** ページネーションのボタンを作成する */
    const totalPages = totalPage;
    /** ページネーションのボタンを矢印アイコンを使用して増減させるように書き換える */
    const paginationButtons = [];
    if (totalPages > 1) {
        paginationButtons.push(
            <button
                className={styles.button}
                key="prev"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft size={20} />
            </button>
        );
        paginationButtons.push(
            <span className={styles.paginationFont} key="page">
                {currentPage}
            </span>
        );
        paginationButtons.push(
            <button
                className={styles.button}
                key="next"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight size={20} />
            </button>
        );
    }

    const statusFormat = (status) => {
        if (status === 0) {
            return "未実施";
        } else if (status === 1) {
            return "開催済み";
        } else if (status === 2) {
            return "中断";
        } else {
            return "不正な値";
        }
    };

    /** テーブルデータを作成する */
    const rowData = tableData.map((item, index) => {
        const rowData = Object.keys(header).map((key) => {
            let value = item[key];
            if (key === "status") {
                return (
                    <td
                        className={styles.rowStatusStyle}
                        key={`${index}-${key}`}
                    >
                        {statusFormat(value)}
                    </td>
                );
            } else if (key === "game_header") {
                return (
                    <td
                        className={styles.rowButtonStyle}
                        key={`${index}-${key}`}
                    >
                        <Button
                            size={"small"}
                            text="大会情報"
                            onClick={() => {
                                const queryParams = {
                                    id: item.id,
                                };
                                router.get("games/detail", queryParams);
                            }}
                        />
                    </td>
                );
            } else if (key === "prize_header") {
                return (
                    <td
                        className={styles.rowButtonStyle}
                        key={`${index}-${key}`}
                    >
                        <Button
                            size={"small"}
                            text="景品情報"
                            onClick={() => {
                                const queryParams = {
                                    id: item.id,
                                };
                                router.get("prize", queryParams);
                            }}
                        />
                    </td>
                );
            } else if (key === "start_header") {
                return (
                    <td
                        className={styles.rowButtonStyle}
                        key={`${index}-${key}`}
                    >
                        <Button
                            size={"small"}
                            text="スタート"
                            onClick={() => {
                                const queryParams = {
                                    id: item.id,
                                };
                                router.get("bingo/game", queryParams);
                            }}
                        />
                    </td>
                );
            } else {
                return (
                    <td className={styles.rowCellStyle} key={`${index}-${key}`}>
                        {value}
                    </td>
                );
            }
        });

        return <tr key={`rowData-${index}`}>{rowData}</tr>;
    });

    return (
        <>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead className={styles.rowHeaderStyle}>
                        <tr>{tableHeaders}</tr>
                    </thead>
                    <tbody>{rowData}</tbody>
                </table>
            </div>
            <div className={styles.paginationButtons}>{paginationButtons}</div>
        </>
    );
};

export default GameList;
