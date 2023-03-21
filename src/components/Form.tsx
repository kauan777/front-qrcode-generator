import Image from "next/image";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IoQrCode } from "react-icons/io5";
import { api } from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import QrCodeModal from "./Modals/QrCodeModal";
import { isGithubUrl, isInstagramUrl, isLinkedinUrl } from "../utils/validURL";

function Form() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [slug, setSlug] = useState("teste");

  const [slugToLink, setSlugToLink] = useState("");

  const [isSent, setIsSent] = useState<boolean>(false);

  async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSent(true);
    setSlugToLink(slug);

    if (!name || !description || !linkedin || !github || !instagram || !slug) {
      return;
    }

    const isGithub = isGithubUrl(github);
    const isLinkedin = isLinkedinUrl(linkedin);
    const isInstagram = isInstagramUrl(instagram);

    if (!isGithub || !isLinkedin || !isInstagram) {
      toast.error("Some URL's are invalid");
      return;
    }

    try {
      await api.post("/users", {
        name,
        description,
        linkedin,
        github,
        instagram,
        slug,
      });
      setIsModalVisible(true);
      setName("");
      setDescription("");
      setLinkedin("");
      setGithub("");
      setInstagram("");
      setIsSent(false);
      setSlug("");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <section className="flex-[4] px-4 md:px-16 py-6 overflow-auto hidden-scroll">
      <Image
        className="mx-auto md:hidden mb-8"
        src="/logo.svg"
        width={200}
        height={150}
        alt="Logo"
      />
      <Toaster />
      <QrCodeModal
        link={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${slugToLink}`}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <h2 className="font-bold text-center md:text-left text-gray-700 mt-4 mb-4 text-xl">
        Fill in the form to generate your page
      </h2>

      <form
        onSubmit={(e) => handleCreateUser(e)}
        className="flex flex-col gap-5"
      >
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          id="outlined-basic"
          label="Your name"
          variant="outlined"
          error={name === "" && isSent}
          helperText={name === "" && isSent ? "Name is required" : ""}
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          error={description === "" && isSent}
          helperText={
            description === "" && isSent ? "Description is required" : ""
          }
        />
        <TextField
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full"
          id="outlined-basic"
          type={"url"}
          label="Linkedin"
          variant="outlined"
          error={linkedin === "" && isSent}
          helperText={linkedin === "" && isSent ? "Linkedin is required" : ""}
        />
        <TextField
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="w-full"
          id="outlined-basic"
          type={"url"}
          label="Github"
          variant="outlined"
          error={github === "" && isSent}
          helperText={github === "" && isSent ? "Github is required" : ""}
        />
        <TextField
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full"
          id="outlined-basic"
          type={"url"}
          label="Instagram"
          variant="outlined"
          error={instagram === "" && isSent}
          helperText={instagram === "" && isSent ? "Instagram is required" : ""}
        />
        <TextField
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full"
          id="outlined-basic"
          size="small"
          label="Slug"
          variant="outlined"
          error={slug === "" && isSent}
          helperText={
            slug === "" && isSent
              ? "Slug is required"
              : "Ex: qrcodegenerator.com/[your_slug]"
          }
        />
        <button className="flex justify-center items-center gap-2 w-full py-4 bg-blue-700 text-white font-bold hover:brightness-90 transition-all">
          <IoQrCode color="#fff" size={22} />
          <span>CREATE</span>
        </button>
      </form>
    </section>
  );
}

export default Form;
