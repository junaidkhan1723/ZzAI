import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div 
      id='plans' 
      className='scroll-mt-24 max-w-2xl mx-auto z-20 my-20'
    >
      <div className='text-center'>
        <h2 className='text-slate-900 text-3xl md:text-4xl font-semibold'>
          Choose Your Plan
        </h2>
        <p className='text-sm md:text-base text-gray-700 max-w-lg mx-auto mt-2'>
          Get started today and unlock premium features when you’re ready.
        </p>
      </div>

      <div className='mt-14 max-sm:mx-8'>
        <PricingTable />
      </div>
    </div>
  )
}

export default Plan
