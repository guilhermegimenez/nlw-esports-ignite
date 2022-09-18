import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
                <div>
                    <strong className='text-2xl text-white font-black block'>Não encontrou o seu deu?</strong>
                    <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className='py-3 px-4 bg-violet-500 rounded hover:bg-violet-600 flex items-center gap-3 text-white'>
                    <MagnifyingGlassPlus size={24} /> Publicar Anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}