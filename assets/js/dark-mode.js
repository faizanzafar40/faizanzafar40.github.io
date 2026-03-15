// Dark Mode Toggle Script
(function() {
	const STORAGE_KEY = 'faizan-dark-mode';
	const darkModeToggle = document.getElementById('dark-mode-toggle');
	const html = document.documentElement;
	const sunIcon = document.querySelector('.sun-icon');
	const moonIcon = document.querySelector('.moon-icon');

	// Initialize dark mode on page load
	function initDarkMode() {
		// Check localStorage first
		const savedMode = localStorage.getItem(STORAGE_KEY);
		
		// If no saved preference, check system preference
		if (savedMode === null) {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (prefersDark) {
				enableDarkMode();
			}
		} else if (savedMode === 'true') {
			enableDarkMode();
		}
	}

	// Enable dark mode
	function enableDarkMode() {
		html.classList.add('dark-mode');
		localStorage.setItem(STORAGE_KEY, 'true');
		updateToggleIcons(true);
	}

	// Disable dark mode
	function disableDarkMode() {
		html.classList.remove('dark-mode');
		localStorage.setItem(STORAGE_KEY, 'false');
		updateToggleIcons(false);
	}

	// Update toggle button icons
	function updateToggleIcons(isDarkMode) {
		if (isDarkMode) {
			sunIcon.style.display = 'none';
			moonIcon.style.display = 'inline';
		} else {
			sunIcon.style.display = 'inline';
			moonIcon.style.display = 'none';
		}
	}

	// Toggle dark mode
	function toggleDarkMode() {
		if (html.classList.contains('dark-mode')) {
			disableDarkMode();
		} else {
			enableDarkMode();
		}
	}

	// Add event listener to toggle button
	if (darkModeToggle) {
		darkModeToggle.addEventListener('click', toggleDarkMode);
	}

	// Listen for system preference changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (localStorage.getItem(STORAGE_KEY) === null) {
			if (e.matches) {
				enableDarkMode();
			} else {
				disableDarkMode();
			}
		}
	});

	// Initialize on load
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initDarkMode);
	} else {
		initDarkMode();
	}
})();
