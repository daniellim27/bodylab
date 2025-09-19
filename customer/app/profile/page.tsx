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
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <img src="/pics/image-removebg-preview (1).png" alt="Body Lab Logo" className="h-8" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 font-shippori-antique">Profile Dashboard</h1>
          <p className="text-gray-600 font-shippori-antique mt-2">Manage your account and view your activity</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm font-shippori-antique transition-colors ${
                      activeTab === tab.id
                        ? "border-gray-800 text-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon size={20} />
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 font-shippori-antique">Account Details</h2>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-shippori-antique">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>
              
              {/* Profile Picture Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4 font-shippori-antique">Profile Picture</label>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {userData.profilePicture ? (
                        <img 
                          src={userData.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>
                    {userData.profilePicture && (
                      <button
                        onClick={handleRemoveProfilePicture}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
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
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-shippori-antique text-sm"
                    >
                      <Upload size={16} />
                      <span>{userData.profilePicture ? 'Change Picture' : 'Upload Picture'}</span>
                    </button>
                    <p className="text-xs text-gray-500 font-shippori-antique">Max 5MB, JPG/PNG</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Full Name</label>
                  <p className="text-gray-800 font-shippori-antique">{userData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Email</label>
                  <p className="text-gray-800 font-shippori-antique">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Phone Number</label>
                  <p className="text-gray-800 font-shippori-antique">{userData.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-shippori-antique">Member Since</label>
                  <p className="text-gray-800 font-shippori-antique">{userData.memberSince}</p>
                </div>
              </div>
            </div>

            {/* Credits Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 font-shippori-antique">Remaining Credits</h2>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <CreditCard className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 font-shippori-antique">{userData.remainingCredits}</p>
                    <p className="text-sm text-gray-600 font-shippori-antique">Credits Remaining</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-shippori-antique">Total Credits</p>
                  <p className="text-lg font-semibold text-gray-800 font-shippori-antique">{userData.totalCredits}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userData.remainingCredits / userData.totalCredits) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-4 flex justify-between text-sm text-gray-600 font-shippori-antique">
                <span>Used: {userData.totalCredits - userData.remainingCredits}</span>
                <span>Remaining: {userData.remainingCredits}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-600" size={24} />
                  <div>
                    <p className="text-2xl font-bold text-gray-800 font-shippori-antique">{bookingHistory.length}</p>
                    <p className="text-sm text-gray-600 font-shippori-antique">Total Bookings</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <Receipt className="text-gray-600" size={24} />
                  <div>
                    <p className="text-2xl font-bold text-gray-800 font-shippori-antique">{transactionHistory.length}</p>
                    <p className="text-sm text-gray-600 font-shippori-antique">Transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3">
                  <CreditCard className="text-gray-600" size={24} />
                  <div>
                    <p className="text-2xl font-bold text-gray-800 font-shippori-antique">Premium</p>
                    <p className="text-sm text-gray-600 font-shippori-antique">Current Plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 font-shippori-antique">Booking History</h2>
              <button 
                onClick={() => router.push('/#schedule')}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique text-sm"
              >
                Book
              </button>
            </div>
            
            <div className="overflow-x-auto">
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
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 font-shippori-antique">Transaction History</h2>
            </div>
            
            <div className="overflow-x-auto">
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
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 font-shippori-antique mt-4">
                Cancel Booking
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 font-shippori-antique">
                  Are you sure you want to cancel this booking? Your credits will be refunded.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={confirmCancelBooking}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors font-shippori-antique"
                >
                  Cancel
                </button>
                <button
                  onClick={cancelCancelBooking}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-24 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-shippori-antique"
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
