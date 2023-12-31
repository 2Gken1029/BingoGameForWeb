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
    // const handlePageClick = (pageNumber) => {
    //     const queryParams = {
    //         page: pageNumber,
    //         product: product,
    //         sort: sort,
    //     };
    //     router.get("product", queryParams);
    // };

    /** テーブルヘッダの作成 */
    const header = {
        name: "大会名",
        implementation_date: "開催予定日",
        prize_header: "",
        start_header: "",
    };
    const tableHeaders = Object.values(header).map((key) => (
        <th
            className={`${styles.headerFront} ${styles.customHeader}`}
            key={key}
        >
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

    /** テーブルデータを作成する */
    const rowData = tableData.map((item, index) => {
        const rowData = Object.keys(header).map((key) => {
            let value = item[key];
            if (key === "prize_header") {
                return (
                    <td
                        className={styles.rowButtonStyle}
                        key={`${index}-${key}`}
                    >
                        <Button
                            height={40}
                            width={100}
                            text="景品情報"
                            backgroundColor={"yellow"}
                            onClick={() => {
                                console.log("リスト");
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
                            height={40}
                            width={120}
                            text="ゲームスタート"
                            backgroundColor={"skyblue"}
                            onClick={() => {
                                console.log("スタート");
                            }}
                        />
                    </td>
                );
            }
            return (
                <td className={styles.rowCellStyle} key={`${index}-${key}`}>
                    {value}
                </td>
            );
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
