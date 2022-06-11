import React, {Component} from "react/cjs/react.production.min";
import NBButton from './NBButton'
import styles from './Cnavbar.module.css'

/**
 * 
 * REMVOE TEH STATE FROM THIS 
 * 
 */
class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sel : props.sel,
            tags : props.tags
        }

        this.swapFocus = this.swapFocus.bind(this)
    }

    swapFocus(nFoc) {
        this.setState({"sel":nFoc})
        
    }



    render() {
        let bttns = []
        // for (let i = 0 ;i < this.state.lbls.length; i++) {
        //     bttns[i] = <NBButton 
        //         lbl={this.state.lbls[i]} 
        //         goto={this.state.gotos[i]}
        //         sel = {(i==this.state.sel)}
        //     />
        // }
        bttns = this.state.tags.map((o,ind) => {
            return <NBButton
            lbl = {o.lbl}
            goto={o.goto}
            key = {ind}
            ind = {ind}
            sel = {ind == this.state.sel}
            oclick = {this.swapFocus}
        />})
        return (
            <div className={styles["nb-navbar"]}>
                {bttns}
            </div>
        )
    }
}


export default NavBar
