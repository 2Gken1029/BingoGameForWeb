import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import styles from "../../css/Header.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
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

    return (
        <div className={styles.container}>
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
        </div>
    );
};

export default Header;
