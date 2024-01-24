// const baseUrl = 'https://us-central1-grandma-8ed4c.cloudfunctions.net/api/'
// const baseUrl = 'http://127.0.0.1:5001/grandma-8ed4c/us-central1/api/users/'
const baseUrl = 'https://grandma-8ed4c.web.app/api/'

export const get = async (path) => {
    try {
        const response = await fetch(
            baseUrl + path, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        return data;
    } catch (err) {
        return err
    }
}

export const post = async (path, body, responseType = 'json') => {
    try {
        const response = await fetch(
            baseUrl + path, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (responseType === 'json') {
                return await response.json();
              } else if (responseType === 'blob') {
                return await response.blob();
            } else {
                throw new Error(`Unsupported response type: ${responseType}`);
              }
    } catch (err) {
        throw new Error (err)
    }
}

export const put = async (path, body) => {
    try {
        const response = await fetch(
            baseUrl + path, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
    } catch (err) {
        return err
    }
}

export const del = async (path) => {
    try {
        const response = await fetch(
            baseUrl + path, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return data;
    } catch (err) {
        return err
    }
}