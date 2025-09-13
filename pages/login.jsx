import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Login.module.css';

const Login = () => {
    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        console.log("login button")
    }

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
                    <input className={styles.emailInput} type='text' placeholder="Email address" />
                    <p className={styles.userMsg}></p>
                    
                    <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
                        Sign In
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Login;