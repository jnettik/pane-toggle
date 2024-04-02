const requiredConfig = ['grouping', 'pane', 'trigger', 'content'];

/**
 * Validate the passed config.
 *
 * @param {object} config
 *   Validate the passed config to the required items.
 *
 * @returns {array}
 *   An array of any empty required configs.
 */
export function validateConfig(config) {
  return requiredConfig.filter(setting => !config[setting]);
};
