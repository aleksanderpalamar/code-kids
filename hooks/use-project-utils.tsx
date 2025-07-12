import { useMemo } from "react";
import Image from "next/image";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";
import Code from "@/public/assests/code-icon.png";
import Stars from "@/public/assests/stars.png";
import DevPleno from "@/public/assests/dev-pleno.png";
import DevJr from "@/public/assests/dev-jr.png";
import DevSenior from "@/public/assests/dev-senior.png";

export function useProjectUtils() {
  const getLanguageEmoji = (language: string) => {
    switch (language) {
      case "javascript":
        return (
          <Image src={Javascript} alt="Javascript" width={18} height={18} />
        );
      case "python":
        return <Image src={Python} alt="Python" width={18} height={18} />;
      case "lua":
        return <Image src={Lua} alt="Lua" width={18} height={18} />;
      default:
        return <Image src={Code} alt="Code" width={18} height={18} />;
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "javascript":
        return "bg-yellow-100 text-yellow-800";
      case "python":
        return "bg-blue-100 text-blue-800";
      case "lua":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLevelBadge = (level: number) => {
    if (level >= 20)
      return {
        emoji: <Image src={DevSenior} alt="DevSenior" width={32} height={32} />,
        title: "Sênior",
        color: "bg-yellow-100 text-yellow-800",
      };
    if (level >= 10)
      return {
        emoji: <Image src={DevPleno} alt="DevPleno" width={32} height={32} />,
        title: "Pleno",
        color: "bg-blue-100 text-blue-800",
      };
    return {
      emoji: <Image src={DevJr} alt="DevJr" width={32} height={32} />,
      title: "Junior",
      color: "bg-emerald-100 text-emerald-800",
    };
  };

  return useMemo(
    () => ({
      getLanguageEmoji,
      getLanguageColor,
      formatDate,
      getLevelBadge,
    }),
    []
  );
}
