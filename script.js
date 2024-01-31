let expenses = [];

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (description && !isNaN(amount)) {
        const expense = { description, amount, category };
        expenses.push(expense);
        updateExpenseList();
        updateTotals();
        clearForm();
    } else {
        alert('Please enter valid information for description and amount.');
    }
}


function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '<h3>Expense List</h3>';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<button class="delete-expense-btn" onclick="deleteExpense(${index})">Delete</button> <strong>${expense.description}</strong> - $${expense.amount} (${expense.category})`;
        expenseList.appendChild(listItem);
    });
}
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateTotals();
}

function updateTotals() {
    const totalExpenses = document.getElementById('totalExpenses');
    const categoryTotals = document.getElementById('categoryTotals');

    let totalAmount = 0;
    for (let i = 0; i < expenses.length; i++) {
        totalAmount += expenses[i].amount;
    }
    totalExpenses.textContent = totalAmount;

    const categories = {};
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    }

    categoryTotals.innerHTML = '<h3>Category Totals</h3>';
    for (const category in categories) {
        const categoryTotalItem = document.createElement('div');
        categoryTotalItem.textContent = `${category}: $${categories[category]}`;
        categoryTotals.appendChild(categoryTotalItem);
    }
    categoryTotals.innerHTML = '<h3>Category Totals</h3>';
    for (const category in categories) {
        const categoryTotal = categories[category];
        const percentage = (categoryTotal / totalAmount) * 100;

        const categoryTotalItem = document.createElement('div');
        categoryTotalItem.textContent = `${category}: $${categoryTotal} (${percentage.toFixed(2)}%)`;
        categoryTotals.appendChild(categoryTotalItem);
    }
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'select a category';
}


updateExpenseList();
updateTotals();
