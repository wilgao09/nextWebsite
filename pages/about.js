import Header from "../components/Cheader";
import Layout from "../components/Clayout";

import Head from 'next/head'
import MContent from "../components/MContent";


export default function About(props) {
    let socials = {
        "Email" : "william.gao09@gmail.com",
        "LinkedIn" : "https://www.linkedin.com/in/william-gao-4a2a2b185/",
        "Github" : "https://github.com/wilgao09",
    }
    let c = Object.keys(socials).map(
        (x) => 
            <div>
                {x}: <a href={(x=="Email")?"mailto:"+socials[x]:socials[x]}>{socials[x]}</a>
            </div>
        
    )
    return(
        <Layout>
            <Head> <title> About </title> </Head>
            <Header tno={1}/>
            <MContent>
                <h3>Contact and Social Media</h3> 
                {c}     
                <br/>
                <h3>Resume</h3>
                A pdf of my resume can be found <a href="resume.pdf"target="_blank">here</a>.
            </MContent>
        </Layout>
    )
}