'use client'

import { ChangeEvent, useState } from "react";

export function MediaPicker(){

    const [preview, setPreview] = useState<string | null>(null)

    function onFileChanged(event: ChangeEvent<HTMLInputElement>){
        const { files } = event.target
        
        if(!files){
            return
        }

        const previewURL = URL.createObjectURL(files[0])

        setPreview(previewURL)
    }

    return (
        <>
            <input onChange={onFileChanged} name="coverUrl" accept="image/*" type="file" id="media" className="invisible h-0 w-0"/>

            {preview && (
                <img src={preview} alt="" className="aspect_video w-full rounded-lg object-cover"/>
            )}
        </>
    )
}