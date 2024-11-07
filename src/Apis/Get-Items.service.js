import {callExternalApi} from "./external-api.service.js";

export async function fetchItems() {
    const config = {
        url: `http://localhost:6060/items`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }
    const { data, error } = await callExternalApi({ config });
    console.log(data)
    return {
        data: data || null,
        error,
    };
}