import Image from "next/image";
import Link from "next/link";

export const LogoWithText = ({ className }: { className?: string }) => {
  return (
    <Link href="/" rel="noreferrer">
      <div className="w-[212px] h-[48px] relative">
        <Image src="/logo-w-text.png" alt="logo" fill sizes="100vw" />
      </div>
    </Link>
  );
};
