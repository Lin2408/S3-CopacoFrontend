import {callExternalApi} from "./external-api.service.js";

export async function getItemsByCompatibilty(request) {
    console.log("request", request)
    const config = {
        url: `http://localhost:6060/compatible`,
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
