import supabaseClient from '../lib/supabase.js'

export default function handler(req, res) {
    supabaseClient.auth.api.setAuthCookie(req, res)
}


//import supabase from '../lib/supabase'
//import { useState } from 'react'
//import { useRouter } from 'next/router'


//const Auth = () => {
//    const [email, setEmail] = useState()
//    const { push } = useRouter()

//    const handleSubmit = async (e) => {
//        e.preventDefault()

//        const { error } = await supabase.auth.signIn({ email })

//        if (!error) push('/')
//    }

//    return (
//        <>
//            <div className="p-12 mx-auto border rounded-lg">
//                <h3 className="text-3xl font-extrabold">Ahoy!</h3>

//                <p className="mt-4 text-sm text-gray-500">
//                    Fill in your email, we'll send you a magic link.
//                </p>

//                <form onSubmit={handleSubmit}>
//                    <input
//                        type="email"
//                        placeholder="Your email address"
//                        className="w-full p-3 mt-4 border rounded-lg focus:border-indigo-500"
//                        onChange={e => setEmail(e.target.value)}
//                    />

//                    <button
//                        type="submit"
//                        className="w-full p-3 mt-8 text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
//                    >
//                        Let's go!
//                    </button>
//                </form>
//            </div>
//        </>
//  )
//}

//export default Auth
