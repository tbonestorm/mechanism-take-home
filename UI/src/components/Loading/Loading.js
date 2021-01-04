import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div>
      <svg
        id="loading-bar"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="22"
        viewBox="0 0 36 22"
      >
        <g>
          <rect
            fill="#004aac"
            className={styles.LoadingBarLeft}
            width="8"
            height="22"
          />
          <rect
            fill="#004aac"
            className={styles.LoadingBarMiddle}
            width="8"
            height="22"
            x="14"
          />
          <rect
            fill="#004aac"
            className={styles.LoadingBarRight}
            width="8"
            height="22"
            x="28"
          />
        </g>
      </svg>
    </div>
  );
};

export default Loading;
