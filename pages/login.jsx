import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { magic } from "@/lib/magic-client";
import styles from '../styles/Login.module.css';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleComplete = () => setIsLoading(false);

        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
        
        return () => {
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, [router]);

    const handleOnChangeEmail = (e) => {
        setUserMsg('');
        setEmail(e.target.value);
    };

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();

        if (email) {
            if (email === 'claudiu.dobre75@gmail.com') {
                // log in a user by their email
                try {
                    setIsLoading(true);
                    const didToken = await magic.auth.loginWithEmailOTP({ email });
                    console.log({didToken});

                    if (didToken) {
                        router.push('/');
                    }
                } catch (error) {
                    console.log("Something went wrong logging in: ". error);
                    setIsLoading(false);
                }
                
            } else {
                setUserMsg('Something went wrong logging in')
                setIsLoading(false);
            }
        } else {
            setUserMsg('Enter a valid email address');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Sign In</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <Link href="/" className={styles.logoLink}>
                        <div className={styles.logoWrapper}>
                            <Image src='/static/netflix.svg' alt='netflix logo' width={128} height={34} />
                        </div>
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signInHeader}>Sign In</h1>
                    <input 
                        className={styles.emailInput} 
                        type='text' 
                        placeholder="Email address"
                        onChange={handleOnChangeEmail} 
                    />
                    <p className={styles.userMsg}>{userMsg}</p>
                    
                    <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Login;