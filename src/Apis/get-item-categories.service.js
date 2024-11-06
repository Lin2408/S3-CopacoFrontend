export async function fetchCategories() {
    const response = await fetch('http://localhost:6060/categories');
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
}
