import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock subscription data
const MOCK_SUBSCRIPTION = {
  plan: 'Pro',
  price: '$29',
  interval: 'month',
  status: 'active' as const,
  billingPeriod: 'Monthly',
  currentPeriodStart: new Date('2025-12-01'),
  currentPeriodEnd: new Date('2026-01-01'),
  renewalDate: new Date('2026-01-01'),
}

const MOCK_BILLING = {
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zip: '94102',
  country: 'United States',
}

const MOCK_PAYMENT = {
  brand: 'Visa',
  last4: '4242',
  expMonth: 12,
  expYear: 2027,
}

export function Subscription() {
  const [isEditingBilling, setIsEditingBilling] = useState(false)
  const [billingInfo, setBillingInfo] = useState(MOCK_BILLING)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditingBilling(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        to="/account"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Account</span>
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Subscription & Billing</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Current Plan</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{MOCK_SUBSCRIPTION.plan}</p>
              <p className="text-sm text-gray-500">
                {MOCK_SUBSCRIPTION.price}/{MOCK_SUBSCRIPTION.interval}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 capitalize">
              {MOCK_SUBSCRIPTION.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Billing Period</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{MOCK_SUBSCRIPTION.billingPeriod}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Renewal Date</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{formatDate(MOCK_SUBSCRIPTION.renewalDate)}</p>
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Change Plan
            </button>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Billing Information</h2>
          {!isEditingBilling && (
            <button
              onClick={() => setIsEditingBilling(true)}
              className="text-sm text-primary hover:underline"
            >
              Edit
            </button>
          )}
        </div>
        <div className="p-4">
          {isEditingBilling ? (
            <form onSubmit={handleBillingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={billingInfo.name}
                  onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={billingInfo.address}
                  onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={billingInfo.state}
                    onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={billingInfo.zip}
                    onChange={(e) => setBillingInfo({ ...billingInfo, zip: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={billingInfo.country}
                    onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingBilling(false)}
                  className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="text-gray-900">{billingInfo.name}</p>
              <p className="text-gray-600">{billingInfo.email}</p>
              <p className="text-gray-600">{billingInfo.address}</p>
              <p className="text-gray-600">
                {billingInfo.city}, {billingInfo.state} {billingInfo.zip}
              </p>
              <p className="text-gray-600">{billingInfo.country}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Payment Method</h2>
          <button className="text-sm text-primary hover:underline">
            Update
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              {MOCK_PAYMENT.brand === 'Visa' ? (
                <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#1A1F71" />
                  <path d="M18.5 21.5L20.5 10.5H23.5L21.5 21.5H18.5Z" fill="white" />
                  <path d="M31.5 10.7C30.9 10.5 30 10.3 28.9 10.3C25.9 10.3 23.8 11.8 23.8 14C23.8 15.6 25.3 16.5 26.4 17C27.6 17.6 28 18 28 18.5C28 19.3 27 19.7 26.1 19.7C24.8 19.7 24.1 19.5 23 19L22.5 18.8L22 21.6C22.8 22 24.2 22.3 25.7 22.3C28.9 22.3 31 20.8 31 18.5C31 17.2 30.2 16.2 28.5 15.4C27.5 14.9 26.8 14.5 26.8 14C26.8 13.5 27.4 13 28.5 13C29.5 13 30.2 13.2 30.7 13.4L31 13.5L31.5 10.7Z" fill="white" />
                  <path d="M36.5 10.5H34.2C33.5 10.5 32.9 10.7 32.6 11.4L28 21.5H31.2L31.8 19.8H35.7L36.1 21.5H39L36.5 10.5ZM32.7 17.5C32.9 16.9 34 14 34 14C34 14 34.3 13.2 34.5 12.7L34.7 14L35.4 17.5H32.7Z" fill="white" />
                  <path d="M16.5 10.5L13.5 18L13.2 16.6C12.6 14.8 11 12.8 9.2 11.8L12 21.5H15.2L19.7 10.5H16.5Z" fill="white" />
                  <path d="M11 10.5H6L6 10.7C9.8 11.6 12.4 14 13.2 16.6L12.3 11.4C12.2 10.7 11.6 10.5 11 10.5Z" fill="#F9A51A" />
                </svg>
              ) : (
                <span className="text-xs font-medium text-gray-600">{MOCK_PAYMENT.brand}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {MOCK_PAYMENT.brand} ending in {MOCK_PAYMENT.last4}
              </p>
              <p className="text-xs text-gray-500">
                Expires {MOCK_PAYMENT.expMonth}/{MOCK_PAYMENT.expYear}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="pt-4">
        <button className="text-sm text-red-600 hover:underline">
          Cancel Subscription
        </button>
      </div>
    </div>
  )
}
