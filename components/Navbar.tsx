"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-black font-bold text-xl tracking-wide">
          <Link href="/" className="hover:text-gray-600 transition">
            Leetcode
          </Link>
        </div>
        <div className="space-x-6 text-black text-md font-medium">
          <Link href="/contest-page" className="hover:text-gray-600 transition">
            Contests
          </Link>
          <Link href="/problems" className="hover:text-gray-600 transition">
            Problems
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
