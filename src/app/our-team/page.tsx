"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import CrypticText from "@/components/cryptic-text";

const OurTeam = () => {
  useEffect(() => {
    // Add the no-scroll and our-team-page classes to the body when the component mounts
    document.body.classList.add("no-scroll", "our-team-page");

    // Remove the classes when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll", "our-team-page");
    };
  }, []);

  return (
    <>
      <Head>
        <style>{`
          body.our-team-page {
            padding-top: 0 !important;
          }
        `}</style>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen -mt-8">
        <Image
          src="Anonymous.svg"
          height={300}
          width={300}
          alt="Anonymous Emblem"
        />
        <CrypticText />
      </div>
    </>
  );
};

export default OurTeam;
