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
                console.log('Session Connect', data.guest_session_id)
                localStorage.setItem('guestSessionToken', data.guest_session_id)
            })
    }

    getMovie(id) {
        return this.getResource(`/3/movie/${id}?api_key=${this._token}`);
    }

    getMovieOnRequest(text, page) {
        return this.getResource(`/3/search/movie/?api_key=${this._token}&query=${text}&page=${page}`);
    }

    setRateMovie(id) {
        return this.postResource(`3/movie/${id}/rating?api_key=${this._token}&guest_session_id=81c1c8f88244a8946617c49b4d4a873a`)
    }
}