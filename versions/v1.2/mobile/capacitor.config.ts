import type { CapacitorConfig } from '@capacitor/cli';

// App ID PROPOSED: confirm your legal developer identity and app ID before first store upload.
const config: CapacitorConfig = {
  appId: 'co.upgrade.lingopop',
  appName: 'LingoPop',
  webDir: 'www',
  bundledWebRuntime: false,
  backgroundColor: '#F7FBFF',
  ios: { contentInset: 'automatic' },
  android: { allowMixedContent: false },
};
export default config;
