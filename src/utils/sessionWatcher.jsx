"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionWatcher() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.removeItem("cart");
    }
  }, [status]);

  return null;
}
