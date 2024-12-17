import {callExternalApi} from "./external-api.service.js";

export async function deleteRule(ruleId) {
    const config = {
        url: `http://localhost:6060/rules/${ruleId}`,
        method: "DELETE",
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