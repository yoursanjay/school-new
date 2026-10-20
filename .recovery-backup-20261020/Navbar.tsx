"use client";

export default function Navbar({
  hideDuringKingfisher = false,
}: { hideDuringKingfisher?: boolean }) {
  void hideDuringKingfisher;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000]"
      style={{
        height: "84px",
        backgroundColor: "#E5E7EB",
      }}
      aria-label="Site header"
    />
  );
}
