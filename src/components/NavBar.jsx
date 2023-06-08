import React, { useEffect, useState } from 'react'
import logo from '../assets/images/tdm_icon.svg'
import { IoMdCloseCircleOutline, IoMdSearch } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

const NavBar = () => {

  const [navToggle, setNavToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchClose, setSearchClose] = useState(false)
   const { signOut } = useAuth()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate()

  const handleScroll = () => {

    const currentScrollPos = window.scrollY

    if (currentScrollPos > prevScrollPos) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  })

 

  return (
    <>
      <section className={`hidden md:block sticky z-10 duration-500 ${visible ? 'top-0' : '-top-40 sticky'}`}>
        <nav className={`mainNav bg-[#15213A] h-20 flex justify-center items-center`}>
          <div className='max-w-[1280px] w-full h-full px-8 py-4 flex justify-between items-center gap-8 text-white'>
            <img onClick={() => navigate("/")} className='cursor-pointer' src={logo} alt="tandem-logo" width={50} height={50} />

            <button type='button' 
            onClick={signOut} 
            className='text-sm duration-300 hover:text-gray-300 font-semibold border border-white hover:border-gray-300 rounded-full py-3 px-14'>Log Out</button>

          </div>
        </nav>
      </section>


      {/* responsive NavBar */}
      <section className='block md:hidden'>
        <nav className={`sticky bg-[#15213A] h-20 flex justify-center items-center duration-500 z-10`}>
          <div className='max-w-[1280px] w-full h-full p-4 flex justify-between items-center gap-8 text-white'>
            <img onClick={() => navigate("/")} className='cursor-pointer' src={logo} alt="tandem-logo" width={50} height={50} />

            <section className={`fixed flex flex-col gap-12 justify-center items-center text-xl top-20 duration-300 ${navToggle ? "right-0" : "-right-[600px]"} z-40 bg-blue-950/95 w-full h-[calc(100vh-5rem)]`}>

              <button type='button' 
              onClick={signOut} 
              className='duration-300 hover:text-gray-300 font-semibold border border-white hover:border-gray-300 rounded-full py-3 w-32'>Log Out</button>

            </section>

          </div>
        </nav>
      </section>

    </>
  )
}

export default NavBar