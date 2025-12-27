import Link from "next/link";

function PaymentPage({ searchParams }) {
  console.log(searchParams);

  if (searchParams?.status === "success")
    return (
      <div className="border border-green-500 bg-green-50 text-center m-auto my-20 mt-20 w-fit rounded-md p-10">
        <p className="my-4">پرداخت با موفقیت انجام شد</p>
        <Link href={"/profile"}>برو به پروفایل کاربری</Link>
      </div>
    );

  return (
    <div className="border border-red-500 bg-red-50 m-auto mt-20 w-fit rounded-md p-10">
      <p>پرداخت انجام نشد</p>
    </div>
  );
}

export default PaymentPage;
