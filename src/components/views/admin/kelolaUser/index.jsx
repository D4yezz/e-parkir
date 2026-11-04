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
import { Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import EditUser from "./form/edit";
import { toast } from "sonner";

export default function KelolaUser({ user, onRefresh }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      onRefresh();
      toast.success("User berhasil dihapus");
    } catch (error) {
      console.log(error);
    }
  };
  const roleStyle = (role) => {
    if (role === "admin") {
      return "bg-sky-500 text-white";
    } else if (role === "owner") {
      return "bg-red-600 text-white";
    } else if (role === "petugas") {
      return "bg-orange-500 text-white";
    } else {
      return;
    }
  };
  return (
    <>
      <Table className={"font-instrument-sans"}>
        <TableHeader className={"border-2 border-orange-600"}>
          <TableRow>
            <TableHead className={"text-center"}>No</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className={"text-center"}>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((item, i) => (
            <TableRow key={i} className={"h-20"}>
              <TableCell className={"border-r text-center"}>{i + 1}</TableCell>
              <TableCell className={"pl-4"}>{item.id_user}</TableCell>

              <TableCell>{item.nama_lengkap}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Badge className={roleStyle(item.role)}>{item.role}</Badge>
              </TableCell>

              <TableCell
                className={"flex h-full gap-2 items-center justify-center"}
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowEdit(true);
                    setEditItem(item);
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
                        onClick={() => deleteItem(item.id_user)}
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
              className="absolute  z-30  top-0 right-0 h-full overflow-hidden"
            >
              <EditUser
                user={editItem}
                onRefresh={() => {
                  setShowEdit(false);
                  onRefresh();
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
