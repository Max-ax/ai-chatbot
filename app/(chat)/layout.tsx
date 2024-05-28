import NavBar from '@/components/nav-bar'
import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
   <NavBar/>
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      
      {children}
    </div>
    </>
  )
}
