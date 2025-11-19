import GuestsSay from '@/components/GuestSays'
import JoinCommunity from '@/components/JoinComunity'
import TrustedBy from '@/components/TrustedBy'
import WhoWeAre from '@/components/WhoWeAre'

const About = () => {
  return (
    <div className='bg-gray-100'>
      <WhoWeAre />
      <TrustedBy />
      <GuestsSay />
      <JoinCommunity />
    </div>
  )
}

export default About
