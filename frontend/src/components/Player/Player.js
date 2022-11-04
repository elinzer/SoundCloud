import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../../css/AudioPlayer.css';

const Player = (audioProp) => {
    const [songAudio, setSongAudio] = audioProp.audioProp;

    return (
        <div className='audio-container'>
            <AudioPlayer
                className={songAudio === '' ? 'no-audio' : 'audio-player'}
                autoPlay
                onPause={() => {
                    document.getElementById('now-playing').className = "fa-solid fa-circle-play";
                    document.getElementById('now-playing').id = ''
                }}
                onPlay={() => { document.getElementById('now-playing').className = "fa-solid fa-circle-pause" }}
                src={songAudio}
                onPlayError={e => alert('Audio file is invalid and could not be played')}
                showJumpControls={false}
                showFilledVolume={true}
            />
        </div>
    );
}

export default Player;
