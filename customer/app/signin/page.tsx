"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    name: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    
    // Redirect to profile page after successful sign in
    router.push("/profile")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#EBE9E4" }}>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/pics/image-removebg-preview (1).png" alt="Body Lab Logo" className="mx-auto h-auto max-w-xs mb-8" />
        </div>

        {/* Toggle Buttons */}
        <div className="flex mb-8 bg-white rounded-full p-1 shadow-sm">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 rounded-full font-medium font-shippori-antique transition-colors ${
              isLogin 
                ? "bg-gray-800 text-white" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 rounded-full font-medium font-shippori-antique transition-colors ${
              !isLogin 
                ? "bg-gray-800 text-white" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-shippori-antique">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent font-shippori-antique"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent font-shippori-antique"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent font-shippori-antique"
                placeholder="Enter OTP"
                required
              />
            </div>

           {!isLogin && (
             <div className="flex items-center justify-center">
               <button
                 type="button"
                 className="text-sm text-gray-600 hover:text-gray-800 font-shippori-antique"
               >
                 Send OTP
               </button>
             </div>
           )}

           {isLogin && (
             <div className="flex items-center justify-center">
               <button
                 type="button"
                 className="text-sm text-gray-600 hover:text-gray-800 font-shippori-antique"
               >
                 Send OTP
               </button>
             </div>
           )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {!isLogin && (
            <p className="mt-6 text-center text-sm text-gray-600 font-shippori-antique">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-gray-800 hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-gray-800 hover:underline">Privacy Policy</a>
            </p>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-800 hover:text-gray-600 transition-colors flex items-center justify-center space-x-2 font-shippori-antique">
            <ChevronLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
