export const userQueryKeys = {
  all: ["users"],
  lists: () => [...userQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...userQueryKeys.lists(), { filters }],
  details: () => [...userQueryKeys.all, "detail"],
  detail: (id: string | number) => [...userQueryKeys.details(), id],
};