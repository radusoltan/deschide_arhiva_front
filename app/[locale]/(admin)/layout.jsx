"use client"

import AdminNavigation from "@/components/Admin/AdminNavigation";
import {useAuth} from "@/hooks/auth";

const AdminMainLayout = ({children})=>{
  const {user} = useAuth({
    middleware: "auth",
  })
  return <div className="min-h-screen bg-gray-100">
    <AdminNavigation user={user} />
    <main>{children}</main>
  </div>
}
export default AdminMainLayout;