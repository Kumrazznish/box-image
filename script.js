console.log('Let\'s write JavaScript');
let currentsong=new Audio();
async function getsongs() {
    let a = await fetch("http://127.0.0.1:3002/clone_of-spotify-mainsongs/songs")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []; // Corrected the array name from 'song' to 'songs'
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const playMusic=(track)=>{
    //let audio = new Audio("/songs/" + track)
    currentsong.src="/songs/" + track
    currentsong.play()
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}
async function main(){
    
    let songs=await getsongs()
    console.log(songs)
    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll ("%20"," ")}</div>
                                <div>_.kum.rajnish._</div>
                            </div>
                            <div class="playnow">
                                <div>play now</div>
                                <img class="invert" src="play.svg" alt="">
                            </div> </li>`;
        
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
        
    })
    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src="pause.svg"
        }
        else{
            currentsong.pause()
            play.src="play.svg"
        }
    })
   
}
main()
