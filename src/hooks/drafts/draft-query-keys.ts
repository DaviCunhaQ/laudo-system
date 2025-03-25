export const DraftQueryKeys = {
  all: ["drafts"],
  lists: () => [...DraftQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...DraftQueryKeys.lists(), { filters }],
  details: () => [...DraftQueryKeys.all, "detail"],
  detail: (id: string | number) => [...DraftQueryKeys.details(), id],
};