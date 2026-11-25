"use client";

import { useGetUserTours } from "@/core/services/queries";

import styles from "./myTours.module.css";
import Link from "next/link";

import {
  convertToIranDateTime,
  formatPrice,
  getLocationLabel,
  getVehicleIcon,
  getVehicleLabel,
} from "@/core/utils/helpers";
import Image from "next/image";

function MyTours() {
  const { data } = useGetUserTours();
  

  if (!data?.data?.length)
    return (
      <div className={styles.emptyState}>
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
              {getVehicleIcon(tour?.fleetVehicle) ? (
                <Image
                  src={getVehicleIcon(tour?.fleetVehicle)}
                  alt="user-tick"
                  width={200}
                  height={200}
                />
              ) : null}
              <p className={styles.title}>
                سفر با{" "}
                {getVehicleLabel(tour?.fleetVehicle)}
              </p>
            </div>
            <p className={styles.availableSeats}>
              ظرفیت باقیمانده {tour?.availableSeats}
            </p>
          </div>
          <div>
            <p>
              {getLocationLabel(tour?.origin?.name)} به{" "}
              {getLocationLabel(tour?.destination?.name)}{" "}
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
          <hr className={styles.divider}></hr>
          <div>
            <p>
              شناسه تور : <span>{tour?.id}</span>
            </p>
            <p>مبلغ پرداخت شده : <span>{formatPrice(tour?.price)}</span> تومان </p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default MyTours;
