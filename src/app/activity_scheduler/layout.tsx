import { ChatBot } from "@/components/ChatBot"

export default function ActivityLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        {children}
        <ChatBot/>
    </section>
  }