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

export default function EditTransaksiPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [transaksi, setTransaksi] = useState(null);
  //   const [durasi, setDurasi] = useState(transaksi.durasi_jam);
  //   const [kendaraan, setKendaraan] = useState([]);
  //   const [selectKendaraan, setSelectKendaraan] = useState("");
  //   const [tarif, setTarif] = useState([]);
  //   const [selectTarif, setSelectTarif] = useState("");
  //   const [area, setArea] = useState([]);
  //   const [selectArea, setSelectArea] = useState("");
  //   const [status, setStatus] = useState(transaksi.status);
  // const [selectStatus, setSelectStatus] = useState("");
  const getTransaksi = async () => {
    try {
      axios.get(`/api/transaksi/${id}`).then((res) => {
        setTransaksi(res.data);
      });
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };
  useEffect(() => {
    getTransaksi();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const waktuMasuk = new Date("2026-02-10T06:51:42.918Z");

      const now = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
      });

      const waktuKeluar = now + e.target.durasi_jam.value;

      const biayaTotal =
        tarif[Number(selectTarif - 1)].tarif_per_jam *
        e.target.durasi_jam.value;

      formData.append("id_kendaraan", selectKendaraan);
      //   formData.append("waktu_masuk", e.target.waktu_masuk.value);
      // formData.append("waktu_keluar", null);
      formData.append("id_tarif", selectTarif);
      formData.append("durasi_jam", e.target.durasi_jam.value);
      formData.append("biaya_total", biayaTotal);
      formData.append("id_user", session.user.id);
      formData.append("id_area", selectArea);
      const response = await axios.post("/api/transaksi", formData);

      toast.success(response.data.message || "Data berhasil ditambahkan");
      router.push("/petugas/transaksi");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal menambahkan barang");
    }
  };
  return (
    <section className="flex items-center justify-center p-12">
      <Card className={"w-1/2 font-instrument-sans"}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tambah Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="waktu_keluar">Waktu Keluar</FieldLabel>
                <FieldContent>
                  <Input
                    id="waktu_keluar"
                    type="date"
                    name="waktu_keluar"
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="durasi_jam">Durasi</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="durasi_jam"
                      type="number"
                      name="durasi_jam"
                      placeholder="2"
                      value={transaksi.durasi_jam || ""}
                      onChange={(e) =>
                        setTransaksi({
                          ...transaksi,
                          durasi_jam: e.target.value,
                        })
                      }
                      required
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
              {/* <Field>
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
              </Field> */}

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
    </section>
  );
}
