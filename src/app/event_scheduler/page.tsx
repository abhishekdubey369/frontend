"use client"
import DashboardMenu from '@/components/DashboardMenu'
import React from 'react'
import EventCreator from '@/components/EventCreator'
import { Tabs , TabsList, TabsTrigger} from '@radix-ui/react-tabs'

export default function EventScheduler() {
    const [click,setClick] = React.useState(false)
  return (
    <div className="container mx-auto p-4">
      <DashboardMenu />
            <Tabs>
            <TabsList>
            <TabsTrigger value="events" onClick={()=>{setClick(true)}}>{click?"Event":"Click to see magic"}</TabsTrigger>
            </TabsList>
            <EventCreator />
            </Tabs>
    </div>
  )
}

