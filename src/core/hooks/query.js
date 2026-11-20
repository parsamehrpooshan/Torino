import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const addQuery = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, String(value));
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const removeQuery = useCallback(
    (key) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const getQuery = useCallback(
    (key) => searchParams.get(key),
    [searchParams]
  );

  return { addQuery, removeQuery, getQuery };
};

export default useQuery;
