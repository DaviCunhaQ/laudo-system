export const DriverQueryKeys = {
  all: ["drivers"],
  lists: () => [...DriverQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...DriverQueryKeys.lists(), { filters }],
  details: () => [...DriverQueryKeys.all, "detail"],
  detail: (id: string | number) => [...DriverQueryKeys.details(), id],
};

export const VehicleQueryKeys = {
  all: ["vehicles"],
  lists: () => [...VehicleQueryKeys.all, "list"],
  list: (filters: Record<string, any>) => [...VehicleQueryKeys.lists(), { filters }],
  details: () => [...VehicleQueryKeys.all, "detail"],
  detail: (id: string | number) => [...VehicleQueryKeys.details(), id],
};