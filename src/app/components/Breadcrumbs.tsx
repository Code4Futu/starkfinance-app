import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type BreadcrumbChild = {
  text: string;
  icon?: string;
  url?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbChild[] }) {
  return (
    <div className="breadcrumbs z-[999] fixed bg-[#0D0E12] lg:bg-inherit left-0 lg:left-[288px] top-[96px] lg:top-[25px] right-0 lg:right-[360px] px-6 py-3  border-b lg:border-none border-b-[#2D313E] overflow-hidden">
      <ul className="text-[14px]">
        {items.map((i, idx) => (
          <li
            key={idx}
            className={clsx("flex items-center ", {
              "font-bold": idx === items.length - 1,
            })}
          >
            {i.icon && (
              <div className="w-[30px] h-[30px] relative">
                <Image src={i.icon!} alt={i.text} fill />
              </div>
            )}
            <div
              className={clsx({
                "ml-1.5": !!i.icon,
              })}
            >
              {i.url ? (
                <Link
                  className="hover:no-underline"
                  href={i.url}
                  rel="noreferrer"
                >
                  {i.text}
                </Link>
              ) : i.text.length > 28 ? (
                `${i.text.slice(0, 28)}...`
              ) : (
                i.text
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
