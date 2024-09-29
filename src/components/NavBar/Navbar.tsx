
"use client";
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  // Adding the state
  const [isActive, setIsActive] = useState<boolean>(false);
  const { data: session , status} = useSession();
  const router = useRouter();
  // Toggle the active class
  const toggleActiveClass = (): void => {
    setIsActive(!isActive);
  };
  // Clean-up function to remove the active class
  const removeActive = (): void => {
    setIsActive(false);
  };
  // Session and authentication data
    
    const handleClick = () =>{
      setIsActive(false);
    if(session?.user?.isAdmin){
      router.push('/Layouts/adminPanel');
    }else {
      router.push('/Layouts/restricted')
    }
    }

  return (
    <div className="App">
      <header className="App-header">
        <nav className={styles.navbar}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoImages}>
              <img src="/NgoLogo.png" alt="logo" />
            </div>
            <div className={styles.LogoNameContainer}>
              <a href="#home" className={styles.logoName}>
                Aryavart Tarunodaya Sewa Samiti
              </a>
            </div>
          </div>
          <div className={styles.linkContainer}>
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
              <li onClick={removeActive}>
                <Link href="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="/Layouts/about" className={styles.navLink}>
                  About Us
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="#project" className={styles.navLink}>
                  Programs/Projects
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link href="#contact" className={styles.navLink}>
                  Contact Us
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/Layouts/adminPanel" className={styles.navLink}>
                Dashboard
                </Link>
              </li>
            </ul>
            {/* Conditional Authentication Block */}
            <div className={styles.ProfileContainer}>
            {status === "authenticated" ? (
              <div className={styles.Profile}>
                <Link href="/Layouts/profile">
                  <Image src={session?.user?.image || '/default-profile.png'} // Use session user image or a default image
                    alt="Profile"
                    width={40}
                    height={50}
                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                  />
                </Link>
              </div>
            ) : (
              <div className={styles.comicButtonLog}>
                <Link href="/Layouts/Login">
                  <button className={styles.comicButtonLogin}>Login</button>
                </Link>
              </div>
            )}
            </div>
            {/* Donate Button */}
            <div className={styles.homeButton}>
              <Link href="/Layouts/donate">
                <button className={styles.comicButtonDoner}>Donate</button>
              </Link>
            </div>
            {/* Hamburger Menu */}
            <div
              className={`${styles.hamburger} ${isActive ? styles.active : ''}`}
              onClick={toggleActiveClass}
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

