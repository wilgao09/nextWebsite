import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Cheader'
import TerminalLayout from '../components/Tlayout'
import MContent from '../components/MContent'

export default function Terminal() {
  return (
      <TerminalLayout terminalInput = "terminal-in" terminalHistory = "terminal-main">
            <Head>
                <title> Terminal Landing </title>
            </Head>
            <div id="terminal-main">
                
            </div>
            <div id="terminal-in"></div>

      </TerminalLayout>)
}