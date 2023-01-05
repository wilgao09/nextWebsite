import { useEffect } from "react";
import styles from "./Clayout.module.css";
import config from "../config.json";
import Head from "next";

export default function Layout(props) {
  useEffect(() => {
    let req = new XMLHttpRequest();
    req.open("POST", config.api);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.withCredentials = true;
    req.send(
      JSON.stringify({
        location: props.location,
      })
    );
  });
  return (
    <div className={styles["global"]}>
      {/* <style jsx global>{`
                body {
                    background-color:lightgrey;
                }
            `}</style> */}
      {props.children}
    </div>
  );
}
