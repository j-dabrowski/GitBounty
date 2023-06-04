import { Fragment } from "react";
import React from "react";




export default function CodersComp(){

    return(
        
        <div className="flex bg-slate-300 rounded-3xl flex-col sm:flex-row mt-10  p-3 min-h-[50vh]">
      <div className="w-[33%] flex flex-col justify-center items-center p-5 ">
      <p className=" sm:mb-[0px] text-gray-100 text-[7vw] text-center md:text-[20px] leading-none select-none  font-extrabold ">Alejandro G.</p>
      

      </div>
      <div className="w-[33%] flex flex-col justify-center items-center p-5 bg-slate-300">
    
      <p className=" sm:mb-[0px] text-gray-100 text-[7vw] text-center md:text-[20px] leading-none select-none  font-extrabold ">Joe</p>
      

      </div>
      <div className="w-[33%]  flex flex-col justify-center items-center p-5 bg-slate-300">
      
      <p className=" sm:mb-[0px] text-gray-100 text-[7vw] text-center md:text-[20px] leading-none select-none  font-extrabold ">Eloi</p>

      </div>
      
      
  </div>
  
   )
}