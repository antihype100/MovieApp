export default class MovieDBapi {
    _baseApi = 'https://api.themoviedb.org';
    _token = '08559ab4802619d1ea086ca807344fd9';

    async getResource(url) {

        const res = await fetch(`${this._baseApi}${url}`);
        if (!res.ok) {
            throw new Error();
        }
        return await res.json();
    }

    async postResource(url, setting) {

        const res = await fetch(`${this._baseApi}${url}`, setting);
        if (!res.ok) {
            throw new Error();
        }
        return await res.json();
    }

    createNewSession() {

        return this.getResource(`/3/authentication/guest_session/new?api_key=${this._token}`)
            .then(data => {
                console.log('Session Connect', data.guest_session_id);
                localStorage.setItem('guestSessionToken', data.guest_session_id);
            });
    }

    getMovie(id) {
        return this.getResource(`/3/movie/${id}?api_key=${this._token}`);
    }

    getMovieOnRequest(text, page) {
        return this.getResource(`/3/search/movie/?api_key=${this._token}&query=${text}&page=${page}`);
    }

    setRateMovie(id, voteRate) {
        console.log(voteRate);
        return this.postResource(`/3/movie/${id}/rating?api_key=${this._token}&guest_session_id=${localStorage.getItem('guestSessionToken')}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    'value': voteRate
                })
            });
    }

    getRatedMovies() {
        return this.getResource(`/3/guest_session/${localStorage.getItem('guestSessionToken')}/rated/movies?api_key=${this._token}&language=en-US&sort_by=created_at.asc`)
    }

    getGenresList() {
        return this.getResource(`/3/genre/movie/list?api_key=${this._token}`)
    }
}