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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddTransaksiPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [transaksi, setTransaksi] = useState([]);
  const [kendaraan, setKendaraan] = useState([]);
  const [selectKendaraan, setSelectKendaraan] = useState("");
  const [tarif, setTarif] = useState([]);
  const [selectTarif, setSelectTarif] = useState("");
  const [area, setArea] = useState([]);
  const [selectArea, setSelectArea] = useState("");
  //   const [status, setStatus] = useState(masu);
  const getTransaksi = async () => {
    try {
      axios.get("/api/transaksi").then((res) => {
        setTransaksi(res.data.data);
      });
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };
  const getKendaraan = async () => {
    try {
      axios.get("/api/kendaraan").then((res) => {
        setKendaraan(res.data);
      });
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };
  const getTarif = async () => {
    try {
      axios.get("/api/tarif-parkir").then((res) => {
        setTarif(res.data);
      });
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };
  const getArea = async () => {
    try {
      axios.get("/api/area-parkir").then((res) => {
        setArea(res.data);
      });
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };
  useEffect(() => {
    getKendaraan();
    getTarif();
    getArea();
    getTransaksi();
  }, []);
  console.log(transaksi);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("id_kendaraan", selectKendaraan);
      formData.append("id_tarif", selectTarif);
      formData.append("id_user", session.user.id);
      formData.append("id_area", selectArea);
      const response = await axios.post("/api/transaksi", formData);
      const increment = await axios.put(
        `/api/area-parkir/${selectArea}/increment`,
        {
          id_area: selectArea,
          jumlah: 1,
        },
      );
      const aktivitas = await axios.post("/api/log-aktivitas", {
        id_user: session.user.id,
        aktivitas: "Menambahkan Transaksi",
      });

      toast.success(response.data.message || "Data berhasil ditambahkan");
      router.push("/petugas/transaksi");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal menambahkan barang");
    }
  };
  return (
    <section className="flex items-center justify-center p-12 bg-linear-to-br from-yellow-400 to-orange-500 min-h-screen">
      <Card className={"w-1/2 font-instrument-sans"}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tambah Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldSet>
              <Field>
                <FieldLabel>Pilih Kendaraan</FieldLabel>

                <Select
                  value={selectKendaraan}
                  onValueChange={setSelectKendaraan}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kendaraan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className={"font-instrument-sans"}>
                      {kendaraan.map((item) => (
                        <SelectItem
                          key={item.id_kendaraan}
                          value={String(item.id_kendaraan)}
                        >
                          {/* {item.plat_nomor} -  */}
                          {item.jenis_kendaraan}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              {/* <Field>
                <FieldLabel htmlFor="waktu_masuk">Waktu Masuk</FieldLabel>
                <FieldContent>
                  <Input
                    id="waktu_masuk"
                    type="date"
                    name="waktu_masuk"
                    required
                  />
                </FieldContent>
              </Field> */}
              <Field>
                <FieldLabel>Tarif</FieldLabel>
                <Select value={selectTarif} onValueChange={setSelectTarif}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tarif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className={"font-instrument-sans"}>
                      {tarif.map((item, i) => (
                        <SelectItem
                          key={i}
                          value={String(item.id_tarif)}
                          className={"flex"}
                        >
                          {item.jenis_kendaraan}: Rp.{" "}
                          {item.tarif_per_jam.toLocaleString("id-ID")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              {/* <Field>
                <FieldLabel htmlFor="durasi_jam">Durasi</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="durasi_jam"
                      type="number"
                      name="durasi_jam"
                      placeholder="2"
                      required
                    />
                  </InputGroup>
                </FieldContent>
              </Field> */}
              <Field>
                <FieldLabel>Area Parkir</FieldLabel>
                <Select value={selectArea} onValueChange={setSelectArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className={"font-instrument-sans"}>
                      {area.map((item, i) => (
                        <SelectItem
                          key={i}
                          value={String(item.id_area)}
                          disabled={item.kapasitas === item.terisi}
                        >
                          {item.nama_area} - Kapasitas: {item.kapasitas} -
                          Terisi: {item.terisi}
                        </SelectItem>
                      ))}
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
                Simpan Transaksi
              </Button>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
