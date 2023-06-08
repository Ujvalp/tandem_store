
import { SupabaseClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { SupabaseEmp } from '../supabase/supabase'
import { useAuth } from '../context/AuthProvider'

export const Code_Verify_2 = ({phone}) => {
  const [coupondata, setCouponData] = useState([])
  const {user} = useAuth()

 

useEffect(()=> {
     couponFetch()

      async function couponFetch() {
        const {data,error} = await SupabaseEmp
        .from('emp_saving_history')
        .select()
        .eq('phone', phone)
        .eq('status', false)
        .single()
        
        
        if(data){
          // console.log(data);
          setCouponData(data)
        }

        else{
          console.log(error);
        }
      }

},[])




  return (
    <>
      <div className='flex justify-between mt-4'>
        <div className='space-y-4'>
          <h1 className='text-gray-400'>Purchase Amount</h1>
          <p className='font-medium'>₹{coupondata.purchase_amount}</p>
        </div>
        <div className='text-right space-y-4'>
          <h1 className='text-gray-400'>Discount</h1>
          <p className='font-medium'>{coupondata.discount}%   </p>
        </div>
      </div>

      <p className='text-gray-800 font-semibold text-center mt-12 mb-2'>Code :</p>
      <input readOnly type="text" name="code" id="code" value={coupondata.generated_code} className='w-full h-10 text-center outline-none text-green-600 border-2 border-gray-300 rounded-md px-2' />
    </>
  )
}
