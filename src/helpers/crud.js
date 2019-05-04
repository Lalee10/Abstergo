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
		const response = await axios.get(`/api/${route}/${id}`);
		if (!response) toast.error(`No ${route} found`);
		return response;
	} catch (error) {
		toast.error(`Read failed. Unable to connect to server`);
		return false;
	}
};

export const updateEntity = async (context, entity, where, route) => {
	let updated = false;
	context.setState({ loading: true });
	try {
		const response = await axios.put(`/api/${route}`, { entityToUpdate: { ...entity }, where });
		updated = response.data;
		if (response.status === 200) {
			toast.success("Successfully updated");
		} else {
			toast.error("Update failed");
		}
	} catch (error) {
		toast.error("Update failed. Service not available");
	} finally {
		context.setState({ loading: false });
		return updated;
	}
};

export const deleteEntity = async (entity, route) => {
	try {
		return await axios.delete(`/api/${route}`, { ...entity });
	} catch (error) {
		return false;
	}
};