import { render, screen } from "expo-router/testing-library";
import OnBoarding1 from "../src/app/screens/onboardings/onBoarding1";

test("should render correctly", () => {
  render(<OnBoarding1 />);
  expect(screen.toJSON()).toMatchSnapshot();
});
