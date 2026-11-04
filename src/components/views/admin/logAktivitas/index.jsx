"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ShieldUser,
  SquareUserRound,
  User2,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LogAktivitas() {
  const [log, setLog] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const getLog = async () => {
    try {
      await axios
        .get(`/api/log-aktivitas?page=${page}&limit=${limit}`)
        .then((res) => {
          setLog(res.data.data);
          setTotalPages(res.data.totalPages);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getLog();
  }, [page, limit]);
  const logoHandler = (log) => {
    if (log.tb_user.role === "admin") return <ShieldUser size={20} />;
    if (log.tb_user.role === "owner") return <UserRoundCheck size={20} />;
    if (log.tb_user.role === "petugas") return <SquareUserRound size={20} />;
  };
  return (
    <section className="flex flex-col w-full font-instrument-sans p-8">
      <h1 className="text-3xl font-bold text-orange-400 mb-4">Log Aktivitas</h1>
      <ul className="flex flex-col gap-2 min-h-125">
        {log.map((log, i) => (
          <li
            key={i}
            className="flex justify-between items-center rounded-md p-4 bg-linear-to-br from-yellow-500 to-orange-500 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full p-2 bg-white text-orange-400">
                {logoHandler(log)}
              </span>
              <div className="flex flex-col justify-center">
                <h2 className="capitalize font-semibold text-xl">
                  {log.tb_user.username}
                </h2>
                <p>{log.aktivitas}</p>
              </div>
            </div>
            <p>
              {new Date(log.waktu_aktivitas).toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                hour12: false,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-2 mt-4 bg-orange-500 p-4 rounded-md">
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
    </section>
  );
}
