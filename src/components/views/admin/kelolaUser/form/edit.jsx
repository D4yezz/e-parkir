import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
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
import { CircleUser, Mail, User2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditUser({ user, onRefresh }) {
  const [dataUser, setDataUser] = useState(user);
  const [role, setRole] = useState(user.role);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/users", {
        id_user: dataUser.id_user,
        nama_lengkap: e.target.nama_lengkap.value,
        username: e.target.username.value,
        email: e.target.email.value,
        role: role,
      });

      toast.success(response.data.message || "Data berhasil ditambahkan");
      onRefresh && onRefresh();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal menambahkan data");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={"lg:w-160 rounded-none bg-white h-full p-8"}>
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
                  value={dataUser?.nama_lengkap || ""}
                  onChange={handleChange}
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
                  value={dataUser?.username || ""}
                  onChange={handleChange}
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
                  value={dataUser?.email || ""}
                  onChange={handleChange}
                  required
                />
                <InputGroupAddon align="inline-start">
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Status Ketersediaan</FieldLabel>
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
            Simpan Perubahan
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
