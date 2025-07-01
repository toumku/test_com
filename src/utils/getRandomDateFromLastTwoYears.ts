export function getRandomDateFromLastTwoYears() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const start = new Date(currentYear - 1, 0, 1);
  const end = now;

  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomTime;
}
