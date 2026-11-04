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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import {
  CirclePlus,
  CircleUser,
  Eye,
  Mail,
  RectangleEllipsis,
  User2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TambahUserPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("petugas");
  const router = useRouter();

  const handleRegis = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users", {
        nama_lengkap: e.target.nama_lengkap.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: role,
      });

      toast.success(response.data.message || "Tambah User Berhasil");
      router.push("/admin/kelola-akun");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Tambah user gagal");
      } else {
        toast.error("Terjadi kesalahan, coba lagi");
      }
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center font-geist-sans bg-linear-to-br from-yellow-400 to-orange-500 text-white h-screen">
        <Card className={"w-100"}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Tambah Akun</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegis}>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="nama_lengkap">Nama Lengkap</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="nama_lengkap"
                        type="text"
                        name="nama_lengkap"
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
                <Field>
                  <FieldLabel>Role</FieldLabel>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className={"font-instrument-sans"}>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="petugas">Petugas</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Button
                  type="submit"
                  className={"bg-linear-to-br from-yellow-400 to-orange-500"}
                >
                  <CirclePlus /> Tambah Akun
                </Button>
                <Button type="button" variant="destructive" asChild>
                  <Link href={"/admin/kelola-akun"}>
                    <X />
                    Batal
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
