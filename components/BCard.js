
import Link from 'next/link'
import styles from './BCard.module.css'

function bidToStringArr(bid) {
    let y = bid.substring(0,4)
    let m = bid.substring(4,6)
    let d = bid.substring(6,8)
    let t = bid.substring(8)
    return [`${y}.${m}.${d}`, t]
}

export default function BPreview(props) {
    let sarr = bidToStringArr(props.bid)
    return (<Link href={"/blog/"+props.bid}>
        <div className={styles['card']}>
            <div className={styles['card-title']}>
                {sarr[1]} 
            </div>
            <div className={styles['card-date']}>
                {sarr[0]} 
            </div>
             
        </div>
    </Link>)
}