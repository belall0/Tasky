import connectDB from './configs/dbConnection.js';
import app from './app.js';

await connectDB();

const PORT = process.env.PORT;
const server = app.listen(PORT, 'localhost', () => {
  console.log(
    `Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} environment`,
  );
});
