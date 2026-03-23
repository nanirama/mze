"use client";

import { useEffect, useState } from "react";

export default function FooterCurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return year ?? "";
}

