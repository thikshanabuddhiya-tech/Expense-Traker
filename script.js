let transactions = [];

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("add-btn");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("transaction-list");

const savedTransactions = localStorage.getItem("transactions");

if (savedTransactions) {
    transactions = JSON.parse(savedTransactions); // convert string back to array
    renderTransactions();
    updateTotals();
}


addBtn.addEventListener("click", () => {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;
    
    if (description === "" || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        description: description,
        amount: amount,
        type: type 
    }

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTotals();
    renderTransactions();

});

function updateTotals() {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income - expense;

    balanceEl.textContent = balance.toFixed(2);
    incomeEl.textContent = income.toFixed(2);
    expenseEl.textContent = expense.toFixed(2);
};

function renderTransactions() {
    listEl.innerHTML = "";

    transactions.forEach((transaction) => {
        const li = document.createElement("li");

        li.textContent = "Description - " + transaction.description + ", Amount - " + transaction.amount + ", Transaction Type - " + transaction.type; +

        listEl.appendChild(li);
    })

}


