'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from "@/components/ui/tabs"
import { EnhancedCalendar } from "@/components/ui/enhanced-calendar"
import {Event} from '@/types/activity'


export default function EventCreator(){
    const [event, setEvent] = useState('')
    const [events, setEvents] = useState<Event[]>([])
    const [ticketPrice, setTicketPrice] = useState('')
    const [invitedFriend, setInvitedFriend] = useState('')

    const handleScheduleEvent = () => {
        if (event) {
          const newEvent: Event = {
            id: Date.now().toString(),
            name: event,
            date: new Date(),
            ticketPrice: parseFloat(ticketPrice) || 0,
            invitedFriends: [],
          }
          setEvents([...events, newEvent])
          setEvent('')
          setTicketPrice('')
        }
      }

    const handleInviteFriend = (eventId: string) => {
        if (invitedFriend) {
          setEvents(events.map(e => {
            if (e.id === eventId) {
              return { ...e, invitedFriends: [...e.invitedFriends, invitedFriend] }
            }
            return e
          }))
          setInvitedFriend('')
        }
      }

    return(
        <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Scheduler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter event name"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                  />
                  <EnhancedCalendar />
                  <Input
                    type="number"
                    placeholder="Ticket price"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
                  <Button onClick={handleScheduleEvent}>Schedule Event</Button>
                </div>
                <div>
                  <h4 className="font-semibold">Scheduled Events:</h4>
                  <ul>
                    {events.map((e) => (
                      <li key={e.id} className="mb-2">
                        <p>{e.name} - {e.date.toLocaleDateString()} - Ticket: ${e.ticketPrice}</p>
                        <div className="flex space-x-2 mt-1">
                          <Input
                            placeholder="Friend's name"
                            value={invitedFriend}
                            onChange={(evt) => setInvitedFriend(evt.target.value)}
                          />
                          <Button onClick={() => handleInviteFriend(e.id)}>Invite</Button>
                        </div>
                        <p>Invited: {e.invitedFriends.join(', ')}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
    )

}