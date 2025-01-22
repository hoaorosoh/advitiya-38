// Talent Module JavaScript Functions
document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('talent-registration-form');
    const hireRequestButtons = document.querySelectorAll('.hire-request-button');
    const themeToggle = document.getElementById('theme-toggle');
    const filterButton = document.getElementById('filter-button');

    // Event Listener: Form Submission
    /*if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(registrationForm);
            submitRegistration(formData);
        });
    }*/

    // Event Listener: Hire Request Buttons
    if (hireRequestButtons) {
        hireRequestButtons.forEach(button => {
            button.addEventListener('click', function () {
                const talentId = this.dataset.talentId;
                sendHireRequest(talentId);
            });
        });
    }

    // Event Listener: Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? '' : 'dark');
        });
    }

    // Load Initial Data
    loadParticipants();
    loadLanguages();

    // Event Listener: Filter Button
    if (filterButton) {
        filterButton.addEventListener('click', function () {
            const filterValue = document.getElementById('filter')?.value.toLowerCase();
            filterLanguages(filterValue);
        });
    }
});

// Function: Submit Registration Form
function submitRegistration(formData) {
    // Remove resume field if empty
    if (!formData.get('resume')) {
        formData.delete('resume');
    }

    fetch('/api/talent/register', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful! Awaiting admin approval.');
                document.getElementById('talent-registration-form').reset();
            } else {
                alert(`Registration failed: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('An unexpected error occurred. Please try again.');
        });
}

// Function: Send Hire Request
function sendHireRequest(talentId) {
    fetch(`/api/talent/hire/${talentId}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Hire request sent successfully!');
            } else {
                alert(`Failed to send hire request: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error while sending hire request:', error);
            alert('An unexpected error occurred. Please try again.');
        });
}

// Function: Load Participants
// Function: Load Participants
function loadParticipants() {
    const participantsList = document.getElementById('participants-list');

    // Check if the participants list exists in the DOM
    if (!participantsList) {
        console.warn("Participants list element not found in the DOM.");
        return;
    }

    fetch('/api/talent/participants')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            participantsList.innerHTML = ''; // Clear the list
            if (data.length === 0) {
                participantsList.textContent = "No participants found.";
                return;
            }
            data.forEach(participant => {
                const participantDiv = document.createElement('div');
                participantDiv.textContent = `${participant.name} - ${participant.status}`;
                participantsList.appendChild(participantDiv);
            });
        })
        .catch(error => {
            console.error('Error loading participants:', error);
            participantsList.innerHTML = ''; // Clear the list
            participantsList.textContent = "Unable to load participants. Please try again later.";
        });
}


// Function: Load Languages
function loadLanguages() {
    const languages = [
        'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'Go', 'Swift', 'Kotlin',
        'PHP', 'TypeScript', 'Rust', 'Scala', 'Perl', 'Haskell', 'Lua',
        'Objective-C', 'R', 'MATLAB', 'Dart'
    ];
    const languagesList = document.getElementById('languages-list');
    if (languagesList) {
        languagesList.innerHTML = '';
        languages.forEach(language => {
            const languageDiv = document.createElement('div');
            languageDiv.textContent = language;
            languagesList.appendChild(languageDiv);
        });
    }
}

// Function: Filter Languages
function filterLanguages(filterValue) {
    const languagesList = document.getElementById('languages-list');
    if (languagesList) {
        const languages = languagesList.querySelectorAll('div');
        languages.forEach(language => {
            language.style.display = language.textContent.toLowerCase().includes(filterValue) ? 'block' : 'none';
        });
    }
}
