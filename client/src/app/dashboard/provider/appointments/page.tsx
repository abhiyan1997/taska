'use client'
import Sidebar from '@/components/sidebar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Appointments = () => {
    const localData= JSON.parse(localStorage.getItem('Provider'))
    const providerId= localData._id
    const [data, setData]= useState([])
    useEffect(() => {
        const fetchData= async()=>{
            const res= await axios.get(`http://localhost:8080/getappointments/${providerId}`)
            setData(res.data.message)
        }
        fetchData()
    }, [])
    
    return (
        <div className='flex gap-2'>
            <Sidebar></Sidebar>
            <div>
                <h1 className='m-4 p-4 text-[30px] font-bold'>Your Appointments</h1>
                <div className='m-4 p-4'>
                <Table>
                    <TableCaption>Your Appointments</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">SN</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Phone Number </TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Timing</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    {data.map((item,index)=>(
                        <TableBody key={index}>
                        <TableRow>
                            <TableCell className="font-medium">{index+1}</TableCell>
                            <TableCell>{item.service}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.customername}</TableCell>
                            <TableCell>{item.phonenumber}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.timing}</TableCell>
                            <TableCell className="text-right">Rs. {item.price}/hr</TableCell>
                        </TableRow>
                    </TableBody>
                    ))}
                    
                </Table>
                </div>
            </div>
        </div>
    )
}

export default Appointments