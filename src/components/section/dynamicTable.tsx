"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Function to generate mock data
const generateMockData = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, index) => ({
    id: start + index + 1,
    invoice: `INV${(start + index + 1).toString().padStart(3, '0')}`,
    paymentStatus: ['Paid', 'Pending', 'Unpaid'][Math.floor(Math.random() * 3)],
    totalAmount: `$${(Math.random() * 1000).toFixed(2)}`,
    paymentMethod: ['Credit Card', 'PayPal', 'Bank Transfer'][Math.floor(Math.random() * 3)],
  }))
}

export default function InfiniteTable() {
  const [invoices, setInvoices] = useState(generateMockData(0, 20))
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)

  const loadMoreInvoices = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      const newInvoices = generateMockData(page * 20, (page + 1) * 20)
      setInvoices(prevInvoices => [...prevInvoices, ...newInvoices])
      setPage(prevPage => prevPage + 1)
      setIsLoading(false)
    }, 1000) // Simulate network delay
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreInvoices()
        }
      }, // run this func when the loaderRef is in view
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current) // check if the loaderRef is in view
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current) // stop checking if the loaderRef is in view
      }
    }
  }, [isLoading, loadMoreInvoices])

  return (
    <div className="h-[400px] overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
          <TableRow ref={loaderRef}>
            <TableCell colSpan={4} className="text-center">
              {isLoading ? "Loading more..." : "Scroll to load more"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}