import styles from './MContent.module.css'

export default function MContent(props) {
    return (
        <div className={styles["main-wrapper"]}>
            <main id={styles["main-main"]}>
                {props.children}
            </main>
            {/* <link rel="stylesheet" href="styles/content.css" /> */}
        </div>
    )
}
