"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Camera, Eye, Pen, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function KendaraanTable({ kendaraan, onRefresh }) {
  const router = useRouter();
  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/kendaraan/${id}`);
      onRefresh();
      toast.success("kendaraan berhasil dihapus");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Table className={"font-instrument-sans"}>
        <TableHeader className={"border-2 border-orange-600"}>
          <TableRow>
            <TableHead className={"text-center"}>No</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Foto</TableHead>
            <TableHead>Plat Nomor</TableHead>
            <TableHead>Jenis Kendaraan</TableHead>
            <TableHead>Warna</TableHead>
            <TableHead>Pemilik</TableHead>
            <TableHead>Tanggal Ditambahkan</TableHead>
            <TableHead className={"text-center"}>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kendaraan.map((item, i) => (
            <TableRow key={i} className={"h-20"}>
              <TableCell className={"border-r text-center"}>{i + 1}</TableCell>
              <TableCell className={"pl-4"}>{item.id_kendaraan}</TableCell>
              <TableCell>
                {item.photo !== null ? (
                  <Image
                    src={item.photo}
                    alt={item.jenis_kendaraan}
                    width={"70"}
                    height={"70"}
                  />
                ) : (
                  <Camera />
                )}
              </TableCell>

              <TableCell>{item.plat_nomor}</TableCell>
              <TableCell>{item.jenis_kendaraan}</TableCell>
              <TableCell>{item.warna}</TableCell>
              <TableCell>{item.pemilik}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleTimeString("id-ID", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "Asia/Jakarta",
                })}
              </TableCell>

              <TableCell
                className={"flex h-full gap-2 items-center justify-center"}
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    router.push(`/admin/kendaraan/${item.id_kendaraan}/edit`);
                  }}
                >
                  <Pen />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className={"font-instrument-sans"}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data from our website.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteItem(item.id_kendaraan)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
