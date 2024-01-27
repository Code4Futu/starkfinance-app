"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "@starknet-react/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { LockInputs, lock } from "../state/locking";

const schema = yup.object().shape({
	tokenLock: yup
		.string()
		.matches(/^0x[a-zA-Z0-9]{63,64}$/, "Invalid address")
		.required(),
	amount: yup.number().required("amount required"),
	owner: yup.string().required(),
	tge: yup.date().required("tge required"),
	tgePercent: yup.number().min(1).max(100000).required("tge required"),
	vestingTime: yup.array(),
	vestingPercent: yup.array(),
});

export default function CreateLock() {
	const { account, address } = useAccount();

	const {
		control,
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		setValue,
		getValues,
	} = useForm<LockInputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			tge: new Date(), // Default value here
			tgePercent: 100,
		},
	});

	const inputDateRef = useRef<HTMLInputElement>(null);

	const [isOtherOwner, setIsOtherOwner] = useState<boolean>(false);
	const [isVesting, setIsVesting] = useState<boolean>(false);
	const [vesting, setVesting] = useState<number>(1);

	const onSubmit = async (values: LockInputs) => {
		try {
			const tx = await lock({ ...values, isVesting }, account);
			alert(`Lock success. TxHash is ${tx.transaction_hash}`);
		} catch (error: any) {
			alert(error.message ?? error);
		}
	};

	useEffect(() => {
		address && setValue("owner", address);
	}, [address]);

	return (
		<div>
			<Breadcrumbs
				items={[
					{
						text: "Locking",
						icon: "/svg/locking.svg",
						url: "/launchpad/locking",
					},
					{ text: "Create Lock" },
				]}
			/>

			<div className="text-[#F1F1F1]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-[#1A1C24] rounded-3xl p-6 flex flex-col gap-6"
				>
					<div className="flex flex-col justify-stretch gap-[8px]">
						<label htmlFor="tokenLock">
							Token or LP Token address{" "}
							<span className="text-[#FF6C6C]">*</span>
						</label>
						<input
							className={clsx(
								"placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
								{
									"border-[#2D313E]": !errors.tokenLock,
									"border-[#FF6C6C]": !!errors.tokenLock,
								}
							)}
							id="tokenLock"
							type="text"
							placeholder="Enter address"
							{...register("tokenLock")}
						/>
						{errors.tokenLock?.message && (
							<div className="text-[#FF6C6C] text-xs mt-2">
								{errors.tokenLock.message}
							</div>
						)}
					</div>

					<div className="flex flex-col">
						<div className="flex items-center gap-1.5">
							<input
								checked={isOtherOwner}
								onChange={() => setIsOtherOwner((pre) => !pre)}
								type="checkbox"
								className="toggle"
							/>
							<div>use another owner?</div>
						</div>
					</div>

					{isOtherOwner && (
						<div className="flex flex-col justify-stretch gap-[8px]">
							<label htmlFor="owner">Owner</label>
							<input
								className={clsx(
									"placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
									{
										"border-[#2D313E]": true,
										"border-[#FF6C6C]": false,
									}
								)}
								id="owner"
								type="text"
								placeholder="Enter owner address"
								{...register("owner")}
							/>
							<div className="text-[#24C3BC] text-xs mt-2">
								the address you input here will be receive the tokens once they
								are unlocked
							</div>
						</div>
					)}

					<div className="flex flex-col justify-stretch gap-[8px]">
						<label htmlFor="amount">
							Amount <span className="text-[#FF6C6C]">*</span>
						</label>
						<input
							className={clsx(
								"placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
								{
									"border-[#2D313E]": !errors.amount,
									"border-[#FF6C6C]": !!errors.amount,
								}
							)}
							id="amount"
							type="text"
							placeholder="Enter amount"
							{...register("amount")}
						/>

						{errors.amount?.message && (
							<div className="text-[#FF6C6C] text-xs mt-2">
								{errors.amount.message}
							</div>
						)}
					</div>

					<div className="flex flex-col">
						<div className="flex items-center gap-1.5">
							<input
								checked={isVesting}
								onChange={() => setIsVesting((pre) => !pre)}
								type="checkbox"
								className="toggle"
							/>
							<div>use vesting?</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-[24px]">
						<div
							className={clsx("flex flex-col justify-stretch gap-[8px]", {
								"col-span-2": !isVesting,
							})}
						>
							<label htmlFor="tge">
								{isVesting ? "TGE Date" : "Lock until"} (UTC time)
								<span className="text-[#FF6C6C]">*</span>
							</label>
							{/* <input
								className={clsx(
									"appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
									{
										"border-[#2D313E]": false,
										"border-[#FF6C6C]": true,
									}
								)}
								id="lp-or-token-address"
								type="date"
								// data-date-format="DD MMMM YYYY"
								// defaultValue={dayjs().format("DD/MM/YYYY")}
								// onChange={(e) => console.log(e.target.value)}
								placeholder="Enter amount"
								{...register("tge")}
								ref={inputDateRef}
							/> */}

							<Controller
								control={control}
								name="tge"
								render={({ field }) => (
									<ReactDatePicker
										className={clsx(
											"appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
											{
												"border-[#2D313E]": true,
												// "border-[#FF6C6C]": true,
											}
										)}
										showIcon
										showTimeSelect
										id="tge"
										icon={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="#F1F1F1"
											>
												<path
													d="M2 9C2 7.114 2 6.172 2.586 5.586C3.172 5 4.114 5 6 5H18C19.886 5 20.828 5 21.414 5.586C22 6.172 22 7.114 22 9C22 9.471 22 9.707 21.854 9.854C21.707 10 21.47 10 21 10H3C2.529 10 2.293 10 2.146 9.854C2 9.707 2 9.47 2 9Z"
													fill="white"
												/>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M2 18C2 19.886 2 20.828 2.586 21.414C3.172 22 4.114 22 6 22H18C19.886 22 20.828 22 21.414 21.414C22 20.828 22 19.886 22 18V13C22 12.529 22 12.293 21.854 12.146C21.707 12 21.47 12 21 12H3C2.529 12 2.293 12 2.146 12.146C2 12.293 2 12.53 2 13V18ZM7 15C7 14.529 7 14.293 7.146 14.146C7.293 14 7.53 14 8 14H10C10.471 14 10.707 14 10.854 14.146C11 14.293 11 14.529 11 15C11 15.471 11 15.707 10.854 15.854C10.707 16 10.47 16 10 16H8C7.529 16 7.293 16 7.146 15.854C7 15.707 7 15.47 7 15ZM7.146 18.146C7 18.293 7 18.53 7 19C7 19.47 7 19.707 7.146 19.854C7.293 20 7.53 20 8 20H10C10.471 20 10.707 20 10.854 19.854C11 19.707 11 19.47 11 19C11 18.53 11 18.293 10.854 18.146C10.707 18 10.47 18 10 18H8C7.529 18 7.293 18 7.146 18.146ZM13 15C13 14.529 13 14.293 13.146 14.146C13.293 14 13.53 14 14 14H16C16.471 14 16.707 14 16.854 14.146C17 14.293 17 14.529 17 15C17 15.471 17 15.707 16.854 15.854C16.707 16 16.47 16 16 16H14C13.529 16 13.293 16 13.146 15.854C13 15.707 13 15.47 13 15ZM13.146 18.146C13 18.293 13 18.53 13 19C13 19.47 13 19.707 13.146 19.854C13.293 20 13.529 20 14 20H16C16.471 20 16.707 20 16.854 19.854C17 19.707 17 19.47 17 19C17 18.53 17 18.293 16.854 18.146C16.707 18 16.47 18 16 18H14C13.529 18 13.293 18 13.146 18.146Z"
													fill="white"
												/>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M7 2C7.55228 2 8 2.44772 8 3V6C8 6.55228 7.55228 7 7 7C6.44772 7 6 6.55228 6 6V3C6 2.44772 6.44772 2 7 2ZM17 2C17.5523 2 18 2.44772 18 3V6C18 6.55228 17.5523 7 17 7C16.4477 7 16 6.55228 16 6V3C16 2.44772 16.4477 2 17 2Z"
													fill="white"
												/>
											</svg>
										}
										onChange={(date) => field.onChange(date)}
										selected={field.value}
										// // selected={value}
										minDate={dayjs().toDate()}
										// // onChange={(date) => setStartDate(date as any)}
										// showTimeSelect
										dateFormat="yyyy/MM/dd h:mm aa"
									/>
								)}
							/>
						</div>
						{isVesting && (
							<>
								<div className="flex flex-col justify-stretch gap-[8px]">
									<label htmlFor="tgePercent">
										TGE Percent
										<span className="text-[#FF6C6C]">*</span>
									</label>

									<input
										className={clsx(
											"placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
											{
												"border-[#2D313E]": true,
												"border-[#FF6C6C]": false,
											}
										)}
										id="tgePercent"
										type="text"
										placeholder="Ex 10"
										{...register("tgePercent")}
									/>
								</div>

								{new Array(vesting).fill("").map((e, idx) => (
									<div
										key={idx}
										className="col-span-2 grid grid-cols-2 gap-[24px]"
									>
										<div className="flex flex-col justify-stretch gap-[8px]">
											<label htmlFor={`vestingDays-${idx}`}>
												Vesting Days
												<span className="text-[#FF6C6C]">*</span>
											</label>

											<input
												className={clsx(
													"placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
													{
														"border-[#2D313E]": true,
														"border-[#FF6C6C]": false,
													}
												)}
												id={`vestingDays-${idx}`}
												type="text"
												placeholder="Number of days after TGE"
												{...register(`vestingTime.${idx}`)}
											/>
										</div>
										<div className="flex flex-col justify-stretch gap-[8px]">
											<label htmlFor={`vestingPercent-${idx}`}>
												Vesting Percent
												<span className="text-[#FF6C6C]">*</span>
											</label>

											<input
												className={clsx(
													"placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] border rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]",
													{
														"border-[#2D313E]": true,
														"border-[#FF6C6C]": false,
													}
												)}
												id={`vestingPercent-${idx}`}
												type="text"
												placeholder="Ex 10"
												{...register(`vestingPercent.${idx}`)}
											/>
										</div>
									</div>
								))}
								<div className="col-span-2 flex">
									<div
										onClick={() => setVesting((pre) => pre + 1)}
										className="cursor-pointer text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl border-0 px-6 py-3"
									>
										Add
									</div>
								</div>
							</>
						)}
						{/* <div className="col-span-2 text-center">
							<button
								onClick={() => {
									setVesting((pre) => pre - 1);
									let vestingTime = getValues("vestingTime");
									if (vestingTime) {
										vestingTime = vestingTime.slice(1);
									}
									console.log(vestingTime);
									setValue("vestingTime", vestingTime);
								}}
								className="text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-full border-0 px-2 py-0"
							>
								-
							</button>
						</div> */}
					</div>

					<div className="flex justify-center">
						<button
							id="btnSubmit"
							type="submit"
							className={clsx(
								"w-full text-[#1A1C24] bg-gradient-to-r from-[#24C3BC] to-[#ADFFFB] rounded-2xl border-0 px-6 py-3",
								{
									"md:max-w-[80px]": !!account,
									"md:max-w-[280px]": !account,
								}
							)}
						>
							{!account ? "Please connect wallet" : "Lock"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
