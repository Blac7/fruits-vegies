import React, { useEffect, useState } from 'react'

const Ratings = ({rating}) => {
    const [ratingColor, setRatingColor] = useState({color: "yellow"})
    const [ratingComp5, setRatingComp5] = useState("fas fa-star")
    const [ratingComp4, setRatingComp4] = useState("fas fa-star")
    const [ratingComp3, setRatingComp3] = useState("fas fa-star")
    const [ratingComp2, setRatingComp2] = useState("fas fa-star-half-alt")
    const [ratingComp1, setRatingComp1] = useState("far fa-star")

    const setStars = rating => {
        if(rating == 5.0) {
            setRatingColor({color: "yellow"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("fas fa-star")
            setRatingComp2("fas fa-star")
            setRatingComp1("fas fa-star")
        } 
        else if(rating < 5.0 && rating >= 4.5) {
            setRatingColor({color: "yellow"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("fas fa-star")
            setRatingComp2("fas fa-star")
            setRatingComp1("fas fa-star-half-alt")
        } 
        else if(rating < 4.5 && rating >= 4.0) {
            setRatingColor({color: "yellow"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("fas fa-star")
            setRatingComp2("fas fa-star")
            setRatingComp1("far fa-star")
        } 
        else if(rating < 4.0 && rating >= 3.5) {
            setRatingColor({color: "yellow"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("fas fa-star")
            setRatingComp2("fas fa-star-half-alt")
            setRatingComp1("far fa-star")
        } 
        else if(rating < 3.5 && rating >= 3.0) {
            setRatingColor({color: "orange"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("fas fa-star")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        }
        else if(rating < 3.0 && rating >= 2.5) {
            setRatingColor({color: "orange"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("fas fa-star-half-alt")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        } 
        else if(rating < 2.5 && rating >= 2.0) {
            setRatingColor({color: "orange"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star")
            setRatingComp3("far fa-star")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        }
        else if(rating < 2.0 && rating >= 1.5) {
            setRatingColor({color: "red"})
            setRatingComp5("fas fa-star")
            setRatingComp4("fas fa-star-half-alt")
            setRatingComp3("far fa-star")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        } 
        else if(rating < 1.5 && rating >= 1.0) {
            setRatingColor({color: "red"})
            setRatingComp5("fas fa-star")
            setRatingComp4("far fa-star")
            setRatingComp3("far fa-star")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        }
        else if(rating < 1.0 && rating >= 0.5) {
            setRatingColor({color: "red"})
            setRatingComp5("fas fa-star-half-alt")
            setRatingComp4("far fa-star")
            setRatingComp3("far fa-star")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        } 
        else if(rating < 0.5 && rating >= 0.0) {
            setRatingColor({color: "red"})
            setRatingComp5("far fa-star")
            setRatingComp4("far fa-star")
            setRatingComp3("far fa-star")
            setRatingComp2("far fa-star")
            setRatingComp1("far fa-star")
        }
    }

    useEffect(() => {
        setStars(rating)
    }, [rating])

    return (
        <>
            <i style={ratingColor} className={ratingComp5}></i>
            <i style={ratingColor} className={ratingComp4}></i>
            <i style={ratingColor} className={ratingComp3}></i>
            <i style={ratingColor} className={ratingComp2}></i>
            <i style={ratingColor} className={ratingComp1}></i>
        </>
    )
}

export default Ratings
