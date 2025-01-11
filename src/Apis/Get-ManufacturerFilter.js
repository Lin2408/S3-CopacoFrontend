import {callExternalApi} from "./external-api.service.js";

export async function fetchManufacturerFilter(categoryId) {
    const config = {
        url: `http://localhost:6060/items/getManufacturers/${categoryId}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }
    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
}