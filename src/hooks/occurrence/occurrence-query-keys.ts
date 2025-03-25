export const occurrenceQueryKeys = {
  all: ["occurrences"],
  lists: () => [...occurrenceQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...occurrenceQueryKeys.lists(), { filters }],
  details: () => [...occurrenceQueryKeys.all, "detail"],
  detail: (id: string | number) => [...occurrenceQueryKeys.details(), id],
};
