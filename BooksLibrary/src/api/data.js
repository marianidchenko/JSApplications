import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;


export async function getAllBooks() {
    return await api.get('/data/books?sortBy=_createdOn%20desc')
}

export async function getBookById(id) {
    return await api.get('/data/books/' + id)
}

export async function createBook(book) {
    return await api.post('/data/books', book)
}

export async function editBook(id, book) {
    return await api.put('/data/books/' + id, book)
}

export async function getMyBooks(userId) {
    return await api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function deleteById(id) {
    return await api.del('/data/books/' + id)
}
