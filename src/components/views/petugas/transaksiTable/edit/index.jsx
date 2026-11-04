"use client";
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
import { CirclePlus, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditTransaksi({ transaksi, onRefresh }) {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [status, setStatus] = useState(transaksi.status || "masuk");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("id_parkir", transaksi.id_parkir);
      formData.append("waktu_masuk", transaksi.waktu_masuk);
      formData.append("tarif", transaksi.tb_tarif.tarif_per_jam);
      formData.append("status", status);

      const response = await axios.put("/api/transaksi", formData);
      const decrement = await axios.put(
        `/api/area-parkir/${transaksi.id_area}/decrement`,
        {
          id_area: transaksi.id_area,
          jumlah: 1,
        },
      );
      const aktivitas = await axios.post("/api/log-aktivitas", {
        id_user: session.user.id,
        aktivitas: "Mengubah Status Transaksi",
      });

      toast.success(response.data.message || "Data berhasil ditambahkan");
      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal mengubah transaksi");
    }
  };
  return (
    <Card className={"w-full font-instrument-sans"}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Ubah Transaksi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            {/* <Field>
              <FieldLabel htmlFor="waktu_keluar">Waktu Keluar</FieldLabel>
              <FieldContent>
                <Input
                  id="waktu_keluar"
                  type="date"
                  name="waktu_keluar"
                  required
                />
              </FieldContent>
            </Field> */}
            {/* <Field>
              <FieldLabel htmlFor="durasi_jam">Durasi</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="durasi_jam"
                    type="number"
                    name="durasi_jam"
                    placeholder="2"
                    value={durasi}
                    onChange={(e) => setDurasi(e.target.value)}
                    disabled
                    required
                  />
                </InputGroup>
              </FieldContent>
            </Field> */}
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className={"font-instrument-sans"}>
                    <SelectItem value="masuk">Masuk</SelectItem>
                    <SelectItem value="keluar">Keluar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Button
              type="submit"
              size="sm"
              className="bg-linear-to-br from-yellow-400 to-orange-500"
            >
              <Save />
              Simpan Perubahan
            </Button>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
