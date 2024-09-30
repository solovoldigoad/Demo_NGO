'use client'
import React from "react";
import styles from "./DashBord.module.css"  // Import your CSS module
import { InfiniteMovingCardsDemo } from "@/components/MovingCard/MovingCards";
import CardLayout from "@/components/HoverCard/CardLayout";
import Swip from "@/components/SwiperSlider/Desktop/swiper";
import MoneyDonationForm from "@/components/MoneyConatiner/MoneySection";
import Link from 'next/link';
import { signOut , useSession } from "next-auth/react";

const DashBord: React.FC = () => {
  const {status} = useSession();
  return (
    <>
    <div className={styles.container}>
      {/* Background Rectangle */}
      <div className={styles.contint}>
        <div className={styles.writtenContint}>
          <p className={styles.mainHeading}>Changing Lives</p>
          <p className={styles.mainHeading}>Transfroming </p>
          <p className={styles.mainHeading}>Communities</p>
          <p className={styles.mainSubHeading}> Too often we underestimate the power of a touch, a smile, a kind word, a listening ear, an honest compliment, or the smallest act of caring, all of which have the potential to turn a life around. </p>
          <div className={styles.buttonContainer}>
            {status === 'authenticated'? (
              <Link href="/Layouts/Login"> <button
              onClick={() => signOut({callbackUrl: '/Layouts/Login'})}
              className={styles.comicButtonLog}>Log Out</button></Link>
            ):( <Link href="/Layouts/Login"> <button  className={styles.comicButtonLog}>Log In</button></Link>)
              }
          <Link href="/Layouts/donate"><button  
          className={styles.comicButtonDonate}>Donate</button></Link>
          </div>
        </div>
        <div className={styles.imageContint}>
          <img src="IndianMap.png" alt="dashbord Photo" />
        </div>
      </div>
      <div className={styles.backgroundRectangle}></div>
      {/* Main content */}
      <div className={styles.backgourndBox}>
      </div>
    </div>
    <div className={styles.MoneyConatiner}>
      <MoneyDonationForm/>
    </div>
    <div className={styles.middleContainer}>
    <InfiniteMovingCardsDemo/>
    </div>
    {/* <div className={styles.middleBottomContainer}>
      
    </div> */}
        <div className="min-h-screen bg-gray-100 ">
      <CardLayout />
    </div>
    <div className={styles.CountingSction}>
      <div className={styles.CountInfo}>
        <h2 className={styles.CountNumber}>1</h2>
        <p className={styles.CountLable}>LogIn User</p>
      </div>
      <div className={styles.CountInfo}>
        <h2 className={styles.CountNumber}>1</h2>
        <p className={styles.CountLable}>Team Member</p>
      </div>
      <div className={styles.CountInfo}>
        <h2 className={styles.CountNumber}>1</h2>
        <p className={styles.CountLable}>Project</p>
      </div>
      <div className={styles.CountInfo}>
        <h2 className={styles.CountNumber}></h2>
        <p className={styles.CountLable}></p>
      </div>
    </div>
    <div className={styles.SwiperDiv}>
    <Swip/>
    </div>
    </>
  );
};

export default DashBord;
