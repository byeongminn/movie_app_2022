import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from './Sections/MainImage';
import { Row } from 'antd';

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...movies, ...response.results]);
                setMainMovieImage(response.results[0]);
                setCurrentPage(response.page);
            });
    }, [])

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${currentPage + 1}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...movies, ...response.results]);
                setCurrentPage(response.page);
            });
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {
                mainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                    title={mainMovieImage.title}
                    text={mainMovieImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {
                        movies && movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))
                    }
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
