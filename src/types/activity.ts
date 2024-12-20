export interface Activity {
    id: string
    name: string
    date: Date
}
export interface Event {
    id: string
    name: string
    date: Date
    ticketPrice: number
    invitedFriends: string[]
}