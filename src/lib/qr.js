import qrcode from 'qrcode-generator';

// Generates crisp QR SVG as a data URL (synchronous, no network).
export function generateQrSvgDataUrl(text, size = 200) {
  const qr = qrcode(0, 'H');
  qr.addData(String(text));
  qr.make();

  const moduleCount = qr.getModuleCount();
  const marginModules = 4;
  const cellSize = Math.max(2, Math.floor(size / (moduleCount + marginModules * 2)));
  const svgSize = (moduleCount + marginModules * 2) * cellSize;

  const parts = [];
  parts.push('<?xml version="1.0" encoding="UTF-8"?>');
  parts.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + svgSize + '" height="' + svgSize + '" viewBox="0 0 ' + svgSize + ' ' + svgSize + '">');
  parts.push('<rect width="100%" height="100%" fill="#fff"/>');
  parts.push('<g fill="#000" stroke="none">');

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        const x = (col + marginModules) * cellSize;
        const y = (row + marginModules) * cellSize;
        parts.push('<rect x="' + x + '" y="' + y + '" width="' + cellSize + '" height="' + cellSize + '"/>');
      }
    }
  }

  parts.push('</g>');
  parts.push('</svg>');

  const svg = parts.join('');
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
