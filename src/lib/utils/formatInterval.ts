
// This is a function for formatting the prep and cook time intervals into more readable formats.
// ex. "00:30" -> "30 mins"
export function formatInterval(interval: string) {
    const [hours, minutes] = interval.split(":").map(Number)

    if (hours === 0) return `${minutes} mins`
    if (minutes === 0) return `${hours} hr${hours > 1 ? "s" : ""}`
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} mins`
}