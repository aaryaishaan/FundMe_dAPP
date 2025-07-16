


import React from "react";
import { motion } from "framer-motion";
import styles from "./HeroTxt.module.css";

const heroTitle = "Fund The Future";

const letterVariants = {
  hidden: { opacity: 0, y: -50, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const HeroTxt = () => {
  return (
    <div className={styles.heroTextWrapper}>
      <h1 className={styles.heroTitle}>
        {heroTitle.split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className={styles.letter}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h1>
      <p className={styles.typewriter}>
        A Cause Worth Every Block.
      </p>
    </div>
  );
};

export default HeroTxt;
