"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { Question } from "@/types/quiz";

export function QuestionImage({ image }: { image: NonNullable<Question["image"]> }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="mt-5 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      {failed ? (
        <div role="status" className="flex min-h-28 flex-col items-center justify-center gap-2 text-center text-sm text-[var(--text-secondary)]">
          <ImageOff aria-hidden="true" size={26} />
          <p className="font-medium">Gambar soal belum tersedia.</p>
          <p>{image.alt}</p>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          width={960}
          height={640}
          unoptimized
          className="mx-auto h-auto max-h-[60vh] w-auto max-w-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}
