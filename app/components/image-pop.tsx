import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function ImagePop() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          alt="my pfp"
          className="ring-4 ring-(--text-muted)/20 rounded-2xl cursor-pointer select-none"
          width={90}
          height={90}
          src="/pfp.png"
          draggable={false}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <Image
          alt="my pfp"
          className="rounded-2xl select-none"
          width={300}
          height={300}
          src="/pfp.png"
          draggable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
