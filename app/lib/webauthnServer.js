export function uuidToBytes(uuid) {
  const hex = uuid.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export function bytesToUuid(bytes) {
  const buf = Buffer.from(bytes);
  const hex = buf.toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

export function getOriginAndRpID(req) {
  const origin = req.headers.get("origin") || "";
  let rpID = "localhost";
  try {
    rpID = new URL(origin).hostname;
  } catch {
    rpID = (req.headers.get("host") || "localhost").split(":")[0];
  }
  return { origin, rpID };
}
