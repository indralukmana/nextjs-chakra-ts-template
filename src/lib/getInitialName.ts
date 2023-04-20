export const getInitialName = (name: string): string => {
	if (name === '') {
		return '-';
	} else {
		const temporary: Array<string> = name.split(/\s/);
		return temporary.length >= 2
			? temporary[0].slice(0, 1) + temporary[temporary.length - 1].slice(0, 1)
			: name.slice(0, 2);
	}
};
