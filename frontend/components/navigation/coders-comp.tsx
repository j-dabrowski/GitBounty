import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function CodersComp() {
  return (
    <div className="flex-col justify-items-center text-white bg-gradient-to-bl from-gradient-1-start to-gradient-4-end h-full w-full rounded-md pt-4">
      <div className="flex justify-center">
        <p className="text-3xl">Collaborators</p>
      </div>
      <div className="flex justify-around mt-6">
        <Link
          className="flex justify-between items-center w-24"
          href="https://github.com/agmaso"
          target="_blank"
        >
          Alejandro <FaGithub />
        </Link>
        <Link
          className="flex justify-between items-center w-12"
          href="https://github.com/j-dabrowski"
          target="_blank"
        >
          Joe <FaGithub />
        </Link>
        <Link
          className="flex justify-between items-center w-12"
          href="https://github.com/Chusynuk"
          target="_blank"
        >
          Eloi <FaGithub />
        </Link>
      </div>
    </div>
  );
}
