import { ServiceOrderListSchema } from "@/dtos"

export const generateOptionsByType = (data: ServiceOrderListSchema , soType: string ) => {
    const initialArray = []
    if(data.cpf){
      initialArray.push(["CPF" , data.cpf])
    }
    if(data.cnpj){
      initialArray.push(["CNPJ" , data.cnpj])
    }
    if(soType.startsWith("G")){
      initialArray.push(["Tipo de imóvel", data.property_type])
      initialArray.push(["Condição do imóvel", data.property_status])
      initialArray.push(["Matrícula consta no sistema?", data.registration_on_system])
      initialArray.push(["Dados da Matrícula no documento coincide com o que está descrito no Siopi (nº de matrícula, livro e cartório)?", data.siopi_coincides])
      initialArray.push(["Tipo de Matrícula", data.registration_type])
      initialArray.push(["Existe averbação de área construída na matrícula?", (data.averbation_exists === true ? "Sim" : "Não")])
      initialArray.push(["Data da matrícula", data.registration_date])
      initialArray.push(["Área construída presenta na matrícula", data.built_area_presents])
      initialArray.push(["Situação da obra na PLS", data.pls_built_situation])
      initialArray.push(["Mensurado acumulado total", `${data.total_measured}%`])
      initialArray.push(["Área Construída", data.built_area])
      initialArray.push(["Área do Terreno", data.terrain_area])
      initialArray.push(["Número de Quartos", data.rooms_number])
      initialArray.push(["Número de Banheiros", data.bathrooms_number])
    }else if (soType === "A413"){
      initialArray.push(["Tipo de imóvel", data.property_type])
      initialArray.push(["Condição do imóvel", data.property_status])
      initialArray.push(["Matrícula consta no sistema?", data.registration_on_system])
      initialArray.push(["Dados da Matrícula no documento coincide com o que está descrito no Siopi (nº de matrícula, livro e cartório)?", data.siopi_coincides])
      initialArray.push(["Tipo de Matrícula", data.registration_type])
      initialArray.push(["Existe averbação de área construída na matrícula?", (data.averbation_exists === true ? "Sim" : "Não")])
      initialArray.push(["Data da matrícula", data.registration_date])
      initialArray.push(["Área construída presenta na matrícula", data.built_area_presents])
    }else if (soType === "E401"){
      initialArray.push(["Situação da obra na PLS", data.pls_built_situation])
      initialArray.push(["Mensurado acumulado total", `${data.total_measured}%`])
    }else if (soType.startsWith("B")){
      initialArray.push(["Matrícula consta no sistema?", data.registration_on_system])
      initialArray.push(["Dados da Matrícula no documento coincide com o que está descrito no Siopi (nº de matrícula, livro e cartório)?", data.siopi_coincides])
      initialArray.push(["Tipo de Matrícula", data.registration_type])
      initialArray.push(["Data da matrícula", data.registration_date])
      initialArray.push(["Área Construída", `${data.built_area} Metros Quadrados`])
      initialArray.push(["Área do Terreno", `${data.terrain_area} Metros Quadrados`])
      initialArray.push(["Número de Quartos", data.rooms_number])
      initialArray.push(["Número de Banheiros", data.bathrooms_number])
    }
    return initialArray
  }