let movieAppApi = (path, method, data) => {
    let options = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer'
    };

    if(data) {
        options.body = JSON.stringify(data);
    }

    return fetch(path, options).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            let error = new Error(response.statusText || response.status)
            error.response = response
            return Promise.reject(error)
        }
    }).then(response => response.json());
};

let movieApi = {
    getAllMovies: async () => {
        return await movieAppApi('/all_movies', 'GET');
    },
    searchAndAddMovie: async (title) => {
        return await movieAppApi('/search_movie', 'POST', {title});
    },
    saveMovieRating: async (title, rating) => {
        return await movieAppApi('/rating', 'POST', {title, rating});
    },
    saveMovieComment: async (title, comment) => {
        return await movieAppApi('/comment', 'POST', {title, comment});
    }
};

export default movieApi;