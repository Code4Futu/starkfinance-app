import Breadcrumbs from "@/app/components/Breadcrumbs";
import {
  CollectionHeader,
  CollectionPromote,
  TopCollection,
  PopularCollections,
  PromoteCarousel,
  Categories,
} from "./components";
import { NewCollections } from "./components/NewCollections";

export default function Collections() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { text: "Marketplace", icon: "/svg/market.svg", url: "/" },
          { text: "Collections" },
        ]}
      />
      <div className="flex flex-col gap-6 justify-between items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
        <CollectionHeader />
        <CollectionPromote />
        <PromoteCarousel />
        <TopCollection />
        <PopularCollections />
        <NewCollections />
        <Categories />
      </div>
    </div>
  );
}
