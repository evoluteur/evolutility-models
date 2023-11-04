module.exports = {
  schema: "",

  // - Optional fields
  // - Timestamp columns updated_at and created_at w/ date of record creation and last update
  wTimestamp: true,
  // - "WhoIs" columns u_uid and c_uid w/ userid of creator and last modifier
  wWhoIs: true,
  // - Comments & Ratings (community feature)
  wComments: true,
  wRating: false,
  // - Columns containing created and last updated dates
  createdDateColumn: "created_at",
  updatedDateColumn: "updated_at",

  // - Logs (to file and console)
  logToConsole: true,
  logToFile: false,

  // - Custom Fields in a JSON column
  customFields: true,
};
