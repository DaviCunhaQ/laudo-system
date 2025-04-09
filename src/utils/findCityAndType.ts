import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";

const {data: soTypes} = useGetSoTypes()
const {data: cities} = useGetCities()

export function findCity(id: string) {
  const city = cities?.find((city) => city.id === id)?.name
  return city || "Cidade Desconhecida"
}

export function findSoType(id: string) {
  const soType = soTypes?.find((soType) => soType.id === id)?.code
  return soType || "Tipo Desconhecido"
}