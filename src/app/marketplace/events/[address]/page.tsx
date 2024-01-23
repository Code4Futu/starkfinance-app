"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { Event } from "./components";
import { mocktEvent } from "@/app/models/events";

export default async function EventPage({
  params,
}: {
  params: { address: string };
}) {
  const mockEvent1 = mocktEvent().find(
    (item) => item.address === params.address
  );
  if (!mockEvent1) return null;

  return (
    <div>
      <Breadcrumbs
        items={[
          { text: "Marketplace", icon: "/svg/market.svg", url: "/" },
          { text: "Events", url: "marketplace/events" },
          { text: mockEvent1.name },
        ]}
      />
      <div className="flex pt-6 flex-col gap-3 md:gap-6 justify-between items-start mb-6 md:mb-[500px] lg:mb-9 w-full">
        <Event event={mockEvent1} />
      </div>
    </div>
  );
}
