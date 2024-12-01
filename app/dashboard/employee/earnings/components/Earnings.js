'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../../../lib/supabase'
import { initiateStripeCheckout } from '../../../../utils/stripe'
import { DollarSign, Calendar } from 'lucide-react'

export default function Earnings() {
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [earnings, setEarnings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('earnings')
          .select('*')
          .order('date', { ascending: false })

        if (error) {
          console.error('Error fetching earnings:', error)
        } else {
          const total = data.reduce((sum, earning) => sum + earning.amount, 0)
          setTotalEarnings(total)
          setEarnings(data)
        }
      } catch (error) {
        console.error('Error fetching earnings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEarnings()
  }, [])

  const handleCashOut = async () => {
    if (totalEarnings > 0) {
      try {
        const { error } = await initiateStripeCheckout(totalEarnings)
        if (error) {
          console.error('Error initiating Stripe checkout:', error)
        }
      } catch (error) {
        console.error('Error initiating Stripe checkout:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current Balance</h2>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-primary">${totalEarnings.toFixed(2)}</p>
          <button
            onClick={handleCashOut}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            Cash Out
          </button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Earnings</h2>
        <div className="space-y-4">
          {earnings.map((earning) => (
            <div key={earning.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
              <div>
                <h3 className="font-medium text-gray-900">{earning.jobs.title}</h3>
                <div className="flex items-center text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(earning.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center text-primary font-semibold">
                <DollarSign className="w-5 h-5 mr-1" />
                <span>{earning.amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

