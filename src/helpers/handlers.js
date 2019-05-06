export const handleChange = (context, name) => event => {
	context.setState({ [name]: event.target.value });
};

export const handleFileChange = (context, name) => event => {
	context.setState({[name]: event.target.files[0]})
}
