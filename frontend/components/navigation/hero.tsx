
import { Fragment } from "react";
import React from "react";
import { Typography } from "web3uikit";
import {Button} from "web3uikit";
import { Hero} from "web3uikit";



export default function HeroComponent(){

    return(
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
            Resolve issues from Github Repos and get paid in Matic`
          </Typography>
          <Typography
            color="#b6e5e8"
            variant="h1"
            
          >
            Looking to get started?
          </Typography>
          <Button
            customize={{
              backgroundColor: 'transparent',
              border: '1px solid white',
              color: '#FFFFFF'
            }}
            
          />
        </React.Fragment>
      </Hero>)
}