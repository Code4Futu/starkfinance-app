const CategoryCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div
      style={{
        background: `url(${image})`,
      }}
      className="rounded-xl bg-[length:100%_100%] bg-no-repeat"
    >
      <div
        style={{ background: "rgba(13, 14, 18, 0.50)" }}
        className="flex w-[165px] h-[82px] md:w-[232px] md:h-[116px] lg:w-[254px] lg:h-[127px] lg:p-3 p-6 justify-center items-center rounded-xl border-[1px] border-[#2D313E] cursor-pointer"
      >
        <span className="text-base md:text-2xl text-center font-bold text-[#f1f1f1]">
          {title}
        </span>
      </div>
    </div>
  );
};

const categories = [
  {
    title: "Art",
    image: "/svg/art_category.svg",
  },
  {
    title: "Sports Collectibles",
    image: "/svg/sport_collectible.svg",
  },
  {
    title: "Gaming",
    image: "/svg/gaming.svg",
  },
  {
    title: "Memberships",
    image: "/svg/membership.svg",
  },
  {
    title: "PFPs",
    image: "/svg/pfps.svg",
  },
  {
    title: "Music",
    image: "/svg/music.svg",
  },
  {
    title: "Photography",
    image: "/svg/photography.svg",
  },
];

export const Categories = () => {
  return (
    <div className="flex flex-col items-start gap-6">
      <span className="text-2xl font-bold text-[#f1f1f1]">Categories</span>
      {/* "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 self-stretch" */}
      <div className="flex flex-wrap gap-3 self-stretch">
        {categories.map((item: any, idx: number) => (
          <CategoryCard key={idx} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
};
