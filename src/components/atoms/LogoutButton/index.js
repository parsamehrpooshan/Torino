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
    <button
      type="button"
      className={styles.logout}
      onClick={logoutHandler}
      role="menuitem"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
        <path d="M9 12h11" />
        <path d="m17 9 3 3-3 3" />
      </svg>
      <span>خروج از حساب کاربری</span>

    </button>
  );
}

export default LogoutButton;
