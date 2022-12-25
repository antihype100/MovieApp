import React, {useEffect, useState} from 'react';
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import MovieDBapi from '../../MovieDBapi';

const Rate = (props) => {
    const [rate, setRate] = useState(0);
    let movieDBApi = new MovieDBapi()

    useEffect(() => {
        if (props.ratedMoviesID >= 0) {
            setRate(props.ratedMoviesVote[props.ratedMoviesID])
        }

    })

    return (
        <Container key={props.keyID}>
            {[...Array(10)].map((item, index) => {
                let givenRating = index + 1;

                return (
                    <label>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating)
                                movieDBApi.setRateMovie(props.keyID, givenRating)
                                    .then(data => console.log(data));
                            }}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "000"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    );
};

export default Rate;