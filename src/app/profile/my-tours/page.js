"use client";

import { useGetUserTours, useGetUserTransactions } from "@/core/services/queries";
import React from "react";

import styles from "./myTours.module.css";
import Link from "next/link";

import { LOCATION_FA } from "@/core/utils/helpers";
import { convertToIranDateTime } from "@/core/utils/helpers";
import Image from "next/image";

function MyTours() {
  const { data, error } = useGetUserTours();
  

  if (!data?.data?.length)
    return (
      <div className="border border-green-500 bg-green-50 m-auto mt-20 w-fit rounded-md p-10">
        <p>توری وجود ندارد</p>
        <Link href={"/"}>برو صفحه اصلی</Link>
      </div>
    );

  return (
    <div className={styles.container}>
      {data?.data?.map((tour) => (
        <section key={tour?.id}>
          <div>
            <div>
              <Image
                src="/images/sun-fog.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <p className={styles.title}>{tour?.title}</p>
            </div>
            <div>
              {tour?.fleetVehicle === "airplane" ? (
                <Image
                  src="/images/airplane.png"
                  alt="user-tick"
                  width={200}
                  height={200}
                />
              ) : tour?.fleetVehicle === "ship" ? (
                <Image
                  src="/images/ship.png"
                  alt="user-tick"
                  width={200}
                  height={200}
                />
              ) : tour?.fleetVehicle === "bus" ? (
                <Image
                  src="/images/bus.png"
                  alt="user-tick"
                  width={200}
                  height={200}
                />
              ) : null}
              <p className={styles.title}>
                سفر با{" "}
                {tour?.fleetVehicle === "airplane"
                  ? "هواپیما"
                  : tour?.fleetVehicle === "ship"
                  ? "کشتی"
                  : tour?.fleetVehicle === "train"
                  ? "قطار"
                  : tour?.fleetVehicle === "bus"
                  ? "اتوبوس"
                  : "خودرو آفرود"}
              </p>
            </div>
            <p className={styles.availableSeats}>
              ظرفیت باقیمانده {tour?.availableSeats}
            </p>
          </div>
          <div>
            <p>
              {LOCATION_FA[tour?.origin?.name] || tour?.origin?.name} به{" "}
              {LOCATION_FA[tour?.destination?.name] || tour?.destination?.name}{" "}
              :
              <span>
                {convertToIranDateTime(tour?.startDate) || tour?.startdate}
              </span>
            </p>
            <p>
              تاریخ برگشت :
              <span>
                {convertToIranDateTime(tour?.endDate) || tour?.endDate}
              </span>
            </p>
          </div>
          <hr className="mb-4"></hr>
          <div>
            <p>
              شناسه تور : <span>{tour?.id}</span>
            </p>
            <p>مبلغ پرداخت شده : <span>{tour?.price}</span> تومان </p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default MyTours;
