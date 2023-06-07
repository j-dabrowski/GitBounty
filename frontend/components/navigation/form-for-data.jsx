import { Form } from "web3uikit";
import { useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

import addDeveloper from "../../scripts/addDeveloper";

export default function FormForData(){
  const [formData, setFormData] = useState({loginNameGithub: ""});
  const dispatch = useNotification();

  const getAccountAddress = async () => {
    if (window.ethereum) {
      await window.ethereum.enable()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      console.log(`The address which will be the arbiter and sender is ${signer.getAddress()}`)
      return await signer.getAddress()
    }
    return null
  }

  const handleSubmit = async (data) => {
  
    const loginNameGithub = (data.data[0].inputResult);
    const developerAddress = await getAccountAddress()

    await addDeveloper(developerAddress,loginNameGithub );
    dispatch({
      type: 'success',
      message: 'You have approved this Web3 service',
      title: 'New User',
      position: 'topR',
    })
    await new Promise((resolve) => setTimeout(resolve, 6000));
    if (process.env.NODE_ENV === "production") {
    window.location.href =
      "";
    } else {
    window.location.href = "http://localhost:3000/developer";
    }



  };
  


    return(
        
      
        <Form
          onSubmit={handleSubmit}
          //Data object es especial de esta libreria y de este Form, y contiene una lista de
          //de los fields que va tenr nuestro form
          data={[
            {
              name: "Github Username",
              type: "text",
              inputWidth: "100%",
              value: "",
              key: "loginNameGithub",
            },
           
            
          ]}
          title="Write your Username in Github "
          id="MainForm"
        />
        
     
    
    )
}

