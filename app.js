/* ==========================================================================
   +359 TUNING STUDIO - INTERACTIVE APPLICATION JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. NAVIGATION SCROLL EFFECTS
    // ==========================================================================
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load in case page is refreshed scrolled down

    // ==========================================================================
    // 2. ACTIVE NAV LINK ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ==========================================================================
    // 3. MOBILE MENU DRAWER
    // ==========================================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMobileMenu = () => {
        mobileDrawer.classList.add('active');
    };

    const closeMobileMenu = () => {
        mobileDrawer.classList.remove('active');
    };

    mobileNavToggle.addEventListener('click', openMobileMenu);
    closeDrawerBtn.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // ==========================================================================
    // 4. PORTAL OVERLAY & DRAWER CONTROL
    // ==========================================================================
    const portalOverlay = document.getElementById('portalOverlay');
    const openPortalBtns = document.querySelectorAll('.open-portal-btn');
    const closePortalBtn = document.getElementById('closePortalBtn');

    const openPortal = () => {
        portalOverlay.classList.add('active');
        portalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock main scroll
        closeMobileMenu(); // Close mobile menu if open
    };

    const closePortal = () => {
        portalOverlay.classList.remove('active');
        portalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock scroll
    };

    openPortalBtns.forEach(btn => btn.addEventListener('click', openPortal));
    closePortalBtn.addEventListener('click', closePortal);
    
    // Close on backdrop click (drawer itself is inside overlay)
    portalOverlay.addEventListener('click', (e) => {
        if (e.target === portalOverlay) {
            closePortal();
        }
    });

    // ==========================================================================
    // 5. PORTAL TAB CONTROLS
    // ==========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === `tab-${targetTab}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ==========================================================================
    // 6. TUNING PORTAL CALCULATOR DATA & LOGIC
    // ==========================================================================
    const modelData = {
        porsche: [
            { value: '911-carrera-s', name: 'Porsche 911 Carrera S (992) 3.0T' },
            { value: 'cayenne-turbo', name: 'Porsche Cayenne Turbo (PO536) 4.0 V8' },
            { value: 'taycan-gts', name: 'Porsche Taycan GTS (Electric)' }
        ],
        bmw: [
            { value: 'm3-comp', name: 'BMW M3 Competition (G80) 3.0 TwinTurbo' },
            { value: 'm5-comp', name: 'BMW M5 Competition (F90) 4.4 V8' },
            { value: '340i-b58', name: 'BMW M340i (G20) 3.0 SingleTurbo (B58)' }
        ],
        mercedes: [
            { value: 'c63s-v8', name: 'Mercedes-AMG C 63 S (W205) 4.0 V8' },
            { value: 'e63s-v8', name: 'Mercedes-AMG E 63 S (W213) 4.0 V8' },
            { value: 'a45s-amg', name: 'Mercedes-AMG A 45 S (W177) 2.0T' }
        ],
        audi: [
            { value: 'rs6-c8', name: 'Audi RS6 Avant (C8) 4.0 V8 TFSI' },
            { value: 'rs3-tfsi', name: 'Audi RS3 Sportback (8V) 2.5 TFSI L5' },
            { value: 's5-tdi', name: 'Audi S5 Sportback (F5) 3.0 V6 TDI' }
        ]
    };

    const tuningSpecs = {
        '911-carrera-s': {
            stock: { hp: 450, nm: 530, maxHp: 650, maxNm: 800 },
            stage1: { hp: 520, nm: 640, maxHp: 650, maxNm: 800 },
            stage2: { hp: 560, nm: 700, maxHp: 650, maxNm: 800 }
        },
        'cayenne-turbo': {
            stock: { hp: 550, nm: 770, maxHp: 800, maxNm: 1000 },
            stage1: { hp: 670, nm: 900, maxHp: 800, maxNm: 1000 },
            stage2: { hp: 720, nm: 980, maxHp: 800, maxNm: 1000 }
        },
        'taycan-gts': {
            stock: { hp: 598, nm: 850, maxHp: 750, maxNm: 1000 },
            stage1: { hp: 680, nm: 930, maxHp: 750, maxNm: 1000 },
            stage2: { hp: 710, nm: 960, maxHp: 750, maxNm: 1000 }
        },
        'm3-comp': {
            stock: { hp: 510, nm: 650, maxHp: 750, maxNm: 950 },
            stage1: { hp: 620, nm: 780, maxHp: 750, maxNm: 950 },
            stage2: { hp: 680, nm: 860, maxHp: 750, maxNm: 950 }
        },
        'm5-comp': {
            stock: { hp: 625, nm: 750, maxHp: 900, maxNm: 1100 },
            stage1: { hp: 730, nm: 900, maxHp: 900, maxNm: 1100 },
            stage2: { hp: 820, nm: 1020, maxHp: 900, maxNm: 1100 }
        },
        '340i-b58': {
            stock: { hp: 374, nm: 500, maxHp: 550, maxNm: 750 },
            stage1: { hp: 440, nm: 610, maxHp: 550, maxNm: 750 },
            stage2: { hp: 480, nm: 680, maxHp: 550, maxNm: 750 }
        },
        'c63s-v8': {
            stock: { hp: 510, nm: 700, maxHp: 750, maxNm: 1000 },
            stage1: { hp: 600, nm: 820, maxHp: 750, maxNm: 1000 },
            stage2: { hp: 640, nm: 900, maxHp: 750, maxNm: 1000 }
        },
        'e63s-v8': {
            stock: { hp: 612, nm: 850, maxHp: 850, maxNm: 1100 },
            stage1: { hp: 720, nm: 980, maxHp: 850, maxNm: 1100 },
            stage2: { hp: 790, nm: 1050, maxHp: 850, maxNm: 1100 }
        },
        'a45s-amg': {
            stock: { hp: 421, nm: 500, maxHp: 550, maxNm: 680 },
            stage1: { hp: 470, nm: 570, maxHp: 550, maxNm: 680 },
            stage2: { hp: 500, nm: 610, maxHp: 550, maxNm: 680 }
        },
        'rs6-c8': {
            stock: { hp: 600, nm: 800, maxHp: 850, maxNm: 1100 },
            stage1: { hp: 710, nm: 920, maxHp: 850, maxNm: 1100 },
            stage2: { hp: 770, nm: 1020, maxHp: 850, maxNm: 1100 }
        },
        'rs3-tfsi': {
            stock: { hp: 400, nm: 500, maxHp: 600, maxNm: 750 },
            stage1: { hp: 460, nm: 590, maxHp: 600, maxNm: 750 },
            stage2: { hp: 490, nm: 630, maxHp: 600, maxNm: 750 }
        },
        's5-tdi': {
            stock: { hp: 341, nm: 700, maxHp: 480, maxNm: 900 },
            stage1: { hp: 390, nm: 800, maxHp: 480, maxNm: 900 },
            stage2: { hp: 415, nm: 850, maxHp: 480, maxNm: 900 }
        }
    };

    const brandSelect = document.getElementById('car-brand');
    const modelSelect = document.getElementById('car-model');
    const calcPlaceholder = document.getElementById('calcPlaceholder');
    const calcResults = document.getElementById('calcResults');
    const stageTabBtns = document.querySelectorAll('.stage-tab-btn');
    
    // UI Display Fields
    const hpDisplay = document.getElementById('hp-display');
    const nmDisplay = document.getElementById('nm-display');
    const hpProgress = document.getElementById('hp-progress');
    const nmProgress = document.getElementById('nm-progress');
    const hpMaxTick = document.getElementById('hp-max-tick');
    const nmMaxTick = document.getElementById('nm-max-tick');
    const hpGain = document.getElementById('hp-gain');
    const nmGain = document.getElementById('nm-gain');

    let currentModelId = '';
    let currentStage = 'stage1'; // Default stage selection
    let activeCounters = { hp: null, nm: null };

    // Brand Selection Trigger
    brandSelect.addEventListener('change', () => {
        const selectedBrand = brandSelect.value;
        
        // Reset and clear model dropdown
        modelSelect.innerHTML = '<option value="" disabled selected>Изберете модел...</option>';
        modelSelect.disabled = false;
        
        // Populate new models
        if (modelData[selectedBrand]) {
            modelData[selectedBrand].forEach(model => {
                const opt = document.createElement('option');
                opt.value = model.value;
                opt.textContent = model.name;
                modelSelect.appendChild(opt);
            });
        }
        
        // Return results box to placeholder if model not selected
        calcPlaceholder.style.display = 'flex';
        calcResults.style.display = 'none';
    });

    // Model Selection Trigger
    modelSelect.addEventListener('change', () => {
        currentModelId = modelSelect.value;
        
        // Hide placeholder, show results box
        calcPlaceholder.style.display = 'none';
        calcResults.style.display = 'block';
        
        // Reset active stage tab to Stage 1 when vehicle changes
        stageTabBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.stage-tab-btn[data-stage="stage1"]').classList.add('active');
        currentStage = 'stage1';

        updateTuningStats();
    });

    // Stage Selector Tabs Trigger
    stageTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentModelId) return;
            
            stageTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStage = btn.getAttribute('data-stage');
            
            updateTuningStats();
        });
    });

    // Metric Count Animation Utility
    const animateValue = (element, start, end, duration, suffix = "") => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easeProgress * (end - start) + start);
            element.textContent = `${value} ${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = `${end} ${suffix}`;
            }
        };
        requestAnimationFrame(step);
    };

    // Calculate and Apply Stats Visuals
    const updateTuningStats = () => {
        const spec = tuningSpecs[currentModelId];
        if (!spec) return;

        const currentSpec = spec[currentStage];
        const stockSpec = spec.stock;
        
        // Set maximum ticks for range bars
        hpMaxTick.textContent = `${stockSpec.maxHp} к.с.`;
        nmMaxTick.textContent = `${stockSpec.maxNm} Nm`;

        // Calculate gains relative to stock
        const hpDiff = currentSpec.hp - stockSpec.hp;
        const nmDiff = currentSpec.nm - stockSpec.nm;

        // Parse previous values to count from
        const prevHpText = hpDisplay.textContent.replace(/\D/g, '');
        const prevNmText = nmDisplay.textContent.replace(/\D/g, '');
        const startHp = parseInt(prevHpText) || 0;
        const startNm = parseInt(prevNmText) || 0;

        // Animate dynamic text values
        animateValue(hpDisplay, startHp, currentSpec.hp, 500, "к.с.");
        animateValue(nmDisplay, startNm, currentSpec.nm, 500, "Nm");

        // Gain strings
        if (currentStage === 'stock') {
            hpGain.textContent = `+0 к.с.`;
            nmGain.textContent = `+0 Nm`;
            hpGain.classList.remove('active-gain');
            nmGain.classList.remove('active-gain');
        } else {
            hpGain.textContent = `+${hpDiff} к.с.`;
            nmGain.textContent = `+${nmDiff} Nm`;
            hpGain.classList.add('active-gain');
            nmGain.classList.add('active-gain');
        }

        // Animate width progress bars
        const hpPercent = (currentSpec.hp / stockSpec.maxHp) * 100;
        const nmPercent = (currentSpec.nm / stockSpec.maxNm) * 100;

        hpProgress.style.width = `${hpPercent}%`;
        nmProgress.style.width = `${nmPercent}%`;
    };

    // ==========================================================================
    // 7. FILE SERVICE SIMULATION
    // ==========================================================================
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const uploadProgressBox = document.getElementById('uploadProgressBox');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const fileSizeDisplay = document.getElementById('fileSizeDisplay');
    const simProgressFill = document.getElementById('simProgressFill');
    const progressPercent = document.getElementById('progressPercent');
    const progressStatusText = document.getElementById('progressStatusText');
    const consoleBox = document.getElementById('consoleBox');
    const uploadSuccessBox = document.getElementById('uploadSuccessBox');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const resetUploadBtn = document.getElementById('resetUploadBtn');

    let simInterval = null;

    // Drag and Drop Event Listeners
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
        }, false);
    });

    uploadZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            handleFileUpload(files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFileUpload(fileInput.files[0]);
        }
    });

    const handleFileUpload = (file) => {
        // Prepare metadata UI
        fileNameDisplay.textContent = file.name;
        
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        fileSizeDisplay.textContent = `${sizeMb} MB`;

        // Hide upload view, show progress view, hide success view
        uploadZone.style.display = 'none';
        uploadProgressBox.style.display = 'block';
        uploadSuccessBox.style.display = 'none';

        startTuningSimulation(file.name);
    };

    // Simulated Console logger
    const addConsoleLine = (text, delay = 0) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.textContent = `> ${text}`;
            consoleBox.appendChild(line);
            consoleBox.scrollTop = consoleBox.scrollHeight;
        }, delay);
    };

    // Run progressive UI upload and analysis triggers
    const startTuningSimulation = (fileName) => {
        // Clear previous console logs
        consoleBox.innerHTML = '';
        simProgressFill.style.width = '0%';
        progressPercent.textContent = '0%';
        progressStatusText.textContent = 'Подготовка на файла...';

        let percent = 0;
        
        // Log steps
        addConsoleLine('Свързване с +359 Tuning File Service...', 100);
        addConsoleLine(`Започнато качване на ${fileName}...`, 500);
        
        simInterval = setInterval(() => {
            percent += 2;
            simProgressFill.style.width = `${percent}%`;
            progressPercent.textContent = `${percent}%`;

            // State changes during progress
            if (percent === 20) {
                progressStatusText.textContent = 'Анализиране на файлова структура...';
                addConsoleLine('Файлът е качен успешно на сървъра. Размер: ' + fileSizeDisplay.textContent, 0);
                addConsoleLine('Идентифициране на ЕCU тип и фърмуер контролер...', 300);
            }
            else if (percent === 40) {
                progressStatusText.textContent = 'Идентифициране на карти (Maps ID)...';
                addConsoleLine('Открит компютър: Bosch MG1CS003', 0);
                addConsoleLine('Регистрирана хардуерна версия: HW0192039A', 200);
                addConsoleLine('Проверка на checksum подписи: Валидни', 400);
            }
            else if (percent === 60) {
                progressStatusText.textContent = 'Прилагане на калибрационни Stage 1 филтри...';
                addConsoleLine('Започване на модификации по таблици за въздух и запалване...', 0);
                addConsoleLine('Калибриране на ограничители на въртящ момент...', 300);
                addConsoleLine('Оптимизация на налягане на турбокомпресор (+0.2 bar)...', 600);
            }
            else if (percent === 80) {
                progressStatusText.textContent = 'Изчисляване на финални Checksums...';
                addConsoleLine('Изчисляване и коригиране на финална сума...', 0);
                addConsoleLine('Симулация на софтуерен Dyno тест: Преминат успешно.', 400);
            }
            else if (percent >= 100) {
                clearInterval(simInterval);
                progressStatusText.textContent = 'Готово!';
                addConsoleLine('Контролни суми записани. Файлът е компилиран.', 0);
                addConsoleLine('Спецификациите са синхронизирани с дилърския портал.', 200);
                
                // Switch to success screen after a brief pause
                setTimeout(() => {
                    uploadProgressBox.style.display = 'none';
                    uploadSuccessBox.style.display = 'block';
                }, 800);
            }
        }, 100);
    };

    // Cancel Simulation
    cancelUploadBtn.addEventListener('click', () => {
        clearInterval(simInterval);
        resetUploadState();
    });

    // Reset upload to drag zone
    const resetUploadState = () => {
        uploadProgressBox.style.display = 'none';
        uploadSuccessBox.style.display = 'none';
        uploadZone.style.display = 'block';
        fileInput.value = '';
    };

    resetUploadBtn.addEventListener('click', resetUploadState);

});
