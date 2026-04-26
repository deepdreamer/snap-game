import React from 'react';
import styles from './MainContainer.module.css';

export default function MainContainer({ children }: { children: React.ReactNode }): React.ReactElement {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    );
}