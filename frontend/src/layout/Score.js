import React from 'react'
import StarRateIcon from '@material-ui/icons/StarRate';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const Score = ({rating}) => {
    if(rating > 9){
        return <p><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /></p>
    }
    if(rating > 8 && rating < 9){
        return <p><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarHalfIcon /></p>
    }
    if(rating > 7 && rating < 8){
        return <p><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarRateIcon /></p>
    }
    if(rating > 6 && rating < 7){
        return <p><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarHalfIcon /></p>
    }
    if(rating > 5 && rating < 6){
        return <p><StarRateIcon /><StarRateIcon /><StarRateIcon /></p>
    }
    if(rating > 4 && rating < 5){
        return <p><StarRateIcon /><StarRateIcon /><StarHalfIcon /></p>
    }
    if(rating > 3 && rating < 4){
        return <p><StarRateIcon /><StarRateIcon /></p>
    }
    if(rating > 2 && rating < 3){
        return <p><StarRateIcon /><StarHalfIcon /></p>
    }
}

export default Score
