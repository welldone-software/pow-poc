import $ from 'jquery';

let sounds = {
    trash: '81/81152_1218676-lq',
    lowBloop: '103/103336_1747508-lq',
    highBloop: '124/124902_1707984-lq',
    buzzer: '186/186896_2055001-lq',
}

$(function(){

    Object.keys(sounds).forEach(key =>
        sounds[key] = $(`<audio src="https://freesound.org/data/previews/${sounds[key]}.mp3"></audio>`)
            .appendTo(document.body)[0]
    )
})



export function playTrash(){
    sounds.trash.play();
}

export function playLowBloop(){
    sounds.lowBloop.play();
}

export function playHighBloop(){
    sounds.highBloop.play();
}

export function playBuzzer(){
    sounds.buzzer.play();
}

