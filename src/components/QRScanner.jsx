"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ onScan }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          if (onScan) {
            onScan(decodedText);
          }

          // Stop scanner after successful scan
          scannerRef.current
            ?.clear()
            .catch((error) => console.error("Failed to clear scanner", error));
        },
        (error) => {
          // Ignore scanning errors
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((error) => console.error("Cleanup failed", error));
        scannerRef.current = null;
      }
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-lg font-semibold">Scan QR Code</h2>
      <div id="qr-reader" className="w-full max-w-sm" />
    </div>
  );
}
