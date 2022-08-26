import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as commentActions from '../../store/comments';
import { useEffect, useState } from 'react';
import '../../css/SongPage.css'
import defaultImage from '../../images/notsoundcloud.png';

const SongPage = ({ audioProp }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [songAudio, setSongAudio] = audioProp;
    const [comment, setComment] = useState('');
    const songState = useSelector(state => state.songs);
    const song = songState.find(song => song.id == id)
    const sessionUser = useSelector(state => state.session.user);
    const commentState = useSelector(state => state.comments);
    const commentsArr = Object.values(commentState);


    const data = { id };

    useEffect(() => {
        dispatch(commentActions.getComments(data))
    }, [dispatch]);

    if (!song) {
        return "Whoops, something went wrong!"
    }

    const handleClick = (e) => {
        e.preventDefault();

        if (!comment) {
            alert(`comment can't be blank!`)
        } else if (comment.length < 2) {
            alert(`comment must be at least 2 characters!`)
        } else {
            const commentData = {
                id: song.id,
                body: comment
            }
            dispatch(commentActions.postComment(commentData))
            setComment('');
        }

    }

    const sendDelete = (e, id) => {
        e.preventDefault();
        const commentId = { id }
        dispatch(commentActions.deleteComment(commentId))

    }

    if (!sessionUser) {
        return (
            <div className='song-page-container'>
                <div className='song-card'>
                    <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
                        <img className='song-img'
                            src={song.imageUrl}
                            onError={(e) => e.target.src = defaultImage}
                        ></img>
                        <div className='play-icon-div'>
                            <i className="fa-solid fa-circle-play" onClick={() => setSongAudio(song.url)} />
                        </div>
                    </div>
                    <div><h4>{song.title}</h4></div>
                    <div>About: {song.description}</div>
                    <div className='comment-container'>Comments:
                        <ul className='comment-list'>
                            {commentsArr.map(comment =>
                                (<li key={comment.id}>{comment.body}</li>))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='song-page-container'>
            <div className='song-card'>
                <div className='image-icon-holder' style={{ position: 'relative', width: 'max-content' }}>
                    <img className='song-img' src={song.imageUrl}
                        onError={(e) => e.target.src = defaultImage}
                    ></img>
                    <div className='play-icon-div'>
                        <i className="fa-solid fa-circle-play" onClick={() => setSongAudio(song.url)} />
                    </div>
                </div>
                <div className='title'><h4>{song.title}</h4></div>
                <div className='description'>About: {song.description}</div>
                <div className='comment-container'>Comments:
                    <ul className='comment-list'>
                        {commentsArr.map(comment =>
                            (<li key={comment.id}>{comment.body} {comment.userId === sessionUser.id ? (<button className='delete-comment' onClick={(e) => sendDelete(e, comment.id)}><i className="fa-regular fa-trash-can" /></button>) : null}</li>))}
                    </ul>
                </div>
                <div className='song-comment'>Leave a comment:
                    <br />
                    <textarea className='comment-textarea'
                        placeholder='I love this song...'
                        wrap='soft'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <br />
                    <button onClick={handleClick}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default SongPage;
