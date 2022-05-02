import cities from '../lib/city.list.json'

export const matchCity = (input) => {
    let matchedCities = [];

    for (let city of cities) {
        if (matchedCities.length >= 10) {
            break;
        }

        const doesMatch = city.name.toLowerCase().startsWith(input.toLowerCase());

        if (doesMatch) {
            const name = city.name;
            const fullName = `${city.name}, ${city.country}`;
            const lat = city.coord.lat;
            const lon = city.coord.lon;
            matchedCities.push({ name, fullName, lat, lon });
        }

        };

    return matchedCities;
}