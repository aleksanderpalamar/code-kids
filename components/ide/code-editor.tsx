"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import dynamic from "next/dynamic";
import { MutableRefObject } from "react";

import Code from "@/public/assests/code.png";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface CodeEditorProps {
  language: string;
  code: string;
  isMobile: boolean;
  editorRef: MutableRefObject<any>;
  onCodeChange: (value: string) => void;
}

export function CodeEditor({
  language,
  code,
  isMobile,
  editorRef,
  onCodeChange,
}: CodeEditorProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center text-sm md:text-base">
          <Image
            src={Code}
            alt="IDE online editor"
            width={36}
            height={36}
            className="mr-2"
          />
          Editor de Código
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 sm:h-80 md:h-96 border-t border-purple-200">
          <MonacoEditor
            height="100%"
            language={language === "lua" ? "lua" : language}
            value={code}
            onChange={(value) => onCodeChange(value || "")}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: isMobile ? 11 : 12,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: true,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
              wordWrap: "on",
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
