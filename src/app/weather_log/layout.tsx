import { ChatBot } from "@/components/ChatBot"

export default function LogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        {children}
        <ChatBot/>
    </section>
  }