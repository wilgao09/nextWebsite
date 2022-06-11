import styles from './Clayout.module.css'

export default function Layout( {children} ) {
    return(
        <div className={styles["global"]}>
            {/* <style jsx global>{`
                body {
                    background-color:lightgrey;
                }
            `}</style> */}
            {children}
        </div>
    )
    
}