import { ReactNode, useMemo } from "react";
import Image from "next/image";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";
import Html from "@/public/assests/html.png";
import Code from "@/public/assests/code-icon.png";

export function useVideoUtils() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "bg-green-100 text-green-800";
      case "Intermediário":
        return "bg-yellow-100 text-yellow-800";
      case "Avançado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLanguageEmoji = (language: ReactNode | string) => {
    switch (language) {
      case "JavaScript":
        return (
          <Image src={Javascript} alt="Javascript" width={24} height={24} />
        );
      case "Python":
        return <Image src={Python} alt="Python" width={24} height={24} />;
      case "Lua":
        return <Image src={Lua} alt="Lua" width={24} height={24} />;
      case "HTML/CSS":
        return <Image src={Html} alt="Html" width={24} height={24} />;
      case "Geral":
        return <Image src={Code} alt="Code" width={18} height={18} />;
      default:
        return "💻";
    }
  };

  return useMemo(
    () => ({
      getDifficultyColor,
      getLanguageEmoji,
    }),
    []
  );
}
