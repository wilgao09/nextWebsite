import BList from "../components/BList";
import Header from "../components/Cheader";
import Layout from "../components/Clayout";
import MContent from '../components/MContent'

import Head from 'next/head'


export default function Blog(props) {
    return(
        <Layout>
            <Head> <title> Blogs </title> </Head>
            <Header tno={2}/>
            <MContent>
                BLOGS (sorted in reverse by date)
                <BList></BList>
            </MContent>
            
        </Layout>
    )
}