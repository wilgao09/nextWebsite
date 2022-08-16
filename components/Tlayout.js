
import { useEffect } from "react";
import gstate from "../components/globalState"
import parser from "./parseCommand"



export default function Tlayout(props) {
    useEffect(function onFirstMount() {
        function changeLocation() {
            let url = window.location.href;
            let i = url.length-1; 
            for (; url.charAt(i) != "/"; i--);
            url = url.substring(0,i);
            window.location.href = (url + gstate.location)
        }
        let thistory = document.getElementById(props.terminalHistory)
        let tinput = document.getElementById(props.terminalInput)
        function terminalInput(e) {
            if (e.code == "Enter") {
                let entry = document.createElement("div")
                entry.innerHTML = gstate.location + " > " + gstate.stringBuffer
                thistory.appendChild(
                    entry
                )
                let result = parser.parseCommand(gstate.stringBuffer)
                gstate.stringBuffer = "";
                let response = document.createElement("div")
                response.setAttribute("style","white-space: pre")
                if (result[0] == parser.Command.unknown) {
                    response.innerHTML = `Unknown command \"${result[1]}\"`
                    
                }
                else if (result[0] == parser.Command.false) {
                    response.innerHTML = parser.usage[result[1]]
                } else {
                    if (result[0] == parser.Command.LS) {
                        response.innerHTML = ".\t\t..\t\t/ -> /\t\tabout -> /about\t\tblog -> /blog\t\tcontent\t\tprojects -> /projects"
                    } else if (result[0] == parser.Command.CD) {

                    } else if (result[0] == parser.Command.CAT) {
                        
                    }
                }
                thistory.appendChild(response)
                

            } else if (e.code == "Backspace") {
                gstate.stringBuffer = gstate.stringBuffer.slice(0,-1)
            }else {
                if (!((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode == 32) || (e.keyCode >= 48 && e.keyCode <= 57 )) ) return;
                gstate.stringBuffer += String.fromCharCode(e.keyCode)
            }
            tinput.innerHTML = gstate.location + " > " + gstate.stringBuffer

        }
        document.getElementById("unique-id-99345").addEventListener("click",
        changeLocation, false)
        window.addEventListener("keydown", terminalInput)
        
    })
    return(
        <div>
            <a id="unique-id-99345"> X </a>
            
            {props.children}
        </div>
    )
}