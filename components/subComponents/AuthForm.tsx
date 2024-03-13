"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios';

interface A {
    setLoaderVisible:any,
    setRes:any
}

const AuthForm = ({ setLoaderVisible, setRes }:A )=> {
   
    const [email,setEmail] = useState("")
    const [response, setResponse] = useState(null);
    const HandleSubmit = async(e:any) => {
        setLoaderVisible(true)
        e.preventDefault();
        console.log(email)
        try {
            const res = await axios.post('/api/auth', { email });
            setResponse(res.data);
            setRes(res.data)
            
        } catch (error) {
            console.error('Error sending OTP:', error);
            setResponse(null);
        }
    }
    const HandleChange= (e:any) =>{
        e.preventDefault();
        setEmail(e.target.value)
    }

    useEffect(() => {
        if (response != null) {
            setLoaderVisible(false)
            console.log(response)
        }
    })

   
    
  return (
      <form onSubmit={HandleSubmit} className='pt-10 pl-10 pr-10 flex flex-col gap-10'>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input 
                type="email" 
                id="helper-text" 
                className="outline-none bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg border-2 focus:border-2 focus:ring-[#5500FF] focus:border-[#5500FF] block w-full p-2.5 " 
                placeholder="name@noots.com" 
                onChange={HandleChange}
                value={email}
              />
              <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-[#5500FF] hover:underline">Privacy Policy</a>.</p>
          </div>
          <div className='flex'>
              <input type="submit" className='border border-[#5500FF] h-8 w-[10rem] bg-transparent rounded-lg hover:bg-[#5500FF] hover:text-white duration-75 cursor-pointer' />
          </div>
      </form>
  )
}

export default AuthForm