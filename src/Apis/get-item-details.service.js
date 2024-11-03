export const getItemDetails = async (id) => {
    try {
        const response = await fetch(`http://localhost:6060/items/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch item details");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching item details:", error);
        throw error;
    }
};