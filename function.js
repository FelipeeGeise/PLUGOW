document.addEventListener('DOMContentLoaded', function() {
    const storeForm = document.getElementById('store-form');
    const userForm = document.getElementById('user-form');
    const purchaseForm = document.getElementById('purchase-form');
    const userSelect = document.getElementById('purchase-user');
    const pointsDisplay = document.getElementById('points-display');

    const users = [];
    const points = {};

    storeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const storeName = document.getElementById('store-name').value;
        alert(`Loja ${storeName} cadastrada com sucesso!`);
        document.getElementById('store-name').value = '';
    });

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = document.getElementById('user-name').value;
        const userRole = document.getElementById('user-role').value;
        const user = { name: userName, role: userRole };

        users.push(user);
        points[userName] = 0;

        const option = document.createElement('option');
        option.value = userName;
        option.textContent = userName;
        userSelect.appendChild(option);

        alert(`Usuário ${userName} (${userRole}) cadastrado com sucesso!`);
        document.getElementById('user-name').value = '';
    });

    purchaseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = userSelect.value;
        const purchaseAmount = parseFloat(document.getElementById('purchase-amount').value);
        const user = users.find(u => u.name === userName);

        let userPoints = 0;
        if (user.role === 'arquitetos' || user.role === 'engenheiros') {
            userPoints = purchaseAmount;
        } else if (user.role === 'consultores') {
            userPoints = purchaseAmount / 2;
        }

        points[userName] += userPoints;
        updatePointsDisplay();

        alert(`Compra registrada! ${userName} ganhou ${userPoints.toFixed(2)} pontos.`);
        document.getElementById('purchase-amount').value = '';
    });

    function updatePointsDisplay() {
        pointsDisplay.innerHTML = '';
        for (const userName in points) {
            const pointEntry = document.createElement('div');
            pointEntry.textContent = `${userName}: ${points[userName].toFixed(2)} pontos`;
            pointsDisplay.appendChild(pointEntry);
        }
    }
});
