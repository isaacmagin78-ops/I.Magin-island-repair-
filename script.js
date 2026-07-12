// Lead capture form handling
const leadForm = document.getElementById('lead-form');
const formSuccess = document.getElementById('form-success');

leadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const lead = {
    name: leadForm.name.value.trim(),
    phone: leadForm.phone.value.trim(),
    email: leadForm.email.value.trim(),
    service: leadForm.service.value,
    message: leadForm.message.value.trim(),
    submittedAt: new Date().toISOString(),
  };

  const leads = JSON.parse(localStorage.getItem('leads') || '[]');
  leads.push(lead);
  localStorage.setItem('leads', JSON.stringify(leads));

  // TODO: send the lead to a backend/CRM instead of only storing it locally
  // TODO: validate phone number format before allowing submission

  leadForm.reset();
  formSuccess.classList.remove('hidden');
});

// Job checklist handling
const checklist = document.getElementById('checklist');
const CHECKLIST_STORAGE_KEY = 'checklistState';

function loadChecklistState() {
  return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || '{}');
}

function saveChecklistState(state) {
  localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(state));
}

(function restoreChecklist() {
  const state = loadChecklistState();
  checklist.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const item = checkbox.dataset.item;
    if (state[item]) {
      checkbox.checked = true;
      checkbox.closest('li').classList.add('done');
    }
  });
})();

checklist.addEventListener('change', (event) => {
  const checkbox = event.target;
  if (checkbox.type !== 'checkbox') return;

  const item = checkbox.dataset.item;
  const state = loadChecklistState();
  state[item] = checkbox.checked;
  saveChecklistState(state);

  checkbox.closest('li').classList.toggle('done', checkbox.checked);
});

// TODO: add a way to reset the checklist for a new job
