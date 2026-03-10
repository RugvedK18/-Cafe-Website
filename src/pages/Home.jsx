import React from 'react'
import HeroSection from '../components/Hero'
import Menu from '../components/Menu'

import Feature from '../components/Feature'
import Gallery from '../components/Gallery'
import Land from '../components/Land'
import Story from '../components/Story'
import LandingPage from '../components/LandingPage'
import Capabilities from '../components/Capabilities'
import BotanicalAlchemy from '../components/Botanical'
const App = () => {
  return (
    <div>
      <HeroSection />
<Menu />
<Capabilities />
<Feature />
<Story />
<Land />

<Gallery />
<LandingPage />
<BotanicalAlchemy />


    </div>
  )
}

export default App