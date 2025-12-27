import Link from "next/link";
import React from "react";
import Image from "next/image";

import styles from "./TourList.module.css";

function TourList({ tourData }) {
  console.log(tourData);

  if (!tourData?.length)
    return <h1 className={styles.notfound}>توری یافت نشد</h1>;

  return (
    <div className={styles.container}>
      <h4>همه تور ها</h4>
      <main className={styles.grid}>
        {tourData?.map((tour) => (
          <section key={tour?.id} className={styles.card}>
            <div>
              <Image
                src={tour.image}
                alt={tour.title}
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
              <h2>{tour?.title}</h2>
              <div className={styles.options}>
                <span>{tour?.options[0]} - </span>
                <span>{tour?.options[1]}</span>
                <span> {tour?.options[2]}</span>
              </div>
            </div>
            <div className={styles.reserve}>
              <button>
                <Link href={`/tours/${tour?.id}`}>رزرو</Link>
              </button>
              <p>
                {tour?.price} <span>تومان</span>
              </p>
            </div>
          </section>
        ))}
      </main>
      <div className={styles.banner}>
        <Image
          src="/images/Group44.png"
          alt="banner"
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}

export default TourList;
