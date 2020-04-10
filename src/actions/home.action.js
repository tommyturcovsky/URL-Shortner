import Axios from 'axios'

// function loadingPokemons() {
//     return {
//         type: "REQUEST_SHORT_URL"
//     }
// }

function receiveMostRecentGeneralUrl(shortUrl) {
    return {
        type: "RECEIVE_GENERAL_SHORT_URL",
        shortUrl
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}


// export function fetchPokemon(username) {
//     return function(dispatch) {
//         dispatch(loadingPokemons());
//         return Axios.get(`/api/pokemon?username=${username}`)
//             .then(response => dispatch(receivePokemonList(response.data)),
//                 error => console.log('An error occurred.', error)
//             );
//     }
// }

export function generalUrlRequest(urlRequest) {
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/shortUrls`, urlRequest)
            .then(response => Axios.get(`/api/shortUrls/${response.data._id}`),
                error => console.log('An error occurred1.', error))
            .then(
                response => dispatch(receiveMostRecentGeneralUrl(response.data.short)),
                error => console.log('An error occurred2.', error)
            )
    }
}

// export function deletePokemon(pokemonId, username) {
//     return function(dispatch) {
//         dispatch(inFlight());
//         return Axios.delete(`/api/pokemon/` + pokemonId)
//             .then(() => Axios.get(`/api/pokemon?username=${username}`),
//                 error => console.log('An error occurred.', error))
//             .then(
//                 response => dispatch(receivePokemonList(response.data)),
//                 error => console.log('An error occurred.', error)
//             )
//     }
// }