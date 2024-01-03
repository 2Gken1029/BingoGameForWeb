import React from "react";
import { router, usePage } from "@inertiajs/react";
import styles from "../../../css/Table.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PrizeList = () => {
    const { prize_list: prizeList, game_id: gameId } = usePage().props;
    const tableData = prizeList.data;
    const totalPage = prizeList.last_page;
    const currentPage = prizeList.current_page;

    // ページネーションのボタンがクリックされた時の処理
    const handlePageClick = (pageNumber) => {
        const queryParams = {
            id: gameId,
            page: pageNumber,
        };
        router.get("prize", queryParams);
    };

    /** テーブルヘッダの作成 */
    const header = {
        prize_number: "景品順位",
        name: "景品名",
        winner: "景品獲得者",
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
            console.log(item[key]);
            let value = item[key];
            if (key === "winner" && value === null) {
                value = "獲得者無し";
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

export default PrizeList;
