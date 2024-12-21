import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TabsContent } from "@/components/ui/tabs";
import { EnhancedCalendar } from "@/components/ui/enhanced-calendar";
import axios from "axios";

export default function EventCreator() {
    const [event, setEvent] = useState('');
    const [events, setEvents] = useState([]);
    const [ticketPrice, setTicketPrice] = useState('');
    const [invitedFriend, setInvitedFriend] = useState('');
    const [eventDate, setEventDate] = useState(new Date());

    // Fetch events from the backend
    const getEvents = async () => {
        try {
            const response = await axios.get("/api/event");
            console.log(response.data);
            const mappedEvents = response.data.map(e => ({
                ...e,
                id: e.id,
            }));
            setEvents(mappedEvents);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch events.");
        }
    };

    useEffect(() => {
        getEvents();
    }, []); // Fetch only on component mount

    // Schedule a new event
    const handleScheduleEvent = async () => {
        if (!event.trim() || parseFloat(ticketPrice) < 0) {
            alert("Invalid input. Please provide valid event details.");
            return;
        }

        try {
            const response = await axios.post("/api/event", {
                name: event,
                date: eventDate,
                ticketPrice: parseFloat(ticketPrice) || 0,
                invitedFriends: [],
            });
            const newEvent = { ...response.data.event, id: response.data.event._id };
            setEvents([...events, newEvent]);
            setEvent('');
            setTicketPrice('');
        } catch (error) {
            console.error(error);
            alert("Failed to schedule the event.");
        }
    };

    // Invite a friend to an event
    const handleInviteFriend = async (eventId) => {
        if (!invitedFriend.trim()) return;

        try {
            const eventToUpdate = events.find(e => e.id === eventId);
            const updatedFriends = [...eventToUpdate.invitedFriends, invitedFriend];

            const response = await axios.put(`/api/event`, {
                id: eventId||"",
                invitedFriends: updatedFriends,
            });

            setEvents(events.map(e => (e.id === eventId ? { ...e, invitedFriends: updatedFriends } : e)));
            setInvitedFriend('');
        } catch (error) {
            console.error(error);
            alert("Failed to invite friend.");
        }
    };

    // Delete an event
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`/api/event`, { data: { id: eventId } });
            setEvents(events.filter(e => e.id !== eventId));
        } catch (error) {
            console.error(error);
            alert("Failed to delete the event.");
        }
    };

    return (
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
                        <EnhancedCalendar selected={eventDate} onChange={setEventDate} />
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
                                <li key={e.id} className="mb-4">
                                    <p>
                                        <strong>{e.name}</strong> - {new Date(e.date).toLocaleDateString()} - Ticket: ${e.ticketPrice}
                                    </p>
                                    <div className="flex space-x-2 mt-2">
                                        <Input
                                            placeholder="Friend's name"
                                            value={invitedFriend}
                                            onChange={(evt) => setInvitedFriend(evt.target.value)}
                                        />
                                        <Button onClick={() => handleInviteFriend(e.id)}>Invite</Button>
                                    </div>
                                    <p>Invited: {e.invitedFriends.join(', ') || "No friends invited yet."}</p>
                                    <Button
                                        className="mt-2 bg-red-500 text-white"
                                        onClick={() => handleDeleteEvent(e.id)}
                                    >
                                        Delete Event
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
