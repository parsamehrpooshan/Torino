"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "zaman";
import QueryString from "qs";

import { flattenObject } from "@/core/utils/helpers";
import { useGetTours } from "@/core/services/queries";
import { useRouter } from "next/navigation";
import useQuery from "@/core/hooks/query";
import Image from "next/image";

import styles from "./index.module.css";

import { LOCATION_FA } from "@/core/utils/helpers";

function SearchForm() {
  const [query, setQuery] = useState({});

  const router = useRouter();
  const { register, handleSubmit, control, reset } = useForm();
  const { data, isPending, refetch } = useGetTours(query);
  console.log("وضعیت دیتا:", { data, isPending });
  const { getQuery } = useQuery();

  // useEffect(() => {
  // refetch();
  // }, [query]);

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
    if (originId && destinationId) reset({ originId, destinationId });
  }, []);

  const submitHandler = (form) => {
    // setQuery(flattenObject(form));
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
                {LOCATION_FA[origin.name] || origin.name}
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
                {LOCATION_FA[destination.name] || destination.name}
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
