// Function to format time in 12-hour format with AM/PM
function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    
    // Add leading zeros
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}

// Function to get current balance
function getBalance() {
    const balanceElement = document.querySelector('#balance');
    if (balanceElement) {
        return parseInt(balanceElement.textContent) || 0;
    }
    return 0;
}

// Function to update balance
function updateBalance(newBalance) {
    const balanceElement = document.querySelector('#balance');
    if (balanceElement) {
        balanceElement.textContent = newBalance;
    }
}

// Function to add history item
function addHistoryItem(serviceName, serviceNumber) {
    const sidebar = document.querySelector('.sidebar');
    const currentTime = formatTime();
    
    // Create new history item
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    historyItem.innerHTML = `
        <div>
            <div class="history-service">${serviceName}</div>
            <div class="history-number">${serviceNumber}</div>
        </div>
        <div class="history-time">${currentTime}</div>
    `;
    
    // Insert after the sidebar header
    const sidebarHeader = sidebar.querySelector('.sidebar-header');
    sidebarHeader.insertAdjacentElement('afterend', historyItem);
}

// Function to clear all history items
function clearHistory() {
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => item.remove());
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add event listeners to all call buttons
    const callButtons = document.querySelectorAll('.call-btn');
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get current balance
            const currentBalance = getBalance();
            
            // Check if balance is more than 20
            if (currentBalance < 20) {
                alert("Not enough coin");
                return;
            }
            
            // Find the parent service card
            const serviceCard = this.closest('.service-card');
            
            // Get service title, subtitle, and number
            const serviceName = serviceCard.querySelector('.service-title').textContent;
            const serviceSubtitle = serviceCard.querySelector('.service-subtitle').textContent;
            const serviceNumber = serviceCard.querySelector('.service-number').textContent;
            
            // Show calling alert
            alert(`Calling ${serviceSubtitle} ${serviceNumber}...`);
            
            // Deduct 20 coins from balance
            updateBalance(currentBalance - 20);
            
            // Add to history
            addHistoryItem(serviceName, serviceNumber);
        });
    });
    
    // Add event listener to clear button
    const clearButton = document.querySelector('.clear-btn');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            clearHistory();
        });
    }
});