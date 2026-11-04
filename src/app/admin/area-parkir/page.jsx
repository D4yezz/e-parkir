"use client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/views/admin/sidebar/site-header";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AreaParkir from "@/components/views/admin/areaParkir";
import TambahArea from "@/components/views/admin/areaParkir/form/tambah";

export default function AreaParkirPage() {
  const [area, setArea] = useState([]);
  const [show, setShow] = useState(false);
  const getArea = async () => {
    try {
      axios.get("/api/area-parkir").then((res) => {
        setArea(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getArea();
  }, []);
  return (
    <>
      <SiteHeader
        title={"Area Parkir"}
        action={
          <Button
            size="sm"
            className="bg-linear-to-br from-yellow-400 to-orange-500"
            onClick={() => setShow(true)}
          >
            <CirclePlus />
            Tambah Area
          </Button>
        }
      />
      <div className="p-4 overflow-hidden">
        <AreaParkir area={area} onRefresh={getArea} />
        <AnimatePresence>
          {show && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShow(false)}
                className="fixed inset-0 bg-black/50 z-20"
              />
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ ease: "easeInOut", duration: 0.4 }}
                className="absolute  z-30  top-0 right-0 h-full overflow-hidden"
              >
                <TambahArea
                  oRefresh={() => {
                    setShow(false);
                    getArea();
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
