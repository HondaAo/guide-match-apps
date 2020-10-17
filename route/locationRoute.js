const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    const city = req.query['city'].toString()
    const country = req.query['country']
    console.log(city)
    if( city === 'Hanoi'){
        const place = {
            lat: 21.033333,
            lng: 105.85
        }
        res.json(place)
    }
    if( city === 'Kualalumpur'){
        const place = {
            lat: 3.140853,
            lng: 101.693207
        }
        res.json(place)
    }
    if( city === 'Singapore'){
        const place = {
            lat: 1.287953,
            lng: 103.851959
        }
        res.json(place)
    }
    if( city === 'Danang'){
        const place = {
            lat: 16.0544,
            lng: 108.221
        }
        res.json(place)
    }
    if( city === 'Malacca'){
        const place = {
            lat: 1.230,
            lng: 102.30
        }
        res.json(place)
    }
    if( city === 'Borneo'){
        const place = {
            lat: 3.3547,
            lng: 117.5965
        }
        res.json(place)
    }
    if( city === 'HoChiMinh'){
        const place = {
            lat: 10.762622,
            lng: 106.660172
        }
        res.json(place)
    }
    // if( city === 'Bangkok'){
    //     const place = {
    //         lat:,
    //         lng:,
    //     }
    //     res.json(place)
    // }
    // if( city === 'Pucket'){
    //     const place = {
    //         lat:,
    //         lng:,
    //     }
    //     res.json(place)
    // }
    // if( city === 'Koh Samui'){
    //     const place = {
    //         lat:,
    //         lng:,
    //     }
    //     res.json(place)
    // }
    // if( city === 'Chiang Mai'){
    //     const place = {
    //         lat:,
    //         lng:,
    //     }
    //     res.json(place)
    // }
})
router.get('/list',(req,res)=>{
    const destinations = [
        {
            country: 'Singapore',
            city: 'Singapore',
            image: 'https://images.unsplash.com/photo-1555912881-1ecd82307e0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: true
        },
        {
            country: 'Vietnam',
            city: 'Hanoi',
            image: 'https://images.unsplash.com/photo-1542732450-e0859ec20080?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: false 
        },
        {
            country: 'Vietnam',
            city: 'HoChiMinh',
            image: 'https://images.unsplash.com/photo-1561842080-2b1aa9060ea7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            isPopular: true  
        },
        {
            country: 'Vietnam',
            city: 'Danang',
            image: 'https://images.unsplash.com/photo-1564596823821-79b97151055e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: true
        },
        {
            country: 'Malaysia',
            city: 'Kualalumpur',
            image: 'https://images.unsplash.com/photo-1472017053394-b29fded587cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: true
        },
        {
            country: 'Malaysia',
            city: 'Malacca',
            image: 'https://images.unsplash.com/photo-1589733000502-225e3f26fb8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: false
        },
        {
            country: 'Thailand',
            city: 'Bangkok',
            image: 'https://images.unsplash.com/photo-1566830646346-908d87490bba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: false
        },
        {
            country: 'Thailand',
            city: 'Chiang Mai',
            image: 'https://images.unsplash.com/photo-1513568720563-6a5b8c6caab3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: false
        },
        {
            country: 'Thailand',
            city: 'Koh Samui',
            image: 'https://images.unsplash.com/photo-1587876428420-fe2f4a39c694?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: false
        },
        {
            country: 'Thailand',
            city: 'Pucket',
            image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60https://images.unsplash.com/photo-1587876428420-fe2f4a39c694?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isPopular: false
        },

    ]
    res.json(destinations)
})
module.exports = router;