import axios from "axios";
import { toast } from "react-toastify";

export const createEntity = async (context, entity, route) => {
	let created = false;
	context.setState({ loading: true });
	try {
		const response = await axios.post(`/api/${route}`, { ...entity });
		created = response.data;
		if (response.status === 200) {
			toast.success("Successfully created");
		} else {
			toast.error("Creation failed");
		}
	} catch (error) {
		toast.error("Creation failed. Service not available");
	} finally {
		context.setState({ loading: false });
		return created;
	}
};

export const readEntities = async route => {
	try {
		return await axios.get(`/api/${route}`);
	} catch (error) {
		return false;
	}
};

export const readEntity = async (route, id) => {
	try {
		return await axios.get(`/api/${route}/${id}`);
	} catch (error) {
		return false;
	}
};

export const updateEntity = async (entity, route) => {
	try {
		return await axios.put(`/api/${route}`, { ...entity });
	} catch (error) {
		return false;
	}
};

export const deleteEntity = async (entity, route) => {
	try {
		return await axios.delete(`/api/${route}`, { ...entity });
	} catch (error) {
		return false;
	}
};
