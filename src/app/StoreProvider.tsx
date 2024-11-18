'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
// import { initializeUser } from '../lib/features/user/userSlice'
import { AppStore, makeStore } from '../lib/store'

export default function StoreProvider({
  // count,
  children,
}: {
  // count: any;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // storeRef.current.dispatch(initializeUser(count))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}