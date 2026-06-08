// Initialize Lucide Icons if loaded
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navigation & Header Effects
    // ----------------------------------------------------
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

    // Sticky Header Scroll Event (only if header exists)
    if (header) {
        window.addEventListener('scroll', () => {
            // For index.html, we toggle class based on scroll position.
            // portal.html starts with scrolled class statically.
            if (!document.body.classList.contains('portal-body')) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    // Check if it's index.html (doesn't have hardcoded scrolled class)
                    const isPortal = window.location.pathname.includes('portal.html');
                    if (!isPortal) {
                        header.classList.remove('scrolled');
                    }
                }
            }
        });
    }

    // Toggle Mobile Nav Drawer
    if (mobileMenuToggle && mobileNavDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileNavDrawer.classList.toggle('open');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon && typeof lucide !== 'undefined') {
                if (isOpen) {
                    mobileMenuToggle.innerHTML = '<i data-lucide="x"></i>';
                } else {
                    mobileMenuToggle.innerHTML = '<i data-lucide="menu"></i>';
                }
                lucide.createIcons();
            }
        });

        // Close drawer on link clicks
        const mobileLinks = mobileNavDrawer.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavDrawer.classList.remove('open');
                mobileMenuToggle.innerHTML = '<i data-lucide="menu"></i>';
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }


    // ----------------------------------------------------
    // 2. Interactive Tuning Portal Logic
    // ----------------------------------------------------
    const selectMake = document.getElementById('select-make');
    const selectModel = document.getElementById('select-model');
    const selectEngine = document.getElementById('select-engine');

    // Only run if we are on the portal page
    if (selectMake && selectModel && selectEngine) {
        
        // Add class to body to indicate portal page
        document.body.classList.add('portal-body');
        
        // Tuning database
        const carDatabase = {
            porsche: {
                name: "Porsche",
                models: {
                    gt3: {
                        name: "911 GT3 (992)",
                        engines: {
                            flat6_na: {
                                name: "4.0 Flat-6 N/A",
                                origHp: 510,
                                origTq: 470,
                                stages: {
                                    1: { hp: 538, tq: 498 },
                                    2: { hp: 555, tq: 520 },
                                    3: { hp: 585, tq: 550 }
                                }
                            }
                        }
                    },
                    turbo_s: {
                        name: "911 Turbo S (992)",
                        engines: {
                            v6_turbo: {
                                name: "3.7 Twin-Turbo",
                                origHp: 650,
                                origTq: 800,
                                stages: {
                                    1: { hp: 730, tq: 900 },
                                    2: { hp: 785, tq: 980 },
                                    3: { hp: 860, tq: 1080 }
                                }
                            }
                        }
                    },
                    cayman_gt4: {
                        name: "718 Cayman GT4 RS",
                        engines: {
                            flat6_gt4: {
                                name: "4.0 Flat-6 N/A",
                                origHp: 500,
                                origTq: 450,
                                stages: {
                                    1: { hp: 525, tq: 475 },
                                    2: { hp: 542, tq: 495 },
                                    3: { hp: 565, tq: 515 }
                                }
                            }
                        }
                    }
                }
            },
            mercedes: {
                name: "Mercedes-AMG",
                models: {
                    gt63: {
                        name: "GT 63 S E Performance",
                        engines: {
                            v8_hybrid: {
                                name: "4.0 V8 BiTurbo Hybrid",
                                origHp: 843,
                                origTq: 1470,
                                stages: {
                                    1: { hp: 920, tq: 1600 },
                                    2: { hp: 990, tq: 1750 },
                                    3: { hp: 1060, tq: 1900 }
                                }
                            }
                        }
                    },
                    c63: {
                        name: "C 63 S (W205)",
                        engines: {
                            v8_biturbo: {
                                name: "4.0 V8 BiTurbo",
                                origHp: 510,
                                origTq: 700,
                                stages: {
                                    1: { hp: 590, tq: 820 },
                                    2: { hp: 635, tq: 890 },
                                    3: { hp: 710, tq: 980 }
                                }
                            }
                        }
                    },
                    e63: {
                        name: "E 63 S (W213)",
                        engines: {
                            v8_e63: {
                                name: "4.0 V8 BiTurbo",
                                origHp: 612,
                                origTq: 850,
                                stages: {
                                    1: { hp: 710, tq: 980 },
                                    2: { hp: 765, tq: 1050 },
                                    3: { hp: 840, tq: 1160 }
                                }
                            }
                        }
                    }
                }
            },
            bmw: {
                name: "BMW M",
                models: {
                    m3_g80: {
                        name: "M3 Competition (G80)",
                        engines: {
                            s58: {
                                name: "3.0 Twin-Turbo S58",
                                origHp: 510,
                                origTq: 650,
                                stages: {
                                    1: { hp: 620, tq: 770 },
                                    2: { hp: 680, tq: 830 },
                                    3: { hp: 750, tq: 920 }
                                }
                            }
                        }
                    },
                    m5_f90: {
                        name: "M5 CS (F90)",
                        engines: {
                            s63: {
                                name: "4.4 Twin-Turbo S63",
                                origHp: 635,
                                origTq: 750,
                                stages: {
                                    1: { hp: 720, tq: 890 },
                                    2: { hp: 785, tq: 960 },
                                    3: { hp: 860, tq: 1080 }
                                }
                            }
                        }
                    },
                    m4_g82: {
                        name: "M4 CSL (G82)",
                        engines: {
                            s58_csl: {
                                name: "3.0 Twin-Turbo S58",
                                origHp: 550,
                                origTq: 650,
                                stages: {
                                    1: { hp: 640, tq: 780 },
                                    2: { hp: 690, tq: 840 },
                                    3: { hp: 770, tq: 930 }
                                }
                            }
                        }
                    }
                }
            },
            audi: {
                name: "Audi RS",
                models: {
                    rs6_c8: {
                        name: "RS6 Avant (C8)",
                        engines: {
                            v8_tfsi: {
                                name: "4.0 TFSI V8",
                                origHp: 600,
                                origTq: 800,
                                stages: {
                                    1: { hp: 710, tq: 950 },
                                    2: { hp: 775, tq: 1030 },
                                    3: { hp: 850, tq: 1150 }
                                }
                            }
                        }
                    },
                    rs3_8y: {
                        name: "RS3 Sportback (8Y)",
                        engines: {
                            daaza: {
                                name: "2.5 TFSI L5",
                                origHp: 400,
                                origTq: 500,
                                stages: {
                                    1: { hp: 475, tq: 580 },
                                    2: { hp: 510, tq: 630 },
                                    3: { hp: 570, tq: 700 }
                                }
                            }
                        }
                    }
                }
            }
        };

        // Active State tracking
        let currentMake = 'porsche';
        let currentModel = 'gt3';
        let currentEngine = 'flat6_na';
        let currentStage = 1;

        // Populate Select elements
        function updateModelSelect() {
            selectModel.innerHTML = '';
            const models = carDatabase[currentMake].models;
            
            Object.keys(models).forEach(modelKey => {
                const opt = document.createElement('option');
                opt.value = modelKey;
                opt.textContent = models[modelKey].name;
                selectModel.appendChild(opt);
            });
            
            currentModel = selectModel.value;
            updateEngineSelect();
        }

        function updateEngineSelect() {
            selectEngine.innerHTML = '';
            const engines = carDatabase[currentMake].models[currentModel].engines;
            
            Object.keys(engines).forEach(engineKey => {
                const opt = document.createElement('option');
                opt.value = engineKey;
                opt.textContent = engines[engineKey].name;
                selectEngine.appendChild(opt);
            });
            
            currentEngine = selectEngine.value;
            updateSpecsDisplay();
        }

        // Update Stats Dashboard elements
        function updateSpecsDisplay() {
            const engineData = carDatabase[currentMake].models[currentModel].engines[currentEngine];
            const stageData = engineData.stages[currentStage];
            
            // Title Display
            const vehicleTitle = document.getElementById('vehicle-title-display');
            vehicleTitle.textContent = `${carDatabase[currentMake].name} ${carDatabase[currentMake].models[currentModel].name}`;
            
            // HP Values
            const hpOrigEl = document.getElementById('hp-orig');
            const hpTunedEl = document.getElementById('hp-tuned');
            const hpGainEl = document.getElementById('hp-gain');
            const hpBarOrig = document.getElementById('hp-bar-orig');
            const hpBarTuned = document.getElementById('hp-bar-tuned');
            
            const origHp = engineData.origHp;
            const tunedHp = stageData.hp;
            const hpDiff = tunedHp - origHp;
            
            hpOrigEl.textContent = origHp;
            hpTunedEl.textContent = tunedHp;
            hpGainEl.textContent = `+${hpDiff} HP`;
            
            // Max gauge limit is 1200 HP for calculation
            const maxHpScale = 1200;
            hpBarOrig.style.width = `${(origHp / maxHpScale) * 100}%`;
            hpBarTuned.style.width = `${(tunedHp / maxHpScale) * 100}%`;
            
            // Torque Values
            const tqOrigEl = document.getElementById('torque-orig');
            const tqTunedEl = document.getElementById('torque-tuned');
            const tqGainEl = document.getElementById('torque-gain');
            const tqBarOrig = document.getElementById('torque-bar-orig');
            const tqBarTuned = document.getElementById('torque-bar-tuned');
            
            const origTq = engineData.origTq;
            const tunedTq = stageData.tq;
            const tqDiff = tunedTq - origTq;
            
            tqOrigEl.textContent = origTq;
            tqTunedEl.textContent = tunedTq;
            tqGainEl.textContent = `+${tqDiff} Nm`;
            
            // Max gauge limit is 2000 Nm for calculation
            const maxTqScale = 2000;
            tqBarOrig.style.width = `${(origTq / maxTqScale) * 100}%`;
            tqBarTuned.style.width = `${(tunedTq / maxTqScale) * 100}%`;
        }

        // Initialize selectors setup
        updateModelSelect();

        // Dropdown Event Listeners
        selectMake.addEventListener('change', (e) => {
            currentMake = e.target.value;
            updateModelSelect();
        });

        selectModel.addEventListener('change', (e) => {
            currentModel = e.target.value;
            updateEngineSelect();
        });

        selectEngine.addEventListener('change', (e) => {
            currentEngine = e.target.value;
            updateSpecsDisplay();
        });

        // Stage Buttons Click Handler (Top-right of chart)
        const stageButtons = document.querySelectorAll('.stage-btn');
        stageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                stageButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentStage = parseInt(btn.dataset.stage);
                
                // Align the sidebar buttons
                const sidebarStageBtns = document.querySelectorAll('.stage-btn-sidebar');
                sidebarStageBtns.forEach(sb => {
                    sb.classList.remove('active');
                    if (parseInt(sb.dataset.stage) === currentStage) {
                        sb.classList.add('active');
                    }
                });
                
                updateSpecsDisplay();
            });
        });

        // Sidebar Stage Buttons Click Handler
        const sidebarStageBtns = document.querySelectorAll('.stage-btn-sidebar');
        sidebarStageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                sidebarStageBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentStage = parseInt(btn.dataset.stage);
                
                // Align top buttons
                stageButtons.forEach(tb => {
                    tb.classList.remove('active');
                    if (parseInt(tb.dataset.stage) === currentStage) {
                        tb.classList.add('active');
                    }
                });
                
                updateSpecsDisplay();
            });
        });


        // ----------------------------------------------------
        // 3. Simulated Uploader Logic
        // ----------------------------------------------------
        const dragDropArea = document.getElementById('drag-drop-area');
        const fileInputEl = document.getElementById('file-input-element');
        const uploadProgressBox = document.getElementById('upload-progress-box');
        const uploadBarFill = document.getElementById('upload-bar-fill');
        const uploadFilename = document.getElementById('upload-filename');
        const uploadPercent = document.getElementById('upload-percent');
        const uploadSuccessContainer = document.getElementById('upload-success-container');

        if (dragDropArea && fileInputEl) {
            
            // Drag events
            ['dragenter', 'dragover'].forEach(eventName => {
                dragDropArea.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    dragDropArea.classList.add('dragover');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dragDropArea.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    dragDropArea.classList.remove('dragover');
                }, false);
            });

            // Handle dropped file
            dragDropArea.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                if (files.length > 0) {
                    simulateFileUpload(files[0]);
                }
            });

            // Trigger file dialog
            dragDropArea.addEventListener('click', () => {
                fileInputEl.click();
            });

            fileInputEl.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    simulateFileUpload(e.target.files[0]);
                }
            });
        }

        function simulateFileUpload(file) {
            // Reset success msg and drag area visibility
            uploadSuccessContainer.style.display = 'none';
            uploadProgressBox.style.display = 'block';
            uploadFilename.textContent = file.name;
            
            let percent = 0;
            uploadBarFill.style.width = '0%';
            uploadPercent.textContent = '0%';

            const interval = setInterval(() => {
                percent += Math.floor(Math.random() * 15) + 5; // increment randomly
                if (percent >= 100) {
                    percent = 100;
                    clearInterval(interval);
                    
                    // Show success
                    setTimeout(() => {
                        uploadProgressBox.style.display = 'none';
                        uploadSuccessContainer.style.display = 'flex';
                        uploadSuccessContainer.classList.add('animate-fade-in-up');
                    }, 500);
                }
                uploadBarFill.style.width = `${percent}%`;
                uploadPercent.textContent = `${percent}%`;
            }, 100);
        }
    }
});
