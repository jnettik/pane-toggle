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
    const { config, getPanes } = this;
    const tabs = getPanes(group).map((pane, index) => {
      const id = randomId();
      const label = pane.querySelector(config.trigger);
      const contentId = page.getAttribute('id');
      const isOpen = index === 1
      const trigger = config.templates.button({
        content: label.innerHTML,
        controls: id,
        isOpen,
      });

      label.setAttribute('hidden', true);
      pane.setAttribute('aria-hidden', !isOpen);
      pane.setAttribute('id', contentId ? `${contentId}-${id}` : id);

      return trigger;
    });

    const tabsList = config.templates.tabs({tabs});
    group.innerHTML = tabsList + group.innerHTML;
  }

}
