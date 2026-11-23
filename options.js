// Options page script for Deliberate YouTube
// Handles onboarding and settings

document.addEventListener('DOMContentLoaded', initializeOptions);

async function initializeOptions() {
  const data = await chrome.storage.local.get(['settings']);
  const settings = data.settings || {};
  
  const onboardingSection = document.getElementById('onboardingSection');
  const settingsSection = document.getElementById('settingsSection');
  
  // Two-screen onboarding: the welcome screen stands alone until Get Started
  // is pressed. Settings toggles are never reachable before onboarding is
  // complete — configuring them early could bypass engine initialization.
  if (settings.hasCompletedOnboarding) {
    onboardingSection.classList.add('hidden');
    settingsSection.classList.remove('hidden');
  } else {
    onboardingSection.classList.remove('hidden');
    settingsSection.classList.add('hidden');
  }
  loadSettings(settings);
  
  // Set up event listeners
  document.getElementById('completeOnboarding').addEventListener('click', completeOnboarding);
  document.getElementById('saveSettings').addEventListener('click', saveSettings);
  document.getElementById('viewDashboard').addEventListener('click', openDashboard);
  document.getElementById('simplifiedMode').addEventListener('change', applySimplifiedModeUI);
}

function applySimplifiedModeUI() {
  const simplified = document.getElementById('simplifiedMode').checked;
  document.querySelectorAll('.advanced-only').forEach(function(el) {
    el.classList.toggle('hidden', simplified);
  });
}

function loadSettings(settings) {
  // Load Simplified Mode and reflect it in the UI
  document.getElementById('simplifiedMode').checked = settings.simplifiedMode === true;
  applySimplifiedModeUI();

  // Load reflection interval
  document.getElementById('reflectionInterval').value = settings.reflectionInterval || 15;
  document.getElementById('reflectionPopup').checked = settings.reflectionPopup !== false;
  
  // Load interface toggles
  document.getElementById('hideShorts').checked = settings.hideShorts || false;
  document.getElementById('hideHomepageRecs').checked = settings.hideHomepageRecs || false;
  document.getElementById('hideSidebarRecs').checked = settings.hideSidebarRecs || false;
  document.getElementById('disableAutoplay').checked = settings.disableAutoplay || false;
  document.getElementById('blurThumbnails').checked = settings.blurThumbnails || false;
  document.getElementById('hideComments').checked = settings.hideComments || false;
  document.getElementById('soundMuffling').checked = settings.soundMuffling || false;
  
  // Load purpose
  document.getElementById('updatePurpose').value = settings.usualPurpose || '';
}

async function completeOnboarding() {
  const usualPurpose = document.getElementById('usualPurpose').value;
  const supportLevel = document.querySelector('input[name="supportLevel"]:checked').value;
  
  if (!usualPurpose) {
    alert('Please select your usual purpose when opening YouTube.');
    return;
  }
  
  const existing = (await chrome.storage.local.get(['settings'])).settings || {};
  const settings = {
    ...existing,
    usualPurpose,
    supportLevel,
    hasCompletedOnboarding: true,
    hideShorts: supportLevel !== 'low',
    hideHomepageRecs: supportLevel === 'high',
    hideSidebarRecs: supportLevel === 'high',
    disableAutoplay: supportLevel === 'high',
    blurThumbnails: supportLevel !== 'low',
    reflectionInterval: supportLevel === 'high' ? 10 : 15
  };
  
  try {
    await chrome.storage.local.set({ settings, pendingIntentCheckpoint: true });
  } catch (e) {
    alert('Failed to save settings. Please try again.');
    return;
  }
  
  // Switch to settings view
  document.getElementById('onboardingSection').classList.add('hidden');
  document.getElementById('settingsSection').classList.remove('hidden');
  loadSettings(settings);
  
  showNotification('Setup complete! Your preferences have been saved.');
}

async function saveSettings() {
  const data = await chrome.storage.local.get(['settings']);
  const existing = data.settings || {};
  
  const settings = {
    ...existing,
    reflectionInterval: parseInt(document.getElementById('reflectionInterval').value) || 15,
    reflectionPopup: document.getElementById('reflectionPopup').checked,
    hideShorts: document.getElementById('hideShorts').checked,
    hideHomepageRecs: document.getElementById('hideHomepageRecs').checked,
    hideSidebarRecs: document.getElementById('hideSidebarRecs').checked,
    disableAutoplay: document.getElementById('disableAutoplay').checked,
    blurThumbnails: document.getElementById('blurThumbnails').checked,
    hideComments: document.getElementById('hideComments').checked,
    soundMuffling: document.getElementById('soundMuffling').checked,
    usualPurpose: document.getElementById('updatePurpose').value,
    simplifiedMode: document.getElementById('simplifiedMode').checked
  };
  
  // Validate reflection interval
  if (settings.reflectionInterval < 2 || settings.reflectionInterval > 120) {
    alert('Reflection interval must be between 2 and 120 minutes.');
    return;
  }
  
  try {
    await chrome.storage.local.set({ settings });
  } catch (e) {
    alert('Failed to save settings. Please try again.');
    return;
  }
  
  showNotification('Settings saved successfully!');

  // Notify YouTube tabs to apply updated interface changes
  try {
    const tabs = await chrome.tabs.query({ url: '*://www.youtube.com/*' });
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { action: 'applyInterfaceChanges' }).catch(() => {});
    }
  } catch (e) {}
}

function openDashboard() {
  chrome.tabs.create({ url: 'dashboard.html' });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
