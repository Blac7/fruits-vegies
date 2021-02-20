import axios from 'axios'
import { API } from '../Config'

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false
    }
    else if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false
    }
}

export const signout = async () => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        //next()
        await axios.get(`${API}/signout`)
        .then(response => {
            console.log('signout', response)
        })
        .catch(err => console.log(err))
    }
}

// export const reauthenticate = (data, next) => {
//     console.log("reauth")
//     if(typeof window !== 'undefined') {
//         if (localStorage.getItem('jwt')) {
//             localStorage.removeItem('jwt')
//         }
//         localStorage.setItem('jwt', JSON.stringify(data))
//         next()
//     }
// }