import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();
  // console.log(userObj);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User ID: {authObj.userId}</p>
      <p>Welcome, {userObj?.firstName}</p>
    </div>
  );
}
