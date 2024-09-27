// src/components/PdfReport.tsx
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
});

interface UASG {
  id: string;
  nome: string;
  idOrgaoSuperior: string;
  cep: string;
}

interface Orgao {
  orgao: {
    nome: string;
    codigo: string;
    codigoTipoAdm: string;
    codigoTipoEsfera: string;
    ativo: boolean;
  };
  uasgs: UASG[];
}

interface Material {
  codigoGrupo: number;
  nomeGrupo: string;
  codigoClasse: number;
  nomeClasse: string;
  codigoPdm: number;
  nomePdm: string;
  codigoItem: number;
  descricaoItem: string;
  statusItem: boolean;
  itemSustentavel: boolean;
  dataHoraAtualizacao: string;
}

interface PdfReportProps {
  materiais: Material[];
  orgao: Orgao | null; // Permitir que 'orgao' seja nulo
}

const PdfReport: React.FC<PdfReportProps> = ({ materiais, orgao }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Relatório de Materiais</Text>
        
        {/* Verifique se o órgão está disponível */}
        {orgao ? (
          <>
            <Text>Órgão: {orgao.orgao.nome}</Text>
            <Text>Código: {orgao.orgao.codigo}</Text>
            <Text>Tipo Administração: {orgao.orgao.codigoTipoAdm}</Text>
          </>
        ) : (
          <Text>Órgão não disponível</Text>
        )}

        <View style={styles.section}>
          <Text style={styles.header}>Materiais</Text>
          {materiais.length > 0 ? (
            materiais.map((material) => (
              <View key={material.codigoItem}>
                <Text><strong>Material:</strong> {material.descricaoItem}</Text>
                <Text><strong>CATMAT:</strong> {material.codigoItem}</Text>
                <Text><strong>Grupo:</strong> {material.nomeGrupo}</Text>
                <Text><strong>Status:</strong> {material.statusItem ? 'Ativo' : 'Inativo'}</Text>
                <Text><strong>Data de Atualização:</strong> {new Date(material.dataHoraAtualizacao).toLocaleString()}</Text>
                <Text>--------------------------------</Text>
              </View>
            ))
          ) : (
            <Text>Nenhum material encontrado.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PdfReport;
