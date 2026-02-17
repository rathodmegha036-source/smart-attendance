"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator({ value }) {
  if (!value || value.trim() === "") {
    return (
      <p className="text-red-500 font-medium">
        No value provided for QR generation
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <QRCodeCanvas
        value={value}
        size={220}
        level="H"
        includeMargin={true}
      />
      <p className="text-sm text-gray-500 break-all text-center">
        {value}
      </p>
    </div>
  );
}
