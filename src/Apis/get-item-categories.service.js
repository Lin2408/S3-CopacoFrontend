import {callExternalApi} from "./external-api.service.js";

export async function fetchCategories() {
    const config = {
        url: `http://localhost:6060/categories`,
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
