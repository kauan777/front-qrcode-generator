import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { api } from "../services/api";

interface ProfileUserProps {
  user: {
    id: string;
    name: string;
    description: string;
    slug: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
}

function Profile({ user }: ProfileUserProps) {
  const [userGithub, setUserGithub] = useState("");

  function getUserGithub(githubUrl: string) {
    const usernameRegex = /github.com\/([^/]+)/;
    const username = githubUrl.match(usernameRegex)![1];
    return { username };
  }

  useEffect(() => {
    const { username } = getUserGithub(user.github);
    setUserGithub(username);
  }, []);

  return (
    <main className="relative h-screen">
      <header className="relative z-0 h-[30vh] w-full">
        <Image src="/background-profile.png" fill alt="Background" />
      </header>
      <section className="relative -mt-20 z-10 flex items-center flex-col w-full mx-auto max-w-[500px]">
        <Image
          className="bg-white border-[.6rem] w-[200px] h-[200px] object-cover rounded-full border-white"
          src={`https://github.com/${userGithub}.png`}
          width={170}
          height={170}
          alt={user.name}
        />
        <h1 className="font-bold text-2xl"> {user.name}</h1>
        <span className="block mt-2 text-center text-gray-400">
          {user.description}
        </span>
        <div className="mt-4 items-center text-gray-600 flex gap-3">
          <Link
            className="hover:text-black hover:translate-y-1 transition-all"
            href={user.github}
            target={"_blank"}
          >
            <BsGithub size={32} />
          </Link>
          <Link
            className="hover:text-[#0e76a8] hover:translate-y-1 transition-all"
            href={user.linkedin}
            target={"_blank"}
          >
            <BsLinkedin size={32} />
          </Link>
          <Link
            className="hover:text-[#E1306C] hover:translate-y-1 transition-all"
            href={user.instagram}
            target={"_blank"}
          >
            <AiFillInstagram size={36} />
          </Link>
        </div>
      </section>

      <footer>
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2  mx-auto bottom-4"
        >
          <Image src="/logo.svg" width={200} height={150} alt="Logo" />
        </Link>
      </footer>
    </main>
  );
}

export default Profile;
export async function getServerSideProps(ctx: any) {
  const slug = ctx.params.slug;

  try {
    const { data } = await api.get(`/users/${slug}`);

    if (!data.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: { user: data.user },
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
