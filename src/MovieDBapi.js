export default class MovieDBapi {
    _baseApi = 'https://api.themoviedb.org';
    _token = '08559ab4802619d1ea086ca807344fd9';

    async getResource(url) {

        const res = await fetch(`${this._baseApi}${url}`)
        if (!res.ok) {
            throw new Error()
        }
        return await res.json()
    }

    getMovie(id) {
        return this.getResource(`/3/movie/${id}?api_key=${this._token}`)
    }

    getImgForMovie(id) {
        return this.getResource(`/3/movie/${id}/images?api_key=${this._token}`)
    }
}

