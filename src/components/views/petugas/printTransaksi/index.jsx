"use client";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Logo from "@/components/layout/Logo/logo";
import axios from "axios";

export default function PrintTransaksi({ transaksi, onClose }) {
  const [newTransaksi, setNewTransaksi] = useState(null);
  const printRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: printRef });

  useEffect(() => {
    const getNewTransaksi = async () => {
      try {
        const response = await axios.get(
          `/api/transaksi/${transaksi.id_parkir}`,
        );
        setNewTransaksi(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getNewTransaksi();
  }, [transaksi]);
  if (!transaksi) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const statusClass =
    transaksi.status === "masuk" ? "status-masuk" : "status-keluar";

  return (
    <Card className="w-full max-h-[95vh] max-w-md mx-auto shadow-2xl border-orange-200 rounded-xl overflow-auto font-instrument-sans">
      <CardHeader>
        <CardAction>
          <Button
            size="sm"
            variant="outline"
            className="text-gray-500 hover:text-gray-700 border-gray-300 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent ref={printRef} className="p-6 bg-white font-instrument-sans">
        <div className="w-80 mx-auto">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <div className="bg-linear-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-lg text-center py-4 mb-6 shadow-sm">
            <div className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
              ID Parkir
            </div>
            <div className="text-3xl font-bold text-orange-600 mt-2">
              {transaksi.id_parkir}
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 pb-2 border-b border-orange-200">
              Informasi Kendaraan
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Plat Nomor
                </span>
                <span className="text-xs font-semibold text-gray-900 text-right">
                  {transaksi.tb_kendaraan?.plat_nomor || "-"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Area Parkir
                </span>
                <span className="text-xs font-semibold text-gray-900 text-right">
                  {transaksi.tb_area_parkir?.nama_area || "-"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Status
                </span>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${
                    statusClass === "status-masuk"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaksi.status
                    ? transaksi.status
                    : newTransaksi.status?.split("_").join(" ")}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 pb-2 border-b border-orange-200">
              Waktu
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Masuk
                </span>
                <span className="text-xs font-semibold text-gray-900 text-right">
                  {formatDate(
                    newTransaksi?.waktu_masuk || transaksi.waktu_masuk,
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Keluar
                </span>
                <span className="text-xs font-semibold text-gray-900 text-right">
                  {formatDate(
                    newTransaksi?.waktu_keluar || transaksi.waktu_keluar,
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Durasi
                </span>
                <span className="text-xs font-semibold text-gray-900 text-right">
                  {newTransaksi?.durasi_jam
                    ? `${newTransaksi.durasi_jam} Jam`
                    : transaksi.durasi_jam
                      ? `${transaksi.durasi_jam} Jam`
                      : "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 pb-2 border-b border-orange-200">
              Rincian Biaya
            </h3>

            <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                Tarif/Jam
              </span>
              <span className="text-xs font-semibold text-gray-900 text-right">
                Rp {transaksi.tb_tarif?.tarif_per_jam?.toLocaleString() || "0"}
              </span>
            </div>
          </div>

          <div className="border-y-2  border-yellow-400 py-4 my-5 text-center bg-orange-50">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Total Biaya
            </div>
            <div className="text-3xl font-bold text-orange-600">
              Rp{" "}
              {newTransaksi?.biaya_total?.toLocaleString() ||
                transaksi.biaya_total?.toLocaleString() ||
                "0"}
            </div>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
              Nama Petugas
            </span>
            <span className="text-xs capitalize font-semibold text-gray-900 text-right">
              {transaksi.tb_user?.username || "-"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-linear-to-r from-orange-50 to-amber-50 border-t border-orange-100 py-3 px-4 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400"
          onClick={onClose}
        >
          Tutup
        </Button>
        <Button
          size="sm"
          className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-lg"
          onClick={reactToPrintFn}
        >
          <Printer className="w-4 h-4 mr-2" />
          Cetak Struk
        </Button>
      </CardFooter>
    </Card>
  );
}
