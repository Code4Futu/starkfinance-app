import Image from "next/image";
import Link from "next/link";

export const LogoNoName = ({ className }: { className?: string }) => {
  return (
    <Link href="/" rel="noreferrer">
      <div className="w-[48px] h-[48px] relative">
        <Image src="/logo.png" alt="logo" fill />
      </div>
    </Link>
  );
};
