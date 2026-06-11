import BottomNav from './BottomNav'
import TopBar from './TopBar'

export default function AppShell({ children, title, backHref, rightSlot, hideTop=false }) {
  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto relative">
      {!hideTop && <TopBar title={title} backHref={backHref} rightSlot={rightSlot} />}
      <main className="mb-nav">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
