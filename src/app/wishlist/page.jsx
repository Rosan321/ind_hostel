import React from 'react'
import WishListPage from './WishListPage'
import AuthGuard from '@/components/AuthGuard'

const Wishlist = () => {
  return (
    <>
      <AuthGuard>
        <WishListPage />
      </AuthGuard>
    </>
  )
}

export default Wishlist