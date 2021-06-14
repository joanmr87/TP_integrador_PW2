/**
 * 
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method 
 * @param {'/tareas/' | '/tareas/:id' | '/usuarios/'} url 
 * @param {*} body 
 * @returns 
 */
async function callApi(method, url, headers = undefined, body = undefined) {
	const resp = await fetch(`/api${url}`, {
		method: method,
		body: body,
		headers: headers
	});
	const data = await resp.json();
	return data;
}