import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  enablePersistence: true,
  persistenceSettings: { synchronizeTabs: true },
});
