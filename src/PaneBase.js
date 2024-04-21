import merge from 'deepmerge';
import { accordionDefaults as defaults } from './config';
import { randomId, validateConfig } from './utils';

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
   *
   * @return {array}
   *   Returns the created triggers.
   */
  setupUi(group) {
    const { config } = this;
    this.getPanes(group).map((pane, index) => {
      const id = randomId();
      const label = pane.querySelector(config.trigger);
      const content = pane.querySelector(config.content);
      const contentId = content.getAttribute('id');
      const isOpen = index === config.defaultOpen;
      const trigger = config.templates.button({
        content: label.innerHTML,
        controls: id,
        isOpen,
      });

      label.innerHTML = trigger;
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
   * Check to see if the clicked button is currently open.
   * @param {HTMLElement} trigger
   *   A trigger element.
   * @returns {boolean}
   *   True or false if the trigger is currently expanded.
   */
  isOpen(trigger) {
    return trigger.getAttribute('aria-expanded') === 'true';
  }

  open(trigger) {
    const targetId = trigger.getAttribute('aria-controls');
    const target = document.querySelector(targetId);

    trigger.setAttribute('aria-expanded', true);
    target.setAttribute('aria-hidden', false);
  }

  close(trigger) {
    const targetId = trigger.getAttribute('aria-controls');
    const target = document.querySelector(targetId);

    trigger.setAttribute('aria-expanded', false);
    target.setAttribute('aria-hidden', true);
  }

  /**
   * Get the panes in a grouping.
   *
   * @param {HTMLElement} group
   *   The group object.
   *
   * @return {array}
   *   The pane objects within the grouping.
   */
  getPanes(group) {
    const { config } = this;
    const panes = group.querySelectorAll(config.pane);
    return [...panes];
  }

  /**
   * Closes all open panes in a group.
   *
   * @param {HTMLElement} group
   *   The group to close elements in.
   */
  closeAll(triggers) {
    triggers.forEach(trigger => this.close(trigger));
  }

}
