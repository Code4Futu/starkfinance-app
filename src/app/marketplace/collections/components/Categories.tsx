const CategoryCard = ({
	title,
	image,
}: {
	title: string;
	image: string;
}) => {
	return (
		<div
			style={{
				background: `url(${image})`,
			}}
			className="min-w-[165px] min-h-[82px] md:min-w-[232px] md:min-h-[116px] lg:min-w-[254px] lg:min-h-[127px] rounded-xl !bg-no-repeat !bg-[length:100%_100%]"
		>
			<div
				style={{
					background: "rgba(13, 14, 18, 0.50)",
				}}
				className="flex w-full h-full lg:p-3 p-6 justify-center items-center rounded-xl border-[1px] border-[#2D313E] cursor-pointer"
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
		image:
			"https://s3-alpha-sig.figma.com/img/dc4a/c664/4bc1484d355d26f85f72ff688ec73957?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R9kbn0MbIvzsC4FbjvWtnTsN7rS3j1qVwg-Uekfi9EMz9y1qnI8nlDf4JW~Vh9PR6QkmPfun6o~uxj2ftu73cTg4JGbBnOH2sZ~Wxh9weDIWgBt7pNhyoa~WW12YyUVrbiZ58yLPkXih1x9kLoQodFiYnLQlA7~3WlO7hHPT2EyufFapcaylGdolCcT1WSTc2SKEgeWN3go-2CEUttDEdlD7T6iMGelx7pGhsk-fR8WXRbKzGGt~8k9gFpAs3Su8g~JUxCXmFQn7kjlI21BfZR1Gw7NY0OAe3GuvL93eSS1RGfCsDqQd0i9iXsIUV0dHBYhUZARoyzH5XA~-RkqJ6A__",
	},
	{
		title: "Sports Collectibles",
		image:
			"https://s3-alpha-sig.figma.com/img/f950/fe6b/c93e55b020844be06715540b22e762a3?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nod74dVvvYrQlZeNEB8Ja6Tf96kFiIc6VLbSY4wDw40Rde0qj0FJwj-b8dDJ2NN1a4aO9HG-98iDlDgpuO3pEWV18Ib53AEtnm6fvtypQTKcFN9kyO1I-vL6rIcZ2nenRdw~uP59Xw7k-3nydBvUBDvzeLmBSk-Sc-8FPELdNwQpa3iz0tGPXJ170m8o6NAB70vJuc877AxcrR~u8CNs4K-NL6teR4DUW-tuFrY3YV8-dvBQ4qxtyaMSfaeLc-AUOn~PP0sPSEEXbK6dGDyTMDgS-zP7A7~Zt7dFAGz~JtfnrQk3DJ1cZ8U6C7mpNdC8KwqcBzVNdOrrTkySnVdE6g__",
	},
	{
		title: "Gaming",
		image:
			"https://s3-alpha-sig.figma.com/img/dd6c/a1dc/92cffcf3da38c78a2bc0e250a44515a5?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S7FhKnZ1Czkv9h75RMnLxxMZiEDazQBg96yiHNRvSwIyVa5Ntiro5~orBAF8jUdvMKijFgkgoh4AzCs9PSVvx7PAKTgRYaTEOm4s6gC~NO8OlEb0ZQS-Wgc6SFTxbkHPniA~5NGQzgRmNjHyDFYGFiLA7so7zeyvZdC70zqfqodGrLsPexjiIcdJ8GFeOjspOheHKEnLAUxOtTENqEiFJ5NXs1tPY7fJ9fVw9f~83Aww08TKOSjpji5MZHoTqwBOIwC04j63Ge6m4npQ-s5jOYR51pSB3yTRv0ZTiACmvvI8d04QUoR~~xc9cqJPJ9nczclLqUf6FjwlVGZhybILYA__",
	},
	{
		title: "Memberships",
		image:
			"https://s3-alpha-sig.figma.com/img/a847/7a42/3c9a1d2bbb42d23f0178eb329ff7380f?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QXCVG42s2TeKMCvANrP8AUOrpi~2rZ1kbQmAbhLYuAIrIeJgvDplQDnFJSz4oTWHYfZq6vDO0dq~kqHcHkb7ec0LzfL8fbcuvRHAWP44DCkmmjT17PPSqcHd8jZLgoX26yXSCGhjuNMovAbpfHXcy25-2NRlfY9PYNdXDufD-9J04dToilFwooWXhyW9tzgoe69gEsA4vWgv~AW6ApK4-dkx0k06nKHsFgYZkseTDa4UhhUwu-vUKJX24fNusaS1TxNwplIRDBQLBkRce~Y5bdPdT2YrFsv8Lyk4F-mJEIB-kT6cXbeM3GZL~UPCBlLHGWzPTV922WBSARCiM7ypdw__",
	},
	{
		title: "PFPs",
		image:
			"https://s3-alpha-sig.figma.com/img/45c3/b862/048fd5feea2728f31d6db8dd59ee2e0b?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jJWpPxCtJy9EFjoAA0oraJPfJsQ0PAQbGaXfnRfwcT-YOWypUVMMJ6o6wNYdI6~RTGuzAEilR1WCGLiVLJ6DRpnM-O~AQzC3uN5yqN-ub~CtBViFzF7kkSf7efArH2mDwrWBtJPTbEtXE~A5fOrSJC66ynBSVx9LxKWTBdd5WRC0g~z3EZE88TnK8~f49JUrs1wVeLJzLhO-z~XUWa3q0kVnsi2aICgMydlkyaPdBjkUeC7njitjotqxqIYGZTE9Gg52PG4oTA4ISanp-bcPGHsv~uJkbUnqNYIH0wGGi52s6XXzkh2m~c5xqPS1vlZHzd0d7N-IsTXBzJc7RLctfw__",
	},
	{
		title: "Music",
		image:
			"https://s3-alpha-sig.figma.com/img/ad58/4a93/2ab52f9ce94f76b27fb781abafe3928e?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V9b5aOm90QQL83vbbByWWfky2aft7RbMDEeSUC2s~wcdDsGxMvLju4VSI2GpRIXaEESBcP5dpt3XSoza8fSarDULT~3RtB6Iyo~qupQFW8CjriVj42Wo7cIpSjVY2N6yAfpyChxlC~vqwg16z6lFain3Com1Vge0yKd9hl0fDRERFKObJOGSY8~sIpewmL23nRGHiu6Nz~u3Bp89-8OKecySPrStCFl4tVWuZML0I4JCB7pfOlIPMcoiI0UJIf1qu45D60UzueLu46JqwQQsWkVfIlxofzhOnG6B-0PfZlDGgq2bR-3jA9qdpVChFUpfEzxGo8t1dPKTpQBdsK2JrA__",
	},
	{
		title: "Photography",
		image:
			"https://s3-alpha-sig.figma.com/img/6670/648b/a68be83b72ad1609bd5f35e5a13cf167?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a-P~42Djc9IUCqRJs~99ro2-BptKNFCWU5tHn3MNe1FWZSgckBNvp49thKAx4AwJ7N5BfJQie8uE5nnIqIsd1ypvJLKstKQgHwPqUBOgZe9WEzWJjRndJwFweS~Xq5nWtDDkW8ha5m8n4wUuf7vvVAn~V~TkaoODK2j~HiKU~olGtmom6jsJganRxVihqLn3NHdROtGZ6BXDUjyenkKz42CGvywIUdWkErl3IN5vdeQs1BF5pd38MeIS4iUBxyM14wUwMv8OSPP9oC1HTl-oTAOk0nyeKj5O0j4aKPV7xyzUf1ZK3FBd8J8BFg73py5qaKj2NltVnl9~NATsqypmtw__",
	},
];

export const Categories = () => {
	return (
		<div className="flex flex-col items-start gap-6">
			<span className="text-2xl font-bold text-[#f1f1f1]">
				Categories
			</span>
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 self-stretch">
				{categories.map(
					(item: any, idx: number) => (
						<CategoryCard
							key={idx}
							title={item.title}
							image={item.image}
						/>
					)
				)}
			</div>
		</div>
	);
};
