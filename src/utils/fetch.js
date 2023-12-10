const baseUrl = 'https://us-central1-grandma-8ed4c.cloudfunctions.net/api/'
// const baseUrl = 'http://127.0.0.1:5001/grandma-8ed4c/us-central1/api/users/'

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

export const post = async (path, body) => {
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
            const data = await response.json();
            return data;
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