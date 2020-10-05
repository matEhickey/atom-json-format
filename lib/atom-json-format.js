'use babel';

/* global atom */

import { CompositeDisposable } from 'atom'; // eslint-disable-line import/no-unresolved

export default {
  subscriptions: null,

  activate(state) { // eslint-disable-line no-unused-vars
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-json-format:format': () => this.format(),
    }));
  },

  format() {
    console.log('json format'); // eslint-disable-line no-console
    const editor = atom.workspace.getActiveTextEditor();
    try {
      const content = JSON.parse(editor.getText());
      editor.setText(JSON.stringify(content, null, 2));
    } catch (error) {
      console.warn(error.toString()); // eslint-disable-line no-console
      atom.notifications.addError('json-format error:');
      atom.notifications.addError(error.toString());
    }
  },

};
