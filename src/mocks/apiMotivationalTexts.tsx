import image2022 from '../../assets/motivation/2022_1.png';
import image2021 from '../../assets/motivation/2021_1.png';

export interface MotivationalText {
  year: string;
  texts: { text?: string; image?: any }[]; 
}

const motivationalTextsData: MotivationalText[] = [
  { 
    year: "2022", 
    texts: [
      { text: "Texto motivador 1 de 2022", image: image2022 },
      { text: "Texto motivador 2 de 2022" },
      { image: image2022  }
    ]
  },
  { 
    year: "2021", 
    texts: [
      { text: "Texto motivador 1 de 2021", image: image2021 },
      { text: "Texto motivador 2 de 2021" }
    ]
  },
  // Adicione mais anos e textos aqui
];

export const fetchMotivationalTexts = async (year: string): Promise<{ success: boolean; data?: MotivationalText }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = motivationalTextsData.find(item => item.year === year);
      if (data) {
        resolve({ success: true, data });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};
