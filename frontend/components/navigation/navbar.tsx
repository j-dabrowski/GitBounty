

import { ConnectButton } from "@rainbow-me/rainbowkit"


import styles from "../../styles/Navbar.module.css"

const Navbar = () => {
 
  return (
    <nav className={styles.navbar}>
      <a href="/" >
        <img className={styles.alchemy_logo} src="/logo-hackaton.png"></img>
      </a>
      
      <ConnectButton></ConnectButton>
      
      
    </nav>
  )
}

export default Navbar
