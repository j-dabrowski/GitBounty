import { useMoralis } from "react-moralis";
import Image from "next/image";
import Link from "next/link";

import HeroComponent from "../components/navigation/hero-component";
import ExplanationComp from "../components/navigation/explanation-component";
import FunctionsComp from "../components/navigation/functions-comp";
import CodersComp from "../components/navigation/coders-comp";

export default function Home() {
  //Inicializamos useNitification de la libreria web3uikit

  const { isWeb3Enabled } = useMoralis();
  return (
    <div className="min-h-screen">
      <main className="flex-col justify-center">
        <div className="flex justify-center mb-[70px]">
          {isWeb3Enabled ? (
            <div className="mt-10">
              <div className="flex justify-center items-center mb-20">
                <p className="line text-lila font-bold">
                  You need to choose now...
                </p>
              </div>
              <div className="flex justify-center items-center ">
                <Image src="/pngegg (3).png" alt="" width={300} height={300} />
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center mt-2">
                <div className="flex justify-center items-center p-0 sm:p-10">
                  <Link
                    href="/repo-owner"
                    className="box z-10 rounded-full overflow-hidden relative w-[300px] h-[300px] bg-black"
                  ></Link>
                </div>
                <div className="flex">
                  <Link
                    href="/developer"
                    className=" w-[300px] h-[300px]  box2 rounded-full overflow-hidden relative bg-black"
                  ></Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="w-[100%]">
                <div className="w-[360px] sm:w-[1000px]">
                  <HeroComponent></HeroComponent>
                </div>
              </div>

              <div className="w-[100%]">
                <div className="w-[360px] sm:w-[1000px]">
                  <ExplanationComp></ExplanationComp>
                </div>
              </div>

              <div className="w-[100%]">
                <div className="w-[360px] sm:w-[1000px]">
                  <FunctionsComp></FunctionsComp>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[100%] h-36">
          <div className="sm:w-[100%] h-full">
            <CodersComp></CodersComp>
          </div>
        </div>
      </main>
    </div>
  );
}
