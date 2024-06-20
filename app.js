const form = document.querySelector('#search-form');

const getFilms = async (query) => {
    const config = {
        params: {
            q: query,
        },
    };
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);
    return res.data;
}

const imageFile = (film) => {
    return film.show.image?.medium || film.show.image?.original || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'
}

const addImages = async (query) => {
    const films = await getFilms(query);
    films.forEach(film => {
        const imgTag = document.createElement('img');
        imgTag.src = imageFile(film);
        document.body.append(imgTag);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.body.querySelectorAll('img').forEach(img => img.remove());
    const query = form.elements.query.value;
    addImages(query);
})