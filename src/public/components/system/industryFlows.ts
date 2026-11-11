export const flows = [
  { name: 'Enquiries', input: 'New enquiry', action: 'Save the request and alert the right team member', result: 'Customer details and follow-up saved', check: 'Contact details, need and urgency' },
  { name: 'Sales', input: 'Quotation requested', action: 'Prepare a quote for staff to check', result: 'Quote and follow-up saved', check: 'What is needed, price and who approves it' },
  { name: 'Bookings', input: 'Appointment requested', action: 'Check available times and prepare a booking', result: 'Appointment and reminders saved', check: 'Available times and customer preferences' },
  { name: 'Orders', input: 'Order received', action: 'Check details and prepare the order', result: 'Order and customer update saved', check: 'Items, stock and payment status' },
  { name: 'Office work', input: 'Details received', action: 'Prepare a document and save approved details', result: 'Document and staff approval saved', check: 'Required details and who can approve them' },
  { name: 'Customer support', input: 'Question received', action: 'Find the approved answer or alert a team member', result: 'Reply sent or team member alerted', check: 'Customer details and approved answers' },
  { name: 'Day-to-day work', input: 'Task requested', action: 'Give the task to the right person and track it', result: 'Task owner and progress saved', check: 'Who is available and when it is needed' },
  { name: 'Follow-ups', input: 'Follow-up due', action: 'Prepare a useful update or reminder', result: 'Customer reply and next step saved', check: 'Latest reply and when the customer can be contacted' },
  { name: 'Overview', input: 'Work updated', action: 'Show completed tasks and work needing attention', result: 'Clear view of completed and outstanding work', check: 'Which details are current and who owns the work' },
];
export const sectors = [
  { name: 'Wholesale and manufacturing', subject: 'trade account', rules: 'Pack sizes, stock, lead times and agreed credit terms', person: 'Sales or operations manager', example: 'A retailer asks for a repeat order with one changed quantity.', tools: 'stock records · accounting · customer records' },
  { name: 'Real estate and property', subject: 'property requirement', rules: 'Location, budget, property availability and viewing permissions', person: 'Property agent', example: 'A buyer asks for a two-bedroom home and a Saturday viewing.', tools: 'Property listings · customer records · calendar' },
  { name: 'Restaurants and hospitality', subject: 'guest request', rules: 'Party size, opening hours, capacity and access requirements', person: 'Reservations manager', example: 'A guest asks about a group booking and available times.', tools: 'Reservations · calendar · email' },
  { name: 'Retail and online shops', subject: 'customer order', rules: 'Product availability, payment status and return policy', person: 'Customer service team', example: 'A customer wants to change an item before dispatch.', tools: 'online shop · stock records · payments' },
  { name: 'Professional services', subject: 'client brief', rules: 'Scope, conflicts, capacity and engagement approval', person: 'Client relationship owner', example: 'A prospective client sends an outline and requests a proposal.', tools: 'customer records · documents · calendar' },
  { name: 'Clinics and appointment businesses', subject: 'appointment request', rules: 'Administrative availability, consent and staff permissions', person: 'Appointments team; clinical questions go to a clinician', example: 'A client wants to move an appointment to a different day.', tools: 'Booking system · calendar · approved messaging' },
  { name: 'Logistics and delivery', subject: 'delivery request', rules: 'Collection window, destination, capacity and tracking status', person: 'Transport coordinator', example: 'A sender needs a collection window and delivery update.', tools: 'delivery planning · courier · customer portal' },
  { name: 'Construction and field services', subject: 'site job', rules: 'Site access, crew availability, materials and approved scope', person: 'Site or project manager', example: 'A customer sends site details and asks for a quotation.', tools: 'Scheduling · documents · accounting' },
  { name: 'Education and training', subject: 'course enquiry', rules: 'Course dates, entry requirements, capacity and consent', person: 'Course administrator', example: 'A learner asks about eligibility and the next available course.', tools: 'Course catalogue · bookings · email' },
  { name: 'Other businesses', subject: 'business request', rules: 'Your documented rules, access permissions and exception owners', person: 'Your nominated team member', example: 'A repeated request arrives with information someone has to re-enter.', tools: 'Your existing tools, subject to discovery' },
];


