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
import { Eye, Home, LogIn, Mail, RectangleEllipsis } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
      callbackUrl: "/",
    });

    if (e.target.email.value === "" || e.target.password.value === "") {
      toast.error("Email dan password harus diisi");
      return;
    }

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login berhasil");
      router.push("/");
    }
  };
  return (
    <>
      <section className="px-8 py-4 min-h-screen bg-linear-to-br from-yellow-400 to-orange-500 flex flex-col justify-center items-center font-geist-sans">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-orange-500 font-instrument-sans text-center flex flex-col items-center justify-center gap-2">
              <span className="p-3 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 text-white">
                <LogIn size={30} />
              </span>
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldSet>
                {/* <FieldLegend>Form Login</FieldLegend>
                <FieldDescription>Ini adalah from login</FieldDescription> */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                      />
                      <InputGroupAddon align="inline-start">
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                      />
                      <InputGroupAddon align="inline-start">
                        <RectangleEllipsis />
                      </InputGroupAddon>
                      <InputGroupAddon
                        align="inline-end"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? (
                          <Eye
                            onClick={() => setShowPassword(false)}
                            className="cursor-pointer"
                          />
                        ) : (
                          <Eye
                            onClick={() => setShowPassword(true)}
                            className="cursor-pointer"
                          />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                  </FieldContent>
                </Field>
                <Button
                  type="submit"
                  className={"bg-linear-to-br from-yellow-400 to-orange-500"}
                >
                  Login
                </Button>
                <Button type="button" asChild>
                  <Link href={"/"}>
                    <Home />
                  </Link>
                </Button>
              </FieldSet>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
