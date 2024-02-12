import React from 'react'
import { fetchCardData, fetchLatestInvoices, fetchRevenue  } from '@/app/lib/data'
import RevenueChart from '../../ui/dashboard/revenue-chart';
import LatestInvoices from '../../ui/dashboard/latest-invoices';
import CardWrapper, { Card } from '../../ui/dashboard/cards';
import { Suspense } from 'react';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { Inter, Lusitana } from 'next/font/google';
import { lusitana } from '@/app/ui/fonts';
import { Prompt } from 'next/font/google';


const prompt = Prompt({subsets:['latin'],weight:"400"})
async function Page() {
  return (
    <main>
      <h1 className={`${prompt.className}`}>Dashboard</h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
       <Suspense fallback={<>{Array.from({length:4}).map((it,idx)=> <CardSkeleton key={idx}/>)}</>}>
          <CardWrapper/> {/* dynamic component*/}
       </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton   />}>
          <RevenueChart /> {/* dynamic component*/}
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton></LatestInvoicesSkeleton>}>
          <LatestInvoices  /> {/* dynamic component*/}
        </Suspense>
      </div>
    </main>
  )
}

export default Page