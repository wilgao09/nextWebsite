import { Component } from "react/cjs/react.production.min";
import Link from 'next/link'
import styles from './NBButton.module.css'

class NBButton extends Component {
    // constructor(props) {
    //     super(props)
        // this.state = {
        //     lbl : props.lbl,
        //     href : props.goto,
        //     sel : props.sel,
        //     ind : props.ind,
        //     cb : props.oclick
        // }
    // }

    render() {
        if (this.props.terminal) {
            return (<div>{this.props.lbl}</div>)
        }
        let licls = styles["nb-button"] + (this.props.sel? " " + styles['nb-sel'] : "") + (this.props.ind? "":" "+styles['nb-home'])
        return (
            <Link href={this.props.goto}>
            <div className={licls} onClick={()=>this.props.oclick(this.props.ind)}>{this.props.lbl}</div>
            </Link>
            
        )
    }
}

export default NBButton