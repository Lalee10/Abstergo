export const camelToKebab = string => {
	return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const camelToTitle = string => {
	let result = string.replace(/([A-Z])/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1);
};
