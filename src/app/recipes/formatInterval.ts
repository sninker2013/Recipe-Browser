export function formatInterval(interval: string) {
    const [hours, minutes] = interval.split(":").map(Number)

    if (hours === 0) return `${minutes} mins`
    if (minutes === 0) return `${hours} hr${hours > 1 ? "s" : ""}`
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} mins`
}