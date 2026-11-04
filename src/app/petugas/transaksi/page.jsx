"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import TransaksiTable from "@/components/views/petugas/transaksiTable";
import { Eye, Mail, RectangleEllipsis } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function TransaksiPage() {
  return (
    <>
      <section className="px-8 py-4 flex flex-col items-center font-geist-sans bg-linear-to-br from-yellow-400 to-orange-500 min-h-screen">
        <TransaksiTable />
      </section>
    </>
  );
}
