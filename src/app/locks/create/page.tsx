export default function CreateLock() {
	return (
		<div>
			<div>Create Lock</div>

			<div>
				<div>
					<div>Token or LP Token address</div>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>

				<div className="flex flex-col">
					<div className="flex items-center">
						<input type="radio" name="radio-1" className="radio" checked />
						<div>use another owner?</div>
					</div>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
			</div>
		</div>
	);
}
