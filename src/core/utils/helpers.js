export const flattenObject = (obj, delimiter = ".", prefix = "") => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const path = prefix ? `${prefix}${delimiter}${key}` : key;
    const isNestedObject =
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date) &&
      Object.keys(value).length > 0;

    if (isNestedObject) {
      Object.assign(acc, flattenObject(value, delimiter, path));
    } else {
      acc[path] = value;
    }

    return acc;
  }, {});
};

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

export const getLocationLabel = (locationName) =>
  LOCATION_FA[locationName] || locationName;

const VEHICLE_LABELS = {
  airplane: "هواپیما",
  ship: "کشتی",
  train: "قطار",
  bus: "اتوبوس",
};

const VEHICLE_ICONS = {
  airplane: "/images/airplane.png",
  ship: "/images/ship.png",
  bus: "/images/bus.png",
};

export const getVehicleLabel = (vehicle) =>
  VEHICLE_LABELS[vehicle] || "خودرو آفرود";

export const getVehicleIcon = (vehicle) => VEHICLE_ICONS[vehicle] || null;

const parseValidDate = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getTourDuration = (startDate, endDate) => {
  const start = parseValidDate(startDate);
  const end = parseValidDate(endDate);

  if (!start || !end) return 0;

  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};

export const getTourDurationLabel = (startDate, endDate) => {
  const days = getTourDuration(startDate, endDate);
  const nights = days > 0 ? days - 1 : 0;

  return `${days} روز و ${nights} شب`;
};

export const convertToIranDateTime = (isoDate) => {
  const date = parseValidDate(isoDate);
  if (!date) return "-";

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
  const date = parseValidDate(isoDate);
  if (!date) return "-";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
