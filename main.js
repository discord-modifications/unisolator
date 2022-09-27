const { patch } = require('#kernel/core/patchers/BrowserWindowPatcher');
const patterns = require('./patterns.json');

if (patterns[process.platform]) {
   try {
      const nullbyte = require(`./nullbyte/nullbyte-${process.platform}.node`);

      const success = nullbyte.patch(process.pid, patterns[process.platform], true);
      if (!success) throw 0;
   } catch (e) {
      global.__ABORT__ = true;
      console.error('nullbyte failed patching, expect issues.');
   }

   patch('unbound', (options) => {
      if (global.__ABORT__) return;

      options.webPreferences ??= {};
      options.webPreferences.contextIsolation = false;
      options.webPreferences.nodeIntegration = true;
   });
}
