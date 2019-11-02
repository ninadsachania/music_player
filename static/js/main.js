window.onload = function() {
    /* COLORS */
    const songBoxBackgroundColor = "#5f6769";
    const playingBackgroundColor = "#881C46";

    let nowPlayingIndex = 0;
    const audioPlayer = document.getElementById('player');

    const playButton = document.getElementById('play');
    const nextButton = document.getElementById('next');

    const songs = document.getElementsByClassName('songs');

    /* if localStorage['currentPlayingIndex'] exists load that */
    if (localStorage['currentlyPlayingIndex']) {
        const index = parseInt(localStorage['currentlyPlayingIndex']);

        console.log(`${index} is the index.`);
        nowPlayingIndex = index;
        audioPlayer.src = `/static/playlist/${songs[nowPlayingIndex].innerText}`;
    } else {
        /* load the first song into the audio player */
        audioPlayer.src = `/static/playlist/${songs[nowPlayingIndex].innerText}`;
    }

    playButton.onclick = function() {
        if (audioPlayer.paused) {
            if ('localStorage' in window && window['localStorage'] !== null) {
                localStorage['currentlyPlayingIndex'] = nowPlayingIndex;
            }
            audioPlayer.play();
            whiteOut();
            songs[nowPlayingIndex].style.backgroundColor = playingBackgroundColor;
        } else {
            audioPlayer.pause();
            whiteOut();
        }
    }

    for (let i = 0; i < songs.length; ++i) {
        songs[i].addEventListener("click", () => {
            if (nowPlayingIndex !== i) {
                nowPlayingIndex = i;
                audioPlayer.src = `/static/playlist/${songs[i].innerText}`;
                playButton.click();
            }
        });
    }

    nextButton.onclick = function() {
        if (nowPlayingIndex !== (songs.length - 1)) {
            audioPlayer.src = `/static/playlist/${songs[++nowPlayingIndex].innerText}`;
            playButton.click();
        } 
    }
    
    /* automatically play the next song after the current one ends */
    audioPlayer.onended = function() {
        nextButton.click();
    }

    /* set the background color of all song box to the same color */
    function whiteOut() {
        for (let i = 0; i < songs.length; ++i) {
            songs[i].style.backgroundColor = songBoxBackgroundColor;
        }
    }

    function previousSong() {
        if (nowPlayingIndex > 0) {
            audioPlayer.src = `/static/playlist/${songs[--nowPlayingIndex].innerText}`;
            playButton.click();
        }
    }

    /* set up global key bindings:
        * k => play/pause
        * l => Next song
        * j => Previous song
     */
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case 'k':
                playButton.click();
                break;
            case 'l':
                nextButton.click();
                break;
            case 'j':
                previousSong();
                break;
        }
    });
}

