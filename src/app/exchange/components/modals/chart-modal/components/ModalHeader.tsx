import icons from "../../../../assets/icons";
import { CloseIcon } from "../../components";
import { Token } from "l0k_swap-sdk";
import { getTokenIcon } from "@/app/exchange/configs/networks";

export const ModalHeader = ({
	token0,
	token1,
}: {
	token0: Token;
	token1: Token;
}) => {
	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex items-start justify-end gap-3 self-stretch">
				<div className="flex items-center justify-center">
					<div
						// onClick={close}
						className="flex items-start gap-[10px] rounded border-[1px] border-[#2D313E] p-[6px]"
					>
						<CloseIcon />
					</div>
				</div>
			</div>
			<div className="flex items-end justify-between self-stretch">
				<div className="flex items-center gap-[6px]">
					<img
						src={getTokenIcon(token0.address)}
						alt="Starknet Logo"
						className="h-6 w-6"
					/>
					<img
						src={getTokenIcon(token1.address)}
						alt="Starknet Logo"
						className="h-6 w-6"
					/>
					<div className="flex items-center gap-1">
						<span className="text-xl font-bold text-[#F1F1F1]">
							{token0.name}/{token1.name}
						</span>
						{/* TODO handle swap token */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="cursor-pointer"
							// onClick={() => handleChangeToken()}
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M8.81361 5.18639C9.06213 5.4349 9.06213 5.83783 8.81361 6.08634L7.17268 7.72727H18.3636C18.7151 7.72727 19 8.01218 19 8.36364C19 8.71509 18.7151 9 18.3636 9H7.17268L8.81361 10.6409C9.06213 10.8894 9.06213 11.2924 8.81361 11.5409C8.5651 11.7894 8.16217 11.7894 7.91366 11.5409L5.18639 8.81361C4.93787 8.5651 4.93787 8.16217 5.18639 7.91366L7.91366 5.18639C8.16217 4.93787 8.5651 4.93787 8.81361 5.18639ZM15.1864 12.4591C15.4349 12.2106 15.8378 12.2106 16.0863 12.4591L18.8136 15.1864C19.0621 15.4349 19.0621 15.8378 18.8136 16.0863L16.0863 18.8136C15.8378 19.0621 15.4349 19.0621 15.1864 18.8136C14.9379 18.5651 14.9379 18.1622 15.1864 17.9137L16.8273 16.2727H5.63636C5.28491 16.2727 5 15.9878 5 15.6364C5 15.2849 5.28491 15 5.63636 15H16.8273L15.1864 13.3591C14.9379 13.1106 14.9379 12.7076 15.1864 12.4591Z"
								fill="#24C3BC"
							/>
						</svg>
					</div>
				</div>
				<span className="text-2xl font-bold text-[#F1F1F1]">Price</span>
			</div>
		</div>
	);
};
