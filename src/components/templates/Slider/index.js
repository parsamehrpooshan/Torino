"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./slider.module.css";

const images = [
  "/images/r1.png",
  "/images/oip8.png",
  "/images/car3.png",
  "/images/airplane4.png",
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  // پخش خودکار اسلایدها
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
          <div className={styles.deck}>
            {images.map((src, index) => {
              const position =
                (activeIndex - index + images.length) % images.length;

              return (
                <div
                  key={src}
                  className={styles.card}
                  aria-hidden={position !== 0}
                  style={{
                    transform: `translate3d(${
                      position * -14
                    }px, 0, 0) rotateZ(${position * -3}deg)`,
                    zIndex: images.length - position,
                  }}
                >
                  <Image
                    src={src}
                    alt={`slide-${index}`}
                    width={500}
                    height={500}
                    loading="eager"
                    priority={index === 0}
                    className={styles.image}
                  />
                </div>
              );
            })}
          </div>

          {/* controls */}
          <div className={styles.controls}>
            <button type="button" aria-label="اسلاید قبلی" onClick={goPrev}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span dir="ltr">
              {(activeIndex + 1).toLocaleString("fa-IR")} /{" "}
              {images.length.toLocaleString("fa-IR")}
            </span>

            <button type="button" aria-label="اسلاید بعدی" onClick={goNext}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M11 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
