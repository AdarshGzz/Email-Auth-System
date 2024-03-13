"use client"
import React,{useState} from 'react'
import SVG from '@/public/authS.svg'
import Image from 'next/image'
import LavitationBox from '@/components/subComponents/lavitation'
import AuthForm from '@/components/subComponents/AuthForm'
import OTPForm from './subComponents/OtpForm'
import Loder from './subComponents/Loder'
const AuthPage = () => {
   const [res,setRes] = useState(null)
   const [loderVisible,setLoaderVisible] = useState<boolean>(false)
//    const [otpFormVisible,setOtpFormVisible] = useState<boolean>(false)
   console.log(res?res:null)

    const handleResponse = (response:any) => {
        setRes(response);
        setLoaderVisible(false); // Hide loader when response is received
    };
    return (
        <main className='overscroll-none w-full h-screen p-3 sm:p-10 bg-[#7188e4]  '>
            <div className='flex flex-col sm:flex-row h-[99%] justify-between sm:h-[95%] w-full rounded-2xl overflow-hidden border-2 border-[#5500FF] '>
                <div className='md:w-[40%] sm:w-[60%] bg-[#E8ECEF] p-3 h-full '>
                    <div className='flex flex-row items-center bg-[#7188e4] h-[4rem] w-[9rem] rounded-[7rem] p-4 gap-2'>
                        {/* <div className='h-10 w-10 rounded-full bg-[#5500FF] text-white font-extrabold flex justify-center items-center'>@</div> */}
                        <div className='font-extrabold text-lg text-white'>Demo Auth</div>
                    </div>
                    <div className='flex flex-col gap-3 pt-10 pl-10'>
                        <div className=' text-3xl font-bold text-[#000000ae]'>Welcome !</div>
                        <div className=' text-sm font-bold text-[#00000093]'>Just verify and Start </div>
                    </div>
                    {loderVisible ? (
                        <Loder />
                    ) : res !== null ? (
                        <OTPForm res={res} />
                    ) : (
                        <AuthForm setLoaderVisible={setLoaderVisible} setRes={handleResponse} />
                    )}
                </div>
                <div className='md:w-[60%] h-full sm:w-[40%] bg-[#5500FF] p-3 flex items-center justify-center'>
                    <LavitationBox>
                        <Image src={SVG} alt='svg' width={600} />
                    </LavitationBox>
                </div>
            </div>
        </main>
    )
}

export default AuthPage