"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import Trophy from "@/public/assests/trophy.png";

interface LevelUpNotificationProps {
  isVisible: boolean;
  message: string;
  newLevel: number;
  levelTitle: string;
  onCloseAction: () => void;
}

export function LevelUpNotification({
  isVisible,
  message,
  newLevel,
  levelTitle,
  onCloseAction,
}: LevelUpNotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onCloseAction, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <Card
        className={`max-w-md w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white border-0 shadow-2xl transform transition-all duration-300 ${
          show ? "scale-100 rotate-0" : "scale-95 rotate-3"
        }`}
      >
        <CardContent className="p-6 text-center relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Image src={Trophy} alt="Trophy" width={32} height={32} />
            </div>

            <h2 className="text-2xl font-bold mb-2">Level Up!</h2>
            <p className="text-white/90 text-lg mb-4">{message}</p>

            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              Nível {newLevel} - {levelTitle}
            </Badge>
          </div>

          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < 3 ? "bg-white" : "bg-white/40"
                } animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          <Button
            onClick={handleClose}
            className="bg-white text-yellow-600 hover:bg-white/90 font-semibold"
          >
            Continuar Aprendendo! 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
