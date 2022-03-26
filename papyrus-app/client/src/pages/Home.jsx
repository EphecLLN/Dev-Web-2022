import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Data from "../components/Data";

const Home = () => {
  return (
    <div>
        <Announcement />
        <Navbar />
        <Slider />
        <Data />
    </div> 
  )
}

export default Home