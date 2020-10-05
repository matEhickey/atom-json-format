'use babel';

/* global describe, beforeEach, it, atom, expect, waitsForPromise, runs */

describe('AtomJsonFormat', () => {
  let editor;
  let editorPromise;
  let activationPromise;

  beforeEach(() => {
    editorPromise = atom.workspace.open('');
    activationPromise = atom.packages.activatePackage('atom-json-format');
  });

  describe('when the atom-json-format:format event is triggered', () => {
    it('get the current editor and format the json', () => {
      waitsForPromise(() => activationPromise);

      waitsForPromise(() => editorPromise.then((_editor) => {
        editor = _editor;
      }));

      runs(() => {
        editor.setText('{"a": 1, "b": true}');

        atom.commands.dispatch(atom.views.getView(atom.workspace), 'atom-json-format:format');

        expect(editor.getText()).toEqual(`{
  "a": 1,
  "b": true
}`);
      });
    });
  });
});
