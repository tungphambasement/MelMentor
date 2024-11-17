export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userdata'));

    if (user && user.jwtToken) {
        return { Authorization: 'Bearer ' + user.jwtToken };
    } else {
        return {};
    }
}
