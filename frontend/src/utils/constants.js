export const apiConfig = {
    url: 'https://api.mesto-otdiha.nomoredomains.work',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
}
