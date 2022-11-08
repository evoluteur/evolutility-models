module.exports = {
  schema: "",

  // - Optional fields
  // - Timestamp columns u_date and c_date w/ date of record creation and last update
  wTimestamp: true,
  // - "WhoIs" columns u_uid and c_uid w/ userid of creator and last modifier
  wWhoIs: true,
  // - Comments & Ratings (community feature)
  wComments: true,
  wRating: false,
  // - Columns containing created and last updated dates
  createdDateColumn: "c_date",
  updatedDateColumn: "u_date",

  // - Logs (to file and console)
  logToConsole: true,
  logToFile: false,

  // - Custom Fields in a JSON column
  customFields: true,
};
