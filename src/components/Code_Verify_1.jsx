import React, { useState } from 'react'
import { Code_Verify_2 } from './Code_Verify_2';

export const Code_Verify_1 = ({setPhone}) => {
    


    function handleChange(e) {
        setPhone(e.target.value)
    }

   

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="text" className='text-lg font-medium'>Phone Number</label>
            <input type="text" onChange={handleChange} required name="code" id="code" className='h-10 w-[250px] px-2 rounded-md border-[2px] border-gray-300' />

            
        </div>
    )
}
