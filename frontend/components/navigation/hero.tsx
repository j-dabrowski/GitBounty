
import { Fragment } from "react";
import React from "react";
import { Typography } from "web3uikit";
import {Button} from "web3uikit";
import { Hero} from "web3uikit";



export default function HeroComponent(){

    return(<div className=" flex justify-center items-center w-[350px] sm:w-[900px] mt-10">
    <Hero
        align="center"
        backgroundColor="#663cfe"
        
        height="400px"
        
        padding="50px"
        rounded="10px"
      >
        <React.Fragment key=".0">
          <Typography
            color="#b6e5e8"
            variant="h1"
            
          
          >
            Resolve issues from Github Repos and get paid in Matic
          </Typography>
          
          
        </React.Fragment>
      </Hero>
      </div>)
}