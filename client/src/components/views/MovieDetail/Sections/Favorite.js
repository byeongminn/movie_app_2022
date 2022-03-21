import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('숫자 정보를 가져오는데 실패했습니다.');
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는데 실패했습니다.');
                }
            })
    }, [])

    const onClickFavorite = () => {
        if (favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 지우는 것을 실패했습니다.');
                    }
                })
        } else {
            axios.post('/api/favorite/addFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에 추가하는 것을 실패했습니다.');
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{favorited ? 'Not Favorite' : `Add to Favorite ${favoriteNumber}`}</Button>
        </div>
    )
}

export default Favorite