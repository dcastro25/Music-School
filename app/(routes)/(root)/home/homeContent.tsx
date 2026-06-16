import React from 'react'
import { About, CoursesSection, HeroSection, HeroSectionMobile} from './Components'


export function HomeContent() {
  return (
    <div>
    <HeroSectionMobile/>
      <HeroSection/>
      <About/>
      <CoursesSection/>
    </div>
  )
}
