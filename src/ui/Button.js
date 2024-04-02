const html = String.raw;

/**
 * A Button UI element.
 *
 * @param {object} params
 *   An object of template params.
 * @returns {string}
 *   The HTML template string.
 */
export const Button = ({ content, controls, isOpen = false }) => html`
  <button
    type="button"
    aria-controls="${controls}"
    aria-expanded="${isOpen}"
    class="pane-trigger"
  >${content}</button>
`;
