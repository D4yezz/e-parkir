import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function TambahArea({ onRefresh }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama_area", e.target.nama_area.value);
      formData.append("kapasitas", e.target.kapasitas.value);

      const response = await axios.post("/api/area-parkir", formData);

      toast.success(response.data.message || "Data berhasil ditambahkan");
      onRefresh && onRefresh();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal menambahkan data");
    }
  };

  return (
    <div className={"lg:w-160 rounded-none bg-white h-full p-8"}>
      <div>
        <h1 className="text-2xl font-bold">Tambah Area Parkir</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="nama_area">Nama Area</FieldLabel>
            <FieldContent>
              <Input
                id="nama_area"
                type="text"
                name="nama_area"
                placeholder="G3"
                required
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="kapasitas">Kapasitas</FieldLabel>
            <FieldContent>
              <Input
                id="kapasitas"
                type="number"
                name="kapasitas"
                placeholder="20"
                required
              />
            </FieldContent>
          </Field>
          <Button type="submit">Simpan</Button>
        </FieldSet>
      </form>
    </div>
  );
}
