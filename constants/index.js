import { LayoutDashboard, File, FileBox, FileEdit, LucideFile } from "lucide-react";

const policeRoutes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Create Case",
        icon: FileEdit,
        href: "/createcase",
        color: "text-sky-500"
    },
    {
        label: "Cases",
        icon: LucideFile,
        href: "/cases",
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
    {
        label: "Cases",
        icon: LucideFile,
        href: "/cases",
        color: "text-sky-500"
    },

]


export { policeRoutes, citizenRoutes };