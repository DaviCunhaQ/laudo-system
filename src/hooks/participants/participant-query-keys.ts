export const ParticipantQueryKeys = {
  all: ["participants"],
  lists: () => [...ParticipantQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...ParticipantQueryKeys.lists(), { filters }],
  details: () => [...ParticipantQueryKeys.all, "detail"],
  detail: (id: string | number) => [...ParticipantQueryKeys.details(), id],
};