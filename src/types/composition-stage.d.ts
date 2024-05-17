interface CompositionStageProps {
  essayData: string;
  setCompositionStage: (
    stage: "introduction" | "development" | "conclusion"
  ) => void;
}
