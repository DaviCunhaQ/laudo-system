export const locationQueryKeys = {
  all: ["locations"],
  lists: () => [...locationQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...locationQueryKeys.lists(), { filters }],
  details: () => [...locationQueryKeys.all, "detail"],
  detail: (id: string | number) => [...locationQueryKeys.details(), id],
};
