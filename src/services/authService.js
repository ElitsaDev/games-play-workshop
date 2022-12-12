import * as request from "./requester";

const baseUrl = `http://localhost:3030/users`;

export const login = (email, password) => 
    request.post(`${baseUrl}/login`, { email, password });

export const logout = async (accessToken) => {
    try{
        const response = await fetch(`${baseUrl}/logout`, {
                headers: {
                    'X-Authorization': accessToken
                }
        });
        //request.get(`${baseUrl}/logout`);
        return response;

    }catch(err){
        throw new Error(err.message);
    }
}

export const register = (email, password) =>
    request.post(`${baseUrl}/register`, { email, password });