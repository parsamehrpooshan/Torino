"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";

import Image from "next/image";
import styles from "./slider.module.css";

const images = [
  "/images/r1.png",
  "/images/oip8.png",
  "/images/car3.png",
  "/images/airplane4.png",
];

export default function Slider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.right}>
          <div>
            <Image
              src="/images/Polygon1.png"
              alt="#"
              width={800}
              height={800}
            />
            <p>
              چرا <span>تورینو</span> ؟
            </p>
          </div>
          <p>تور طبیعت گردی و تاریخی </p>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
        <div className={styles.wrapper}>
          <Swiper
            modules={[Navigation,Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            slidesPerView={1}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            className={styles.swiper}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={`slide-${index}`}
                  width={500}
                  height={300}
                  className={styles.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* controls */}
          <div className={styles.controls}>
            <button onClick={() => swiperRef.current.slidePrev()}>▶</button>

            <span>
              {images.length} / {activeIndex + 1}
            </span>

            <button onClick={() => swiperRef.current.slideNext()}>◀</button>
          </div>
        </div>
      </div>
      <div className={styles.descriptions}>
        <div>
          <Image src="/images/Group16.png" alt="#" width={800} height={800} />
          <div className={styles.text}>
            <h3>بصرفه ترین قیمت</h3>
            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>
        <div>
          <Image src="/images/Group17.png" alt="#" width={800} height={800} />
          <div className={styles.text}>
            <h3>پشتیبانی</h3>
            <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>
        <div>
          <Image src="/images/Group18.png" alt="#" width={800} height={800} />
          <div className={styles.text}>
            <h3>رضایت کاربران</h3>
            <p>رضایت بیش از 10هزار کاربر از تور های ما. </p>
          </div>
        </div>
      </div>
    </div>
  );
}
