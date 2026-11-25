import Image from "next/image";

import styles from "./TourDetails.module.css";
import ReserveButton from "@/components/atoms/ReserveButton";

import {
  getLocationLabel,
  getVehicleLabel,
  getVehicleIcon,
  formatPrice,
} from "@/core/utils/helpers";

const HIGHLIGHTS = [
  { icon: "/images/user-tick.png", label: "تورلیدر از مبدا" },
  { icon: "/images/map.png", label: "برنامه سفر" },
  { icon: "/images/medal-star.png", label: "تضمین کیفیت" },
];

function TourDetails({ tourDetails }) {
  const details = [
    {
      icon: "/images/routing-2.png",
      label: "مبدا",
      value: getLocationLabel(tourDetails?.origin?.name),
    },
    {
      icon: "/images/location.png",
      label: "مقصد",
      value: getLocationLabel(tourDetails?.destination?.name),
    },
    {
      icon: getVehicleIcon(tourDetails?.fleetVehicle) || "/images/bus.png",
      label: "حمل و نقل",
      value: getVehicleLabel(tourDetails?.fleetVehicle),
    },
    {
      icon: "/images/profile-2user.png",
      label: "ظرفیت",
      value: `${tourDetails?.capacity ?? "-"} نفر`,
    },
    {
      icon: "/images/security.png",
      label: "بیمه",
      value: tourDetails?.insurance ? "دارد" : "ندارد",
      positive: Boolean(tourDetails?.insurance),
    },
    {
      icon: "/images/user-tick.png",
      label: "صندلی های موجود",
      value: `${tourDetails?.availableSeats ?? "-"} نفر`,
    },
  ];

  return (
    <article className={styles.container}>
      <div className={styles.first}>
        <div className={styles.media}>
          <Image
            src={tourDetails.image}
            alt={tourDetails.title}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            priority
          />
        </div>

        <div className={styles.left}>
          <div className={styles.heading}>
            <h2 className={styles.title}>{tourDetails.title}</h2>

            <ul className={styles.options}>
              {HIGHLIGHTS.map((item) => (
                <li key={item.label} className={styles.option}>
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.reserve}>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>قیمت هر نفر</span>
              <p className={styles.price}>
                {formatPrice(tourDetails?.price)}
                <span className={styles.currency}>تومان</span>
              </p>
            </div>

            <div className={styles.cta}>
              <ReserveButton id={tourDetails.id} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <h3 className={styles.sectionTitle}>جزئیات تور</h3>

        <dl className={styles.descriptions}>
          {details.map((item) => (
            <div key={item.label} className={styles.stat}>
              <span className={styles.statIcon}>
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  width={19}
                  height={19}
                />
              </span>
              <div className={styles.statBody}>
                <dt>{item.label}</dt>
                <dd className={item.positive ? styles.positive : undefined}>
                  {item.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default TourDetails;
