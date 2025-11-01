import React from 'react'
import HostelCard from './HostelCard'
import { hostels } from '@/lib/utils/hotels'

const SimilarLike = () => {
  return (
    <div className='mt-6'>
        <section className='flex items-center justify-between'>
            <h1 className='text-[#000000] text-2xl lg:text-[40px] font-bold'>Similar Stays You Might Like</h1>
            <button className='bg-[#F1FF51] text-[#1A1A1A] text-base font-semibold rounded-full px-6 py-3'>View All</button>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {hostels.map((hostel) => (
                  <HostelCard key={hostel.id} {...hostel} />
                ))}
              </div>
        {/* <HostelCard title={"Urban Nest Hostel — Single Bed"} location={"Urban Nest Hostel — Single Bed"} rating={"4.2"} price={4999} /> */}
    </div>
  )
}

export default SimilarLike