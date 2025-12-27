import { useQuery } from "@tanstack/react-query";
import QueryString from "qs";

import api from "../config/api";

export const useGetUserData = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTours = (query) => {
  const url = "/tour?" + QueryString.stringify(query);

  const queryFn = () => api.get(url);
  const queryKey = ["tour", query];

  return useQuery({ queryKey, queryFn });
};

export const useGetUserBasket = () => {
  const queryFn = () => api.get("/basket");
  const queryKey = ["user-basket"];

  return useQuery({ queryFn, queryKey });
};

export const useGetUserTours = () => {
  const queryFn = () => api.get("/user/tours");
  const queryKey = ["user-tours"];

  return useQuery({ queryFn, queryKey });
};

export const useGetTourById = (tourId) => {
  const queryFn = () => api.get(`/tour/${tourId}`);
  const queryKey = ["tour-detail", tourId];

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!tourId, // فقط وقتی id داریم اجرا بشه
  });
};

export const useGetUserTransactions = () => {
  const queryFn = () => api.get("/user/transactions");
  const queryKey = ["user-transactions"];

  return useQuery({ queryFn, queryKey });
};
