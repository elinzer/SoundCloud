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
                src={songAudio}
                onPlayError={e => alert('Audio file is invalid and could not be played')}
            />
        </div>
    );
}

export default Player;
