import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-orange-500">Prop</span>
              <span className="text-white">soch</span>
            </span>
          </Link>

          {/* Copyright */}
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Propsoch. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="#"
              className="text-slate-400 transition hover:text-orange-500"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-400 transition hover:text-orange-500"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-slate-400 transition hover:text-orange-500"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
