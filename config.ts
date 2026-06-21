export interface Config {
  schema: string;
  wTimestamp: boolean;
  wWhoIs: boolean;
  wComments: boolean;
  wRating: boolean;
  createdDateColumn: string;
  updatedDateColumn: string;
  logToConsole: boolean;
  logToFile: boolean;
  customFields: boolean;
}

export const config: Config = {
  schema: "evolutility",

  // - Optional fields
  // - Timestamp columns updated_at and created_at w/ date of record creation and last update
  wTimestamp: true,
  // - "WhoIs" columns updated_by and created_by w/ userid of creator and last modifier
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
