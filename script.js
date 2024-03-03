let CurrentSong = new Audio();
async function getsongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as[3].href);
    let songs = [];

    const filter = Array.from(as).filter((val, ind) => val.href.endsWith("mp3"));
   
     for(const val of filter) {
         songs.push(val.href);
     }

     return songs
}



const playMusic = (track)=>{
    CurrentSong.src = "/Songs/" + track;
    CurrentSong.play();
    play.src = "pause.svg";
}

async function main(){

    let songs = await getsongs();
    console.log(songs);

    let songsUL = document.querySelector(".songslist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        let removeLink = song.replaceAll("http://127.0.0.1:5500/songs/" , " ");
        let removeOth = removeLink.replaceAll("%2C" , " ");
        let remove26 = removeOth.replaceAll("%26" , " ");
        songsUL.innerHTML = songsUL.innerHTML + 
        `<li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${remove26.replaceAll("%20" , " ")}</div>
            <div>zaid</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="play.svg" alt="">
        </div></li>`;
    }

    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e =>{
        e.addEventListener("click" , element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            
        })
    })

    play.addEventListener("click" , ()=>{
        if(CurrentSong.paused){
            CurrentSong.play();
            play.src = "pause.svg"
        }
        else{
            CurrentSong.pause();
            play.src = "play.svg"
        }
    })

}

main();


