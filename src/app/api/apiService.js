const BASE_URL = 'https://fakestoreapi.com';

const makeApiCall = async (endpoint, method = 'GET', payload = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (payload) {
        options.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};

export { makeApiCall };