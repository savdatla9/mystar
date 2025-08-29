// import pokeColor from './pokeClr';

import './style.css';

function PokemonList({ pokemon }) {
    return (
            <div> 
                <div className='pokeType'>
                    <img className='pokeImage' src={pokemon.sprites.front_default} alt='pokemon' />

                    {/* <Grid container>
                        <Grid item xs={6}>
                        <div className='pokeName'>
                            {pokemon.name}
                        </div>

                        </Grid>
                        <Grid item xs={6}>
                        <div className='pokeOwned'>
                            <div># <span>{pokemon.order}</span></div>
                        </div>
                        </Grid>
                    </Grid> */}

                    <div className='pokeName'>
                        # {pokemon.order} {pokemon.name}
                    </div>
                     
                    <div className='pokeTypes'>
                        {pokemon.types.map((type, i) => {
                            return <div className='pokeSkill' key={i}>
                                {type.type.name}
                            </div>
                        })}
                    </div>
                </div>
            </div>
    );
};

export default PokemonList;