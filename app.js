/**
 * StockPulse — Modern Product Inventory Manager
 * Core Application Engine
 */

(function () {
  'use strict';

  // ==================== STORAGE & STATE ====================
  const STORAGE_KEYS = {
    PRODUCTS: 'stockpulse_products_v1',
    THEME: 'stockpulse_theme',
    SOUND: 'stockpulse_sound',
    VIEW: 'stockpulse_view'
  };

  // Demo initial dataset
  const DEFAULT_SAMPLE_PRODUCTS = [
    {
      id: 'prod-1',
      name: 'Sony WH-1000XM5 Wireless Headphones',
      sku: 'ELEC-8291',
      category: 'Electronics',
      price: 399.99,
      quantity: 18,
      threshold: 5,
      description: 'Industry-leading noise cancellation with two processors and 8 microphones for exceptional clarity.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      createdAt: Date.now() - 86400000 * 12
    },
    {
      id: 'prod-2',
      name: 'Apple MacBook Pro 14" M3',
      sku: 'ELEC-9920',
      category: 'Electronics',
      price: 1999.00,
      quantity: 3,
      threshold: 5,
      description: 'Liquid Retina XDR display, supercharged by M3 chip with unified high-speed memory.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      createdAt: Date.now() - 86400000 * 10
    },
    {
      id: 'prod-3',
      name: 'Nike Air Max Pulse Performance',
      sku: 'APPR-3411',
      category: 'Apparel',
      price: 149.99,
      quantity: 24,
      threshold: 6,
      description: 'Futuristic silhouette designed with Point-Loaded Air cushioning for unmatched daily comfort.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      createdAt: Date.now() - 86400000 * 9
    },
    {
      id: 'prod-4',
      name: 'Ceramic Artisan Pour-Over Dripper',
      sku: 'FOOD-4509',
      category: 'Food & Beverage',
      price: 34.50,
      quantity: 4,
      threshold: 6,
      description: 'Handcrafted stoneware coffee dripper with spiral interior ribs for optimal floral extraction.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80',
      createdAt: Date.now() - 86400000 * 8
    },
    {
      id: 'prod-5',
      name: 'Ergonomic Executive Lumbar Chair',
      sku: 'OFFC-6721',
      category: 'Office & Tech',
      price: 289.00,
      quantity: 12,
      threshold: 4,
      description: 'Breathable dual-mesh backrest with 4D armrests, tilt limiter, and pneumatic height lift.',
      image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=500&q=80',
      createdAt: Date.now() - 86400000 * 7
    },
    {
      id: 'prod-6',
      name: 'Insulated Trail Flask 1000ml',
      sku: 'SPRT-1092',
      category: 'Sports & Outdoors',
      price: 32.00,
      quantity: 0,
      threshold: 5,
      description: 'Double-wall vacuum insulation keeps liquids cold up to 24 hours or piping hot for 12 hours.',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
      createdAt: Date.now() - 86400000 * 6
    },
    {
      id: 'prod-7',
      name: 'Organic Uji Ceremonial Matcha 100g',
      sku: 'FOOD-8812',
      category: 'Food & Beverage',
      price: 29.50,
      quantity: 38,
      threshold: 10,
      description: 'First harvest stone-ground green tea powder from Kyoto, vibrant green with rich umami.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80',
      createdAt: Date.now() - 86400000 * 5
    },
    {
      id: 'prod-8',
      name: 'Minimalist Scandinavian Oak Nightstand',
      sku: 'HOME-5120',
      category: 'Home & Living',
      price: 219.00,
      quantity: 7,
      threshold: 3,
      description: 'Sustainably sourced white oak featuring soft-close undermount drawer and rounded beveled edges.',
      image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&q=80',
      createdAt: Date.now() - 86400000 * 4
    },
    {
      id: 'prod-9',
      name: 'Hydra-Glow Niacinamide Peptide Serum',
      sku: 'BEAU-7341',
      category: 'Health & Beauty',
      price: 44.00,
      quantity: 16,
      threshold: 5,
      description: 'Triple peptide complex formulated with hyaluronic acid and plant botanical antioxidants.',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
      createdAt: Date.now() - 86400000 * 2
    },
    {
      id: 'prod-10',
      name: 'The Design of Everyday Things — Revised',
      sku: 'BOOK-2022',
      category: 'Books & Media',
      price: 21.99,
      quantity: 28,
      threshold: 8,
      description: 'Classic exploration of usability, affordances, and cognitive psychology in human-centered design.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
      createdAt: Date.now() - 86400000 * 1
    }
  ];

  // Category Configuration with icons & prefixes
  const CATEGORIES = [
    { name: 'Electronics', icon: '⚡', prefix: 'ELEC' },
    { name: 'Apparel', icon: '👕', prefix: 'APPR' },
    { name: 'Home & Living', icon: '🏡', prefix: 'HOME' },
    { name: 'Health & Beauty', icon: '✨', prefix: 'BEAU' },
    { name: 'Food & Beverage', icon: '☕', prefix: 'FOOD' },
    { name: 'Sports & Outdoors', icon: '⚽', prefix: 'SPRT' },
    { name: 'Books & Media', icon: '📚', prefix: 'BOOK' },
    { name: 'Office & Tech', icon: '💼', prefix: 'OFFC' }
  ];

  // App State
  let products = [];
  let currentFilterCategory = 'all';
  let currentStockFilter = 'all';
  let currentSortBy = 'recent';
  let currentSearchQuery = '';
  let currentViewMode = 'grid'; // 'grid' | 'list'
  let soundEnabled = true;
  let lastDeletedProduct = null;
  let activeEditingProductId = null;
  let activeRestockProductId = null;

  // Audio Context (Synthesized micro-sounds)
  let audioCtx = null;

  function initAudio() {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass && !audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {
      // Ignore audio synthesis errors
    }
  }

  // ==================== DOM ELEMENTS ====================
  const elements = {
    // Theme & Audio
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundOnIcon: document.querySelector('.sound-on-icon'),
    soundOffIcon: document.querySelector('.sound-off-icon'),
    
    // Search & Filters
    globalSearchInput: document.getElementById('globalSearchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    stockStatusSelect: document.getElementById('stockStatusSelect'),
    sortBySelect: document.getElementById('sortBySelect'),
    categoryPillsContainer: document.getElementById('categoryPillsContainer'),
    activeFiltersBar: document.getElementById('activeFiltersBar'),
    activeTagsList: document.getElementById('activeTagsList'),
    resetAllFiltersBtn: document.getElementById('resetAllFiltersBtn'),
    resultsCountBadge: document.getElementById('resultsCountBadge'),
    
    // Views
    viewGridBtn: document.getElementById('viewGridBtn'),
    viewListBtn: document.getElementById('viewListBtn'),
    productsGridContainer: document.getElementById('productsGridContainer'),
    productsTableContainer: document.getElementById('productsTableContainer'),
    inventoryTableBody: document.getElementById('inventoryTableBody'),
    emptyState: document.getElementById('emptyState'),
    emptyResetFiltersBtn: document.getElementById('emptyResetFiltersBtn'),
    emptyAddProductBtn: document.getElementById('emptyAddProductBtn'),

    // Stats
    statTotalProducts: document.getElementById('statTotalProducts'),
    statCategoriesCount: document.getElementById('statCategoriesCount'),
    statUnitsCount: document.getElementById('statUnitsCount'),
    statTotalValue: document.getElementById('statTotalValue'),
    statAvgPrice: document.getElementById('statAvgPrice'),
    statLowStock: document.getElementById('statLowStock'),
    statOutOfStock: document.getElementById('statOutOfStock'),
    statCardLowStock: document.getElementById('statCardLowStock'),
    statCardOutOfStock: document.getElementById('statCardOutOfStock'),

    // Low stock banner
    lowStockBanner: document.getElementById('lowStockBanner'),
    lowStockBannerMessage: document.getElementById('lowStockBannerMessage'),
    bannerFilterBtn: document.getElementById('bannerFilterBtn'),
    bannerDismissBtn: document.getElementById('bannerDismissBtn'),

    // Dropdown & Data Menus
    dataMenuBtn: document.getElementById('dataMenuBtn'),
    dataDropdownMenu: document.getElementById('dataDropdownMenu'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),
    exportJsonBtn: document.getElementById('exportJsonBtn'),
    importJsonInput: document.getElementById('importJsonInput'),
    resetSampleBtn: document.getElementById('resetSampleBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    quickRestockBtn: document.getElementById('quickRestockBtn'),
    quickSampleDataBtn: document.getElementById('quickSampleDataBtn'),

    // Add/Edit Product Modal
    openAddModalBtn: document.getElementById('openAddModalBtn'),
    productModal: document.getElementById('productModal'),
    closeProductModalBtn: document.getElementById('closeProductModalBtn'),
    cancelProductBtn: document.getElementById('cancelProductBtn'),
    productForm: document.getElementById('productForm'),
    modalTitle: document.getElementById('modalTitle'),
    modalSubtitle: document.getElementById('modalSubtitle'),
    saveBtnText: document.getElementById('saveBtnText'),
    productId: document.getElementById('productId'),
    productName: document.getElementById('productName'),
    productSku: document.getElementById('productSku'),
    productCategory: document.getElementById('productCategory'),
    productPrice: document.getElementById('productPrice'),
    productQuantity: document.getElementById('productQuantity'),
    productThreshold: document.getElementById('productThreshold'),
    productImage: document.getElementById('productImage'),
    productDesc: document.getElementById('productDesc'),
    generateSkuBtn: document.getElementById('generateSkuBtn'),
    presetChipsContainer: document.getElementById('presetChipsContainer'),

    // Modal Live Preview
    previewImg: document.getElementById('previewImg'),
    previewCategoryBadge: document.getElementById('previewCategoryBadge'),
    previewStatusPill: document.getElementById('previewStatusPill'),
    previewSku: document.getElementById('previewSku'),
    previewTitle: document.getElementById('previewTitle'),
    previewDescText: document.getElementById('previewDescText'),
    previewPrice: document.getElementById('previewPrice'),
    previewTotalVal: document.getElementById('previewTotalVal'),
    previewProgressFill: document.getElementById('previewProgressFill'),
    previewStockLabel: document.getElementById('previewStockLabel'),
    previewThresholdLabel: document.getElementById('previewThresholdLabel'),

    // Delete Modal
    deleteModal: document.getElementById('deleteModal'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    deleteConfirmMessage: document.getElementById('deleteConfirmMessage'),
    deleteProductCardPreview: document.getElementById('deleteProductCardPreview'),

    // Restock Modal
    restockModal: document.getElementById('restockModal'),
    closeRestockModalBtn: document.getElementById('closeRestockModalBtn'),
    cancelRestockBtn: document.getElementById('cancelRestockBtn'),
    saveRestockBtn: document.getElementById('saveRestockBtn'),
    restockModalSubtitle: document.getElementById('restockModalSubtitle'),
    restockItemPreview: document.getElementById('restockItemPreview'),
    stepperMinusBtn: document.getElementById('stepperMinusBtn'),
    stepperPlusBtn: document.getElementById('stepperPlusBtn'),
    stepperInput: document.getElementById('stepperInput'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // ==================== INITIALIZATION ====================
  function init() {
    loadPreferences();
    loadProducts();
    bindEvents();
    renderAll();
  }

  // ==================== STORAGE FUNCTIONS ====================
  function loadPreferences() {
    // Theme preference
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    setTheme(savedTheme);

    // Sound preference
    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    if (savedSound !== null) {
      soundEnabled = savedSound === 'true';
    }
    updateSoundUI();

    // View preference
    const savedView = localStorage.getItem(STORAGE_KEYS.VIEW);
    if (savedView === 'list' || savedView === 'grid') {
      currentViewMode = savedView;
    }
    updateViewModeUI();
  }

  function loadProducts() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        products = JSON.parse(stored);
      } else {
        products = [...DEFAULT_SAMPLE_PRODUCTS];
        saveProducts();
      }
    } catch (e) {
      console.error('Failed to parse localStorage products', e);
      products = [...DEFAULT_SAMPLE_PRODUCTS];
    }
  }

  function saveProducts() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      showToast('Local storage quota exceeded or unavailable', 'danger');
    }
  }

  // ==================== THEME & PREFERENCES ====================
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const label = elements.themeToggleBtn.querySelector('.theme-toggle-label');
    if (label) {
      label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    playSound('click');
    showToast(`Switched to ${nextTheme} mode`, 'info');
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem(STORAGE_KEYS.SOUND, soundEnabled.toString());
    updateSoundUI();
    if (soundEnabled) {
      playSound('pop');
      showToast('Sound effects enabled', 'info');
    } else {
      showToast('Sound effects muted', 'info');
    }
  }

  function updateSoundUI() {
    if (soundEnabled) {
      elements.soundOnIcon.style.display = 'block';
      elements.soundOffIcon.style.display = 'none';
      elements.soundToggleBtn.setAttribute('title', 'Sound effects: ON (Click to mute)');
    } else {
      elements.soundOnIcon.style.display = 'none';
      elements.soundOffIcon.style.display = 'block';
      elements.soundToggleBtn.setAttribute('title', 'Sound effects: MUTED (Click to enable)');
    }
  }

  function setViewMode(mode) {
    currentViewMode = mode;
    localStorage.setItem(STORAGE_KEYS.VIEW, mode);
    updateViewModeUI();
    renderProductsList();
    playSound('click');
  }

  function updateViewModeUI() {
    if (currentViewMode === 'grid') {
      elements.viewGridBtn.classList.add('active');
      elements.viewListBtn.classList.remove('active');
      elements.productsGridContainer.style.display = 'grid';
      elements.productsTableContainer.style.display = 'none';
    } else {
      elements.viewGridBtn.classList.remove('active');
      elements.viewListBtn.classList.add('active');
      elements.productsGridContainer.style.display = 'none';
      elements.productsTableContainer.style.display = 'block';
    }
  }

  // ==================== FORMATTERS & UTILS ====================
  function formatCurrency(num) {
    const val = Number(num) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getCategoryConfig(categoryName) {
    return CATEGORIES.find(c => c.name.toLowerCase() === (categoryName || '').toLowerCase()) || {
      name: categoryName || 'General',
      icon: '📦',
      prefix: 'ITEM'
    };
  }

  function getPlaceholderImage(categoryIcon, categoryName) {
    const icon = categoryIcon || '📦';
    const name = categoryName || 'Product';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4f46e5"/><stop offset="50%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#ec4899"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="46%" text-anchor="middle" font-size="52" font-family="system-ui">${icon}</text><text x="50%" y="74%" text-anchor="middle" font-size="16" font-family="sans-serif" font-weight="700" fill="#ffffff" opacity="0.9">${name}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function getStockStatus(product) {
    const qty = Number(product.quantity) || 0;
    const thresh = Number(product.threshold) || 5;

    if (qty === 0) {
      return { status: 'out_of_stock', label: 'Out of Stock', class: 'out-of-stock', level: 'danger' };
    } else if (qty <= thresh) {
      return { status: 'low_stock', label: 'Low Stock', class: 'low-stock', level: 'warning' };
    } else {
      return { status: 'in_stock', label: 'In Stock', class: 'in-stock', level: 'success' };
    }
  }

  function calculateStockProgress(quantity, threshold) {
    const qty = Math.max(0, Number(quantity) || 0);
    const thresh = Math.max(1, Number(threshold) || 5);
    // Ideal healthy stock base is ~ 4x threshold
    const targetCapacity = Math.max(thresh * 3.5, 20);
    const percentage = Math.min(100, Math.round((qty / targetCapacity) * 100));

    let colorClass = 'success';
    if (qty === 0) {
      colorClass = 'danger';
    } else if (qty <= thresh) {
      colorClass = 'warning';
    }

    return { percentage, colorClass };
  }

  function generateSku(categoryName) {
    const config = getCategoryConfig(categoryName);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${config.prefix}-${randomDigits}`;
  }

  // ==================== RENDERING ====================
  function renderAll() {
    renderStats();
    renderCategoryPills();
    renderActiveFilterTags();
    renderProductsList();
  }

  function getFilteredProducts() {
    let result = [...products];

    // Search query filter
    if (currentSearchQuery.trim()) {
      const q = currentSearchQuery.toLowerCase().trim();
      result = result.filter(p => {
        return (
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
        );
      });
    }

    // Category filter
    if (currentFilterCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === currentFilterCategory.toLowerCase());
    }

    // Stock Status Filter
    if (currentStockFilter !== 'all') {
      result = result.filter(p => {
        const info = getStockStatus(p);
        return info.status === currentStockFilter;
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (currentSortBy) {
        case 'name_asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name_desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'price_asc':
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case 'price_desc':
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        case 'stock_asc':
          return (Number(a.quantity) || 0) - (Number(b.quantity) || 0);
        case 'stock_desc':
          return (Number(b.quantity) || 0) - (Number(a.quantity) || 0);
        case 'value_desc':
          const valA = (Number(a.price) || 0) * (Number(a.quantity) || 0);
          const valB = (Number(b.price) || 0) * (Number(b.quantity) || 0);
          return valB - valA;
        case 'recent':
        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });

    return result;
  }

  function renderStats() {
    const totalCount = products.length;
    let totalValue = 0;
    let totalUnits = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    const categoriesSet = new Set();

    products.forEach(p => {
      const qty = Number(p.quantity) || 0;
      const price = Number(p.price) || 0;
      const thresh = Number(p.threshold) || 5;

      totalUnits += qty;
      totalValue += price * qty;
      if (p.category) categoriesSet.add(p.category);

      if (qty === 0) {
        outOfStockCount++;
      } else if (qty <= thresh) {
        lowStockCount++;
      }
    });

    const avgPrice = totalCount > 0 ? totalValue / (totalUnits || 1) : 0;

    elements.statTotalProducts.textContent = totalCount;
    elements.statCategoriesCount.textContent = `${categoriesSet.size} categories`;
    elements.statUnitsCount.textContent = `${totalUnits.toLocaleString()} units total`;

    elements.statTotalValue.textContent = formatCurrency(totalValue);
    elements.statAvgPrice.textContent = `Avg ${formatCurrency(avgPrice)}/unit`;

    elements.statLowStock.textContent = lowStockCount;
    elements.statOutOfStock.textContent = outOfStockCount;

    // Emergency Banner visibility
    if (lowStockCount > 0 || outOfStockCount > 0) {
      elements.lowStockBanner.style.display = 'flex';
      elements.lowStockBannerMessage.textContent = 
        `${lowStockCount} product(s) below threshold, ${outOfStockCount} out of stock. Replenishment recommended.`;
    } else {
      elements.lowStockBanner.style.display = 'none';
    }
  }

  function renderCategoryPills() {
    const totalProductsCount = products.length;

    // Count per category
    const countMap = {};
    CATEGORIES.forEach(c => { countMap[c.name] = 0; });
    products.forEach(p => {
      if (countMap[p.category] !== undefined) {
        countMap[p.category]++;
      }
    });

    let pillsHtml = `
      <button class="category-pill ${currentFilterCategory === 'all' ? 'active' : ''}" data-cat="all">
        <span>✨ All Categories</span>
        <span class="category-pill-count">${totalProductsCount}</span>
      </button>
    `;

    CATEGORIES.forEach(cat => {
      const count = countMap[cat.name] || 0;
      const isActive = currentFilterCategory.toLowerCase() === cat.name.toLowerCase();
      pillsHtml += `
        <button class="category-pill ${isActive ? 'active' : ''}" data-cat="${escapeHtml(cat.name)}">
          <span>${cat.icon} ${escapeHtml(cat.name)}</span>
          <span class="category-pill-count">${count}</span>
        </button>
      `;
    });

    elements.categoryPillsContainer.innerHTML = pillsHtml;

    // Attach click listeners
    elements.categoryPillsContainer.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-cat');
        setCategoryFilter(cat);
      });
    });
  }

  function setCategoryFilter(cat) {
    currentFilterCategory = cat;
    playSound('pop');
    renderCategoryPills();
    renderActiveFilterTags();
    renderProductsList();
  }

  function renderActiveFilterTags() {
    const tags = [];

    if (currentSearchQuery.trim()) {
      tags.push({
        id: 'search',
        label: `Search: "${currentSearchQuery.trim()}"`
      });
    }

    if (currentFilterCategory !== 'all') {
      const catConfig = getCategoryConfig(currentFilterCategory);
      tags.push({
        id: 'category',
        label: `${catConfig.icon} ${currentFilterCategory}`
      });
    }

    if (currentStockFilter !== 'all') {
      const map = {
        in_stock: 'In Stock',
        low_stock: '⚠️ Low Stock Alert',
        out_of_stock: '🚫 Out of Stock'
      };
      tags.push({
        id: 'stock',
        label: map[currentStockFilter] || currentStockFilter
      });
    }

    if (tags.length > 0) {
      elements.activeFiltersBar.style.display = 'flex';
      elements.activeTagsList.innerHTML = tags.map(tag => `
        <span class="active-tag">
          ${escapeHtml(tag.label)}
          <button type="button" class="active-tag-remove" data-remove="${tag.id}" aria-label="Remove filter">&times;</button>
        </span>
      `).join('');

      elements.activeTagsList.querySelectorAll('.active-tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const filterType = btn.getAttribute('data-remove');
          if (filterType === 'search') {
            currentSearchQuery = '';
            elements.globalSearchInput.value = '';
            elements.clearSearchBtn.style.display = 'none';
          } else if (filterType === 'category') {
            currentFilterCategory = 'all';
          } else if (filterType === 'stock') {
            currentStockFilter = 'all';
            elements.stockStatusSelect.value = 'all';
          }
          playSound('pop');
          renderAll();
        });
      });
    } else {
      elements.activeFiltersBar.style.display = 'none';
    }
  }

  function renderProductsList() {
    const filtered = getFilteredProducts();
    const totalCount = filtered.length;

    elements.resultsCountBadge.textContent = `Showing ${totalCount} of ${products.length} product${products.length === 1 ? '' : 's'}`;

    if (totalCount === 0) {
      elements.productsGridContainer.style.display = 'none';
      elements.productsTableContainer.style.display = 'none';
      elements.emptyState.style.display = 'flex';

      if (products.length === 0) {
        document.getElementById('emptyTitle').textContent = 'Your inventory is empty';
        document.getElementById('emptyDesc').textContent = 'Get started by adding your first product or loading demo products.';
        elements.emptyResetFiltersBtn.textContent = 'Load Demo Catalog';
        elements.emptyResetFiltersBtn.onclick = resetToSampleData;
      } else {
        document.getElementById('emptyTitle').textContent = 'No matching products';
        document.getElementById('emptyDesc').textContent = 'No products matched your search or status filters. Try clearing filters.';
        elements.emptyResetFiltersBtn.textContent = 'Reset Filters';
        elements.emptyResetFiltersBtn.onclick = clearAllFilters;
      }
      return;
    }

    elements.emptyState.style.display = 'none';

    if (currentViewMode === 'grid') {
      elements.productsGridContainer.style.display = 'grid';
      elements.productsTableContainer.style.display = 'none';
      renderGridView(filtered);
    } else {
      elements.productsGridContainer.style.display = 'none';
      elements.productsTableContainer.style.display = 'block';
      renderTableView(filtered);
    }
  }

  function renderGridView(items) {
    let html = '';

    items.forEach(product => {
      const catConfig = getCategoryConfig(product.category);
      const stockInfo = getStockStatus(product);
      const progress = calculateStockProgress(product.quantity, product.threshold);
      const totalItemValue = (Number(product.price) || 0) * (Number(product.quantity) || 0);

      const placeholderUri = getPlaceholderImage(catConfig.icon, product.category);
      const imageHtml = product.image ? `
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='${placeholderUri}';">
      ` : `
        <img src="${placeholderUri}" alt="${escapeHtml(product.name)}" loading="lazy">
      `;

      html += `
        <article class="product-card" data-id="${product.id}">
          <div class="card-media">
            ${imageHtml}
            <span class="category-badge">${catConfig.icon} ${escapeHtml(product.category)}</span>
            <span class="stock-status-pill ${stockInfo.class}">${stockInfo.label}</span>
          </div>

          <div class="card-content">
            <div class="card-sku">${escapeHtml(product.sku || 'SKU-NONE')}</div>
            <h3 class="card-title" title="${escapeHtml(product.name)}">${escapeHtml(product.name)}</h3>
            <p class="card-desc" title="${escapeHtml(product.description || '')}">${escapeHtml(product.description || 'No description provided.')}</p>

            <div class="card-pricing">
              <span class="card-price">${formatCurrency(product.price)}</span>
              <span class="card-total-val">Val: ${formatCurrency(totalItemValue)}</span>
            </div>

            <!-- Stock Level Visual Progress Bar -->
            <div class="stock-progress-wrap">
              <div class="stock-progress-bar">
                <div class="stock-progress-fill ${progress.colorClass}" style="width: ${progress.percentage}%;"></div>
              </div>
              <div class="stock-progress-labels">
                <span>Stock: <strong>${product.quantity}</strong> units</span>
                <span class="${stockInfo.status !== 'in_stock' ? 'text-warning' : ''}">Alert at &le; ${product.threshold}</span>
              </div>
            </div>

            <!-- Stock Quick Controls (+ / -) -->
            <div class="card-stock-controls">
              <button type="button" class="stock-btn-quick btn-decrement" data-id="${product.id}" title="Decrease quantity by 1" ${product.quantity <= 0 ? 'disabled' : ''}>-</button>
              <div class="stock-current-display btn-open-restock" data-id="${product.id}" title="Click to adjust stock">
                ${product.quantity} in stock
              </div>
              <button type="button" class="stock-btn-quick btn-increment" data-id="${product.id}" title="Increase quantity by 1">+</button>
            </div>

            <!-- Action buttons (Edit & Delete) -->
            <div class="card-actions">
              <button type="button" class="card-btn btn-edit" data-id="${product.id}" title="Edit product details">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Edit
              </button>
              <button type="button" class="card-btn card-btn-delete btn-delete" data-id="${product.id}" title="Delete product">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Delete
              </button>
            </div>
          </div>
        </article>
      `;
    });

    elements.productsGridContainer.innerHTML = html;
    bindCardItemEvents(elements.productsGridContainer);
    attachCardTiltEffects(elements.productsGridContainer);
  }

  function renderTableView(items) {
    let html = '';

    items.forEach(product => {
      const catConfig = getCategoryConfig(product.category);
      const stockInfo = getStockStatus(product);
      const totalItemValue = (Number(product.price) || 0) * (Number(product.quantity) || 0);

      const placeholderUri = getPlaceholderImage(catConfig.icon, product.category);
      const thumbImg = product.image ? `
        <img class="table-product-thumb" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='${placeholderUri}';">
      ` : `
        <img class="table-product-thumb" src="${placeholderUri}" alt="${escapeHtml(product.name)}" loading="lazy">
      `;

      html += `
        <tr data-id="${product.id}">
          <td>
            <div class="table-product-cell">
              ${thumbImg}
              <div class="table-product-info">
                <span class="table-product-title">${escapeHtml(product.name)}</span>
                <span class="table-product-category">${catConfig.icon} ${escapeHtml(product.category)}</span>
              </div>
            </div>
          </td>
          <td><span class="table-sku">${escapeHtml(product.sku || 'N/A')}</span></td>
          <td>${catConfig.icon} ${escapeHtml(product.category)}</td>
          <td><span class="table-price">${formatCurrency(product.price)}</span></td>
          <td><span class="stock-status-pill ${stockInfo.class}" style="position:static;display:inline-flex;">${stockInfo.label}</span></td>
          <td>
            <div style="display:inline-flex;align-items:center;gap:6px;">
              <button type="button" class="btn-micro btn-decrement" data-id="${product.id}" ${product.quantity <= 0 ? 'disabled' : ''}>-</button>
              <span class="font-mono btn-open-restock" data-id="${product.id}" style="cursor:pointer;font-weight:700;padding:2px 8px;border-radius:4px;" title="Click to adjust">${product.quantity}</span>
              <button type="button" class="btn-micro btn-increment" data-id="${product.id}">+</button>
            </div>
          </td>
          <td><span class="table-total">${formatCurrency(totalItemValue)}</span></td>
          <td class="text-right">
            <div class="table-actions-cell">
              <button type="button" class="icon-btn btn-sm btn-edit" data-id="${product.id}" title="Edit product">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <button type="button" class="icon-btn btn-sm card-btn-delete btn-delete" data-id="${product.id}" title="Delete product">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    elements.inventoryTableBody.innerHTML = html;
    bindCardItemEvents(elements.inventoryTableBody);
  }

  function attachCardTiltEffects(container) {
    const cards = container.querySelectorAll('.product-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  function bindCardItemEvents(container) {
    // Quick decrement
    container.querySelectorAll('.btn-decrement').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        adjustStock(id, -1);
      });
    });

    // Quick increment
    container.querySelectorAll('.btn-increment').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        adjustStock(id, 1);
      });
    });

    // Open restock adjuster modal
    container.querySelectorAll('.btn-open-restock').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openRestockModal(id);
      });
    });

    // Edit Product
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openEditProductModal(id);
      });
    });

    // Delete Product
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openDeleteModal(id);
      });
    });
  }

  // ==================== STOCK MANAGEMENT ====================
  function adjustStock(productId, delta) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const oldQty = prod.quantity;
    const newQty = Math.max(0, oldQty + delta);

    if (newQty === oldQty) return;

    prod.quantity = newQty;
    saveProducts();
    playSound(delta > 0 ? 'pop' : 'click');
    renderAll();

    // Alert if newly crossed threshold
    if (newQty <= prod.threshold && oldQty > prod.threshold) {
      playSound('alert');
      showToast(`Warning: "${prod.name}" dropped below threshold (${newQty} remaining)`, 'warning');
    }
  }

  function setExactStock(productId, exactQuantity) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    prod.quantity = Math.max(0, Math.floor(Number(exactQuantity) || 0));
    saveProducts();
    playSound('success');
    renderAll();
    showToast(`Stock updated to ${prod.quantity} for "${prod.name}"`, 'success');
  }

  function restockAllLowInventory() {
    let restockCount = 0;
    products.forEach(p => {
      if (p.quantity <= p.threshold) {
        p.quantity = p.threshold + 15; // Replenish to a safe healthy buffer
        restockCount++;
      }
    });

    if (restockCount > 0) {
      saveProducts();
      playSound('success');
      renderAll();
      showToast(`Successfully restocked ${restockCount} low-stock items!`, 'success');
    } else {
      showToast('All products already have healthy stock levels', 'info');
    }
  }

  // ==================== MODAL OPERATIONS ====================
  function openAddProductModal() {
    activeEditingProductId = null;
    elements.productForm.reset();
    elements.productId.value = '';
    elements.modalTitle.textContent = 'Add New Product';
    elements.modalSubtitle.textContent = 'Enter product specifications and initial inventory levels.';
    elements.saveBtnText.textContent = 'Add Product';
    clearFormErrors();

    // Set default category and generate SKU
    elements.productCategory.value = 'Electronics';
    elements.productSku.value = generateSku('Electronics');
    elements.productThreshold.value = 5;
    elements.productQuantity.value = 10;
    elements.productPrice.value = '';

    updateLivePreview();
    openModal(elements.productModal);
    playSound('pop');
    setTimeout(() => elements.productName.focus(), 100);
  }

  function openEditProductModal(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    activeEditingProductId = productId;
    clearFormErrors();

    elements.productId.value = prod.id;
    elements.productName.value = prod.name || '';
    elements.productSku.value = prod.sku || '';
    elements.productCategory.value = prod.category || '';
    elements.productPrice.value = prod.price || '';
    elements.productQuantity.value = prod.quantity !== undefined ? prod.quantity : 0;
    elements.productThreshold.value = prod.threshold || 5;
    elements.productImage.value = prod.image || '';
    elements.productDesc.value = prod.description || '';

    elements.modalTitle.textContent = 'Edit Product';
    elements.modalSubtitle.textContent = `Modify specifications for ${prod.name}`;
    elements.saveBtnText.textContent = 'Update Product';

    updateLivePreview();
    openModal(elements.productModal);
    playSound('pop');
  }

  function handleProductFormSubmit(e) {
    e.preventDefault();

    if (!validateProductForm()) {
      playSound('alert');
      return;
    }

    const name = elements.productName.value.trim();
    const sku = elements.productSku.value.trim();
    const category = elements.productCategory.value;
    const price = parseFloat(elements.productPrice.value) || 0;
    const quantity = parseInt(elements.productQuantity.value, 10) || 0;
    const threshold = parseInt(elements.productThreshold.value, 10) || 5;
    const image = elements.productImage.value.trim();
    const description = elements.productDesc.value.trim();

    if (activeEditingProductId) {
      // Edit existing
      const prodIndex = products.findIndex(p => p.id === activeEditingProductId);
      if (prodIndex > -1) {
        products[prodIndex] = {
          ...products[prodIndex],
          name,
          sku,
          category,
          price,
          quantity,
          threshold,
          image,
          description,
          updatedAt: Date.now()
        };
        saveProducts();
        playSound('success');
        showToast(`Product "${name}" updated successfully!`, 'success');
      }
    } else {
      // Create new
      const newProduct = {
        id: 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name,
        sku,
        category,
        price,
        quantity,
        threshold,
        image,
        description,
        createdAt: Date.now()
      };
      products.unshift(newProduct);
      saveProducts();
      playSound('success');
      showToast(`Product "${name}" added to inventory!`, 'success');
    }

    closeModal(elements.productModal);
    renderAll();
  }

  function validateProductForm() {
    let isValid = true;
    clearFormErrors();

    const name = elements.productName.value.trim();
    if (!name) {
      setError('nameError', 'Product name is required');
      isValid = false;
    }

    const sku = elements.productSku.value.trim();
    if (!sku) {
      setError('skuError', 'SKU is required');
      isValid = false;
    } else {
      // Check duplicate SKU
      const duplicate = products.find(p => p.sku && p.sku.toLowerCase() === sku.toLowerCase() && p.id !== activeEditingProductId);
      if (duplicate) {
        setError('skuError', 'SKU already exists on another item');
        isValid = false;
      }
    }

    const category = elements.productCategory.value;
    if (!category) {
      setError('categoryError', 'Please select a category');
      isValid = false;
    }

    const price = parseFloat(elements.productPrice.value);
    if (isNaN(price) || price < 0) {
      setError('priceError', 'Valid price ($) required');
      isValid = false;
    }

    const qty = parseInt(elements.productQuantity.value, 10);
    if (isNaN(qty) || qty < 0) {
      setError('quantityError', 'Quantity must be &ge; 0');
      isValid = false;
    }

    const threshold = parseInt(elements.productThreshold.value, 10);
    if (isNaN(threshold) || threshold < 1) {
      setError('thresholdError', 'Alert level must be &ge; 1');
      isValid = false;
    }

    return isValid;
  }

  function setError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = message;
    const input = el ? el.parentElement.querySelector('.form-input, .styled-select') : null;
    if (input) input.classList.add('input-error');
  }

  function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.innerHTML = '');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  }

  // Live Card Preview in Modal
  function updateLivePreview() {
    const name = elements.productName.value.trim() || 'Product Name';
    const sku = elements.productSku.value.trim() || 'SKU-SAMPLE';
    const category = elements.productCategory.value || 'Electronics';
    const price = parseFloat(elements.productPrice.value) || 0;
    const qty = parseInt(elements.productQuantity.value, 10) || 0;
    const threshold = parseInt(elements.productThreshold.value, 10) || 5;
    const image = elements.productImage.value.trim();
    const desc = elements.productDesc.value.trim() || 'Product description will appear here as you type...';

    const catConfig = getCategoryConfig(category);
    const mockProd = { quantity: qty, threshold: threshold };
    const stockInfo = getStockStatus(mockProd);
    const progress = calculateStockProgress(qty, threshold);

    elements.previewTitle.textContent = name;
    elements.previewSku.textContent = sku;
    elements.previewCategoryBadge.textContent = `${catConfig.icon} ${category}`;
    elements.previewPrice.textContent = formatCurrency(price);
    elements.previewTotalVal.textContent = `Total: ${formatCurrency(price * qty)}`;
    elements.previewDescText.textContent = desc;

    elements.previewStatusPill.className = `stock-status-pill ${stockInfo.class}`;
    elements.previewStatusPill.textContent = stockInfo.label;

    elements.previewProgressFill.className = `stock-progress-fill ${progress.colorClass}`;
    elements.previewProgressFill.style.width = `${progress.percentage}%`;
    elements.previewStockLabel.innerHTML = `Stock: <strong>${qty}</strong> units`;
    elements.previewThresholdLabel.innerHTML = `Alert at &le; ${threshold}`;

    const placeholder = getPlaceholderImage(catConfig.icon, category);
    if (image) {
      elements.previewImg.src = image;
      elements.previewImg.onerror = () => {
        elements.previewImg.src = placeholder;
      };
    } else {
      elements.previewImg.src = placeholder;
    }
  }

  // Delete Modal
  function openDeleteModal(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    lastDeletedProduct = prod;
    elements.deleteConfirmMessage.innerHTML = `Are you sure you want to delete <strong>"${escapeHtml(prod.name)}"</strong> from your inventory?`;
    
    elements.deleteProductCardPreview.innerHTML = `
      <div style="font-size:1.8rem;">${getCategoryConfig(prod.category).icon}</div>
      <div style="flex:1;">
        <div style="font-weight:700;">${escapeHtml(prod.name)}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">${escapeHtml(prod.sku)} &bull; ${formatCurrency(prod.price)} &bull; ${prod.quantity} units</div>
      </div>
    `;

    openModal(elements.deleteModal);
    playSound('alert');
  }

  function handleConfirmDelete() {
    if (!lastDeletedProduct) return;

    const deletedId = lastDeletedProduct.id;
    const deletedName = lastDeletedProduct.name;
    const deletedItemCopy = { ...lastDeletedProduct };

    products = products.filter(p => p.id !== deletedId);
    saveProducts();
    closeModal(elements.deleteModal);
    renderAll();
    playSound('pop');

    // Show Undo Toast
    showToastWithAction(
      `Deleted "${deletedName}"`,
      'Undo',
      () => {
        // Restore product
        products.unshift(deletedItemCopy);
        saveProducts();
        renderAll();
        playSound('success');
        showToast(`Restored "${deletedName}"`, 'success');
      }
    );
  }

  // Restock Adjuster Modal
  function openRestockModal(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    activeRestockProductId = productId;
    elements.restockModalSubtitle.textContent = `Update inventory for ${prod.name}`;
    elements.stepperInput.value = prod.quantity;

    elements.restockItemPreview.innerHTML = `
      <div style="font-size:2rem;">${getCategoryConfig(prod.category).icon}</div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:0.95rem;">${escapeHtml(prod.name)}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">
          SKU: ${escapeHtml(prod.sku)} &bull; Alert Threshold: ${prod.threshold} units
        </div>
      </div>
    `;

    openModal(elements.restockModal);
    playSound('click');
  }

  function handleSaveRestock() {
    if (!activeRestockProductId) return;
    const newQty = parseInt(elements.stepperInput.value, 10);
    setExactStock(activeRestockProductId, isNaN(newQty) ? 0 : newQty);
    closeModal(elements.restockModal);
  }

  function openModal(modalEl) {
    modalEl.classList.add('show');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('show');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    closeModal(elements.productModal);
    closeModal(elements.deleteModal);
    closeModal(elements.restockModal);
  }

  // ==================== CSV & JSON BACKUP ====================
  function exportToCsv() {
    if (products.length === 0) {
      showToast('No products to export', 'warning');
      return;
    }

    const headers = ['ID', 'Name', 'SKU', 'Category', 'Price', 'Quantity', 'Threshold', 'Total Value', 'Description', 'Image URL'];
    const rows = products.map(p => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${p.sku || ''}"`,
      `"${p.category || ''}"`,
      p.price || 0,
      p.quantity || 0,
      p.threshold || 5,
      ((Number(p.price) || 0) * (Number(p.quantity) || 0)).toFixed(2),
      `"${(p.description || '').replace(/"/g, '""')}"`,
      `"${p.image || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    playSound('success');
    showToast('Inventory exported to CSV!', 'success');
  }

  function exportToJson() {
    if (products.length === 0) {
      showToast('No products to export', 'warning');
      return;
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `inventory_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    playSound('success');
    showToast('Inventory JSON backup downloaded!', 'success');
  }

  function handleImportJson(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          // Normalize and validate
          const validProducts = importedData.filter(item => item && item.name);
          if (validProducts.length > 0) {
            products = validProducts.map(p => ({
              id: p.id || 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
              name: String(p.name).trim(),
              sku: String(p.sku || generateSku(p.category || 'Electronics')),
              category: String(p.category || 'Electronics'),
              price: parseFloat(p.price) || 0,
              quantity: parseInt(p.quantity, 10) || 0,
              threshold: parseInt(p.threshold, 10) || 5,
              description: String(p.description || ''),
              image: String(p.image || ''),
              createdAt: p.createdAt || Date.now()
            }));
            saveProducts();
            renderAll();
            playSound('success');
            showToast(`Imported ${products.length} products successfully!`, 'success');
          } else {
            showToast('JSON file did not contain valid products', 'danger');
          }
        } else {
          showToast('Invalid JSON file format. Array expected.', 'danger');
        }
      } catch (err) {
        showToast('Error parsing JSON backup file', 'danger');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  }

  function resetToSampleData() {
    products = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_PRODUCTS));
    saveProducts();
    clearAllFilters();
    playSound('success');
    showToast('Demo products restored!', 'success');
  }

  function clearEntireInventory() {
    if (confirm('Are you sure you want to clear all products? You can restore sample data anytime.')) {
      products = [];
      saveProducts();
      renderAll();
      playSound('pop');
      showToast('Inventory cleared', 'info');
    }
  }

  function clearAllFilters() {
    currentSearchQuery = '';
    currentFilterCategory = 'all';
    currentStockFilter = 'all';
    elements.globalSearchInput.value = '';
    elements.clearSearchBtn.style.display = 'none';
    elements.stockStatusSelect.value = 'all';
    renderAll();
  }

  // ==================== TOAST SYSTEM ====================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-message">${escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      removeToast(toast);
    });

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      removeToast(toast);
    }, 4000);
  }

  function showToastWithAction(message, actionText, actionCallback) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-warning';

    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      <span class="toast-message">${escapeHtml(message)}</span>
      <button type="button" class="toast-action">${escapeHtml(actionText)}</button>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    toast.querySelector('.toast-action').addEventListener('click', () => {
      actionCallback();
      removeToast(toast);
    });

    toast.querySelector('.toast-close').addEventListener('click', () => {
      removeToast(toast);
    });

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      removeToast(toast);
    }, 6000);
  }

  function removeToast(toast) {
    if (!toast || !toast.parentElement) return;
    toast.classList.add('toast-leave');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 250);
  }

  // ==================== EVENT BINDINGS ====================
  function bindEvents() {
    // Theme & Sound
    elements.themeToggleBtn.addEventListener('click', toggleTheme);
    elements.soundToggleBtn.addEventListener('click', toggleSound);

    // View toggles
    elements.viewGridBtn.addEventListener('click', () => setViewMode('grid'));
    elements.viewListBtn.addEventListener('click', () => setViewMode('list'));

    // Global Search
    elements.globalSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      elements.clearSearchBtn.style.display = currentSearchQuery ? 'flex' : 'none';
      renderActiveFilterTags();
      renderProductsList();
    });

    elements.clearSearchBtn.addEventListener('click', () => {
      currentSearchQuery = '';
      elements.globalSearchInput.value = '';
      elements.clearSearchBtn.style.display = 'none';
      elements.globalSearchInput.focus();
      renderActiveFilterTags();
      renderProductsList();
    });

    // Stock Status Dropdown Filter
    elements.stockStatusSelect.addEventListener('change', (e) => {
      currentStockFilter = e.target.value;
      playSound('pop');
      renderActiveFilterTags();
      renderProductsList();
    });

    // Sort Dropdown
    elements.sortBySelect.addEventListener('change', (e) => {
      currentSortBy = e.target.value;
      playSound('pop');
      renderProductsList();
    });

    // Clear all filters button
    elements.resetAllFiltersBtn.addEventListener('click', () => {
      clearAllFilters();
      playSound('pop');
    });

    // Stat Cards Filter Clicks
    elements.statCardLowStock.addEventListener('click', () => {
      currentStockFilter = 'low_stock';
      elements.stockStatusSelect.value = 'low_stock';
      playSound('pop');
      renderActiveFilterTags();
      renderProductsList();
    });

    elements.statCardOutOfStock.addEventListener('click', () => {
      currentStockFilter = 'out_of_stock';
      elements.stockStatusSelect.value = 'out_of_stock';
      playSound('pop');
      renderActiveFilterTags();
      renderProductsList();
    });

    // Low stock emergency banner
    elements.bannerFilterBtn.addEventListener('click', () => {
      currentStockFilter = 'low_stock';
      elements.stockStatusSelect.value = 'low_stock';
      playSound('pop');
      renderActiveFilterTags();
      renderProductsList();
    });

    elements.bannerDismissBtn.addEventListener('click', () => {
      elements.lowStockBanner.style.display = 'none';
    });

    // Restock Assist Button in toolbar
    elements.quickRestockBtn.addEventListener('click', () => {
      restockAllLowInventory();
    });

    // Add Product Modal
    elements.openAddModalBtn.addEventListener('click', openAddProductModal);
    elements.emptyAddProductBtn.addEventListener('click', openAddProductModal);
    elements.closeProductModalBtn.addEventListener('click', () => closeModal(elements.productModal));
    elements.cancelProductBtn.addEventListener('click', () => closeModal(elements.productModal));
    elements.productForm.addEventListener('submit', handleProductFormSubmit);

    // Form Auto SKU
    elements.generateSkuBtn.addEventListener('click', () => {
      const cat = elements.productCategory.value || 'Electronics';
      elements.productSku.value = generateSku(cat);
      updateLivePreview();
      playSound('pop');
    });

    // Live preview updates on form input
    ['input', 'change'].forEach(evt => {
      elements.productForm.addEventListener(evt, updateLivePreview);
    });

    // Auto-update SKU prefix on category change
    elements.productCategory.addEventListener('change', (e) => {
      if (!activeEditingProductId) {
        elements.productSku.value = generateSku(e.target.value);
      }
      updateLivePreview();
    });

    // Preset Image chips click
    elements.presetChipsContainer.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const url = chip.getAttribute('data-img');
        if (url) {
          elements.productImage.value = url;
          updateLivePreview();
          playSound('pop');
        }
      });
    });

    // Delete Modal
    elements.cancelDeleteBtn.addEventListener('click', () => closeModal(elements.deleteModal));
    elements.confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

    // Restock Modal
    elements.closeRestockModalBtn.addEventListener('click', () => closeModal(elements.restockModal));
    elements.cancelRestockBtn.addEventListener('click', () => closeModal(elements.restockModal));
    elements.saveRestockBtn.addEventListener('click', handleSaveRestock);

    elements.stepperMinusBtn.addEventListener('click', () => {
      const cur = Math.max(0, (parseInt(elements.stepperInput.value, 10) || 0) - 1);
      elements.stepperInput.value = cur;
      playSound('click');
    });

    elements.stepperPlusBtn.addEventListener('click', () => {
      const cur = (parseInt(elements.stepperInput.value, 10) || 0) + 1;
      elements.stepperInput.value = cur;
      playSound('click');
    });

    // Quick batch buttons
    elements.restockModal.querySelectorAll('.btn-batch').forEach(btn => {
      btn.addEventListener('click', () => {
        const addAmount = parseInt(btn.getAttribute('data-add'), 10) || 0;
        const cur = (parseInt(elements.stepperInput.value, 10) || 0) + addAmount;
        elements.stepperInput.value = cur;
        playSound('pop');
      });
    });

    // Data Menu Dropdown
    elements.dataMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.dataDropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!elements.dataDropdownMenu.contains(e.target) && e.target !== elements.dataMenuBtn) {
        elements.dataDropdownMenu.classList.remove('show');
      }
    });

    elements.exportCsvBtn.addEventListener('click', () => {
      elements.dataDropdownMenu.classList.remove('show');
      exportToCsv();
    });

    elements.exportJsonBtn.addEventListener('click', () => {
      elements.dataDropdownMenu.classList.remove('show');
      exportToJson();
    });

    elements.importJsonInput.addEventListener('change', (e) => {
      elements.dataDropdownMenu.classList.remove('show');
      handleImportJson(e);
    });

    elements.resetSampleBtn.addEventListener('click', () => {
      elements.dataDropdownMenu.classList.remove('show');
      resetToSampleData();
    });

    elements.quickSampleDataBtn.addEventListener('click', resetToSampleData);

    elements.clearAllBtn.addEventListener('click', () => {
      elements.dataDropdownMenu.classList.remove('show');
      clearEntireInventory();
    });

    // Close modals on overlay backdrop click
    [elements.productModal, elements.deleteModal, elements.restockModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      // Escape closes modals
      if (e.key === 'Escape') {
        closeAllModals();
        elements.dataDropdownMenu.classList.remove('show');
      }

      // '/' focuses search when not typing
      if (e.key === '/' && !isInput) {
        e.preventDefault();
        elements.globalSearchInput.focus();
        elements.globalSearchInput.select();
      }

      // 'N' opens Add Product modal when not typing
      if ((e.key === 'n' || e.key === 'N') && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        openAddProductModal();
      }

      // 'T' toggles theme when not typing
      if ((e.key === 't' || e.key === 'T') && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // Start app on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
