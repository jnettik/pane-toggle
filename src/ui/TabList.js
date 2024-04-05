const html = String.raw;

const Tab = tab => html`<li class="tab-item">${tab}</li>`;

/**
 * A TabList UI element.
 *
 * @param {object} params
 *   An object of template params.
 * @returns {string}
 *   The HTML template string.
 */
export const TabList = ({ tabs }) => html`
  <ul class="tab-list">
    ${tabs.map(tab => Tab(tab))}
  </ul>
`;
