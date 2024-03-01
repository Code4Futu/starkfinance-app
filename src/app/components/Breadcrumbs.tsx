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
		<div className="breadcrumbs z-[999] fixed bg-[#0D0E12] xl:bg-inherit left-0 xl:left-[288px] top-[96px] xl:top-[25px] right-0 xl:right-[360px] px-6 py-3  border-b xl:border-none border-b-[#2D313E]">
			<ul className="text-[14px] overflow-hidden">
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
								"hidden md:block": !!i.icon,
								// "md:hidden": i.icon,
							})}
						>
							{i.url ? (
								<Link
									className="hover:no-underline max-w-[calc(100% - 180px) line-clamp-1"
									href={i.url}
									rel="noreferrer"
								>
									{i.text.length > 20 ? `${i.text.slice(0, 20)}...` : i.text}
								</Link>
							) : i.text.length > 20 ? (
								`${i.text.slice(0, 20)}...`
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
