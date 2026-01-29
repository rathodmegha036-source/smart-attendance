"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator({ value }) {
  if (!value) return <p>No value to generate QR</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeCanvas
        value={value}
        size={220}
        level="H"
        includeMargin={true}
      />
      <p className="text-sm text-gray-500 break-all">{value}</p>
    </div>
  );
}
