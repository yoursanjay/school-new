"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import styles from "./PosterPopup.module.css";

const subscribe = () => () => {};

export default function PosterPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, router]);

  useEffect(() => {
    if (!isMounted || !isOpen) return;

    // Prevent background scrolling while popup is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMounted, isOpen, handleClose]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Announcement Poster"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Above Poster */}
        <div className={styles.topBar}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close and go to home"
          >
            <span>Close</span>
            <X className={styles.closeIcon} aria-hidden="true" />
          </button>
        </div>

        {/* Poster Image */}
        <div className={styles.posterCard}>
          <Image
            src="/img/poster.webp"
            alt="School Poster"
            width={689}
            height={1078}
            priority
            className={styles.posterImage}
          />
        </div>
      </div>
    </div>
  );
}
