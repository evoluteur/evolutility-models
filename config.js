module.exports = {
  schema: "evolutility",

  // - Optional fields
  // - Timestamp columns updated_at and created_at w/ date of record creation and last update
  wTimestamp: true,
  // - "WhoIs" columns updated_by and created_by w/ userid of creator and last modifier
  wWhoIs: false,
  // - Comments & Ratings (community feature)
  wComments: false,
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
