import { Divider } from "@/app/components/Divider";
import clsx from "clsx";

export const About = ({
	className,
}: {
	className?: string;
}) => {
	return (
		<div
			className={clsx(
				"flex flex-col items-start py-9 px-6 gap-6 self-stretch rounded-3xl border-[1px] border-[#2D313E] bg-[#1A1C24]",
				className
			)}
		>
			<div className="flex flex-col items-start gap-3 self-stretch">
				<span className="text-xl font-bold text-[#f1f1f1] leading-[23px]">
					About
				</span>
				<Divider />
			</div>
			<span className="text-sm text-[#c6c6c6] self-stretch text-justify">
				Contrary to popular belief, Lorem Ipsum is
				not simply random text. It has roots in a
				piece of classical Latin literature from
				45 BC, making it over 2000 years old.
				Richard McClintock, a Latin professor at
				Hampden-Sydney College in Virginia, looked
				up one of the more obscure Latin words,
				consectetur, from a Lorem Ipsum passage,
				and going through the cites of the word in
				classical literature, discovered the
				undoubtable source. Lorem Ipsum comes from
				sections 1.10.32 and 1.10.33 of "de
				Finibus Bonorum et Malorum" (The Extremes
				of Good and Evil) by Cicero, written in 45
				BC. This book is a treatise on the theory
				of ethics, very popular during the
				Renaissance. The first line of Lorem
				Ipsum, "Lorem ipsum dolor sit amet..",
				comes from a line in section 1.10.32. The
				standard chunk of Lorem Ipsum used since
				the 1500s is reproduced below for those
				interested. Sections 1.10.32 and 1.10.33
				from "de Finibus Bonorum et Malorum" by
				Cicero are also reproduced in their exact
				original form, accompanied by English
				versions from the 1914 translation by H.
				Rackham.
			</span>
		</div>
	);
};
