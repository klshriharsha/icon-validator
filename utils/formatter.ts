export function formatBytes(bytes: number, precision = 2) {
    const k = 1024
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    if (bytes === 0) {
        return `0 ${units[0]}`
    }

    const index = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** index).toFixed(precision))} ${units[index]}`
}
