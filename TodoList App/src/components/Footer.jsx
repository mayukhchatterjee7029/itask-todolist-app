import React from 'react'

const reactLogo = "src/assets/react.svg"

const Footer = () => {
    return (
        <div className='flex flex-col md:flex-row justify-around md:justify-between items-center h-[20vh] px-4 bg-emerald-700 text-emerald-50 font-[500]'>
            <span>Copyright &copy; iTask | All rights reserved.</span>
            <span className='flex gap-1 justify-between items-center'>Made with <span><img width={'20px'} src={reactLogo} alt="react logo" /></span> React </span>
        </div>
    )
}

export default Footer
