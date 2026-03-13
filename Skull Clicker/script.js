let cookies = 0;
let cps = 0;
let upgrades = {
    cursor: { cost: 15, baseCps: 0.5, owned: 0 },
    grandma: { cost: 100, baseCps: 5, owned: 0 },
    bot: { cost: 5000, baseCps: 100, owned: 0 },
};

const cookieCountEl = document.getElementById('cookie-count');
const cpsEl = document.getElementById('cps');
const bigCookie = document.getElementById('big-cookie');

bigCookie.addEventListener('click', () => {
    cookies += 1;
    updateDisplay();
});

function buyUpgrade(type) {
    const upgrade = upgrades[type];
    if (cookies >= upgrade.cost) {
        const cpsIncrease = upgrade.baseCps * Math.pow(1.2, upgrade.owned);
        cookies -= upgrade.cost;
        cps += cpsIncrease;
        upgrade.owned += 1;
        upgrade.cost = Math.floor(upgrade.cost * 1.15); // Increase cost
        updateDisplay();
        updateUpgradeDisplay(type);
    }
}

function updateDisplay() {
    cookieCountEl.textContent = Math.floor(cookies);
    cpsEl.textContent = cps.toFixed(1);
}

function updateUpgradeDisplay(type) {
    const upgrade = upgrades[type];
    const nextCps = upgrade.baseCps * Math.pow(1.2, upgrade.owned);
    const upgradeEl = document.getElementById(type);
    upgradeEl.querySelector('p').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} - Cost: ${upgrade.cost} cookies (+${nextCps.toFixed(1)} cps)`;
}

setInterval(() => {
    cookies += cps;
    updateDisplay();
}, 1000);

// Initialize upgrade displays
updateUpgradeDisplay('cursor');
updateUpgradeDisplay('grandma');
updateUpgradeDisplay('bot');
