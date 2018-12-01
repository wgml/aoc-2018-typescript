import { HelloWorlder } from "../app"

test('Should hello me', () => {
  expect(HelloWorlder('me')).toBe('Hello, me.');
});