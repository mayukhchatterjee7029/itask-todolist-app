import React from 'react'

const reactLogo = "src/assets/react.svg"

const Navbar = () => {
    return (
        <nav className='flex py-4 px-6 bg-emerald-600 text-white items-center justify-between'>
            <span className='flex gap-2'>
                <img width={'32px'} className='animate-[spin_8s_infinite]' src={reactLogo} alt="react logo" />
                <a href="/"><span className='font-bold text-2xl'>iTask</span></a>
            </span>
            <ul className='flex p-1 gap-4'>
                <a href="/"><li className='hover:font-[700] font-[600] text-lg text-shadow-sm cursor-pointer transition-all duration-50'>Home</li>
                </a>
                <a href="/"><li className='hover:font-[700] font-[600] text-lg text-shadow-sm cursor-pointer transition-all duration-50'>Your tasks</li>
                </a>
            </ul>

        </nav>
    )
}

export default Navbar
