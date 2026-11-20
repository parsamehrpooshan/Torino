import TourDetails from "@/components/templates/TourDetails";
import { serverFetch } from "@/core/services/http";

async function Tourdetails({ params }) {
  const data = await serverFetch(`/tour/${params.id}`, null, {
    cache: "no-store",
  });
  return <TourDetails tourDetails={data} />;
}

export default Tourdetails;
