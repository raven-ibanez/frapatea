/*
  # Add Business Hours to Site Settings

  Adds opening_time and closing_time to the site_settings table.
  Values are stored in HH:MM 24-hour format (e.g. "08:00", "21:00").
*/

INSERT INTO site_settings (id, value, type, description) VALUES
  ('opening_time', '08:00', 'text', 'Daily opening time in HH:MM 24-hour format'),
  ('closing_time', '21:00', 'text', 'Daily closing time in HH:MM 24-hour format')
ON CONFLICT (id) DO NOTHING;
