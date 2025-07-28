
"use client"
import { useMemo } from "react";
import { EditorDescriptionProps } from "./EditorDescription.types";
import "react-quill-new/dist/quill.snow.css"
import dynamic from "next/dynamic";

export function EditorDescription(props:EditorDescriptionProps){

      const {onChange, value} = props

      const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), [])

      return (
            <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={(content: string) => onChange(content)}
            />
      )
}