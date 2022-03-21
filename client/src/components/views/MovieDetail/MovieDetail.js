import { Row } from 'antd';
import React, { useState, useEffect } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import Favorite from './Sections/Favorite';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [movie, setMovie] = useState();
    const [casts, setCasts] = useState();
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
            });

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            });
    }, [])

    const toggleActorView = () => {
        setActorToggle(!actorToggle);
    }

    return (
        <div>
            {/* Header */}
            {
                movie &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
                    title={movie.title}
                    text={movie.overview}
                />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        movie && props.user.userData &&
                        <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} isAuth={props.user.userData.isAuth} />
                    }
                </div>
                
                {/* Movie Info */}
                {
                    movie && <MovieInfo movie={movie}/>
                }

                <br />

                {/* Actors Grid */}
                {
                    actorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            casts && casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ?
                                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </Row>
                }

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail