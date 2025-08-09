'use client'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Router, useRouter } from 'next/router'
import React from 'react'


const Customer = () => {
  const userData = JSON.parse(localStorage.getItem('Customer'))
  return (
    <div className='flex flex-col'>
      <Navbar></Navbar>
      <div>
        <h1>welcome {userData.name}</h1>
        <div className='flex m-2 p-2 gap-5'>
        <div>
          <Card className='w-72 bg-gray-300'>
            <CardHeader>
              <CardTitle>Plumber</CardTitle>
              <CardDescription>Reliable plumbing solutions for homes and businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Book Now</Button>
            </CardContent>
            <CardFooter>
              <p>By: Abhiyan</p>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className='w-72 bg-gray-300'>
            <CardHeader>
              <CardTitle>Plumber</CardTitle>
              <CardDescription>Reliable plumbing solutions for homes and businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Book Now</Button>
            </CardContent>
            <CardFooter>
              <p>By: Abhiyan</p>
            </CardFooter>
          </Card>
        </div>
        
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Customer