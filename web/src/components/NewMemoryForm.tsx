'use client'

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";

export function NewMemoryForm() {

    const router = useRouter()

    async function handleCreateMemory(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const fileToUpload = formData.get('coverUrl')

        let coverUrl = ''

        if(fileToUpload){
            const uploadFormData = new FormData()
            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('/upload', uploadFormData)

            console.log(uploadResponse.data)

            coverUrl = uploadResponse.data.fileUrl
        }

        const token = Cookie.get('token')

        await api.post('/memories', {
            coverUrl,
            content: formData.get('content'),
            isPublic: formData.get('isPublic'),
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        router.push('/')
    }
    
    return (
        <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-4">
                    
                    <label htmlFor="media" className="flex cursor-pointer gap-1.5 text-sm text-gray-200 hover:text-gray-100">
                    <Camera className="w-4 h-4"/>
                        Anexar mídia
                    </label>

                    <label htmlFor="isPublic" className="flex cursor-pointer gap-1.5 text-sm text-gray-200 hover:text-gray-100">
                    
                        <input type="checkbox" name="isPublic" id="isPublic" value="true" className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"/>
                        Tornar memória pública
                    </label>
                    

                    
                </div>

                <MediaPicker />
                
                <textarea name="content" 
                    spellCheck={false} 
                    className="w-full flex-1 resize-none rounded border-0 bg-transparent text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                    placeholder="Fique livre para aicionar fotos, videos e relatos sobre essa experiência que você quer lembrar para sempre"
                    />

                    <button type="submit">
                        Salvar
                    </button>
            </form>
    )
}