'use client'
import React from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
    const {id} =  useParams();
  return (
    <div>
      <p>Welcome to the product details of product {id}</p>
    </div>
  )
}

export default Page