import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './swiperStyle.css';

// Import required modules from Swiper
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Swip: React.FC = () => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}  
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="new1.png" alt="Nature 1" />
          <h2>World NGO Day 2024: History, Theme, Importance, Quotes and Wishes</h2>
          <p>World NGO Day recognises the attempts of the NGOs to give humanitarian guidance, promote social justice, and commitments made in different fields</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="new6.png" alt="Nature 6" />
          <h2>Govt inks MoU with NGO to create accessible space for disabled people</h2>
          <p>The Department of Empowerment of Persons with Disabilities has inked an MoU with a Gujarat-based NGO to advance training programs on accessibility in an effort to create more inclusive spaces for those suffering</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="new5.png" alt="Nature 5" />
          <h2>Ronnie Screwvala's Swades Foundation files draft prospectus at SSE</h2>
          <p>The not-for-profit Swades Foundation is founded by Entrepreneurs and investors Ronnie and Zarina Screwvala</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="new2.png" alt="new2.png" />
          <h2>Electoral bonds case: Supreme Court to hear contempt plea on March 11</h2>
          <p>Advocate Prashant Bhushan, appearing for ADR, urged the bench headed by Chief Justice of India DY Chandrachud to hear the plea on 11 March along with SBI's application</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="new3.png" alt="Nature 3" />
          <h2>SC to hear next week plea for cross-verification of votes with VVPAT</h2>
          <p>The Supreme Court on Wednesday said it would hear next week a plea by an NGO seeking cross-verification of the votes cast in EVMs with Voter Verifiable Paper Audit Trail (VVPAT). A</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src="new4.png" alt="Nature 4" />
          <h2>Relief for NGOs, trusts: June 30 is new deadline for registration, renewal</h2>
          <p>Form 10A is an application form filed by trusts/institutions who wish to get themselves registered for income tax exemption. Form 10 AB is filed to renew their permanent registration</p>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Swip;
