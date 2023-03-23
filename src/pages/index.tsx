import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Form from "../components/Form";
import QrCodeModal from "../components/Modals/QrCodeModal";

const Home: NextPage = () => {
  return (
   <>
   <Head>
    <title>Kauan Costa - QRCode Generator</title>
   </Head>
    <main className="flex overflow-y-hidden h-screen">
      <Form />
      <section className="hidden md:block relative flex-[8] h-[100vh]">
        <Image src="/background-form.png" fill alt="Background" />
        <div className="absolute top-1/2 left-1/2  ml-10 -translate-x-1/2 -translate-y-1/2 text-white">
          <h2 className="font-bold text-xl mb-2">
            Generate a qr code now with your main social networks
          </h2>
          <span className="text-sm">
            With QRG you can generate a specific page with your social networks,
            just fill in the information and that &apos s it!
          </span>
        </div>
      </section>
    </main>
   </>
  );
};

export default Home;
