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

// Function to get current heart count
function getHeartCount() {
    // Try multiple possible selectors for the heart count
    const heartCountElement = document.querySelector('.heart-count') ||
        document.querySelector('.stat-item:first-child span') ||
        document.querySelector('.stats-section .stat-item:first-child span');
    if (heartCountElement) {
        return parseInt(heartCountElement.textContent) || 0;
    }
    return 0;
}

// Function to update heart count
function updateHeartCount(newCount) {
    // Try multiple possible selectors for the heart count
    const heartCountElement = document.querySelector('.heart-count') ||
        document.querySelector('.stat-item:first-child span') ||
        document.querySelector('.stats-section .stat-item:first-child span');
    if (heartCountElement) {
        heartCountElement.textContent = newCount;
    }
}

// Function to get current copy count
function getCopyCount() {
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        const text = copyButton.textContent;
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }
    return 0;
}

// Function to update copy count
function updateCopyCount(newCount) {
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.textContent = `${newCount} Copy`;
    }
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
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
document.addEventListener('DOMContentLoaded', function () {

    // Add event listeners to all call buttons
    const callButtons = document.querySelectorAll('.call-btn');
    callButtons.forEach(button => {
        button.addEventListener('click', function () {
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

    // Add event listeners to all favorite icons
    const favoriteIcons = document.querySelectorAll('.favorite-icon');
    console.log(`Found ${favoriteIcons.length} favorite icons`); // Debug log

    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent any default behavior
            console.log('Favorite icon clicked!'); // Debug log

            // Get current heart count and increase by 1
            const currentHeartCount = getHeartCount();
            console.log(`Current heart count: ${currentHeartCount}`); // Debug log

            updateHeartCount(currentHeartCount + 1);
            console.log(`Updated heart count to: ${currentHeartCount + 1}`); // Debug log
        });
    });

    // Add event listeners to all copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Find the parent service card
            const serviceCard = this.closest('.service-card');

            // Get service number
            const serviceNumber = serviceCard.querySelector('.service-number').textContent;

            // Copy to clipboard
            copyToClipboard(serviceNumber).then(success => {
                if (success) {
                    // Show alert
                    alert(`Copied ${serviceNumber}`);

                    // Increase copy count
                    const currentCopyCount = getCopyCount();
                    updateCopyCount(currentCopyCount + 1);
                } else {
                    alert('Failed to copy to clipboard');
                }
            });
        });
    });

    // Add event listener to clear button
    const clearButton = document.querySelector('.clear-btn');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            clearHistory();
        });
    }

    // Debug: Check if heart count element exists
    console.log('Heart count element:', document.querySelector('.heart-count') ||
        document.querySelector('.stat-item:first-child span'));
});