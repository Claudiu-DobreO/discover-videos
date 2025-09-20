import { Magic } from 'magic-sdk';


const getMagic = () => {
    if (typeof window === 'undefined') return null;    
    return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY);
};

export const magic = getMagic();

