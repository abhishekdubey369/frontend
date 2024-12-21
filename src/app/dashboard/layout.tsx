import { ChatBot } from "@/components/ChatBot"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        {children}
        <ChatBot/>
    </section>
  }