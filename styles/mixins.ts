export const size = {
  PHONE: 599,
  TABLET: 768,
};

export const device = {
  FOR_PHONE_ONLY: `max-width: ${size.PHONE}px`,
  FOR_TABLET_PORTRAIT_UP: `min-width: ${size.TABLET}px`,
  FOR_TABLET_PORTRAIT_DOWN: `max-width: ${size.TABLET}px`,
};
