
/**
 * Generate a random six character unique ID.
 *
 * @return string
 *   The unique ID string.
 */
export const randomId = () => {
  const date = Date.now().toString(36);
  const random = Math.random().toString(36).substring(3);
  const id = random + date;

  return `tp-${id.substring(0, 6)}`;
};
