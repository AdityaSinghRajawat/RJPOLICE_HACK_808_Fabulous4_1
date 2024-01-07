import { LayoutDashboard, File, FileBox } from "lucide-react";

const policeRoutes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Create Case",
        icon: File,
        href: "/createcase",
        color: "text-sky-500"
    },

]

const citizenRoutes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Submit Report",
        icon: FileBox,
        href: "/createreport",
        color: "text-sky-500"
    },

]

export { policeRoutes, citizenRoutes };