export const isGithubUrl = (url: string) => {
  const regex = /^https?:\/\/(www\.)?github\.com\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
};

export const isLinkedinUrl = (url: string) => {
  const regex = /^https?:\/\/(www\.)?linkedin\.com\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
};

export const isInstagramUrl = (url: string) => {
  const regex = /^https?:\/\/(www\.)?instagram\.com\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
};
