"use client"
import ActivityCreator from '@/components/ActivityCreator'
import DashboardMenu from '@/components/DashboardMenu'
import React from 'react'
import { Tabs , TabsList, TabsTrigger} from '@radix-ui/react-tabs'

export default function ActivityScheduler() {
    const [click,setClick] = React.useState(false)
  return (
    <div className="container mx-auto p-4">
      <DashboardMenu />
      <Tabs>
        <TabsList>
      <TabsTrigger value="activities" onClick={()=>{setClick(true)}}>{click?"Activity":"Click to see magic"}</TabsTrigger>
        </TabsList>
      <ActivityCreator />
      </Tabs>
    </div>
  )
}

