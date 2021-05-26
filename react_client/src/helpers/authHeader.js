export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('token'));

    if (user && user.token) {
        return { Authorization: `${user.token}`, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}