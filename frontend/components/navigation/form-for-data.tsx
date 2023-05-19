import { Form } from "web3uikit";
import { useState } from "react";

export default function FormForData(){
  const [formData, setFormData] = useState({owner: "", repo: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({owner: e.target.owner.value, repo: e.target.repo.value});
  };
  


    return(
        
      
        <Form
          onSubmit={handleSubmit}
          //Data object es especial de esta libreria y de este Form, y contiene una lista de
          //de los fields que va tenr nuestro form
          data={[
            {
              name: "Owner",
              type: "text",
              inputWidth: "100%",
              value: "",
              key: "owner",
            },
            {
              name: "Repo",
              type: "text",
              inputWidth: "100%",
              value: "",
              key: "repo",
            },
            
          ]}
          title="Search your Repos"
          id="MainForm"
        />
     
    
    )
}