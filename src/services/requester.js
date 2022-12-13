
export const request = async (method, url, data) => {

    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');

        let headers = {};

        if(auth.accessToken){
            headers['X-Authorization'] = auth.accessToken;
        }
        
        let buildRequest;

        if (method === "GET") {
            buildRequest = fetch(url);
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }
        const responce = await buildRequest;
        const result = await responce.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const patch = request.bind({}, "PATCH");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");