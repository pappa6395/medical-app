
export function formatToBytes(sizeInBytes: string) {
    const sizeInKB = Number(sizeInBytes) / 1024

    return String(sizeInKB.toFixed(2))
}