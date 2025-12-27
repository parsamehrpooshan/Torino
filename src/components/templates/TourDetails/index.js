import Image from "next/image";
import React from "react";

import styles from "./TourDetails.module.css";
import Link from "next/link";
import ReserveButton from "@/components/atoms/ReserveButton";

import { LOCATION_FA } from "@/core/utils/helpers";


function TourDetails({ tourDetails }) {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <Image
          src={tourDetails.image}
          alt={tourDetails.title}
          width={300}
          height={200}
        />
        <div className={styles.left}>
          <h2>{tourDetails.title}</h2>
          <div className={styles.options}>
            <div>
              <Image
                src="/images/user-tick.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <p>تورلیدر از مبدا</p>
            </div>
            <div>
              <Image
                src="/images/map.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <p>برنامه سفر</p>
            </div>
            <div>
              <Image
                src="/images/medal-star.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <p>تضمین کیفیت</p>
            </div>
          </div>
          <div className={styles.reserve}>
            <p>
              {tourDetails?.price} <span>تومان</span>
            </p>
            <ReserveButton id={tourDetails.id} />
          </div>
        </div>
      </div>
      <div className={styles.descriptions}>
        <div>
          <div>
            <Image
              src="/images/routing-2.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <h3>مبدا</h3>
          </div>
          <p>{LOCATION_FA[tourDetails?.origin?.name] || tourDetails?.origin?.name}</p>
        </div>
        <div>
          <div>
            <Image
              src="/images/calendar.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <h3>مقصد</h3>
          </div>
          <p>{LOCATION_FA[tourDetails?.destination?.name] || tourDetails?.destination?.name}</p>
        </div>
        <div>
          <div>
            <Image
              src="/images/bus.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <h3>حمل و نقل</h3>
          </div>
          <p>
            {tourDetails?.fleetVehicle === "airplane"
              ? "هواپیما"
              : tourDetails?.fleetVehicle === "ship"
              ? "کشتی"
              : tourDetails?.fleetVehicle === "train"
              ? "قطار"
              : tourDetails?.fleetVehicle === "bus"
              ? "اتوبوس"
              : "خودرو آفرود"}
          </p>
        </div>
        <div>
          <div>
            <Image
              src="/images/profile-2user.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <h3>ظرفیت</h3>
          </div>
          <p>{tourDetails?.capacity} نفر</p>
        </div>
        <div>
          <div>
            <Image
              src="/images/security.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <h3>بیمه</h3>
          </div>
          <p>{tourDetails?.insurance ? "دارد" : " ندارد"}</p>
        </div>
        <div>
          <div>
            <Image
              src="/images/profile-2user.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <h3>صندلی های موجود</h3>
          </div>
          <p>{tourDetails?.availableSeats} نفر</p>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
