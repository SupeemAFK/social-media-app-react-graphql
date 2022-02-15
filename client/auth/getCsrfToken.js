import axios from 'axios';

export default async function getCsrfToken() { //client only
    axios.defaults.withCredentials = true
    const { data } = await axios.get("http://localhost:5000/csrf-token")
    return data.csrfToken
}