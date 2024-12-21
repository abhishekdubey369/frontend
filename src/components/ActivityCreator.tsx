'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from "@/components/ui/tabs"
import { EnhancedCalendar } from "@/components/ui/enhanced-calendar"
import { Activity } from '@/types/activity'

export default function ActivityCreator() {

  const [activity, setActivity] = useState('')
  const [activities, setActivities] = useState<Activity[]>([])
    const handleAddActivity = () => {
        if (activity) {
          const newActivity: Activity = {
            id: Date.now().toString(),
            name: activity,
            date: new Date(),
          }
          setActivities([...activities, newActivity])
          setActivity('')
        }
      }

      
    return (
        <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Activity Planner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter an activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                  <EnhancedCalendar />
                  <Button onClick={handleAddActivity}>Add Activity</Button>
                </div>
                <div>
                  <h4 className="font-semibold">Planned Activities:</h4>
                  <ul>
                    {activities.map((a) => (
                      <li key={a.id}>
                        {a.name} - {a.date.toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>)
}