import { TooltipProvider } from "@/components/ui/tooltip"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <TooltipProvider>
        {children}
        </TooltipProvider>
   
      </section>
    )
  }