export async function createTemplate(template) {
    const response = await fetch('http://localhost:6060/templates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
    });
    if (!response.ok) throw new Error("Failed to create template");
    return await response.json();
}
