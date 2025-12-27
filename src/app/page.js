import SearchForm from "@/components/templates/SearchForm";
import Slider from "@/components/templates/Slider";
import TourList from "@/components/templates/TourList";
import { serverFetch } from "@/core/services/http";

export default async function Home({ searchParams }) {
  const data = await serverFetch("/tour", searchParams, { cache: "no-store" });

  return (
    <div>
      <SearchForm />
      <TourList tourData={data} />
      <Slider />
    </div>
  );
}
