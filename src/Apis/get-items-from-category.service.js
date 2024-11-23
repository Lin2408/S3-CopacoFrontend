const BASE_URL = 'http://localhost:6060/items';
import { callExternalApi } from "./external-api.service.js";

const fetchItemsByCategory = async (category) => {
    const config = {
        url: `http://localhost:6060/items?category=${category}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export { fetchItemsByCategory };