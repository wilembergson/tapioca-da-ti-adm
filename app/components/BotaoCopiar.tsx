import React, { useRef, useEffect } from 'react';
import Clipboard from 'clipboard';
import { FaRegCopy } from "react-icons/fa";
import { erroMessage, sucessMessage } from '../utils/Toasts';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type CopyButtonProps = {
  textToCopy: string;
}

export default function BotaoCopiar({ textToCopy }:CopyButtonProps){
  const buttonRef = useRef<HTMLButtonElement>(null);
  let clipboard: Clipboard | null = null;

  useEffect(() => {
    if (buttonRef.current) {
      clipboard = new Clipboard(buttonRef.current, {
        text: () => textToCopy
      });

      clipboard.on('success', () => {
        sucessMessage('Pedido copiado.')
      });

      clipboard.on('error', () => {
        erroMessage('Erro ao copiar o texto!');
      });
    }

    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, [textToCopy]);

  return (
    <button className='flex items-center bg-blue-500 text-white font-white rounded-md p-2 mr-2'
      ref={buttonRef}>
        <FaRegCopy size={20}/>
        <h1 className='flex ml-1'>
          Copiar
        </h1>
    </button>
  );
}