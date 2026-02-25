/** Map MongoDB document(s) to API shape: id from _id, remove _id */
export function toResponse<T extends { _id?: unknown }>(doc: T): Omit<T, '_id'> & { id: string } {
  if (!doc) return doc as Omit<T, '_id'> & { id: string };
  const { _id, ...rest } = doc as T & { _id?: unknown };
  return { ...rest, id: _id != null ? String(_id) : '' } as Omit<T, '_id'> & { id: string };
}

export function toResponseList<T extends { _id?: unknown }>(docs: T[]): (Omit<T, '_id'> & { id: string })[] {
  return docs.map(toResponse);
}
