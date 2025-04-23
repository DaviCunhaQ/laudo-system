import { FC, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { IoMdDownload } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";
import formatDateBR from "@/utils/formatDate";
import { ServiceOrderListSchema } from "@/dtos";
import { api } from "@/services/api";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import { SoTypeSchema } from "@/hooks/cities-sotypes/useGetSoTypes";
import { CitySchema } from "@/hooks/cities-sotypes/useGetCities";
import { generateOptionsByType } from "./generateOptionsByType";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    color: "#EB9E15",
  },
  secondHeader: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    color: "#EB9E15",
    marginTop: "4rem",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "#EB9E15",
  },
  separator: {
    borderBottomWidth: 2,
    borderColor: "#EB9E15",
    marginBottom: 10,
  },
  section: { marginBottom: 15 },
  text: { marginBottom: 5 },
  table: {
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  cellHeader: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#EB9E15",
    color: "#fff",
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 10,
  },
  logo: {
    width: "auto",
    height: 120,
    marginBottom: 10,
    alignSelf: "center",
  },
});

const ReportDocument = ({
  data,
  types,
  cities,
}: {
  data: ServiceOrderListSchema;
  types: SoTypeSchema[];
  cities: CitySchema[];
}) => {
  const soType = types.find((type) => type.id === data.order_type)
    ?.code as string;
  const optionsByType = generateOptionsByType(data, soType);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Relatório de Ordem de Serviço</Text>
        <Text style={styles.subHeader}>Empresa: {data.company}</Text>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.text}>
            Data de criação da Ordem de Serviço:{" "}
            {formatDateBR(data?.created_at || "")}
          </Text>
          <Text style={styles.text}>
            Tipo de Ordem de Serviço:{" "}
            {types.find((type) => type.id === data?.order_type)?.code}
          </Text>
        </View>
        <Text style={styles.subtitle}>Detalhes da Ordem de Serviço</Text>
        <View style={styles.table}>
          {[
            ["Cidade", cities.find((city) => city.id === data?.city)?.name],
            ["Nome do Cliente", data?.client_name],
            ["Nome do Contato", data?.contact_name],
            ["Número do Contato", data?.contact_number],
            ["Número da Ordem de Serviço", data?.order_number],
            ["Matrícula do RGI", data?.rgi_registration],
            ["Data de Abertura", data?.opening_date],
            ["Valor do Serviço", data?.service_value],
            ["Valor do Deslocamento", data?.displacement_value],
          ].map(([label, value], index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cellHeader}>{label}</Text>
              <Text style={styles.cell}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.subtitle}>Localização</Text>
        <View style={styles.table}>
          {[
            ["CEP", data?.cep],
            ["Bairro", data?.neighborhood],
            ["Rua", data?.street],
            ["Quadra", data?.block],
            ["Lote", data?.batch],
            ["Número", data?.number],
            ["Complemento", data?.complement],
            ["Coordenadas", data?.coordenates],
          ].map(([label, value], index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cellHeader}>{label}</Text>
              <Text style={styles.cell}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <Text style={styles.subtitle}>
          Informações Específicas da Ordem de Serviço
        </Text>
        <View style={styles.table}>
          {optionsByType.map(([label, value], index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cellHeader}>{label}</Text>
              <Text style={styles.cell}>{value || "N/A"}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.secondHeader}>Mais Informações:</Text>
        <View style={styles.separator}></View>
        {soType.startsWith("G") && (
          <>
            {data.mandatory_documents && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Documentos obrigatórios para imóvel novo
                  </Text>
                </View>
                {data.mandatory_documents.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.dwell_registration_compare && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Verificações de comparação entre o Habite-se e a matrícula:
                  </Text>
                </View>
                {data.dwell_registration_compare.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
        {soType === "A413" && (
          <>
            {data.mandatory_documents && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Documentos obrigatórios para imóvel novo
                  </Text>
                </View>
                {data.mandatory_documents.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.dwell_registration_compare && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Verificações de comparação entre o Habite-se e a matrícula:
                  </Text>
                </View>
                {data.dwell_registration_compare.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.art_registration_compare && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Verificações e comparação entre a ART e a matrícula:
                  </Text>
                </View>
                {data.art_registration_compare.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
        {soType.startsWith("B") && (
          <>
            {data.more_accurate_informations && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Quanto a localização na matrícula, além do endereço, há algo
                    que identifique a localização mais precisamente?
                  </Text>
                </View>
                {data.more_accurate_informations.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.mandatory_documents_to_b && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Documentos obrigatórios para prosseguir com a análise
                  </Text>
                </View>
                {data.mandatory_documents_to_b.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
        {soType === "E401" && (
          <>
            {data.minimal_documentation && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>
                    Documentação mínima necessária:
                  </Text>
                </View>
                {data.minimal_documentation.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.pls_verifications && (
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cellHeader}>Verificações na PLS:</Text>
                </View>
                {data.pls_verifications.map((document, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{document}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </Page>
      {soType !== "E401" && (
        <Page size="A4" style={styles.page}>
          {soType.startsWith("G") && (
            <>
              {data.dec_registration_compare && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações e comparação entre a DEC e a matrícula/ART:
                    </Text>
                  </View>
                  {data.dec_registration_compare.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.minimal_documentation && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Documentação mínima necessária:
                    </Text>
                  </View>
                  {data.minimal_documentation.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.pls_verifications && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Verificações na PLS:</Text>
                  </View>
                  {data.pls_verifications.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.art_registration_compare && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações e comparação entre a ART e a matrícula:
                    </Text>
                  </View>
                  {data.art_registration_compare.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
          {soType === "A413" && (
            <>
              {data.dec_registration_compare && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações e comparação entre a DEC e a matrícula/ART:
                    </Text>
                  </View>
                  {data.dec_registration_compare.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
          {soType.startsWith("B") && (
            <>
              {data.pci_verifications && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Verificações na PCI</Text>
                  </View>
                  {data.pci_verifications.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.pci_art_compare && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações e comparação entre a ART e a PCI:
                    </Text>
                  </View>
                  {data.pci_art_compare.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.project_permit_verifications && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações do Projeto e Alvará
                    </Text>
                  </View>
                  {data.project_permit_verifications.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </Page>
      )}
      {soType.startsWith("G") && (
        <Page size="A4" style={styles.page}>
          {soType.startsWith("G") && (
            <>
              {data.more_accurate_informations && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Quanto a localização na matrícula, além do endereço, há
                      algo que identifique a localização mais precisamente?
                    </Text>
                  </View>
                  {data.more_accurate_informations.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.mandatory_documents_to_b && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Documentos obrigatórios para prosseguir com a análise
                    </Text>
                  </View>
                  {data.mandatory_documents_to_b.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.pci_verifications && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Verificações na PCI</Text>
                  </View>
                  {data.pci_verifications.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </Page>
      )}
      {soType.startsWith("G") && (
        <Page size="A4" style={styles.page}>
          {soType.startsWith("G") && (
            <>
              {data.pci_art_compare && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações e comparação entre a ART e a PCI:
                    </Text>
                  </View>
                  {data.pci_art_compare.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.project_permit_verifications && (
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>
                      Verificações do Projeto e Alvará
                    </Text>
                  </View>
                  {data.project_permit_verifications.map((document, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={styles.cell}>{document}</Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </Page>
      )}
    </Document>
  );
};

interface PDFGeneratorProps {
  occurrenceId: string;
}

const PDFGenerator: FC<PDFGeneratorProps> = ({ occurrenceId }) => {
  const dataId = occurrenceId;
  const [loading, setLoading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  const handleDownloadClick = () => {
    setLoading(true);
    toast
      .promise(
        (async () => {
          const response = await api.get<ServiceOrderListSchema>(
            `/service-order/${dataId}`
          );
          const responseTypes = await api.get<SoTypeSchema[]>(
            "/service-order-types"
          );
          const responseCities = await api.get<CitySchema[]>("/cities");
          const blob = await pdf(
            <ReportDocument
              data={response.data as ServiceOrderListSchema}
              types={responseTypes.data}
              cities={responseCities.data}
            />
          ).toBlob();
          saveAs(blob, `Ordem_de_serviço_${response.data?.id}.pdf`);
          setDownloadDone(true);
        })(),
        {
          loading: "Gerando PDF...",
          success: "PDF gerado com sucesso!",
          error: "Erro ao gerar pdf ;(",
        }
      )
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={handleDownloadClick}
          disabled={loading}
          asChild
        >
          <div className="w-full aspect-[2/1] bg-gray-400 rounded-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
            {downloadDone ? (
              <MdDownloadDone color="#fff" size={26} />
            ) : (
              <IoMdDownload color="#fff" size={26} />
            )}
            <p className="text-white font-semibold max-[500px]:hidden">
              Gerar PDF
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Gerar PDF</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PDFGenerator;
