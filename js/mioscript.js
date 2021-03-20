/*
const carica = (event) => {

    //nuovoTAG si trova nella RAM
    let nuovoTAG = document.createElement("input") // <input>
    nuovoTAG.setAttribute("type", "button") //<input type='button'>
    nuovoTAG.setAttribute("value", "PIPPO") //<input type='button' value='PIPPO'>

    //Appendiamo (In fondo al body) l'elemento nuovoTAG
    let mioBody = document.querySelector("body")
    mioBody.appendChild(nuovoTAG)

}

const caricaFoto = () => {
    let url = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    let nuovoTAG = document.createElement("img") // <img>
    nuovoTAG.setAttribute("src", url) //<img src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'>


    //Appendiamo (In fondo al body) l'elemento nuovoTAG

    let mioBody = document.querySelector("body")
    mioBody.appendChild(nuovoTAG)
}

*/


let giusti = 0;
let errori = 0;

let errori_mancanti = 2;
let pezzi_mancanti = 6;

let check_amount = 0;

let quadrato_id = "";
let destinazione_id = "";

let error_sound_wav = "./sounds/mixkit-horror-lose-2028.wav";
let ok_sound_wav = "./sounds/mixkit-unlock-game-notification-253.wav";

/* TODO: clicco su rosso, vale 100, dove lascio deve valere meno 100. Se risultato è 0, allora
    è giusto, altrimenti no
*/

const setup_game = () => {
    location.reload();
}

const allowDrop = (ev) => {
    ev.preventDefault();
}

const drag = (ev) => {
    console.log("==================");
    quadrato_id = ev.target.id;
    check_amount = document.getElementById(quadrato_id).getAttribute("amount");

    console.log("Amount: " + check_amount);

    console.log("[drag]Target: " + quadrato_id);
    ev.dataTransfer.setData("source_id", quadrato_id);
}

// [drag]Target: origine_verde
// [drop]Target: dest_verde

const drop = (ev) => {
    ev.preventDefault();
    destinazione_id = ev.target.id;
    console.log("[drop] DESTINAZIONE: " + destinazione_id);

    check_amount -= document.getElementById(destinazione_id).getAttribute("amount");

    var sound_player = new Audio();

    if (check_amount == 0) {
        console.log("OK");
        var source_id = ev.dataTransfer.getData("source_id");
        ev.target.appendChild(document.getElementById(source_id));
        sound_player.src = ok_sound_wav;
        pezzi_mancanti--;
        check_win();
    } else {
        console.log("KO");
        sound_player.src = error_sound_wav;
        errori_mancanti--;
        check_errori();
    }
    sound_player.play();


}

const check_errori = () => {
    let errori_mancanti_html = document.getElementById("errori_mancanti");
    errori_mancanti_html.innerHTML = errori_mancanti;
    console.log("Ancora " + errori_mancanti + " errori ammessi.");
    if (errori_mancanti <= 0) {
        you_lose();
    }
}

const check_win = () => {
    let pezzi_mancanti_html = document.getElementById("pezzi_mancanti");
    pezzi_mancanti_html.innerHTML = pezzi_mancanti;
    console.log("Mancano " + pezzi_mancanti + " pezzi.");
    if (pezzi_mancanti <= 0) {
        you_win();
    }
}

const you_lose = () => {
    let img = document.getElementById("final_image");
    img.src = "./images/hai_perso.bmp";
}

const you_win = () => {
    let img = document.getElementById("final_image");
    img.src = "./images/hai_vinto.bmp";
}