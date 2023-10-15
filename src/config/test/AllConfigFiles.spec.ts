import AllConfigFiles from 'config/AllConfigFiles';
import EditorGateway from 'gateway/EditorGateway';
import getContextStub from 'test-tool/helper/getContextStub';
import getContainer from 'test-tool/TestRoot';
import type { Uri } from 'vscode';

function getMockContext(filePath: string) {
  const initialContext = getContextStub();

  return {
    ...initialContext,
    globalState: {
      ...initialContext.globalState,
      get: () => {
        return filePath;
      },
      update: async () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  };
}

let allConfigFiles: AllConfigFiles;
let editorGateway: EditorGateway;

describe('AllConfigFiles', () => {
  beforeEach(() => {
    const container = getContainer();
    allConfigFiles = container.allConfigFiles;
    editorGateway = container.editorGateway;
  });

  test('stored config file', async () => {
    const selectedFilePath = '/baz/bar/ex';
    editorGateway.editor.workspace.findFiles = () =>
      // @ts-expect-error type of stub is wrong.
      Promise.resolve([
        { fsPath: '/path/to/here' },
        { fsPath: selectedFilePath },
      ]);
    editorGateway.editor.workspace.asRelativePath = (pathOrUri: string | Uri) =>
      String(pathOrUri);

    const actual = await allConfigFiles.getPaths(
      getMockContext(selectedFilePath)
    );

    expect(actual[0].fsPath).toEqual(selectedFilePath);
    expect(actual[0].label);
    expect(actual[0].description);
  });
});
