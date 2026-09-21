/**
 * AZ MAINTENANCE — Interactive Application Logic
 * Serving DHA & Clifton, Karachi | 24/7 Hotline: +92 331 2553967
 */

document.addEventListener('DOMContentLoaded', () => {
  initDivisionTabs();
  initPlansToggle();
  initBookingWizard();
  initFaqAccordion();
  initMobileDrawer();
  initServiceCardTriggers();
});

/* ==========================================================================
   1. DUAL DIVISION TABS (Plumbing vs. Electrical)
   ========================================================================== */
function initDivisionTabs() {
  const plumbingBtn = document.getElementById('tabPlumbingBtn');
  const electricalBtn = document.getElementById('tabElectricalBtn');
  const plumbingPanel = document.getElementById('plumbing-panel');
  const electricalPanel = document.getElementById('electrical-panel');

  if (!plumbingBtn || !electricalBtn) return;

  function switchTab(activeBtn, inactiveBtn, activePanel, inactivePanel) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
    inactiveBtn.classList.remove('active');
    inactiveBtn.setAttribute('aria-selected', 'false');

    activePanel.classList.add('active');
    inactivePanel.classList.remove('active');
  }

  plumbingBtn.addEventListener('click', () => {
    switchTab(plumbingBtn, electricalBtn, plumbingPanel, electricalPanel);
  });

  electricalBtn.addEventListener('click', () => {
    switchTab(electricalBtn, plumbingBtn, electricalPanel, plumbingPanel);
  });
}

/* ==========================================================================
   2. COMMERCIAL VS. RESIDENTIAL PLANS SWITCHER
   ========================================================================== */
function initPlansToggle() {
  const plansSwitch = document.getElementById('plansSwitch');
  const resLabel = document.getElementById('toggleResLabel');
  const commLabel = document.getElementById('toggleCommLabel');
  const residentialPlans = document.getElementById('residentialPlans');
  const commercialPlans = document.getElementById('commercialPlans');

  if (!plansSwitch) return;

  plansSwitch.addEventListener('change', () => {
    if (plansSwitch.checked) {
      // Show Commercial
      residentialPlans.style.display = 'none';
      commercialPlans.style.display = 'grid';
      resLabel.classList.remove('active');
      commLabel.classList.add('active');
    } else {
      // Show Residential
      residentialPlans.style.display = 'grid';
      commercialPlans.style.display = 'none';
      resLabel.classList.add('active');
      commLabel.classList.remove('active');
    }
  });

  // Clicking labels toggles switch directly
  if (resLabel && commLabel) {
    resLabel.addEventListener('click', () => {
      if (plansSwitch.checked) {
        plansSwitch.checked = false;
        plansSwitch.dispatchEvent(new Event('change'));
      }
    });
    commLabel.addEventListener('click', () => {
      if (!plansSwitch.checked) {
        plansSwitch.checked = true;
        plansSwitch.dispatchEvent(new Event('change'));
      }
    });
  }
}

/* ==========================================================================
   3. QUICK WHATSAPP BOOKING WIZARD
   ========================================================================== */
