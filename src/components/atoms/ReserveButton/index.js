"use client";

import { useAddToBasket } from "@/core/services/mutations";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ReserveButton({ id }) {
  const { mutate, isPending } = useAddToBasket();
  const router = useRouter();

  const carthandler = () => {
    if (isPending) return;

    mutate(id, {
      onSuccess: (data) => {
        toast.success(data?.data?.message);
        router.push("/checkout");
      },
      onError: (error) => {
        toast.error("برای رزرو تور وارد شوید");
      },
    });
  };

  return (
    <button onClick={carthandler} className="bg-green-400 text-white">
      رزرو و خرید
    </button>
  );
}

export default ReserveButton;
