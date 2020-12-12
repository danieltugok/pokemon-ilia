
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading

const pokemonIds = state => state.pokemonIds
  
export {
  palette,
  isLoading,
  pokemonIds
}
