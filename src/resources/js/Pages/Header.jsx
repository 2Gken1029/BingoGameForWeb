import React, { useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import styles from "../../css/Header.module.css";
import { router } from "@inertiajs/react";
import { GoHome } from "react-icons/go";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineListAlt } from "react-icons/md";
import logo from "../../image/bingoImage.png";

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
        router.get("/");
    };

    const transitionToCreateGame = () => {
        router.get("/games/setting");
    };

    const transitionToGameList = () => {
        router.get("/games");
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.appIcon}>
                    <img src={logo} className={styles.logo} alt="logo" />
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
                        <GoHome
                            size={45}
                            className={styles.icon}
                            onClick={transitionToHome}
                        />
                    </div>
                    <div className={styles.iconLeftBar}>
                        <MdOutlinePostAdd
                            size={45}
                            className={styles.icon}
                            onClick={transitionToCreateGame}
                        />
                    </div>
                    <div className={styles.iconLeftBar}>
                        <MdOutlineListAlt
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
