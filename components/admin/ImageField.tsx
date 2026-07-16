"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function ImageField({
  label,
  value,
  onChange,
  token,
  folder,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  token: string;
  folder?: string;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dataUrl, folder }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-charcoal/15 bg-cream",
            aspect
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-xs text-soft">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-cream transition hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Upload new"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste image URL"
            className="w-56 rounded-lg border border-charcoal/15 px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-coral/30"
          />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
