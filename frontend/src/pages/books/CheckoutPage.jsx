import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2)
  const {currentUser} = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isChecked, setIsChecked] = useState(false)

  const onSubmit = (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice: totalPrice
    }
    console.log(newOrder)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <h2 className="font-bold text-2xl text-white">Checkout</h2>
              <div className="mt-4 flex space-x-8">
                <div className="bg-white/20 rounded-lg p-3 text-white">
                  <p className="text-sm opacity-80">Total Price</p>
                  <p className="text-2xl font-bold">${totalPrice}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-white">
                  <p className="text-sm opacity-80">Items</p>
                  <p className="text-2xl font-bold">{cartItems.length}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
              <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        disabled
                        defaultValue={currentUser?.email}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        {...register("phone", { required: "Phone number is required" })}
                        type="tel"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        {...register("address", { required: "Address is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          {...register("city", { required: "City is required" })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          {...register("state", { required: "State is required" })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          {...register("country", { required: "Country is required" })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zipcode</label>
                        <input
                          {...register("zipcode", { required: "Zipcode is required" })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <Link className="text-blue-600 hover:text-blue-700 hover:underline">Terms & Conditions</Link>
                    {" "}and{" "}
                    <Link className="text-blue-600 hover:text-blue-700 hover:underline">Shopping Policy</Link>
                  </label>
                </div>

                <button
                  disabled={!isChecked}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${
                    isChecked 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } transition-all duration-200`}
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage