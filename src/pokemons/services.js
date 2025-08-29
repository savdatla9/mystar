export const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';

export function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
        .then(data => {
            resolve(data)
        })
        .catch((err) => reject(err));
    })
};

export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
        .then(data => {
            resolve(data)
        })
        .catch((err) => reject(err));
    })
};