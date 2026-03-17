const stableDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC"
});

export function formatStableDate(input: string): string {
  return stableDateFormatter.format(new Date(input));
}
