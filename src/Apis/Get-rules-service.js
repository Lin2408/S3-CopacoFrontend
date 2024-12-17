import {callExternalApi} from "./external-api.service.js";

export async function fetchRules({ categoryId, page, itemPerPage }) {
    const queryParams = new URLSearchParams();
    if (categoryId !== undefined) queryParams.append("categoryId", categoryId ?? 0);
    if (page !== undefined) queryParams.append("page", page);
    if (itemPerPage !== undefined) queryParams.append("itemPerPage", itemPerPage);

    const config = {
        url: `http://localhost:6060/rules?${queryParams.toString()}`, // Append query string to URL
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };
    console.log("1", config);
    try {
        const { data } = await callExternalApi({ config }); // Replace with your API call function
        return {
            data: data || null,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error,
        };
    }
}