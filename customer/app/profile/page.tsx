"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, User, CreditCard, Calendar, Receipt, Edit, X, Camera, Upload } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: "BK001",
      date: "2024-01-15",
      time: "09:00",
      class: "Mat Pilates",
      instructor: "Emma Wilson",
      status: "Completed",
      credits: 1
    },
    {
      id: "BK002", 
      date: "2024-01-12",
      time: "17:30",
      class: "Pilates Reformer",
      instructor: "Mike Chen",
      status: "Completed",
      credits: 2
    },
    {
      id: "BK003",
      date: "2024-01-10",
      time: "11:00",
      class: "Private Session",
      instructor: "Sarah Davis",
      status: "Completed",
      credits: 3
    },
    {
      id: "BK004",
      date: "2024-01-18",
      time: "14:00",
      class: "Group Class",
      instructor: "Lisa Park",
      status: "Upcoming",
      credits: 1
    }
  ])

  // Mock data - in a real app, this would come from an API
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+62 812-3456-7890",
    memberSince: "January 2024",
    remainingCredits: 12,
    totalCredits: 20,
    profilePicture: null as string | null
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load profile picture from localStorage on client side only
  useEffect(() => {
    const savedPicture = localStorage.getItem('profilePicture')
    if (savedPicture) {
      setUserData(prev => ({
        ...prev,
        profilePicture: savedPicture
      }))
    }
  }, [])

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      // Convert file to base64 data URL for persistence
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setUserData(prev => ({
          ...prev,
          profilePicture: imageUrl
        }))

        // Save to localStorage for persistence across pages
        localStorage.setItem('profilePicture', imageUrl)

        // In a real app, you would upload the file to a server here
        console.log('Profile picture uploaded:', file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    // No need to revoke URL for base64 data URLs
    setUserData(prev => ({
      ...prev,
      profilePicture: null
    }))
    // Remove from localStorage
    localStorage.removeItem('profilePicture')
  }

  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId)
    setShowCancelDialog(true)
  }

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      const booking = bookingHistory.find(b => b.id === bookingToCancel)
      if (booking) {
        // Update booking status to cancelled
        setBookingHistory(prev => 
          prev.map(b => 
            b.id === bookingToCancel 
              ? { ...b, status: "Cancelled" as const }
              : b
          )
        )
        
        // Refund credits
        setUserData(prev => ({
          ...prev,
          remainingCredits: prev.remainingCredits + booking.credits
        }))
      }
    }
    setShowCancelDialog(false)
    setBookingToCancel(null)
  }

  const cancelCancelBooking = () => {
    setShowCancelDialog(false)
    setBookingToCancel(null)
  }


  const transactionHistory = [
    {
      id: "TXN001",
      date: "2024-01-01",
      type: "Package Purchase",
      description: "Premium Plan - 20 Credits",
      amount: "IDR 250,000",
      status: "Completed"
    },
    {
      id: "TXN002",
      date: "2023-12-15",
      type: "Class Booking",
      description: "Mat Pilates - Emma Wilson",
      amount: "IDR 15,000",
      status: "Completed"
    },
    {
      id: "TXN003",
      date: "2023-12-10",
      type: "Package Purchase", 
      description: "Basic Plan - 10 Credits",
      amount: "IDR 150,000",
      status: "Completed"
    },
    {
      id: "TXN004",
      date: "2023-12-05",
      type: "Refund",
      description: "Cancelled Private Session",
      amount: "-IDR 45,000",
      status: "Processed"
    }
  ]

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "transactions", label: "Transactions", icon: Receipt }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EBE9E4" }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-gray-800 hover:text-gray-600 transition-colors flex items-center space-x-2 font-shippori-antique">
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center space-x-4">
              <img src="/pics/image-removebg-preview (1).png" alt="Body Lab Logo" className="h-6 sm:h-8" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-shippori-antique">Profile Dashboard</h1>
          <p className="text-gray-600 font-shippori-antique mt-2 text-sm md:text-base">Manage your account and view your activity</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 md:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 md:space-x-2 py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm font-shippori-antique transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-gray-800 text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon size={16} className="md:hidden" />
                    <Icon size={20} className="hidden md:block" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Account Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 font-shippori-antique">Account Details</h2>
                <button className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-shippori-antique text-sm">
                  <Edit size={14} className="md:hidden" />
                  <Edit size={16} className="hidden md:block" />
                  <span>Edit</span>
                </button>
              </div>
              
              {/* Profile Picture Section */}
              <div className="mb-6 md:mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3 md:mb-4 font-shippori-antique">Profile Picture</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {userData.profilePicture ? (
                        <img 
                          src={userData.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <User size={28} className="text-gray-400 md:hidden" />
                          <User size={32} className="text-gray-400 hidden md:block" />
                        </>
                      )}
                    </div>
                    {userData.profilePicture && (
                      <button
                        onClick={handleRemoveProfilePicture}
                        className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={12} className="md:hidden" />
                        <X size={14} className="hidden md:block" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-shippori-antique text-xs md:text-sm"
                    >
                      <Upload size={14} className="md:hidden" />
                      <Upload size={16} className="hidden md:block" />
                      <span>{userData.profilePicture ? 'Change Picture' : 'Upload Picture'}</span>
                    </button>
                    <p className="text-xs text-gray-500 font-shippori-antique">Max 5MB, JPG/PNG</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Full Name</label>
                  <p className="text-gray-800 font-shippori-antique text-sm md:text-base">{userData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Email</label>
                  <p className="text-gray-800 font-shippori-antique text-sm md:text-base break-all">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Phone Number</label>
                  <p className="text-gray-800 font-shippori-antique text-sm md:text-base">{userData.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Member Since</label>
                  <p className="text-gray-800 font-shippori-antique text-sm md:text-base">{userData.memberSince}</p>
                </div>
              </div>
            </div>

            {/* Credits Overview */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 font-shippori-antique">Remaining Credits</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <>
                      <CreditCard className="text-white" size={20} />
                      <CreditCard className="text-white hidden md:block" size={24} />
                    </>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 font-shippori-antique">{userData.remainingCredits}</p>
                    <p className="text-xs md:text-sm text-gray-600 font-shippori-antique">Credits Remaining</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs md:text-sm text-gray-600 font-shippori-antique">Total Credits</p>
                  <p className="text-base md:text-lg font-semibold text-gray-800 font-shippori-antique">{userData.totalCredits}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userData.remainingCredits / userData.totalCredits) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-4 flex justify-between text-xs md:text-sm text-gray-600 font-shippori-antique">
                <span>Used: {userData.totalCredits - userData.remainingCredits}</span>
                <span>Remaining: {userData.remainingCredits}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <div className="flex items-center space-x-3">
                  <>
                    <Calendar className="text-gray-600" size={20} />
                    <Calendar className="text-gray-600 hidden md:block" size={24} />
                  </>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 font-shippori-antique">{bookingHistory.length}</p>
                    <p className="text-xs md:text-sm text-gray-600 font-shippori-antique">Total Bookings</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <div className="flex items-center space-x-3">
                  <>
                    <Receipt className="text-gray-600" size={20} />
                    <Receipt className="text-gray-600 hidden md:block" size={24} />
                  </>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 font-shippori-antique">{transactionHistory.length}</p>
                    <p className="text-xs md:text-sm text-gray-600 font-shippori-antique">Transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3">
                  <>
                    <CreditCard className="text-gray-600" size={20} />
                    <CreditCard className="text-gray-600 hidden md:block" size={24} />
                  </>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 font-shippori-antique">Premium</p>
                    <p className="text-xs md:text-sm text-gray-600 font-shippori-antique">Current Plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 font-shippori-antique">Booking History</h2>
              <button 
                onClick={() => router.push('/#schedule')}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique text-sm self-start sm:self-auto"
              >
                Book
              </button>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Credits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookingHistory.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 font-shippori-antique">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-shippori-antique">
                        <div className="font-shippori-antique">{booking.date}</div>
                        <div className="text-xs text-gray-500 font-shippori-antique">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-shippori-antique">
                        {booking.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-shippori-antique">
                        {booking.instructor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-shippori-antique">
                        {booking.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-shippori-antique ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.status === 'Upcoming' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors font-shippori-antique"
                          >
                            <X size={14} className="mr-1" />
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {bookingHistory.map((booking) => (
                <div key={booking.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 font-shippori-antique">{booking.class}</h3>
                      <p className="text-xs text-gray-500 font-shippori-antique">{booking.id}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-shippori-antique ${
                      booking.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-shippori-antique">Date & Time:</span>
                      <span className="text-gray-800 font-shippori-antique">{booking.date} {booking.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-shippori-antique">Instructor:</span>
                      <span className="text-gray-800 font-shippori-antique">{booking.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-shippori-antique">Credits:</span>
                      <span className="text-gray-800 font-shippori-antique">{booking.credits}</span>
                    </div>
                  </div>
                  
                  {booking.status === 'Upcoming' && (
                    <div className="mt-3">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="w-full inline-flex items-center justify-center px-3 py-2 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors font-shippori-antique"
                      >
                        <X size={14} className="mr-1" />
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 font-shippori-antique">Transaction History</h2>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shippori-antique">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactionHistory.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 font-shippori-antique">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-shippori-antique">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-shippori-antique">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-shippori-antique">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium font-shippori-antique">
                        <span className={transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                          {transaction.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-shippori-antique ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 font-shippori-antique">{transaction.type}</h3>
                      <p className="text-xs text-gray-500 font-shippori-antique">{transaction.id}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-shippori-antique ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-shippori-antique">Date:</span>
                      <span className="text-gray-800 font-shippori-antique">{transaction.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-shippori-antique">Description:</span>
                      <span className="text-gray-800 font-shippori-antique text-right max-w-[60%]">{transaction.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-shippori-antique">Amount:</span>
                      <span className={`font-medium font-shippori-antique ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 md:top-20 mx-auto p-4 md:p-5 border w-11/12 md:w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-100">
                <X className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 font-shippori-antique mt-3 md:mt-4">
                Cancel Booking
              </h3>
              <div className="mt-2 px-4 md:px-7 py-3">
                <p className="text-xs md:text-sm text-gray-500 font-shippori-antique">
                  Are you sure you want to cancel this booking? Your credits will be refunded.
                </p>
              </div>
              <div className="items-center px-4 py-3 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-center">
                <button
                  onClick={confirmCancelBooking}
                  className="px-4 py-2 bg-red-600 text-white text-sm md:text-base font-medium rounded-md w-full sm:w-24 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors font-shippori-antique"
                >
                  Cancel
                </button>
                <button
                  onClick={cancelCancelBooking}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-sm md:text-base font-medium rounded-md w-full sm:w-24 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-shippori-antique"
                >
                  Keep
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
