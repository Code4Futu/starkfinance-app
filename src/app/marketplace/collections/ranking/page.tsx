import Breadcrumbs from "@/app/components/Breadcrumbs";
import { RankingHeader, RankingTable } from "./components";
import { Divider } from "@/app/components/Divider";

export default async function CollectionRanking() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { text: "Marketplace", icon: "/svg/market.svg", url: "/" },
          { text: "Collections" },
          { text: "All" },
        ]}
      />
      <div className="flex flex-col gap-6 justify-between items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
        <div className="flex flex-col items-start gap-3 w-full">
          <RankingHeader />
          <Divider />
          <RankingTable />
        </div>
      </div>
    </div>
  );
}
