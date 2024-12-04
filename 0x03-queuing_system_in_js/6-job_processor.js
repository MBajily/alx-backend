import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Function to send notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs from the push_notification_code queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  
  sendNotification(phoneNumber, message);
  
  // Mark job as complete
  done();
});
