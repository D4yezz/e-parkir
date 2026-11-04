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
import { CirclePlus, Redo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddKendaraanPage() {
  const { data: sesion } = useSession();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.photo.files[0]) {
      toast.error("Gambar harus dipilih");
      return;
    }

    if (
      !e.target.photo.files[0].name.endsWith(".jpg") &&
      !e.target.photo.files[0].name.endsWith(".png") &&
      !e.target.photo.files[0].name.endsWith(".jpeg")
    ) {
      toast.error("Gambar harus jpg/png/jpeg");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("photo", e.target.photo.files[0]);
      formData.append("plat_nomor", e.target.plat_nomor.value);
      formData.append("jenis_kendaraan", e.target.jenis_kendaraan.value);
      formData.append("warna", e.target.warna.value);
      formData.append("pemilik", e.target.pemilik.value);
      formData.append("id_user", sesion.user.id);
      const response = await axios.post("/api/kendaraan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Data berhasil ditambahkan");
      router.push("/admin/kendaraan");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal menambahkan barang");
    }
  };
  return (
    <>
      <SiteHeader
        title={"Form"}
        action={
          <Button
            size="sm"
            className="bg-linear-to-br from-yellow-400 to-orange-500"
            asChild
          >
            <Link href={"/admin/kendaraan/"}>
              <Redo2 />
              Kembali
            </Link>
          </Button>
        }
      />
      <Card className={"lg:w-full"}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tambah Kendaraan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="photo">Foto</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      id="photo"
                      type="file"
                      accept="image/*"
                      name="photo"
                      required
                    />
                  </InputGroup>
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
                Simpan Kendaraan
              </Button>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
