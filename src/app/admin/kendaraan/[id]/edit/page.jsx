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
import { SiteHeader } from "@/components/views/admin/sidebar/site-header";
import axios from "axios";
import { CirclePlus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditKendaraanPage() {
  const { id } = useParams();
  const [kendaraan, setKendaraan] = useState(null);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const { data: sesion } = useSession();
  const router = useRouter();
  const getKendaraan = async () => {
    try {
      axios.get(`/api/kendaraan/${id}`).then((res) => {
        setKendaraan(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getKendaraan();
  }, []);
  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFoto(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.photo.files[0]) {
      if (
        !e.target.photo.files[0].name.endsWith(".jpg") &&
        !e.target.photo.files[0].name.endsWith(".png") &&
        !e.target.photo.files[0].name.endsWith(".jpeg")
      ) {
        toast.error("Gambar harus jpg/png/jpeg");
        return;
      }
    }
    try {
      const formData = new FormData();

      formData.append("id_kendaraan", id);
      formData.append("plat_nomor", e.target.plat_nomor.value);
      formData.append("jenis_kendaraan", e.target.jenis_kendaraan.value);
      formData.append("warna", e.target.warna.value);
      formData.append("pemilik", e.target.pemilik.value);
      formData.append("id_user", sesion.user.id);
      formData.append("photo", foto || "");
      const response = await axios.put(`/api/kendaraan`, formData);

      toast.success(response.data.message || "Data berhasil diubah");
      router.push("/admin/kendaraan");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengedit");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setKendaraan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <SiteHeader
        title={"Edit Kendaraan"}
        action={
          <Button
            variant="destructive"
            size="sm"
            // className="bg-linear-to-br from-yellow-400 to-orange-500"
            asChild
          >
            <Link href={"/admin/kendaraan/"}>
              <X />
              Batal
            </Link>
          </Button>
        }
      />
      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Kendaraan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="photo">Foto</FieldLabel>
                <FieldLabel htmlFor="photo">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      width={400}
                      height={400}
                      className="w-38 h-30 object-cover rounded"
                    />
                  ) : kendaraan?.photo ? (
                    <Image
                      src={kendaraan.photo}
                      alt={kendaraan.jenis_kendaraan || "Foto kendaraan"}
                      width={400}
                      height={400}
                      className="w-38 h-30 object-cover rounded"
                    />
                  ) : (
                    <div className="w-38 h-30 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      Tidak ada gambar
                    </div>
                  )}
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="photo"
                    type="file"
                    name="photo"
                    placeholder="Foto Barang"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!kendaraan?.photo}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="plat_nomor">Plat Nomor</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="plat_nomor"
                      type="text"
                      name="plat_nomor"
                      placeholder="N1039BT"
                      value={kendaraan?.plat_nomor || ""}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="jenis_kendaraan">
                  Jenis Kendaraan
                </FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="jenis_kendaraan"
                      type="text"
                      name="jenis_kendaraan"
                      placeholder="Mobil"
                      value={kendaraan?.jenis_kendaraan || ""}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="warna">Warna</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="warna"
                      type="text"
                      name="warna"
                      placeholder="Hijau"
                      value={kendaraan?.warna || ""}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="pemilik">Pemilik</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="pemilik"
                      type="text"
                      name="pemilik"
                      placeholder="John Doe"
                      value={kendaraan?.pemilik || ""}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FieldContent>
              </Field>

              <Button
                type="submit"
                size="sm"
                className="bg-linear-to-br from-yellow-400 to-orange-500"
              >
                <CirclePlus />
                Simpan Perubahan
              </Button>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
