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
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import axios from "axios";
import { CircleUser, Eye, Mail, RectangleEllipsis, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegis = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users", {
        nama_user: e.target.nama_user.value,
        username: e.target.username.value,
        alamat: e.target.alamat.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });

      toast.success(response.data.message || "Registrasi berhasil");
      router.push("/auth/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registrasi gagal");
      } else {
        toast.error("Terjadi kesalahan, coba lagi");
      }
    }
  };

  return (
    <>
      <section className="px-8 py-4 flex flex-col justify-center items-center font-geist-sans bg-black text-white h-screen">
        <Card className={"w-100"}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegis}>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="nama_user">Nama</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="nama_user"
                        type="text"
                        name="nama_user"
                        placeholder="John Doe"
                        required
                      />
                      <InputGroupAddon align="inline-start">
                        <User2 />
                      </InputGroupAddon>
                    </InputGroup>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="username"
                        type="text"
                        name="username"
                        placeholder="John"
                        required
                      />
                      <InputGroupAddon align="inline-start">
                        <CircleUser />
                      </InputGroupAddon>
                    </InputGroup>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="alamat">Alamat</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupTextarea
                        id="alamat"
                        type="text"
                        name="alamat"
                        placeholder="Alamat Anda"
                        className={"h-15"}
                        required
                      />
                    </InputGroup>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        required
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
                <Button type="submit">Register</Button>
              </FieldSet>
            </form>
          </CardContent>
          <CardFooter>
            <Link href={"/auth/login"} className="text-blue-600 mx-auto">
              Login
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
