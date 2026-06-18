import BottomNav from './BottomNav'
import TopBar from './TopBar'
import DesktopSidebar from './DesktopSidebar'
// Tu peux laisser ou enlever cet import, il ne sera plus utilisé
// import RightSidebar from './RightSidebar'

export default function AppShell({ children, title, backHref, rightSlot, hideTop = false }) {
  return (
    <div className="min-h-screen bg-white flex justify-center w-full max-w-[1265px] mx-auto">
      <DesktopSidebar />

      <div className="w-full max-w-[600px] min-h-screen flex flex-col border-x border-breezy-border relative pb-14 md:pb-0 shrink-0">
        {!hideTop && <TopBar title={title} backHref={backHref} rightSlot={rightSlot} />}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* La ligne <RightSidebar /> a été supprimée d'ici pour faire partir le bloc de droite */}

      <BottomNav />
    </div>
  )
}