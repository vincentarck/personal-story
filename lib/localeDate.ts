export default function getLocaleDate(
  date: string,
  locale: string,
  opt: Object
) {
  return new Date(date).toLocaleDateString(locale, opt);
}
