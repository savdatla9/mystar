import {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';

import { getPokemon, getAllPokemon, apiURL } from './services';
import PokemonList from './pokeList';

import './index.css';

function PHome() {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(apiURL);
            await loadPokemon(response.results); isLoading(false);
        };

        fetchData();
    }, []);

    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonGet = await getPokemon(pokemon);
            return pokemonGet;
        }));

        setPokemonData(_pokemonData);
    };

    return (
        <Row>
            {loading ? <h1>Loading...</h1> : (
                pokemonData.map((pokemon, i) => 
                    <Col xs={8} sm={6} md={4} lg={3} key={i}> 
                        <PokemonList key={i} pokemon={pokemon} /> 
                    </Col>
                )
            )}
        </Row>
    );
};

export default PHome;