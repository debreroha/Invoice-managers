import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import invoiceRoutes from './routes/invoiceRoutes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => res.send('Invoice Manager API'));

app.listen(port, () => console.log(`Server running on port ${port}`));
