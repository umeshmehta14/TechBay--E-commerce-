import React from 'react'
import { useData } from '../../Contexts/DataContext/DataContext'

const WishList = () => {
  const {wishlist} = useData();
  console.log(wishlist);
  return (
    <div className='container top-6'>
      <h1>WishList</h1>
    </div>
  )
}
export default WishList
