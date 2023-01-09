import React, { Component } from "react/cjs/react.production.min";

import styles from "./Cnavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function discoverClass(criteria, classlist, newclass) {
    let tor = "";
    for (let i of classlist) {
        tor += styles[`${i}`] + " ";
    }
    if (criteria) {
        return tor + " " + styles[`${newclass}`];
    }
    return tor;
}

function NavBar({ home, tags }) {
    const router = useRouter();

    let location = router.pathname;

    return (
        <div className={styles["nb-navbar"]}>
            <div className={styles["left"]}>
                <Link href={home.goto}>
                    <div
                        className={
                            styles[home.goto === location ? "selected" : ""] +
                            " " +
                            styles["nb-button"]
                        }
                    >
                        {home.lbl}
                    </div>
                </Link>
            </div>
            <div className={styles["right"]}>
                {tags.map((x, i) => (
                    <Link href={x.goto} key={x.goto + " " + i}>
                        <div
                            className={
                                styles[x.goto === location ? "selected" : ""] +
                                " " +
                                styles["nb-button"]
                            }
                        >
                            <span className={styles["underlined"]}>
                                {x.lbl}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NavBar;
