import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Mockdata from '../Mockdata/Mockdata';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Pokemon(props) {

    var navigate = useNavigate();

    let params = useParams();
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined)

    useEffect(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(function (response) {
            const {data} = response;
            setPokemon(data);
        })
        .catch(function(error){
            setPokemon(false);
        });
    }, [pokemonId]);
    

    const generatePokemonjsx = () => {
        const { name, id, species, height, weight, types } = pokemon;
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return (
            <div>
                <h1>{capitalizeFirstLetter(name)}</h1>
                <img src={img} />
                <h2>Pokemon Info</h2>
                <h3>Species: {species.name}</h3>
                <h3>Weight: {weight}</h3>
                <h4>Height: {height}</h4>
                <h4>Types</h4>
                {types.map((typeInfo) => {
                    const {type} = typeInfo;
                    const {name} = type;
                    return <h3>{`${name}`}</h3>
                })}
                <Button onClick={() => navigate(`/`)} variant="outlined">Back to Pokedex</Button>
            </div>

        )
    }

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonjsx()}
            {pokemon === false &&  <h1>Pokemon not found</h1>}
        </>
    );
}

export default Pokemon;
