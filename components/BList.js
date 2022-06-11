
import BCard from './BCard'
import Blogs from '../scripts/brepo'

export default function BList() {
    var titles = Object.keys(Blogs).sort((a,b) => b.localeCompare(a))
    console.log(titles)
    titles = titles.map(s=>
        <BCard key={s} bid={s}></BCard>
    )
    return <div>{titles}</div>
    

}