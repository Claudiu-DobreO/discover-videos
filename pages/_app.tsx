import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";
import Loading from '../components/loading/loading';
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const protect = async () => {
      try {
        if (!magic) return; // SSR

        const isLoggedIn = await magic.user.isLoggedIn();

        if (isLoggedIn) {
          router.push('/');
        } else { 
          router.push('/login');
        }

      } catch (error) {
        console.error('Somethign went wrong logging in: ', error);
        router.push('/login');
      }
    }

    protect();
  }, []);

  useEffect(() => {
      const handleComplete = () => setIsLoading(false);

      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
      
      return () => {
          router.events.off('routeChangeComplete', handleComplete);
          router.events.off('routeChangeError', handleComplete);
      }
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
