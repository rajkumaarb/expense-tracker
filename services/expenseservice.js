const ExpenseService = {
  setItem(key, data) {
    try {
      const parsedExpense = JSON.stringify(data);
      localStorage.setItem(key, parsedExpense);
    } catch (err) {
      console.log(`Error setting ${key} to local storage`, err);
    }
  },
  getItems(key = "expenses") {
    try {
      const readExpenses = localStorage.getItem(key);
      return readExpenses ? JSON.parse(readExpenses) : [];
    } catch (err) {
      console.log(`Error reading ${key} from local storage`, err);
    }
  },
  removeItem(index) {
    try {
      let readExpenses = this.getItems();
      if (readExpenses) {
        readExpenses = readExpenses.filter((item) => item.id !== index);
        this.setItem("expenses", readExpenses);
      }
      return this.getItems();
    } catch (err) {
      console.log(`Error removing ${index}-th in local storate`, err);
    }
  },
};

export default ExpenseService;
