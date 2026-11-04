"use client";
import { SiteHeader } from "@/components/views/admin/sidebar/site-header";
import TarifParkir from "@/components/views/admin/tarifParkir";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TarifParkirPage() {
  const [tarif, setTarif] = useState([]);
  const [show, setShow] = useState(false);
  const getTarif = async () => {
    try {
      axios.get("/api/tarif-parkir").then((res) => {
        setTarif(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTarif();
  }, []);
  return (
    <>
      <SiteHeader
        title={"Tarif Parkir"}
        // action={
        //   <Button
        //     size="sm"
        //     className="bg-linear-to-br from-yellow-400 to-orange-500"
        //     onClick={() => setShow(true)}
        //   >
        //     <CirclePlus />
        //     Tambah Tarif
        //   </Button>
        // }
      />
      <div className="p-4 overflow-hidden">
        <TarifParkir tarif={tarif} onRefresh={getTarif} />
        {/* <AnimatePresence>
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
                <TambahTarif tarif={tarif} onRefresh={getTarif} />
              </motion.div>
            </>
          )}
        </AnimatePresence> */}
      </div>
      {/* <LogAktivitas /> */}
    </>
  );
}
