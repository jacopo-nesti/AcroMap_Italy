export async function getCities() {

    const response = await fetch(
        `${import.meta.env.BASE_URL}data/cities.json`
    )

    if (!response.ok) {
        throw new Error("Errore caricamento città")
    }

    const data = await response.json()

    return data;
}
