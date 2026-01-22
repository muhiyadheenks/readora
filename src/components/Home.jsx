import React from 'react'

import Hero from './Hero/Hero'
import Banner from './Banner/Banner'
import TopBooks from './TopBooks/TopBooks'

function Home() {
    return (
        <div>
            <Hero />
            <TopBooks />
            <Banner />
        </div>
    )
}

export default Home
