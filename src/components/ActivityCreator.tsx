'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import {Activity} from '@/types/activity';
import axios from 'axios';

export default function ActivityCreator() {
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // Fetch all activities from the backend
    const getActivities = async () => {
        try {
            const response = await axios.get('/api/activity');
            const mappedActivities = response.data.map((a: any) => ({
                id: a.id,
                name: a.activity.name,
                date: new Date(a.activity.date),
            }));
            setActivities(mappedActivities);
        } catch (error) {
            console.error('Failed to fetch activities:', error);
            alert('Failed to fetch activities.');
        }
    };

    useEffect(() => {
        getActivities();
    }, []);

    // Add a new activity
    const handleAddActivity = async () => {
        if (!activity.trim()) {
            alert('Activity name is required.');
            return;
        }

        try {
            const response = await axios.post('/api/activity', {
                activity: { name: activity, date: selectedDate },
            });
            const newActivity = {
                id: response.data.event.id,
                name: response.data.event.activity.name,
                date: new Date(response.data.event.activity.date),
            };
            setActivities([...activities, newActivity]);
            setActivity('');
            setSelectedDate(new Date());
        } catch (error) {
            console.error('Failed to add activity:', error);
            alert('Failed to add activity.');
        }
    };

    // Delete an activity
    const handleDeleteActivity = async (activityId: string) => {
        try {
            await axios.delete('/api/activity', { data: { id: activityId } });
            setActivities(activities.filter((a) => a.id !== activityId));
        } catch (error) {
            console.error('Failed to delete activity:', error);
            alert('Failed to delete activity.');
        }
    };

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
                        <EnhancedCalendar
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                        <Button onClick={handleAddActivity}>Add Activity</Button>
                    </div>
                    <div>
                        <h4 className="font-semibold">Planned Activities:</h4>
                        <ul>
                            {activities.map((a) => (
                                <li key={a.id} className="flex justify-between items-center mb-2">
                                    <span>
                                        {a.name} - {a.date.toLocaleDateString()}
                                    </span>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDeleteActivity(a.id)}
                                    >
                                        Delete
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
