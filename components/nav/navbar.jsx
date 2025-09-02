import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = ({ username }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>Netflix</div>
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
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              {/* Expand more icon could go here */}
            </button>

            <div className={styles.navDropdown}>
              <div>
                <Link href="/login" className={styles.linkName}>
                  Sign out
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;