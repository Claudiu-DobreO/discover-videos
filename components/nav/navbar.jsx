import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from 'next/image';
import { magic } from '../../lib/magic-client';
import styles from "./navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { email } = await magic.user.getInfo();

          if (email) setUsername(email);
      } catch (error) {
        console.error('Something went wrong retrieving the email address: ', error);
        setUsername('');
      }
    };
    
    getUsername();
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      router.push('/login');
    } catch (error) {
      console.error('Something went wrong with the sign ou: ', error);
      router.push('/login');
    }
  };

  const handleShowDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image src='/static/netflix.svg' alt='netflix logo' width={128} height={34} />
          </div>
        </Link>

        {/* Nav items */}
        <ul className={styles.navItems}>
          <li>
            <Link href="/" className={styles.navItem}>Home</Link>
          </li>
          <li>
            <Link href="/browser/my-list" className={styles.navItem2}>My List</Link>
          </li>
        </ul>

        {/* User dropdown */}
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image src={'/static/expand-more.svg'} alt='expand dropdown' width={24} height={24} />
            </button>

            {showDropdown && (
                <div className={styles.navDropdown}>
                    <div> 
                      <a onClick={handleSignOut} className={styles.linkName}>
                      Sign out
                      </a>
                      <div className={styles.lineWrapper}></div>
                    </div>
                </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;