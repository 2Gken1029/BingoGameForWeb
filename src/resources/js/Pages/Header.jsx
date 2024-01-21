import React, { useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import styles from "../../css/Header.module.css";
import { FaQuestion } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Todo: アイコン差し替える
 */
const Header = ({ currentPath = "現在の場所", isGame = false }) => {
    const { flash_info, flash_success, flash_error, flash_warn } =
        usePage().props;

    useEffect(() => {
        if (flash_info || flash_success || flash_error || flash_warn) {
            flash_info.message && toast.info(flash_info.message);
            flash_error.message && toast.error(flash_error.message);
            flash_success.message && toast.success(flash_success.message);
            flash_warn.message && toast.warn(flash_warn.message);
        }
    }, [flash_info, flash_success, flash_error, flash_warn]);

    const transitionToHome = () => {
        console.log("ホーム画面に遷移");
    };

    const transitionToCreateGame = () => {
        console.log("新規登録画面に遷移");
    };

    const transitionToGameList = () => {
        console.log("ゲーム一覧に遷移");
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.appIcon}>
                    <FaQuestion size={45} />
                </div>
                <div className={styles.pathContainer}>
                    <Link
                        href="/"
                        method="get"
                        style={{ textDecoration: "none" }}
                    >
                        ホーム
                    </Link>
                    {isGame && (
                        <>
                            <>＞</>
                            <Link
                                href="/games"
                                method="get"
                                style={{ textDecoration: "none" }}
                            >
                                ゲーム一覧
                            </Link>
                        </>
                    )}
                    <>＞{currentPath}</>
                </div>
                <div className={styles.iconsContainer}>
                    <div className={styles.iconLeftBar}>
                        <FaQuestion
                            size={45}
                            className={styles.icon}
                            onClick={transitionToHome}
                        />
                    </div>
                    <div className={styles.iconLeftBar}>
                        <FaQuestion
                            size={45}
                            className={styles.icon}
                            onClick={transitionToCreateGame}
                        />
                    </div>
                    <div className={styles.iconLeftBar}>
                        <FaQuestion
                            size={45}
                            className={styles.icon}
                            style={{ marginRight: 10 }}
                            onClick={transitionToGameList}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default Header;
