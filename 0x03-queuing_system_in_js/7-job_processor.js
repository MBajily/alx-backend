import kue from 'kue';

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  // Track initial progress
  job.progress(0, 100);

  // Check if phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track progress to 50%
  job.progress(50, 100);

  // Send notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  
  // Mark job as complete
  done();
}

// Create a queue and process jobs
const queue = kue.createQueue();

// Process jobs from the push_notification_code_2 queue
// Process two jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  
  sendNotification(phoneNumber, message, job, done);
});
