"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'

interface A {
    res:any
}

export default function OTPForm({res}:A) {
    const router = useRouter();
    const [otp, setOTP] = useState(['', '', '', '']);
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleChange = (index: number, value: string, event: any) => {
        // Check if backspace is pressed and move focus to the previous input box
        if (event.key === 'Backspace' && index > 0 && refs[index].current && value === '') {
            setOTP(prevOTP => {
                const newOTP = [...prevOTP];
                newOTP[index - 1] = '';
                return newOTP;
            });
            refs[index - 1].current?.focus();
            return;
        }

        // Only allow numeric input
        if (/^\d*$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            // Move focus to the next input field if current one is filled
            if (value !== '' && index < 3 && refs[index + 1].current) {
                refs[index + 1].current?.focus();
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Concatenate the OTP digits
        const enteredOTP = otp.join('');
        if(enteredOTP==res.otp){
            // alert("Verified")
            router.push('/mainApp');
        }else{
            alert("Invalid OTP");
        }
        // console.log('Entered OTP:', enteredOTP);
        // Add your logic to submit the OTP to the server
    };
    const handleNullSubmit = (e:any) =>{
        e.preventDefault();
        console.log('enter Full otp')
    }

    const isSubmitDisabled = otp.some(digit => digit === '');

    return (
        <div className='flex flex-col gap-5 pt-10'>
            <h1 className='text-md text-center font-semibold'>Enter OTP</h1>
            <form onSubmit={isSubmitDisabled?handleNullSubmit:handleSubmit} className='flex flex-col gap-5 items-center' >
                <div className='flex flex-row gap-3'>
                    {otp.map((digit, index) => (
                        <input
                            className='focus:ring-[#5500FF] focus:border-[#5500FF] outline-none w-10 h-10 text-center border border-black rounded-lg'
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            ref={refs[index]}
                            onKeyDown={(e) => handleChange(index, digit, e)}
                            onChange={(e) => handleChange(index, e.target.value, e)}
                        />
                    ))}
                </div>
                <div className='flex' >
                    <input type="submit" className={`border ${isSubmitDisabled?"cursor-not-allowed":"cursor-pointer"}  border-[#5500FF] h-8 w-[10rem] bg-transparent rounded-lg hover:bg-[#5500FF] hover:text-white duration-75 `} />
                </div>
            </form>
        </div>
    );
}
