export const apiConfig = {
    url: 'http://api.mesto-otdiha.nomoredomains.work',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
}
