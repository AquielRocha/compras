// import jsPDF from "jspdf";


// export default const Baixarpdf = () => {
//     const doc = new jsPDF();

//     // Definir margens e configurar estilo geral
//     const marginLeft = 20;
//     const marginTop = 20;
//     let currentY = marginTop;

//     // Configurar fonte e tamanho para título
//     doc.setFontSize(18);
//     doc.text("Relatório de Compras", marginLeft, currentY);
//     currentY += 10; // Espaçamento

//     // Adicionar data e hora de geração
//     const date = new Date().toLocaleString();
//     doc.setFontSize(12);
//     doc.text(`Gerado em: ${date}`, marginLeft, currentY);
//     currentY += 10;

//     // Se houver dados do órgão, criar uma seção específica para isso
//     if (orgaoData) {
//       doc.setFontSize(16);
//       doc.text("Informações do Órgão", marginLeft, currentY);
//       currentY += 8;

//       doc.setFontSize(12);
//       doc.text(`Nome: ${orgaoData.orgao.nome}`, marginLeft, currentY);
//       currentY += 6;
//       doc.text(`Código: ${orgaoData.orgao.codigo}`, marginLeft, currentY);
//       currentY += 6;
//       doc.text(
//         `Tipo de Administração: ${orgaoData.orgao.codigoTipoAdm}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 6;
//       doc.text(
//         `Tipo de Esfera: ${orgaoData.orgao.codigoTipoEsfera}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 6;
//       doc.text(
//         `Ativo: ${orgaoData.orgao.ativo ? "Sim" : "Não"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 10; // Espaçamento adicional após essa seção
//     }
//     // Se houver dados dos materiais, criar outra seção
//     if (Array.isArray(materiaisData)) {
//       // Verifica se materiaisData é uma array
//       doc.setFontSize(16);
//       doc.text("Informações dos Materiais", marginLeft, currentY);
//       currentY += 8;

//       // Adicionar informações de cada material
//       materiaisData.forEach((material: any, index: any) => {
//         doc.setFontSize(12);
//         doc.text(
//           `${index + 1}. Nome do Material: ${material.descricaoItem}`,
//           marginLeft,
//           currentY
//         );
//         currentY += 6;
//         doc.text(`   CATMAT: ${material.codigoItem}`, marginLeft, currentY);
//         currentY += 6;
//         doc.text(`   Grupo: ${material.nomeGrupo}`, marginLeft, currentY);
//         currentY += 6;
//         doc.text(`   Classe: ${material.nomeClasse}`, marginLeft, currentY);
//         currentY += 6;
//         doc.text(`   PDM: ${material.nomePdm}`, marginLeft, currentY);
//         currentY += 6;
//         doc.text(
//           `   Sustentável: ${material.itemSustentavel ? "Sim" : "Não"}`,
//           marginLeft,
//           currentY
//         );
//         currentY += 6;
//         doc.text(
//           `   Data de Atualização: ${new Date(material.dataHoraAtualizacao).toLocaleString()}`,
//           marginLeft,
//           currentY
//         );
//         currentY += 10; // Espaçamento entre materiais
//       });
//     } else {
//       doc.setFontSize(12);
//       doc.text("Nenhum material encontrado.", marginLeft, currentY);
//       currentY += 10;
//     }

//     const totalPages = (doc.internal as any).getNumberOfPages();
//     for (let i = 1; i <= totalPages; i++) {
//       doc.setPage(i);
//       doc.setFontSize(10);
//       doc.text(
//         `Página ${i} de ${totalPages}`,
//         doc.internal.pageSize.getWidth() - 30,
//         doc.internal.pageSize.getHeight() - 10
//       );
//     }

//     // Salvar o PDF
//     doc.save("relatorio_compras.pdf");
//   };