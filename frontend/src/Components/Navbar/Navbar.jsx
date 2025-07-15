import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaGithub, FaDiscord, FaYoutube, FaTwitter } from "react-icons/fa"; // FIXED: Replaced FaXTwitter

const Navbar = ({ connectWallet, account }) => {
  const [hovered, setHovered] = useState(false);

 

  return (
    <nav className={styles.navbar}>
      {/* Connect Wallet */}
      <div className={styles.cnct_wallet}>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>

      {/* Logo with Hover Links */}
      <div
        className={styles.logoContainer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src="/berserk_logo.jpeg" alt="logo" className={styles.logo} />
        {hovered && (
          <div className={styles.hoverLinks}>
            <a href="https://github.com/aaryaishaan" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noreferrer">Discord</a>
            <a href="#" target="_blank" rel="noreferrer">X</a>
            <a href="https://www.youtube.com/@zankcrave" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        )}
      </div>

      {/* Always-Visible Icons */}
      <div className={styles.icons}>
        <a href="https://github.com/aaryaishaan" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="#" target="_blank" rel="noreferrer"><FaDiscord /></a>
        <a href="#" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://www.youtube.com/@zankcrave" target="_blank" rel="noreferrer"><FaYoutube /></a>
      </div>
    </nav>
  );
};

export default Navbar;
