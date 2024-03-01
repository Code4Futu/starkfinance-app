import clsx from "clsx";

export default function Button({
	handler,
	claimable,
	text,
	loading,
	loadingText,
}: {
	handler: any;
	claimable: boolean;
	text: string;
	loading: boolean;
	loadingText: string;
}) {
	return (
		<button
			className={clsx(
				"flex-1 text-center px-6 py-3 font-xl font-bold rounded-2xl flex gap-2 focus-visible:outline-none items-center justify-center",
				{
					"bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB]": claimable && !loading,
					"text-[#1A1C24]": claimable && !loading,
					"bg-[#2D313E]": !claimable || loading,
					"text-[#C6C6C6]": !claimable || loading,
					"cursor-not-allowed": !claimable || loading,
				}
			)}
			disabled={!claimable || loading}
			onClick={handler}
		>
			{loading && <span className="loading loading-spinner loading-md"></span>}
			<span>{loading ? loadingText : text}</span>
		</button>
	);
}