function initBookingWizard() {
  const form = document.getElementById('quickBookingForm');
  const clientNameInput = document.getElementById('clientName');
  const clientPhoneInput = document.getElementById('clientPhone');
  const serviceCategorySelect = document.getElementById('serviceCategory');
  const specificServiceSelect = document.getElementById('specificService');
  const areaLocationSelect = document.getElementById('areaLocation');
  const urgencyLevelSelect = document.getElementById('urgencyLevel');
  const streetAddressInput = document.getElementById('streetAddress');
  const issueNotesInput = document.getElementById('issueNotes');
  const waMessagePreview = document.getElementById('waMessagePreview');
  const submitBtn = document.getElementById('submitBookingWa');

  if (!form || !submitBtn) return;

  function generateWhatsAppText() {
    const name = clientNameInput.value.trim() || '[Customer Name]';
    const phone = clientPhoneInput.value.trim() || '[Phone Number]';
    const category = serviceCategorySelect.value || 'General Maintenance';
    const service = specificServiceSelect.value || 'Inspection & Repair';
    const area = areaLocationSelect.value || 'DHA / Clifton';
    const urgency = urgencyLevelSelect.value || 'Standard';
    const address = streetAddressInput.value.trim();
    const notes = issueNotesInput.value.trim();

    let message = `*NEW TECHNICIAN DISPATCH REQUEST*\n`;
    message += `─────────────────────\n`;
    message += `👤 *Client Name:* ${name}\n`;
    message += `📞 *Contact:* ${phone}\n`;
    message += `📍 *Area:* ${area}\n`;
    if (address) {
      message += `🏠 *Address:* ${address}\n`;
    }
    message += `🛠️ *Division:* ${category}\n`;
    message += `🔧 *Specific Issue:* ${service}\n`;
    message += `⏱️ *Urgency:* ${urgency}\n`;
    if (notes) {
      message += `📝 *Notes:* "${notes}"\n`;
    }
    message += `─────────────────────\n`;
    message += `_Dispatched via AZ Maintenance Web Portal (Badar Commercial Hub)_`;

    return message;
  }

  function updatePreview() {
    waMessagePreview.textContent = generateWhatsAppText();
  }

  // Bind input listeners
  const formInputs = [
    clientNameInput,
    clientPhoneInput,
    serviceCategorySelect,
    specificServiceSelect,
    areaLocationSelect,
    urgencyLevelSelect,
    streetAddressInput,
    issueNotesInput
  ];

  formInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updatePreview);
      input.addEventListener('change', updatePreview);
    }
  });

  // Service Category dynamically updates specific services if desired
  serviceCategorySelect.addEventListener('change', () => {
    const val = serviceCategorySelect.value;
    if (val === 'Plumbing Division') {
      if (!specificServiceSelect.value.toLowerCase().includes('leakage') &&
          !specificServiceSelect.value.toLowerCase().includes('geyser') &&
          !specificServiceSelect.value.toLowerCase().includes('sanitary') &&
          !specificServiceSelect.value.toLowerCase().includes('tank')) {
        specificServiceSelect.value = 'Water Leakage or Pipe Rupture';
      }
    } else if (val === 'Electrical Division') {
      if (!specificServiceSelect.value.toLowerCase().includes('circuit') &&
          !specificServiceSelect.value.toLowerCase().includes('breaker') &&
          !specificServiceSelect.value.toLowerCase().includes('ups') &&
          !specificServiceSelect.value.toLowerCase().includes('rewiring')) {
        specificServiceSelect.value = 'Short-Circuit & Power Trip';
      }
    }
    updatePreview();
  });

  // Initial preview render
  updatePreview();

  // Handle Form Submission -> WhatsApp Link Launch
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Basic Validation
    if (!clientNameInput.value.trim()) {
      alert('Please enter your Name.');
      clientNameInput.focus();
      return;
    }

    if (!clientPhoneInput.value.trim()) {
      alert('Please enter your Contact Number.');
      clientPhoneInput.focus();
      return;
    }

    if (!serviceCategorySelect.value) {
      alert('Please select a Service Division.');
      serviceCategorySelect.focus();
      return;
    }

    if (!areaLocationSelect.value) {
      alert('Please select your DHA or Clifton Neighborhood.');
      areaLocationSelect.focus();
      return;
    }

    const message = generateWhatsAppText();
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/923312553967?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   4. SERVICE CARDS QUICK "BOOK" TRIGGERS
   ========================================================================== */
function initServiceCardTriggers() {
  const triggers = document.querySelectorAll('.book-service-trigger');
  const serviceCategorySelect = document.getElementById('serviceCategory');
  const specificServiceSelect = document.getElementById('specificService');
  const bookingSection = document.getElementById('quick-booking');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');

      if (serviceName) {
        if (serviceName.startsWith('Plumbing')) {
          serviceCategorySelect.value = 'Plumbing Division';
          if (serviceName.includes('Leakage')) specificServiceSelect.value = 'Water Leakage or Pipe Rupture';
          else if (serviceName.includes('Geyser')) specificServiceSelect.value = 'Geyser or Water Pump Repair';
          else if (serviceName.includes('Sanitary')) specificServiceSelect.value = 'Sanitary & Tap Replacement';
          else if (serviceName.includes('Tank')) specificServiceSelect.value = 'Water Tank Deep Cleaning';
        } else if (serviceName.startsWith('Electrical')) {
          serviceCategorySelect.value = 'Electrical Division';
          if (serviceName.includes('Short-Circuit')) specificServiceSelect.value = 'Short-Circuit & Power Trip';
          else if (serviceName.includes('Breaker')) specificServiceSelect.value = 'Breaker Panel DB Upgrade';
          else if (serviceName.includes('Concealed')) specificServiceSelect.value = 'Full House / Flat Rewiring';
          else if (serviceName.includes('UPS')) specificServiceSelect.value = 'UPS / Inverter Setup';
        } else if (serviceName.startsWith('Kitchen')) {
          serviceCategorySelect.value = 'Electrical Division';
          specificServiceSelect.value = 'Gas Stove or Kitchen Burner';
        }

        // Trigger input event to update preview
        serviceCategorySelect.dispatchEvent(new Event('change'));
      }

      // Smooth scroll to booking form
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        // Highlight form momentarily
        const formCard = document.querySelector('.booking-form-card');
        if (formCard) {
          formCard.style.outline = '2px solid #00E5FF';
          setTimeout(() => {
            formCard.style.outline = 'none';
          }, 1800);
        }
      }
    });
  });
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   6. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close when clicking outside on overlay
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !menuBtn.contains(e.target)) {
      closeDrawer();
    }
  });
}

