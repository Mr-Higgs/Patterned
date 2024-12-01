'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../lib/supabase'
import { initiateStripeCheckout } from '../../utils/stripe'

export default function Earnings() {
  const [earnings, setEarnings] = useState([])
  //const [totalEarnings, setTotalEarnings] = useState(0)

  useEffect(() => {
    fetchEarnings()
  }, [])

  const fetchEarnings = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('earnings')
      .select('*, jobs(*)')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    if (error) console.error('Error fetching earnings:', error)
    else {
      setEarnings(data)
      //setTotalEarnings(data.reduce((total, earning) => total + earning.amount, 0))
    }
  }

  const totalEarnings = useMemo(() => {
    return earnings.reduce((total, earning) => total + earning.amount, 0)
  }, [earnings])

  const handleCashOut = async () => {
    try {
      await initiateStripeCheckout(totalEarnings * 100) // Convert to cents
    } catch (error) {
      console.error('Error initiating cash out:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Earnings</h2>
      <div className="bg-primary text-background p-4 rounded">
        <p className="text-xl">Current Balance: ${totalEarnings.toFixed(2)}</p>
        <button
          onClick={handleCashOut}
          className="mt-2 bg-background text-primary px-4 py-2 rounded hover:bg-gray-200"
        >
          Cash Out
        </button>
      </div>
      <div className="space-y-4">
        {earnings.map((earning) => (
          <div key={earning.id} className="border rounded p-4 space-y-2">
            <h3 className="text-xl font-semibold">{earning.jobs.title}</h3>
            <p>Date: {new Date(earning.date).toLocaleDateString()}</p>
            <p>Amount: ${earning.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

