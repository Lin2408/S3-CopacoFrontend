import {callExternalApi} from "./external-api.service.js";

export async function getItemsByCompatibilty(request) {
    console.log("request", request);
    const config = {
        url: `http://localhost:6060/items/compatible`,
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        data: request,
    }
    console.log("config", config);
    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
}
