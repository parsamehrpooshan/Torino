export const flattenObject = (obj, delimiter = ".", prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, k));
    else acc[k] = obj[k];
    return acc;
  }, {});

export const LOCATION_FA = {
  Tehran: "تهران",
  Sananndaj: "سنندج",
  Isfahan: "اصفهان",
  Madrid: "مادرید",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
  Sulaymaniyah: "سلیمانیه",
};

export const getTourDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const getTourDurationLabel = (startDate, endDate) => {
  const days = getTourDuration(startDate, endDate);
  const nights = days > 0 ? days - 1 : 0;

  return `${days} روز و ${nights} شب`;
};

export const convertToIranDateTime = (isoDate) => {
  if (!isoDate) return "-";

  const date = new Date(isoDate);

  const optionsWeekday = { weekday: "long", timeZone: "Asia/Tehran" };
  const optionsDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tehran",
  };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tehran",
  };

  const weekday = new Intl.DateTimeFormat("fa-IR", optionsWeekday).format(date);
  const formattedDate = new Intl.DateTimeFormat("fa-IR", optionsDate).format(
    date
  );
  const time = new Intl.DateTimeFormat("fa-IR", optionsTime).format(date);

  return `${weekday} ، ${formattedDate} ، ساعت ${time}`;
};

export const convertToBirthdate = (isoDate) => {
  if (!isoDate) return "-";

  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
