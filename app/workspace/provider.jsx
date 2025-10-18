import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar.jsx'
import AppSidebar from './_components/AppSidebar.jsx'
import AppHeader from './_components/AppHeader.jsx'

function Workspaceprovider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className='w-full'>
        <AppHeader />
        <div className='p-10'>
          {children}
        </div>

      </div>
    </SidebarProvider>

  )
}

export default Workspaceprovider