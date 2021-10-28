const size = {
  PHONE: "599px",
  TABLET: "768px",
};

export const device = {
  FOR_PHONE_ONLY: `max-width: ${size.PHONE}`,
  FOR_TABLET_PORTRAIT_UP: `min-width: ${size.TABLET}`,
  FOR_TABLET_PORTRAIT_DOWN: `max-width: ${size.TABLET}`,
};
