/**
 * 
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method 
 * @param {'/tareas/' | '/tareas/:id' | '/usuarios/'} url 
 * @param {*} body 
 * @returns 
 */
async function callApi(method, url, body = {}, headers = {}) {
    const resp = await fetch(`/api${url}`, {
        method: method,
        body: body,
        headers: headers
    });
    const data = await resp.json();
    return data;
}