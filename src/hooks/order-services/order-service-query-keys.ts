export const orderServiceQueryKeys = {
  all: ["service-order"],
  lists: () => [...orderServiceQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...orderServiceQueryKeys.lists(), { filters }],
  details: () => [...orderServiceQueryKeys.all, "detail"],
  detail: (id: string | number) => [...orderServiceQueryKeys.details(), id],
};
