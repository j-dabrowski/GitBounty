import styles from "../../styles/Hero.module.css"
import { Fragment } from "react";
import React from "react";
import { Typography } from "web3uikit";
import {Button} from "web3uikit";
import { Hero} from "web3uikit";
import Image from "next/image";



export default function HeroComponent(){

    return(
      <div className={styles.main}>
      <Hero
      align="center"
      backgroundColor="#663cfe"
      
      height="400px"
      linearGradient=""
      padding="40px"
      rounded="20px"
    >
      <React.Fragment key=".0">
        <Typography
          color="#FFFFFF"
          variant="h3"
        >
          Need Help?
        </Typography>
        <Typography
          color="#FFFFFF"
          variant="h1"
        >
          Looking to get started?
        </Typography>
        <Image
      src="/logo-hackaton.png"
      width={100}
      height={100}
      alt="Picture of the author"
    />
        
        
      </React.Fragment>
    </Hero></div>)
}