import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function ImagePop() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          width={36}
          height={36}
          alt="my pfp"
          className="ring-4 ring-(--text-muted)/20 rounded-xl cursor-pointer select-none active:translate-y-0.5 w-24"
          src="/pfp.png"
          draggable={false}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle className="hidden">hidden</DialogTitle>
        <Image
          width={400}
          height={400}
          alt="my pfp"
          className="rounded-md select-none w-full"
          src="/pfp.png"
          draggable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
