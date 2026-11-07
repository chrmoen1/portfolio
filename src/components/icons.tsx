const paths: Record<string, string> = {
  architecture: "M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6",
  data: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  devops: "M12 3v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  fullstack: "m8 9-4 3 4 3m8-6 4 3-4 3M14 5l-4 14",
  rocket: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2m-.5-5.5L13 7c2.5-2.5 6-3 8-3 0 2-.5 5.5-3 8l-5.5 5.5m-5-5L4 11l3-3h4m-3.5 4.5 4 4m0 0L13 20l3-3v-4",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
};

export function Icon({ name, className = "size-7" }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.layers} />
    </svg>
  );
}
