document.addEventListener('DOMContentLoaded', () => {
  updateBalance();
});

async function updateBalance() {
  const response = await fetch('http://localhost:3000/balance');
  const data = await response.json();
  document.getElementById('balance').innerText = `Balance: $${data.balance}`;
}

async function addMoney() {
  const amount = prompt('Enter the amount to add:');
  if (amount) {
    await fetch('http://localhost:3000/add-money', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseInt(amount) }),
    });
    updateBalance();
  }
}

async function makePurchase() {
  const amount = prompt('Enter the purchase amount:');
  if (amount) {
    await fetch('http://localhost:3000/make-purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseInt(amount) }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Purchase failed. Insufficient funds.');
      }
      return response.json();
    })
    .then(data => {
      updateBalance();
      alert(data.message);
    })
    .catch(error => {
      alert(error.message);
    });
  }
}
