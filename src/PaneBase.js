import merge from 'deepmerge';
import { defaults } from './config';
import { randomId, validateConfig } from './utils';
import { Button } from './ui';

/**
 * Base class for Toggle Pane functionality.
 */
export default class PaneBase {

  /**
   * Constructor method for the PaneBase instance.
   *
   * @param {object} config
   *   Configuration for the Toggle Pane instance.
   */
  constructor(config) {
    const emptyConfig = validateConfig(config);

    if (emptyConfig.length) {
      console.error(`Missing required settings for ${emptyConfig.join(', ')}.`);
    }

    this.controller = new AbortController();
    this.config = merge.all([defaults, config]);
    this.paneGroups = document.querySelectorAll(config.grouping);
    this.templates = {
      button: config.buttonTempalte ?? Button,
    };
  }

  /**
   * Initialization of a ToggleBase instance.
   */
  init() {
    this.paneGroups.forEach(group => {
      this.setupUi(group);
      this.setupEvents(group);
    });
  }

  /**
   * Destroy the ToggleBase instance.
   */
  destroy() {
    this.controller.abort();
  }

  /**
   * Setup the Toggle Pane UI for a group.
   *
   * @param {HTMLElement} group
   *   The group of Toggle Pane items.
   */
  setupUi(group) {
    group.querySelectorAll(this.config.pane).forEach((pane, index) => {
      const id = randomId();
      const trigger = pane.querySelector(this.config.trigger);
      const content = pane.querySelector(this.config.content);
      const contentId = content.getAttribute('id');
      const isOpen = index === this.config.defaultOpen;
      const props = {
        content: trigger.innerHTML,
        controls: id,
        isOpen,
      };

      trigger.innerHTML = this.templates.button(props);
      content.setAttribute('aria-hidden', !isOpen);
      content.setAttribute('id', contentId ? `${contentId}-${id}` : id);
    });
  }

  /**
   * Attach all the event listeners.
   *
   * @param {HTMLElement} group
   *   The group of Toggle Pane items.
   */
  setupEvents(group) {
    group.addEventListener('click', event => {
      this.handleClick(event, group);
      event.preventDefault();
    }, { signal: this.controller.signal });
  }

  /**
   * Handle the pane click.
   *
   * @param {Event} event
   *   The event object.
   * @param {HTMLElement} group
   *   The group of Toggle Pane items.
   */
  handleClick(event, group) {
    const trigger = event.target.closest('.pane-trigger');

    if (!trigger) return;
    if (!group.contains(trigger)) return;

    const targetId = trigger.getAttribute('aria-controls');
    const target = group.querySelector(`#${targetId}`);
    const isOpen = this.isOpen(trigger);

    trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    target.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  }

  /**
   *
   * @param {HTMLElement} trigger
   *   A trigger element.
   * @returns {boolean}
   *   True or false if the trigger is currently expanded.
   */
  isOpen(trigger) {
    return trigger.getAttribute('aria-expanded') === 'true';
  }

}
