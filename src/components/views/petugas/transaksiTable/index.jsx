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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import {
  Camera,
  CirclePlus,
  Eye,
  File,
  Home,
  Pen,
  Printer,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import PrintTransaksi from "../printTransaksi";
import { motion, AnimatePresence } from "framer-motion";
import EditTransaksi from "./edit";
import { useReactToPrint } from "react-to-print";

export default function TransaksiTable({ petugas = true }) {
  const router = useRouter();
  const printRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: printRef });
  const [transaksi, setTransaksi] = useState([]);
  const [sortBy, setSortBy] = useState("id_parkir");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [kendaraan, setKendaraan] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedKendaraan, setSelectedKendaraan] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [printData, setPrintData] = useState(null);

  const getTransaksi = async () => {
    try {
      const res = await axios.get("/api/transaksi", {
        params: {
          page,
          limit,
          search,
          startDate,
          endDate,
          sortBy,
          order,
          status: selectedStatus,
          ...(selectedKendaraan && { id_kendaraan: selectedKendaraan }),
        },
      });

      setTransaksi(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getKendaraan = async () => {
      try {
        const res = await axios.get("/api/kendaraan");
        setKendaraan(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getKendaraan();
  }, []);

  useEffect(() => {
    (async () => {
      await getTransaksi();
    })();
  }, [page, search, sortBy, order, selectedStatus, startDate, endDate]);
  const deleteItem = async (item) => {
    try {
      await axios.delete(`/api/transaksi/${item.id_parkir}`);
      await axios.put(`/api/area-parkir/${item.id_area}/decrement`, {
        id_area: item.id_area,
        jumlah: 1,
      });
      getTransaksi();
      toast.success("Transaksi berhasil dihapus");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/"}>
              <Home />
            </Link>
          </Button>
          <Input
            className={"bg-white w-40 my-8 text-black"}
            placeholder="Search transaksi..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex gap-3">
          <Select
            className={"bg-white text-black font-instrument-sans"}
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Pilih Kategori"
                className={
                  "bg-white text-black font-instrument-sans placeholder:text-white"
                }
              />
            </SelectTrigger>
            <SelectContent
              className={"bg-white text-black font-instrument-sans"}
            >
              <SelectItem value={"all"}>Semua</SelectItem>
              <SelectItem value={"masuk"}>Masuk</SelectItem>
              <SelectItem value={"keluar"}>Keluar</SelectItem>
            </SelectContent>
          </Select>
          {!petugas && (
            <>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
              />

              <Input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
              />
            </>
          )}

          <Button
            onClick={() => {
              setSelectedStatus("all");
              setEndDate("");
              setStartDate("");
            }}
          >
            Reset Filter
          </Button>
          {petugas ? (
            <Button className={"bg-white text-orange-600"} asChild>
              <Link href={"/petugas/transaksi/tambah"}>
                <CirclePlus />
                Tambah Transaksi
              </Link>
            </Button>
          ) : (
            <Button
              onClick={reactToPrintFn}
              className={"bg-white text-orange-600"}
            >
              Print
            </Button>
          )}
        </div>
      </div>

      <Table
        ref={printRef}
        className={
          "rounded-md overflow-hidden overflow-y-hidden font-instrument-sans"
        }
      >
        <TableHeader className={"bg-white"}>
          <TableRow>
            <TableHead className={"text-center"}>No</TableHead>
            <TableHead
              className={"cursor-pointer"}
              onClick={() => handleSort("id_parkir")}
            >
              ID
            </TableHead>
            <TableHead>Plat Nomor Kendaraan</TableHead>
            <TableHead>Waktu Masuk</TableHead>
            <TableHead>Waktu Keluar</TableHead>
            <TableHead>Tarif/Jam</TableHead>
            <TableHead>Durasi</TableHead>
            <TableHead>Total Biaya</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Area</TableHead>
            {petugas && <TableHead className={"text-center"}>Aksi</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className={"bg-white text-orange-700"}>
          {transaksi.map((item, i) => (
            <TableRow key={i} className={"h-20"}>
              <TableCell className={"border-r text-center"}>{i + 1}</TableCell>
              <TableCell className={"pl-4"}>{item.id_parkir}</TableCell>

              <TableCell>{item.tb_kendaraan.plat_nomor}</TableCell>
              <TableCell>
                {new Date(item.waktu_masuk).toLocaleTimeString("id-ID", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "Asia/Jakarta",
                })}
              </TableCell>
              <TableCell>
                {item.waktu_keluar
                  ? new Date(item.waktu_keluar).toLocaleTimeString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "Asia/Jakarta",
                    })
                  : "-"}
              </TableCell>
              <TableCell>
                Rp. {item.tb_tarif.tarif_per_jam.toLocaleString()}
              </TableCell>
              <TableCell>{item.durasi_jam || "-"}</TableCell>
              <TableCell>Rp. {item.biaya_total.toLocaleString()}</TableCell>
              <TableCell className={"capitalize"}>
                {item.status.split("_").join(" ")}
              </TableCell>
              <TableCell>{item.tb_user.username}</TableCell>
              <TableCell>{item.tb_area_parkir.nama_area}</TableCell>
              {petugas && (
                <TableCell
                  className={"flex h-full gap-2 items-center justify-center"}
                >
                  <Button
                    onClick={() => {
                      setShowPrint(true);
                      setPrintData(item);
                    }}
                    disabled={!item.waktu_keluar}
                    title="Cetak Struk"
                  >
                    <Printer />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowEdit(true);
                      setEdit(item);
                    }}
                    disabled={item.status === "keluar"}
                    title="Edit Transaksi"
                  >
                    <Pen />
                  </Button>
                  {/* <AlertDialog>
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
                        <AlertDialogAction onClick={() => deleteItem(item)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-2 mt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={"bg-white text-orange-600"}
        >
          Prev
        </Button>

        <span className="px-4 py-2 text-white">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={"bg-white text-orange-600"}
        >
          Next
        </Button>
      </div>
      <AnimatePresence>
        {showEdit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEdit(false)}
              className="fixed inset-0 bg-black/50 z-20"
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
              className="absolute  z-30 right-0 left-0 mx-auto translate-y-1/2 w-1/2 h-fit overflow-hidden"
            >
              <EditTransaksi
                transaksi={edit}
                onRefresh={() => {
                  setShowEdit(false);
                  getTransaksi();
                  setShowPrint(true);
                  setPrintData(edit);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPrint && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrint(false)}
              className="fixed inset-0 bg-black/50 z-20"
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
              className="absolute  z-30 right-0 left-0 mx-auto w-1/2 h-fit overflow-hidden"
            >
              <PrintTransaksi
                transaksi={printData}
                onClose={() => setShowPrint(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
