'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ActivityRecommendationProps {
  activity: string
  onSchedule: (date: string, time: string) => void
  onDelete: () => void
}

export default function ActivityRecommendation({ activity, onSchedule, onDelete }: ActivityRecommendationProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSchedule = () => {
    onSchedule(date, time)
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recommended Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{activity}</p>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Schedule</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Activity</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleSchedule}>Confirm Schedule</Button>
            </DialogContent>
          </Dialog>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  )
}

