import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export type AuthGuardProps = {
  children: ReactNode;
};

export async function AuthGuard(props: AuthGuardProps) {
  const { children } = props;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return children;
}
