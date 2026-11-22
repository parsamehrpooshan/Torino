"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useGetUserData } from "@/core/services/queries";
import { removeCookie } from "@/core/utils/cookie";

import styles from "./index.module.css";

function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useGetUserData();
  const { data: userData } = data || {};

  if (!userData) return null;

  const logoutHandler = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");

    queryClient.removeQueries({ queryKey: ["user-data"] });

    router.replace("/");
    router.refresh();
  };

  return (
    <button type="button" className={styles.logout} onClick={logoutHandler}>
      خروج از حساب کاربری
    </button>
  );
}

export default LogoutButton;
