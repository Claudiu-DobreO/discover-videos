import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from '../components/loading/loading';
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const handleStart = () => setIsLoading(true);
      const handleComplete = () => setIsLoading(false);

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
      
      // Set loading to false on initial mount
      setIsLoading(false);

      return () => {
          router.events.off('routeChangeStart', handleStart);
          router.events.off('routeChangeComplete', handleComplete);
          router.events.off('routeChangeError', handleComplete);
      }
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
