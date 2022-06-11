import NavBar from './Cnavbar'
import React from 'react'
import styles from './Cheader.module.css'

export default function Header(props) {
    return (
        <div>
            <h1 className={styles['title-bar']}> My Very Cool Website </h1>
            {/* couldnt figure out escape seq in html */}
            <NavBar tags={[
                {"lbl": "home", "goto": "/"},
                {"lbl": "abt", "goto": "/about"},
                {"lbl": "blog", "goto": "/blog"},

            ]} sel={props.tno}/> 
        </div>

    )
}