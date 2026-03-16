1. Organiser – Analytics Page Updates

Modify the Organiser Analytics Dashboard.

Remove the following metrics:

Remove “Fill Rate”

Remove “Performance by Neighbourhood”

Replace them with clearer event engagement metrics:

Add analytics cards showing:

1. Event Views

Number of users who viewed the event page.

2. Event Clicks

Number of users who clicked into the event details.

3. Sign-ups

Number of users who successfully signed up for the event.

4. Drop-offs

Users who viewed or clicked but did not complete sign-up.

Design suggestions:

Display these as analytics summary cards at the top of the page.

Use simple bar charts or line charts to show engagement trends.

Maintain the current GoJio analytics UI style.

2. Create Activity Page Updates

Update the Create Activity Form.

Add the following fields:

Start Time

Time picker input.

End Time

Time picker input.

Ensure these fields appear below the event date selection.

Update Event Display Components

Update all relevant UI components where event timing is shown:

Event cards

Event detail pages

Event list view

Map preview cards

Each event should now display:

Date • Start Time – End Time

Example:

Sat, 14 Jun • 3:00 PM – 6:00 PM

Maintain consistency across all event card layouts.

3. Home Page Navigation Fix

Update the “See All” button behaviour.

Booked Events Section

The See All button should open a dropdown list view displaying all booked events.

It should follow the same UI pattern currently used by the “See All” button in the Popular Events section.

Remove the current behaviour where:

Booked Events → leads to Analytics page

Recommended for You Section

The See All button should also open the same dropdown list UI used for Popular Events.

Remove the current behaviour where:

Recommended → leads to Explore Map page

Design Requirements for Dropdown List

The dropdown list should display:

Event card list layout

Event image

Event title

Category tag

Date and time

Location

“View Details” button

Ensure the dropdown interaction is consistent with the existing Popular Events dropdown UI.

Constraints

Keep all changes consistent with the current GoJio UI components and layout system.

Focus only on UI layout and structure.

Do not include backend logic, APIs, or data implementation.