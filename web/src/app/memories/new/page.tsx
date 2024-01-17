import { NewMemoryForm } from "@/components/NewMemoryForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory(){
    return (
        <div className="flex flex-1 flex-col p-16 gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm text-green-200 hover:text-gray-100">
              <ChevronLeft className=" h-4 w-4"/> 
              Voltar à timeline 
            </Link> 

            <NewMemoryForm />
            <Link  href="/teste/4"
          className='inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600'>
            testando
          </Link>
        </div>
    )
}