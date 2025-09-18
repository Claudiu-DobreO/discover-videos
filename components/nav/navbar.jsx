import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { magic } from '../../lib/magic-client';
import styles from "./navbar.module.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { email } = await magic.user.getInfo();

        setUsername(email);
      } catch (error) {
        console.error('Something went wrong retrieving the email address: ', error);
        setUsername('');
      }
    };
    
    getUsername();
  }, []);

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
                        <Link href="/login" className={styles.linkName}>
                        Sign out
                        </Link>
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