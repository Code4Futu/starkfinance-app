import Image from "next/image";
import Button from "@/app/components/Button";
import { BASE_API } from "@/app/constants";
import { useWeb3 } from "@/app/hooks";
import { useWeb3Store } from "@/app/store";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CallData, cairo } from "starknet";
import useSWR from "swr";

export default function NFTModal({
	name,
	launchpadAddress,
	nftAddress,
}: {
	name: string;
	launchpadAddress: string | undefined;
	nftAddress: string | undefined;
}) {
	const { account, library } = useWeb3();

	const { data: nfts, isLoading: nftsLoading } = useSWR<any[]>([account], () =>
		!!account
			? fetch(`${BASE_API}/nfts?address=${account}`).then((r) => r.json())
			: []
	);

	const [stakingNft, setStakingNft] = useState<boolean>(false);
	const [searchNft, setSearchNft] = useState<string>("");
	const modalRef = useRef<HTMLButtonElement>(null);

	const handleStakeNft = useCallback(
		async (nftId: string) => {
			if (!library) return toast.error("Connect wallet first");
			try {
				if (!modalRef.current || !launchpadAddress || !nftAddress) return;
				setStakingNft(true);
				const calls = [
					{
						contractAddress: nftAddress,
						entrypoint: "approve",
						calldata: CallData.compile({
							to: launchpadAddress,
							token_id: cairo.uint256(nftId),
						}),
					},
					{
						contractAddress: launchpadAddress,
						entrypoint: "stake_nft",
						calldata: CallData.compile({
							nft_id: cairo.uint256(nftId),
						}),
					},
				];
				const tx = await library.execute(calls);
				await library.waitForTransaction(tx.transaction_hash);
				modalRef.current.click();
				useWeb3Store.setState({ txHash: tx.transaction_hash });
				setStakingNft(false);
				toast.success(`Stake NFT success. TxHash is ${tx.transaction_hash}`);
			} catch (error: any) {
				setStakingNft(false);
				toast.error(error.message);
			}
		},
		[library, launchpadAddress, modalRef]
	);

	return (
		<dialog id={name} className="modal">
			<div className="modal-box bg-[#1A1C24] p-6 md:max-w-[560px] xl:max-w-[1200px]">
				<div className="flex justify-between items-center py-3 border-b border-b-[#2D313E]">
					<div className="">Your StarkFinance NFT</div>

					<div>
						<input
							type="text"
							value={searchNft}
							placeholder="Search"
							onChange={(e) => setSearchNft(e.target.value)}
							className="input placeholder:opacity-50 w-full bg-[#0D0E12] border-[#2D313E] rounded-2xl outline-0 focus:outline-0 focus:border-solid focus:border-[#2D313E]"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-8">
					{nfts?.filter((nft) => nft.nftId.toString().includes(searchNft))
						.length ? (
						nfts
							.filter((nft) => nft.nftId.toString().includes(searchNft))
							.map((nft) => (
								<div
									key={nft.nftId}
									className="flex flex-col gap-6 border border-[#2D313E] bg-[#232631] rounded-3xl pb-6"
								>
									<div className="w-full pt-[100%] relative">
										<Image src="/nft/stark_nft.png" alt="nft" fill />
									</div>

									<div className="text-center text-[20px] text-[#F1F1F1]">
										<div>StarkFinance NFT</div>
										<div>#{nft.nftId}</div>
									</div>

									<div className="w-full flex justify-center">
										<div>
											<Button
												handler={() => handleStakeNft(nft.nftId)}
												claimable={true}
												text="Stake NFT"
												loading={stakingNft}
												loadingText=""
											/>
										</div>
									</div>
								</div>
							))
					) : (
						<div className="col-span-1 md:col-span-2 xl:col-span-4 text-center">
							You don't have StarkFinance NFT
						</div>
					)}
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button ref={modalRef}>close</button>
			</form>
		</dialog>
	);
}
