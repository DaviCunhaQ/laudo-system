export const AuthorityQueryKeys = {
  all: ["authorities"],
  lists: () => [...AuthorityQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...AuthorityQueryKeys.lists(), { filters }],
  details: () => [...AuthorityQueryKeys.all, "detail"],
  detail: (id: string | number) => [...AuthorityQueryKeys.details(), id],
};