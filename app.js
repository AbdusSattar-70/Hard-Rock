const getSearch = () => {
    const searchText = document.getElementById('searchInput').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
    document.getElementById('searchInput').value = "";

}


const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const div = document.createElement('div');
        div.className = "search-result col-md-8 mx-auto py-4";
        div.innerHTML = `
       <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls src="${song.preview}"  type="audio/mpeg"> </audio>
                        <a href = "${song.artist.link}">LINK </a>
                       
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                            <img src = "${song.artist.picture}">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`
        songContainer.appendChild(div);
    });
}

// onlick = "getLyric('${song.artist.name}','${song.title}')"
const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
}
const displayLyrics = lyrics => {
    const songLyrics = document.getElementById("lyric");
    songLyrics.innerText = lyrics;

}