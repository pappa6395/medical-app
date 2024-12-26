
export function formatToBytes(sizeInBytes: number) {
    const sizeInKB = sizeInBytes / 1024

    return String(sizeInKB.toFixed(2))
}