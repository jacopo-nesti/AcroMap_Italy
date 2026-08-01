export async function getCities() {

    const response = await fetch("../data/cities.json");

    if (!response.ok) {
        throw new Error("Errore caricamento città");
    }

    const data = await response.json();

    return data;
}

export async function getCityBySlug(slug) {
    
    const cities = await getCities()

    return cities.find(city => city.slug === slug)
}