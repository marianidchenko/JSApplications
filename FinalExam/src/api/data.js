import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllAlbums() {
    return await api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getAlbumById(id) {
    return await api.get('/data/albums/' + id);
}

export async function deleteById(id) {
    return await api.del('/data/albums/' + id);
}

export async function createAlbum(album) {
    return await api.post('/data/albums', album);
}

export async function updateAlbum(id, album) {
    return await api.put('/data/albums/' + id, album);
}

export async function searchByName(name) {
    return await api.get(`/data/albums?where=name%20LIKE%20%22${name}%22`)
}