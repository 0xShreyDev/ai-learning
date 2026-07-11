'use client'
import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../../components/ui/sidebar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import {
    CompassIcon,
    LayoutDashboard,
    PencilRulerIcon,
    UserCircle2Icon,
    WalletCards,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import AddNewCourses from './AddNewCourses';


const SideBarOptions = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/workspace' },
    { title: 'My Learning', icon: LayoutDashboard, path: '/workspace/my-learning' },
    { title: 'Explore Course', icon: CompassIcon, path: '/workspace/explore' },
    { title: 'Profile', icon: UserCircle2Icon, path: '/workspace/profile' },
];

function AppSidebar() {

    const path = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <Image src="/logo.svg" alt="logo" width={130} height={120} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <AddNewCourses>
                        <Button>Create New Course</Button>
                    </AddNewCourses>

                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SideBarOptions.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className={'p-5'}>
                                        <Link href={item.path} className={`text-[17px]
                                            ${path.includes(item.path) && 'text-primary bg-gray-300'}`}>
                                            <item.icon className='h-7 w-7' />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}

export default AppSidebar;
