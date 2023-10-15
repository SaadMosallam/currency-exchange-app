import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

function Error() {
  const router = useRouter();

  return (
    <div className={styles["error-container"]}>
      <div className={styles["error-wrapper"]}>
        <p>Something went wrong, please try again later</p>
        <button
          className={styles["reload-button"]}
          onClick={() => {
            router.reload();
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );
}

export default Error;
