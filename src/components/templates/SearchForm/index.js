"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import QueryString from "qs";

import { flattenObject, getLocationLabel } from "@/core/utils/helpers";
import { useGetTours } from "@/core/services/queries";
import { useRouter } from "next/navigation";
import useQuery from "@/core/hooks/query";
import Image from "next/image";

import styles from "./index.module.css";

// zaman's picker reads browser date/DOM state during render. Avoid rendering
// it on the server so the initial HTML is identical during hydration.
const DatePicker = dynamic(
  () => import("zaman").then((module) => module.DatePicker),
  { ssr: false }
);

function SearchForm() {
  const query = {};

  const router = useRouter();
  const { register, handleSubmit, control, reset } = useForm();
  const { data } = useGetTours(query);
  const { getQuery } = useQuery();

  const tours = data?.data || [];

  // origin های یکتا
  const origins = Array.from(
    new Map(
      tours.map((tour) => [
        tour.origin.id,
        { id: tour.origin.id, name: tour.origin.name },
      ])
    ).values()
  );

  // destination های یکتا
  const destinations = Array.from(
    new Map(
      tours.map((tour) => [
        tour.destination.id,
        { id: tour.destination.id, name: tour.destination.name },
      ])
    ).values()
  );

  useEffect(() => {
    const originId = getQuery("originId");
    const destinationId = getQuery("destinationId");

    if (originId && destinationId) {
      reset({ originId, destinationId });
    }
  }, [getQuery, reset]);

  const submitHandler = (form) => {
    const query = QueryString.stringify(flattenObject(form));
    router.push(`/?${query}`);
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src="/images/Untitled_design__1_.png"
        alt="picture"
        width={1000}
        height={1000}
      />
      <div>
        <p>
          <span>تورینو </span>
          برگزار کننده بهترین تور های داخلی و خارجی
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <div>
          <Image
            src="/images/location.png"
            alt="torino"
            width={200}
            height={200}
          />
          <select {...register("originId")}>
            <option value="">مبدا</option>
            {origins.map((origin) => (
              <option key={origin.id} value={origin.id}>
                {getLocationLabel(origin.name)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Image
            src="/images/location.png"
            alt="torino"
            width={200}
            height={200}
          />
          <select {...register("destinationId")}>
            <option value="">مقصد</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {getLocationLabel(destination.name)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Image
            src="/images/calendar.png"
            alt="torino"
            width={200}
            height={200}
          />
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange } }) => (
              <div className={styles.date}>
                <DatePicker
                  inputAttributes={{ placeholder: "تاریخ" }}
                  onChange={(e) =>
                    onChange({ startDate: e.from, endDate: e.to })
                  }
                  range
                />
              </div>
            )}
          />
        </div>

        <button type="submit" className={styles.button}>
          جستجو
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
