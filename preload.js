process.nextTick(() => {
   const listeners = process.listeners('uncaughtException');
   const target = listeners.find(l => ~l.toString().indexOf('uncaughtExceptionHandler'));

   if (target) process.off('uncaughtException', target);
});

if (window?.opener?.popouts) {
   window.addEventListener('load', () => {
      window.opener.popouts.set(window.name, window);
   });

   window.addEventListener('beforeunload', () => {
      window.opener.popouts.delete(window.name);
   });
};