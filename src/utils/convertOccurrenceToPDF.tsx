import { FC, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { IoMdDownload } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";
import { Button } from "@/components/ui/button";
import formatDateBR from "@/utils/formatDate";
import formatEnumCombobox from "@/utils/formatEnumCombobox";
import { ViewOccurenceSchema } from "@/dtos";
import { api } from "@/services/api";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";

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
    marginBottom: 10,
    fontWeight: "bold",
    color: "#2095C2",
  },
  separator: {
    borderBottomWidth: 2,
    borderColor: "#2095C2",
    marginBottom: 10,
  },
  section: { marginBottom: 15 },
  text: { marginBottom: 5 },
  table: {
    marginTop: 10,
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
    backgroundColor: "#2095C2",
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

const ReportDocument = ({ data }: { data: ViewOccurenceSchema }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <Image src={BrasaoVertical} style={styles.logo} /> */}
      <Text style={styles.header}>Relatório de Ocorrência</Text>
      <View style={styles.separator} />
      <View style={styles.section}>
        <Text style={styles.text}>
          Data do ocorrido: {formatDateBR(data?.registeredAt || "")}
        </Text>
        <Text style={styles.text}>
          Status: {formatEnumCombobox(data?.status || "")}
        </Text>
      </View>
      <Text style={styles.subtitle}>Detalhes da Ocorrência</Text>
      <View style={styles.table}>
        {[
          ["Categoria", data?.category],
          ["Subcategoria", data?.subcategory],
          ["Descrição", data?.description],
          ["Comentários", data?.comments],
          ["Detalhes", data?.details],
          ["Acompanhamento", data?.accompaniment],
          ["Danos Materiais", data?.materialDamage],
          [
            "Impacto no Trânsito",
            formatEnumCombobox(data?.trafficImpact || ""),
          ],
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
          ["Rua", data?.location?.street],
          ["Número", data?.location?.number],
          ["Bairro", data?.location?.neighborhood],
          ["Cidade", data?.location?.city],
          ["Estado", data?.location?.state],
          ["Referência", data?.location?.reference],
        ].map(([label, value], index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.cellHeader}>{label}</Text>
            <Text style={styles.cell}>{value || "N/A"}</Text>
          </View>
        ))}
      </View>
    </Page>
    {((data?.vehicles && data.vehicles.length > 0) ||
      (data?.participants && data.participants.length > 0) ||
      (data?.authorities && data.authorities.length > 0)) && (
      <Page size="A4" style={styles.page}>
        {data?.vehicles && data.vehicles.length > 0 && (
          <>
            <Text style={styles.subtitle}>Veículos Envolvidos</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellHeader}>Placa</Text>
                <Text style={styles.cellHeader}>Modelo</Text>
                <Text style={styles.cellHeader}>Cor</Text>
              </View>
              {data.vehicles.map((vehicle, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{vehicle.plate}</Text>
                  <Text style={styles.cell}>{vehicle.model}</Text>
                  <Text style={styles.cell}>{vehicle.color}</Text>
                </View>
              ))}
            </View>
          </>
        )}
        {data?.drivers && data.drivers.length > 0 && (
          <>
            <Text style={styles.subtitle}>Motoristas Envolvidos</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellHeader}>Nome</Text>
                <Text style={styles.cellHeader}>Contato</Text>
                <Text style={styles.cellHeader}>Habilitação?</Text>
                <Text style={styles.cellHeader}>Veículo</Text>
              </View>
              {data.drivers.map((driver, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{driver.name}</Text>
                  <Text style={styles.cell}>{driver.contact}</Text>
                  <Text style={styles.cell}>
                    {driver.isLicensed ? "Sim" : "Não"}
                  </Text>
                  <Text style={styles.cell}>
                    {`${
                      data.vehicles.find(
                        (vehicle) => vehicle.id === driver.vehicleId
                      )?.model
                    }: ${
                      data.vehicles.find(
                        (vehicle) => vehicle.id === driver.vehicleId
                      )?.plate
                    }`}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
        {data?.participants && data.participants.length > 0 && (
          <>
            <Text style={styles.subtitle}>Participantes Envolvidos</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellHeader}>Nome</Text>
                <Text style={styles.cellHeader}>Contato</Text>
                <Text style={styles.cellHeader}>Descrição</Text>
                <Text style={styles.cellHeader}>Participação</Text>
                <Text style={styles.cellHeader}>Estado</Text>
              </View>
              {data.participants.map((participant, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{participant.name}</Text>
                  <Text style={styles.cell}>{participant.contact}</Text>
                  <Text style={styles.cell}>{participant.description}</Text>
                  <Text style={styles.cell}>
                    {formatEnumCombobox(
                      participant.participation ? participant.participation : ""
                    )}
                  </Text>
                  <Text style={styles.cell}>
                    {formatEnumCombobox(
                      participant.status ? participant.status : ""
                    )}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
        {data?.authorities && data.authorities.length > 0 && (
          <>
            <Text style={styles.subtitle}>Autoridades Envolvidas</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellHeader}>Nome</Text>
                <Text style={styles.cellHeader}>Providências</Text>
                <Text style={styles.cellHeader}>Tempo de resposta</Text>
              </View>
              {data.authorities.map((authority, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{authority.name}</Text>
                  <Text style={styles.cell}>{authority.providences}</Text>
                  <Text style={styles.cell}>{authority.serviceTime}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    )}
  </Document>
);

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
          const response = await api.get<ViewOccurenceSchema>(
            `/occurrences/${dataId}`
          );
          const blob = await pdf(
            <ReportDocument data={response.data as ViewOccurenceSchema} />
          ).toBlob();
          saveAs(blob, `Ocorrencia_${response.data?.id}.pdf`);
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
    <Button
      type="button"
      variant="rounded"
      className="bg-gray-400"
      onClick={handleDownloadClick}
      disabled={loading}
    >
      {downloadDone ? <MdDownloadDone /> : <IoMdDownload />}
    </Button>
  );
};

export default PDFGenerator;
