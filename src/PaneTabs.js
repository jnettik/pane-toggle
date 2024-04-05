import merge from 'deepmerge';
import PaneBase from "./PaneBase";
import { tabsDefaults as defaults } from './config';

/**
 * Class for PaneTabs functionality.
 */
export default class PaneTabs extends PaneBase {

  /**
   * Constructor method for the PaneBase instance.
   *
   * @param {object} config
   *   Configuration for the Toggle Pane instance.
   */
  constructor(config) {
    const tabsConfig = merge.all([defaults, config]);
    super(tabsConfig);
  }

  /**
   * {@inheritdoc}
   */
  setupUi(group) {
    const { config } = this;
    const triggers = super.setupUi(group);
    const tabs = config.templates.tabs({ tabs: triggers });

    group.innerHTML = tabs + group.innerHTML;

    return triggers;
  }

}
