"use client";

import { useGetUserTransactions } from "@/core/services/queries";
import React from "react";

import styles from "./transactions.module.css";
import Link from "next/link";

import { convertToIranDateTime } from "@/core/utils/helpers";


function Transactions() {
  const { data, error, isPending } = useGetUserTransactions();
  console.log(data);

  if (!data?.data?.length)
    return (
      <div className="border border-green-500 bg-green-50 m-auto mt-20 w-fit rounded-md p-10">
        <p>تراکنشی وجود ندارد</p>
        <Link href={"/"}>برو صفحه اصلی</Link>
      </div>
    );

  return (
    <div className={styles.container}>
      <header>
        <h2>تاریخ و ساعت</h2>
        <h2>مبلغ(تومان)</h2>
        <h2>نوع تراکنش</h2>
        <h2>شماره سفارش</h2>
      </header>
      {data?.data?.map((transactions) => (
        <section key={transactions?.id}>
          <p>{convertToIranDateTime(transactions?.createdAt) || transactions?.createdAt}</p>
          <p>{transactions?.amount}</p>
          <p>{transactions?.type === "Purchase" ? "ثبت نام در تور گردشگری" : null}</p>
          <p>{transactions?.id}</p>
        </section>
      ))}
    </div>
  );
}

export default Transactions;
