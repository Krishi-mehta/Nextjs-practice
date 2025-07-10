import { auth, currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Welcome, {userObj?.firstName}!</p>
      <p>Your user ID: {authObj.userId}</p>
    </div>
  );
}
