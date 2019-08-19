# NOTES

## How long did it take?

- ?

## Overview

### Initial Notes
- Get info from backend about available slots.
- Dynamically split the info.
- Consultant Type
- Date & Time: pick a date and time mapped from the data for the given consultant type.
- Appointment Type: also dynamically mapped given the consultant type selection.
- Default selection should be gp? Provided that this is always available - better to just select the first in the list.
- Notes - available on all instances.
- Submit/Book - Post only available if all fields have been selected. 

Will also clone icons folder from the 'add-icons' branch for quick access to icons.

### Getting Started
- Haven't looked into yarn start issues yet. Command currently just starts the server or react - may use 'concurrently' if I don't resolve the issue. 
- 'querySelectorAll is not a function' - currently commented out. So far as I can see, it just tries to attach the undeclared 'onClick' handler. Don't think this is valid react, but will look into it a little later. 
- manifest.json - changed favicon size to actual size 26*26px. 
Git issues:
- Changed precommit to a husky config with pre-commit hook within package.json.
- Had to yarn add husky -D (version 3.0.4) as it was throwing an error - 'Can't find Husky, skipping pre-commit hook'
- Also had to reinstall prettier as it wasn't found.
- Added key to slot map.

### In Progress Notes
- Used conditional rendering for Appointment Type field (video/audio) to make sure it was only displayed when an appointment 
  for a specific consultant stype was available. Don't want it to display if not appointments are available.

You should:
- provide an overview of how you approached this challenge
- explain any trade-offs you made here, for example if you decided to take less time on the styling so you could concentrate on tests
- explain what you would have done next, for example you might decide to write more tests or spend more time on styling
- Add error handling subdivided by field and also success message banner.

## General Feedback

- So far as I am aware, brew is not functional out of the box on Windows. It would be nice to have setup instructions in the README which were more universal. 
- Same as above also applies to NVM. Would be nice to have some more universal setup instructions. 