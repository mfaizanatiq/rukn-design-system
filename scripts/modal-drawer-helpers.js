/**
 * Design System - Modal & Drawer Helpers
 * 
 * Simple JavaScript helpers for toggling modals and drawers.
 * Framework-agnostic and works with vanilla JS.
 * 
 * Usage:
 *   <script src="modal-drawer-helpers.js"></script>
 * 
 * Or copy the functions into your project.
 */

/**
 * Open a modal
 * @param {string} modalId - ID of the modal element
 * @param {string} overlayId - ID of the overlay element (optional)
 */
function openModal(modalId, overlayId = null) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.warn(`Modal with id "${modalId}" not found`);
    return;
  }

  const overlay = overlayId 
    ? document.getElementById(overlayId)
    : modal.previousElementSibling?.classList.contains('ds-modal-overlay')
      ? modal.previousElementSibling
      : null;

  if (overlay) {
    overlay.style.display = 'block';
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close a modal
 * @param {string} modalId - ID of the modal element
 * @param {string} overlayId - ID of the overlay element (optional)
 */
function closeModal(modalId, overlayId = null) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const overlay = overlayId 
    ? document.getElementById(overlayId)
    : modal.previousElementSibling?.classList.contains('ds-modal-overlay')
      ? modal.previousElementSibling
      : null;

  if (overlay) {
    overlay.style.display = 'none';
  }
  
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Open a drawer
 * @param {string} drawerId - ID of the drawer element
 * @param {string} overlayId - ID of the overlay element (optional)
 */
function openDrawer(drawerId, overlayId = null) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) {
    console.warn(`Drawer with id "${drawerId}" not found`);
    return;
  }

  const overlay = overlayId 
    ? document.getElementById(overlayId)
    : drawer.previousElementSibling?.classList.contains('ds-drawer-overlay')
      ? drawer.previousElementSibling
      : null;

  if (overlay) {
    overlay.style.display = 'block';
  }
  
  drawer.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close a drawer
 * @param {string} drawerId - ID of the drawer element
 * @param {string} overlayId - ID of the overlay element (optional)
 */
function closeDrawer(drawerId, overlayId = null) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;

  const overlay = overlayId 
    ? document.getElementById(overlayId)
    : drawer.previousElementSibling?.classList.contains('ds-drawer-overlay')
      ? drawer.previousElementSibling
      : null;

  if (overlay) {
    overlay.style.display = 'none';
  }
  
  drawer.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Initialize modals and drawers with auto-close on overlay click and ESC key
 * Call this after DOM is loaded
 */
function initModalsAndDrawers() {
  // Close on overlay click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('ds-modal-overlay')) {
      const modal = e.target.nextElementSibling;
      if (modal && modal.classList.contains('ds-modal')) {
        closeModal(modal.id, e.target.id || null);
      }
    }
    
    if (e.target.classList.contains('ds-drawer-overlay')) {
      const drawer = e.target.nextElementSibling;
      if (drawer && drawer.classList.contains('ds-drawer')) {
        closeDrawer(drawer.id, e.target.id || null);
      }
    }
  });

  // Close on close button click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('ds-modal-close') || 
        e.target.closest('.ds-modal-close')) {
      const modal = e.target.closest('.ds-modal');
      if (modal) {
        const overlay = modal.previousElementSibling?.classList.contains('ds-modal-overlay')
          ? modal.previousElementSibling
          : null;
        closeModal(modal.id, overlay?.id || null);
      }
    }
    
    if (e.target.classList.contains('ds-drawer-close') || 
        e.target.closest('.ds-drawer-close')) {
      const drawer = e.target.closest('.ds-drawer');
      if (drawer) {
        const overlay = drawer.previousElementSibling?.classList.contains('ds-drawer-overlay')
          ? drawer.previousElementSibling
          : null;
        closeDrawer(drawer.id, overlay?.id || null);
      }
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open modal
      const openModal = document.querySelector('.ds-modal[style*="display: flex"]');
      if (openModal) {
        const overlay = openModal.previousElementSibling?.classList.contains('ds-modal-overlay')
          ? openModal.previousElementSibling
          : null;
        closeModal(openModal.id, overlay?.id || null);
        return;
      }

      // Close any open drawer
      const openDrawer = document.querySelector('.ds-drawer[style*="display: flex"]');
      if (openDrawer) {
        const overlay = openDrawer.previousElementSibling?.classList.contains('ds-drawer-overlay')
          ? openDrawer.previousElementSibling
          : null;
        closeDrawer(openDrawer.id, overlay?.id || null);
      }
    }
  });
}

// Auto-initialize when DOM is ready in browsers. Keep imports SSR-safe.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalsAndDrawers);
  } else {
    initModalsAndDrawers();
  }
}

// Export for module systems (if using ES modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    openModal,
    closeModal,
    openDrawer,
    closeDrawer,
    initModalsAndDrawers
  };
}

export {
  openModal,
  closeModal,
  openDrawer,
  closeDrawer,
  initModalsAndDrawers
};
