"use client";

import { useGetUserData } from "@/core/services/queries";
import { getCookie } from "@/core/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthProvider({ children }) {
  const router = useRouter();

  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const hasToken = Boolean(accessToken || refreshToken);

  const { data, isPending, isError, isSuccess } = useGetUserData({
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    if (!hasToken) {
      router.replace("/");
      return;
    }

    if (isError || (isSuccess && !data?.data)) {
      router.replace("/");
    }
  }, [hasToken, isError, isSuccess, data, router]);

  if (!hasToken || isPending || isError || !data?.data) {
    return null;
  }

  return <div>{children}</div>;
}

export default AuthProvider;
