export type EmulateRequestArguments = {
	isError?: boolean,
	milliSeconds?: number
}

export const emulateRequest = ({
	isError,
	milliSeconds
}: EmulateRequestArguments = {
	isError: false,
	milliSeconds: 1500
}): Promise<unknown> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isError) reject()
			resolve(null)
		}, milliSeconds)
	})
}
