# AMSAttendance-V4
Express JS app to automate teacher attendance and staff covereages.

## Basic features
- *Includes MS/HS schedules and letter days*
- *Does not include text message functionality*
- DB of teacher schedules and classes
- Assign coverages from the app

### Next steps
- Assign coverages - if a teacher is assigned a coverage they should not show up as available for other coverages of the same
period
- Filter for available teachers by period - Admin wants to be able to see who is available during each period for misc. purposes

### Next,Next steps
- Teachers being assigned a coverage will receive a text message or email
- A final email is sent to admin with a list of all absences and coverages happening that day

### Twilio resources
- https://www.twilio.com/docs/sms/quickstart/node
- https://www.twilio.com/docs/twilio-cli/general-usage/profiles#use-multiple-profiles
- https://www.google.com/search?q=overlapping+time+schedule+coding+problem&sxsrf=ALiCzsY6Q-cJwSv1ogGZoC2z8MdtTI1-aw:1671752527678&source=lnms&tbm=vid&sa=X&ved=2ahUKEwji5cG8s478AhXUGlkFHS0tC5kQ_AUoAnoECAEQBA&biw=1920&bih=1088&dpr=1#fpstate=ive&vld=cid:db17f444,vid:pirT3bDXXLE
