import axios from "axios";
import { toast } from "react-toastify";

export const createEntity = async (context, entity, route) => {
	console.log("ENTITY", entity);
	let created = false;
	context.setState({ loading: true });
	let data = new FormData();
	for ( let key in entity ) {
		data.append(key, entity[key]);
	}
	try {
		const response = await axios.post(`/api/${route}`, data);
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
		const response = await axios.get(`/api/${route}`);
		if (response.status === 200) {
			return response.data;
		} else {
			toast.error(`There was an error loading ${route}s`);
			return [];
		}
	} catch (error) {
		toast.error(`There was an error loading ${route}s`);
		return [];
	}
};

export const readEntity = async (route, id) => {
	try {
		const response = await axios.get(`/api/${route}/${id}`);
		if (response.status === 200) {
			return response.data;
		} else {
			toast.error(`There was an error loading the ${route}`);
			return {};
		}
	} catch (error) {
		toast.error(`There was an error loading the ${route}`);
		return {};
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

export const readOptions = async route => {
	const entities = await readEntities(route);
	console.log(entities);
	return convertToOptions(entities, `${route}ID`);
};

const convertToOptions = (arrayOfObjects, key) => {
	const options = [];
	arrayOfObjects.forEach(elem => options.push({ id: elem[key], label: `${elem.firstName} ${elem.lastName}` }));
	return options;
};
