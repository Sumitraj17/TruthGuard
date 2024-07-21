import {FaInstagram} from 'react-icons/fa6'
import {MdOutlineWhatsapp} from 'react-icons/md'
import {IoLogoLinkedin} from 'react-icons/io5'
const Footer=()=>{
    return(
        <>
            <div className='flex flex-col justify-center items-center text-black text-4xl bg-white font-bold w-full'>
                <h1 className='m-5'>Contact Us</h1>
                <ul className='flex m-4 justify-between items-center'>
                    <li className='ml-4 mr-4 transform transition-transform duration-300 hover:scale-110 hover:text-blue-500'><FaInstagram/></li>
                    <li className='ml-4 mr-4 transform transition-transform duration-300 hover:scale-110 hover:text-blue-500'><IoLogoLinkedin/></li>
                    <li className='ml-4 mr-4 transform transition-transform duration-300 hover:scale-110 hover:text-blue-500'><MdOutlineWhatsapp/></li>
                </ul>
            </div>
        </>
    )
}
export default Footer;