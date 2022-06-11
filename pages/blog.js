import BList from "../components/BList";
import Header from "../components/Cheader";
import Layout from "../components/Clayout";
import MContent from '../components/MContent'


export default function Blog() {
    return(
        <Layout>
            <Header tno={2}/>
            <MContent>
                BLOGS (sorted in reverse by date)
                <BList></BList>
            </MContent>
            
        </Layout>
    )
}