import { Card, CircularProgress, CardActionArea, CardMedia, CardContent, Typography, CardHeader, Grid, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Mockdata from '../Mockdata/Mockdata';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box, color } from '@mui/system';

import "./Pokemon.css";
import colors from "../constants/colors";

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
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);


    const generatePokemonjsx = () => {
        const { name, id, species, height, weight, types, abilities } = pokemon;
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh', marginTop: "100px" }}
                >

                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 500, maxHeight: 1000 }} style={{

                            maxWidth: 800,
                            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            boxShadow: "0px 3px 15px rgpa(100, 100, 100, 0.5)"
                        }}>


                            <Typography variant="h2" style={{
                                textAlign: "center",
                            }} >{capitalizeFirstLetter(name)}</Typography>
                            <Divider />
                            <Box style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <Box>
                                    <CardMedia
                                        component="img"
                                        image={img}
                                    />
                                </Box>
                                <Divider />
                                <Box>
                                    <CardContent>
                                        <Typography variant="h4" gutterBottom>Pokedex Data</Typography>
                                        <Divider />
                                        <Divider />

                                        <Typography gutterBottom><span className='span'>National Dex:</span> #{id}</Typography>
                                        <Divider />
                                        <Typography gutterBottom>
                                            <span className='span'>Types: </span>
                                            {types.map((typeInfo) => {
                                                const { type } = typeInfo;
                                                const { name } = type;

                                                const color = colors[name];

                                                return <span style={{ backgroundColor: `${color}`, color: "#fff", borderRadius: "4px", border: `1px solid ${color}`, textAlign: "center", textTransform: "uppercase", lineHeight: "1.5rem", display: "inline-block", width: "66px", marginTop: "5px", marginRight: "2px" }}>{` ${capitalizeFirstLetter(name)} `}</span>
                                            })}
                                        </Typography>
                                        <Divider />
                                        <Typography gutterBottom><span className='span' style={{ marginTop: "5px" }}>Species: </span>{capitalizeFirstLetter(species.name)}</Typography>
                                        <Divider />
                                        <Typography gutterBottom><span className='span' style={{ marginTop: "5px" }}>Height:</span> {height}</Typography>
                                        <Divider />
                                        <Typography gutterBottom><span className='span' style={{ marginTop: "5px" }}>Weight:</span> {weight}</Typography>
                                        <Divider />
                                        <Typography gutterBottom><span className='span' style={{ marginTop: "5px" }}>Abilities:</span> <Box>{abilities.map((abilityInfo) => {
                                            const { ability } = abilityInfo;
                                            const { name } = ability;
                                            return <>{` ${capitalizeFirstLetter(name)} `}</>
                                        })}</Box></Typography>


                                    </CardContent>
                                    <Button onClick={() => navigate(`/`)} variant="outlined">Back to Pokedex</Button>
                                </Box>
                            </Box>



                        </Card>
                    </Grid>
                </Grid>



            </div>

        )
    }

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonjsx()}
            {pokemon === false && <h1>Pokemon not found</h1>}
        </>
    );
}

export default Pokemon;
