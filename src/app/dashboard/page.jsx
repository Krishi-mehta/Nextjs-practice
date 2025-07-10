import { auth,currentUser } from "@clerk/nextjs/dist/types/server"   

export default async function DashboardPage(){
    const authObj = await auth()
    const userObj = await currentUser()
    return <h1>Dashboard</h1>
}