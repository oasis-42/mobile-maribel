export interface ThemeData {
    year: string;
    theme: string;
  }
  
  const themes: ThemeData[] = [
    { year: "2022", theme: "Impactos da pandemia na educação" },
    { year: "2021", theme: "Desafios da saúde pública no Brasil" },
    { year: "2020", theme: "O estigma associado às doenças mentais na sociedade brasileira" },
    { year: "2019", theme: "Manipulação do comportamento do usuário pelo controle de dados na internet" },
    { year: "2018", theme: "Formação educacional de surdos no Brasil" },
    { year: "2017", theme: "Desafios para a formação educacional de surdos no Brasil" },
    { year: "2016", theme: "Caminhos para combater a intolerância religiosa no Brasil" },
    { year: "2015", theme: "A persistência da violência contra a mulher na sociedade brasileira" },
    { year: "2014", theme: "Publicidade infantil em questão no Brasil" },
    { year: "2013", theme: "Efeitos da implantação da Lei Seca no Brasil" },
    { year: "2012", theme: "Movimento imigratório para o Brasil no século XXI" },
    { year: "2011", theme: "Viver em rede no século XXI: os limites entre o público e o privado" },
    { year: "2010", theme: "O trabalho na construção da dignidade humana" },
    { year: "2009", theme: "O indivíduo frente à ética nacional" },
    { year: "2008", theme: "Como preservar a floresta Amazônica" },
    { year: "2007", theme: "O desafio de se conviver com as diferenças" },
    { year: "2006", theme: "O poder de transformação da leitura" },
  ];
  
  export const fetchMockedData = async (): Promise<{ success: boolean; data: ThemeData[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: themes });
      }, 1000);
    });
  };
  
  export const sendMockedYear = async (year: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
  
  
  