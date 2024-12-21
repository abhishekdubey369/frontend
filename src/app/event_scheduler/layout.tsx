import { ChatBot } from "@/components/ChatBot"

export default function EventLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        {children}
        <ChatBot/>
    </section>
  }