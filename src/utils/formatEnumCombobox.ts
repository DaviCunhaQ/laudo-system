export default function formatEnumCombobox(combo: string): string {
  const mappings: Record<string, string> = {
    // Status da ocorrência
    "ABERTO": "Aberto",
    "EM_PROGRESSO": "Sob Investigação",
    "ENCERRADO": "Encerrado",

    // Impacto no trânsito
    "BLOQUEIO_PARCIAL": "Bloqueio Parcial",
    "BLOQUEIO_TOTAL": "Bloqueio Total",
    "CONGESTIONAMENTO_INTENSO": "Congestionamento Intenso",
    "CONGESTIONAMENTO_LEVE": "Congestionamento Leve",
    "CONGESTIONAMENTO_MODERADO": "Congestionamento Moderado",
    "DESVIO_NECESSARIO": "Desvio Necessário",
    "SEM_IMPACTO": "Sem Impacto",
    "TRANSITO_LENTO": "Trânsito Lento",

    // Participação no incidente
    "PASSAGEIRO": "Passageiro",
    "PEDESTRE": "Pedestre",
    "TESTEMUNHA": "Testemunha",

    // Status do participante
    "FERIDO": "Ferido",
    "OBITO": "Óbito",
    "SEM_FERIMENTOS": "Sem Ferimentos",

    // Cargos
    "ADMIN": "Administrador",
    "SUPERADMIN": "Super Administrador",
    "USER": "Usuário"

    //Categorias e Subcategorias
  };

  return mappings[combo] || combo; // Retorna o valor original caso não esteja mapeado
}
