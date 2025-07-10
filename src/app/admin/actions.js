"use server";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Roles } from "utils/roles";
import { revalidatePath } from "next/cache";

export async function setRole(formData) {
  const { sessionClaims } = await auth();

  // Check that the user trying to set the role is an admin
  if (sessionClaims?.metadata?.role !== Roles.ADMIN) {
    throw new Error("Not Authorized");
  }

  const id = formData.get("id");
  const role = formData.get("role");

  try {
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to set role");
  }
}

export async function removeRole(formData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== Roles.ADMIN) {
    throw new Error("Not Authorized");
  }

  const id = formData.get("id");

  try {
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to remove role");
  }
}
