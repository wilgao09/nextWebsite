import NavBar from "./Cnavbar";
import React from "react";
import styles from "./Cheader.module.css";

export default function Header(props) {
    return (
        <div>
            {/* <h1 className={styles['title-bar']}> My Very Cool Website </h1> */}
            {/* couldnt figure out escape seq in html */}
            <NavBar
                tags={[
                    { lbl: " About ", goto: "/about" },
                    { lbl: "  Blog  ", goto: "/blog" },
                    { lbl: "Projects", goto: "/projects" },
                ]}
                home={{ lbl: "W", goto: "/" }}
            />
        </div>
    );
}
