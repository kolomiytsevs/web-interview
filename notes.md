# NOTES

## How long did it take?

- 3 days

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
- Haven't looked into yarn start issues yet. Command currently just starts the server or react - may use 'concurrently' if I don't resolve the issue -> I didn't have time, have to start both the server and frontend seperately.
- 'querySelectorAll is not a function' - currently commented out. So far as I can see, it just tries to attach the undeclared 'onClick' handler. Don't think this is valid react, but will look into it a little later. 
- manifest.json - changed favicon size to actual size 26*26px. 
Git issues:
- Changed precommit to a husky config with pre-commit hook within package.json.
- Had to yarn add husky -D (version 3.0.4) as it was throwing an error - 'Can't find Husky, skipping pre-commit hook'
- Added key to slot map.

### Final Thoughts

I approached the project step by step as detailed in my initital notes above. It mostly went according to plan.

- I have diverted from the API documentation as it didn't post the correct data to the backend, nor does it include information about the type of phone call the user selected. I am aware that is doesn't quite match up with the API documentation for POST calls, however I wasn't sure whether this was simply down to your documentation being out of date.
- My application currently handles failed get requests with a simple error message. Depending on what the server returns, it may be better to redirect the user to sign in if for example their JWT has expired.
- I would like to have spent more time on styling. It would probably be good to subdivde the scss into their corresponding component files as it is currently mostly in the App.scss file. I also personally find unnested css easier to read and so try to avoid it when possible. This is just a personal preference. 
- Just from doing the tests, it's very obvious that my button components for different fields share similar functionality/structure. If I had more time I would try to merge them into one component. 
- The horizontal scroll bar used on the appointment time field is not supported by other browsers, so may be better to use an alternative.
- Appointment dates have been formatted suing moment.js. However, 'Today' and 'tomorrow' will be displayed on all buttons that match that criteria. It would better if only the first button for the day rendered the 'today' label. 
- My API POST currently displays appointment type - gp appointment - all in lowercase. This is not quite in keeping with the documentation. Would be good to currect this.
- On POST, my application currently just reloads the page, it may be better to display a 'Appointment Booked' page. I have adde this functionality by updating state after a post, however didn't have time to actually display it.
- It may be good to replace the conditional rendering and loading spinner on the home page with React.Lazy and Suspense for future maintainability.
- I would also use the Context API to deal with some of the 'prop-drilling' issues in my application.

If I were to redo the challenge, I would probably make sure I was running test as I went along (rather than in chunks as I have done). I would also structure my project a little better form the start with the relevant folders to prevent me having to do mass restructuring. 

If I had more time, I would like to take care of the problems I have discussed above. I would also like to add in a lot more tests - in particular integration tests. I have added a few integration tests to the Body component, but would like to add more to provide good coverage. I chose Jest/Enzyme as this is the bundle I am most familiar with.
Overall I tried not to neglect any particular areas, so given more time, I would probably spend more time on testing, styling, restructuring.

## General Feedback

- So far as I am aware, brew is not functional out of the box on Windows. It would be nice to have setup instructions in the README which were more universal. 
- Same as above also applies to NVM. Would be nice to have some more universal setup instructions.
- Would like some clarification about the API as submitting the provided fields doesn't add it to the backend in the same form as the data which is already there.
