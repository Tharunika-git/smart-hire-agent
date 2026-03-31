const processedIDs = new Set<string>();

export function isDuplicate(id: string) {
  return processedIDs.has(id);
}

export function storeInMemory(id: string) {
  processedIDs.add(id);
}