import { Component } from "react/cjs/react.production.min";
import Link from 'next/link'
import styles from './NBButton.module.css'

class NBButton extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         lbl : props.lbl,
    //         href : props.goto,
    //         sel : props.sel,
    //         ind : props.ind,
    //         cb : props.oclick
    //     }
    // }

    render() {
        let licls = styles["nb-button"] + (this.props.sel? " " + styles['nb-sel'] : "")
        return (
            <Link href={this.props.goto}>
            <div className={licls} onClick={()=>this.props.oclick(this.props.ind)}>{this.props.lbl}</div>
            </Link>
            
        )
    }
}

export default NBButton