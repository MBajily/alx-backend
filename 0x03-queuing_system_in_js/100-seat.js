import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const port = 1245;

// Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Kue queue
const queue = kue.createQueue();

// Initial seat reservation setup
const TOTAL_SEATS = 50;
let reservationEnabled = true;

/**
 * Set the number of available seats in Redis
 * @param {number} number - Number of seats to set
 */
const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

/**
 * Get the current number of available seats from Redis
 * @returns {Promise<number>} - Number of available seats
 */
const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats, 10) : 0;
};

// Initialize seats on server start
reserveSeat(TOTAL_SEATS);

// Routes
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      return res.json({ status: "Reservation failed" });
    }
    return res.json({ status: "Reservation in process" });
  });

  job.on('complete', (result) => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

app.get('/process', (req, res) => {
  res.json({ status: "Queue processing" });

  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();

    if (availableSeats <= 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    const newAvailableSeats = availableSeats - 1;
    await reserveSeat(newAvailableSeats);

    if (newAvailableSeats === 0) {
      reservationEnabled = false;
    }

    done();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
