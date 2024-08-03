import { invoices, Invoice } from '../models/invoiceModel.js';

const getInvoices = (req, res) => {
  res.json(invoices);
};

const getInvoiceById = (req, res) => {
  const invoice = invoices.find(inv => inv.id === parseInt(req.params.id));
  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404).json({ message: 'Invoice not found' });
  }
};

const createInvoice = (req, res) => {
  const { invoiceNumber, clientName, clientEmail, items, totalAmount, dueDate } = req.body;
  const newInvoice = new Invoice(invoiceNumber, clientName, clientEmail, items, totalAmount, dueDate);
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
};

const updateInvoice = (req, res) => {
  const invoice = invoices.find(inv => inv.id === parseInt(req.params.id));
  if (invoice) {
    Object.assign(invoice, req.body);
    res.json(invoice);
  } else {
    res.status(404).json({ message: 'Invoice not found' });
  }
};

const deleteInvoice = (req, res) => {
  const index = invoices.findIndex(inv => inv.id === parseInt(req.params.id));
  if (index !== -1) {
    invoices.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Invoice not found' });
  }
};

export { getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice };
