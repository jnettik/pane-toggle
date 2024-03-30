const requiredConfig = ['grouping', 'pane', 'trigger', 'content'];

export function validateConfig(config) {
  return requiredConfig.filter(setting => !config[setting]);
};
