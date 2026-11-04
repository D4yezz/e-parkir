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
import { useState } from "react";
import { toast } from "sonner";

export default function EditArea({ area, onRefresh }) {
  const [dataArea, setDataArea] = useState(area);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataArea.terisi > dataArea.kapasitas) {
      toast.error("Terisi tidak boleh lebih besar dari kapasitas");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("id_area", dataArea.id_area);
      formData.append("nama_area", dataArea.nama_area);
      formData.append("kapasitas", dataArea.kapasitas);
      formData.append("terisi", dataArea.terisi);

      const response = await axios.put("/api/area-parkir", formData);

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
        <h1 className="text-2xl font-bold">Edit Area Parkir</h1>
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
                placeholder="Pandanwangi"
                value={dataArea.nama_area}
                onChange={(e) =>
                  setDataArea({ ...dataArea, nama_area: e.target.value })
                }
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
                value={dataArea.kapasitas}
                onChange={(e) =>
                  setDataArea({ ...dataArea, kapasitas: e.target.value })
                }
                required
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="terisi">Sudah Terisi</FieldLabel>
            <FieldContent>
              <Input
                id="terisi"
                type="number"
                name="terisi"
                placeholder="20"
                value={dataArea.terisi}
                onChange={(e) =>
                  setDataArea({ ...dataArea, terisi: e.target.value })
                }
                disabled={true}
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
