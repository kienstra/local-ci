export default function getStarterConfig(): string {
  return `# https://circleci.com/docs/2.0/config-intro/

version: 2.1

jobs:
  test:
    docker:
      - image: cimg/node:16.8.0-browsers
    steps:
      - checkout
      - run: echo "Running example step, please edit this file"

workflows:
  test-flow:
    jobs:
      - test\n`;
}
