import { useQuery } from '@apollo/client';
import axios from 'axios';
import { GET_CURRENT_USER } from '../lib/Queries';

export function useSessionUser() { //client side
    return useQuery(GET_CURRENT_USER)
}

export async function getSessionUser(req) { //server side
    axios.defaults.headers = req.headers
    
    try {
        const { data } = await axios.get('http://localhost:5000/auth/get-session-user')
        return { user: data.user }

    } catch (error) {
        return null
    }
}