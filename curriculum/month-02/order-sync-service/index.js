const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2846',
  database: 'order_service'
});

// Home route
app.get('/', (req, res) => {
  res.send('Order Sync Service Running');
});

// Get all orders
app.get('/orders', async (req, res) => {

  try {

    const [rows] = await pool.query(
      'SELECT * FROM orders'
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Failed to fetch orders'
    });
  }
});

// Sync orders route
app.post('/sync-orders', async (req, res) => {

  try {

    // Create sync run
    const [syncRun] = await pool.query(
      `
      INSERT INTO sync_runs(status)
      VALUES('running')
      `
    );

    const syncRunId = syncRun.insertId;

    // Fake external API data
    const fakeOrders = [
      {
        external_id: 'ORD-2001',
        customer_name: 'Alice Johnson',
        amount: 150,
        status: 'completed'
      },
      {
        external_id: 'ORD-2002',
        customer_name: 'David Brown',
        amount: 75,
        status: 'pending'
      }
    ];

    // Insert orders
    for (const order of fakeOrders) {

      await pool.query(
        `
        INSERT IGNORE INTO orders(
          external_id,
          customer_name,
          amount,
          status,
          sync_run_id
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          order.external_id,
          order.customer_name,
          order.amount,
          order.status,
          syncRunId
        ]
      );
    }

    // Mark sync success
    await pool.query(
      `
      UPDATE sync_runs
      SET
        status = 'success',
        finished_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [syncRunId]
    );

    res.json({
      message: 'Orders synced successfully'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Sync failed'
    });
  }
});

app.listen(3000, () => {
  console.log(
    'Server running on http://localhost:3000'
  );
});