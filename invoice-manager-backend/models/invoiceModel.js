const invoices = [];

let currentId = 1;

class Invoice {
  constructor(invoiceNumber, clientName, clientEmail, items, totalAmount, dueDate) {
    this.id = currentId++;
    this.invoiceNumber = invoiceNumber;
    this.clientName = clientName;
    this.clientEmail = clientEmail;
    this.items = items;
    this.totalAmount = totalAmount;
    this.dueDate = dueDate;
  }
}

export { invoices, Invoice };
