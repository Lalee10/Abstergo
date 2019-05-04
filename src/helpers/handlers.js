export const handleChange = (context, name) => event => {
	context.setState({ [name]: event.target.value });
};
