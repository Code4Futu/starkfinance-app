import icons from "../../../../assets/icons";
import { SwapIcon } from "../icons";
import { CloseIcon } from "../../components";

export const ModalHeader = ({ close, token0, token1, handleChangeToken }) => {
	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex items-start justify-end gap-3 self-stretch">
				<div className="flex items-center justify-center">
					<div
						onClick={close}
						className="flex items-start gap-[10px] rounded border-[1px] border-[#2D313E] p-[6px]"
					>
						<CloseIcon />
					</div>
				</div>
			</div>
			<div className="flex items-end justify-between self-stretch">
				<div className="flex items-center gap-[6px]">
					<img src={token0.icon.src} alt="Starknet Logo" className="h-6 w-6" />
					<img src={token1.icon.src} alt="Starknet Logo" className="h-6 w-6" />
					<div className="flex items-center gap-1">
						<span className="text-xl font-bold text-[#F1F1F1]">
							{token0.name}/{token1.name}
						</span>
						<SwapIcon handleChangeToken={handleChangeToken} />
					</div>
				</div>
				<span className="text-2xl font-bold text-[#F1F1F1]">Price</span>
			</div>
		</div>
	);
};
