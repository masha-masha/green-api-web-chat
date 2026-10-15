export const formatToWhatsAppId = (phone: string): string => {
  const cleanNumber = phone.replace(/\D/g, '');
  return cleanNumber.endsWith('@c.us') ? cleanNumber : `${cleanNumber}@c.us`;
};
