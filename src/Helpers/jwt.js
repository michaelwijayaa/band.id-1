export const getToken = () => {
    // return localStorage.getItem('token');
    let token = localStorage.getItem('token')
    let result = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token);
    if (result) {
        console.log('token')
        return localStorage.getItem('token')
    } else {
        console.log('wrong token')
    }
}

