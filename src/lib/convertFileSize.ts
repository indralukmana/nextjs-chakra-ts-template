// function convert file size to kb, mb
export const convertFileSize = (size: number) => {
	if (size < 1024) {
		return `${size} bytes`;
	} else if (size >= 1024 && size < 1_048_576) {
		return `${(size / 1024).toFixed(2)} KB`;
	} else if (size >= 1_048_576) {
		return `${(size / 1_048_576).toFixed(2)} MB`;
	}
};
