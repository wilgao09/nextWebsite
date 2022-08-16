import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Header from '../components/Cheader'
import Layout from '../components/Clayout'
import MContent from '../components/MContent'

export default function Home(props) {
    useEffect(function onFirstMount() {
        let dloc = document.getElementById("github-date")
        const getLastGHPush = async () => {
            let res = await fetch('https://api.github.com/repos/wilgao09/nextWebsite/commits')
            let commit = await res.json()
            commit = commit[0].commit.author.date
            commit = `The last commit to master was on ${commit.slice(0,10)}`
            dloc.innerHTML = commit
            
            return commit
        }   
        getLastGHPush()
    })
    return (
        <Layout>
            <Head>
                <title> Home </title>
            </Head>
            <Header tno={0}/>

            <MContent>
                My name is William Gao, and I am a junior currently studying 
                at Stony Brook University. My current interests are in compiler 
                design, general software engineering, and algorithmic analysis. Most
                recently, I have been working with a friend of mine in developing a 
                compiler for our Java/C inspired language. Going forward, I wish to 
                work on larger projects in industry and learn from more experienced 
                developers.
                

                <h3> FAQ </h3>
                <h4> What is this? </h4>
                <span>
                    This website is intended to serve multiple purposes. This website started out as an excuse to learn React, which very quickly 
                    became an excuse to try out Nextjs and deploying to Vercel. I didn't have much of an objective at the time, so I was thinking about 
                    making a mockup of what I would have liked for my personal website to look like. However, I ended up investing enough time into this 
                    that I've decided that this mock up will serve as my actual personal website. <br/> <br/>
                    Since I dont think there's much substance to put on a personal website, I've also made the executive decision to make content. This isn't 
                    by any means particularly cool or good content, but I will sporadically post ramblings on the "Blog" tab. Hopefully this will make the website
                    feel a little less empty. <br/> <br/>
                </span>
                <h4> Why does the website look like this? </h4>
                <span>
                    Honestly, I'm not very good with design, and I harbor strong feelings against the modern Javascript ecosystem. It feels incredibly uncomfortable 
                    importing many large javascript front end libraries just to make clicking a button have a nice effect. I agree that it's cool, but I don't think 
                    its worth the extra megabyte or two. <br/><br/>
                    The color scheme and the layout are a result of me tinkering around for an afternoon until I thought it looked "presentable". I asked for feedback 
                    and got incredibly mediocre reviews, even after adjusting to their criticism. Getting better at design is a great work in progress, and I do not 
                    expect to become a design god by finishing this project. 
                </span>
                <h4> When was this last updated? </h4>
                <span id="github-date" > Retrieving . . . </span>

            </MContent>




        </Layout>)
}