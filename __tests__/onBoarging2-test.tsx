import { render, screen } from "expo-router/testing-library";
import OnBoarding2 from "../src/app/screens/onboardings/onBoarding2";

test("should render correctly", () => {
  render(<OnBoarding2 />);
  expect(screen.toJSON()).toMatchSnapshot();
});
