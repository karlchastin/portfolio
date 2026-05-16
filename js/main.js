import { injectIcons } from './ui/icons.js';
import { profiles } from './config.js';
import { setupTabs, swapData, isAnimating as isTabsAnimating } from './ui/tabs.js';
import { syncBackgrounds } from './ui/animations.js';
import { setupUIEvents } from './ui/events.js';
import { renderAllComponents } from './ui/components.js';
import { prefetchGitHubProfile, updateGitHubData } from './api/github.js';
import { connectLanyard } from './api/discord.js';

function preloadAssets() {
    Object.values(profiles).forEach(p => {
        if (p.avatar) {
            const img = new Image();
            img.src = p.avatar;
        }
    });
    const ghChart = new Image();
    ghChart.src = "https://ghchart.rshah.org/ff0000/karlchastin";
}

let isGlobalEntrance = true; 
window.isAppAnimating = () => isTabsAnimating;

function refreshDynamicCard(cardId, targetTab, isActiveGetter) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const activeTab = document.querySelector('.tab.active')?.getAttribute('data-tab');
    if (activeTab !== targetTab) return;

    const show = !!isActiveGetter();
    const isVisible = window.getComputedStyle(card).display !== 'none' && !card.classList.contains('hide-card');
    if (show === isVisible) return; 

    if (show) {
        card.style.transition = 'none';
        card.style.display = 'block';
        card.classList.add('hide-card');
        card.style.height = '0px';
        
        card.style.height = 'auto';
        card.classList.remove('hide-card');
        card.style.overflow = 'visible';
        const targetHeight = card.offsetHeight;
        
        card.classList.add('hide-card');
        card.style.height = '0px';
        card.style.overflow = 'clip';
        card.style.overflowClipMargin = '150px';
        void card.offsetHeight; 
        
        card.style.transition = ''; 
        card.classList.remove('hide-card');
        card.style.height = targetHeight + 'px';
        
        setTimeout(() => {
            if (isActiveGetter()) {
                card.style.height = 'auto';
                card.style.overflow = 'visible';
                card.style.overflowClipMargin = '';
            }
        }, 450);
    } else {
        const currentHeight = card.offsetHeight;
        card.style.height = currentHeight + 'px';
        card.style.overflow = 'clip';
        card.style.overflowClipMargin = '150px';
        card.style.transition = 'none';
        
        void card.offsetHeight; 
        
        card.style.transition = '';
        card.classList.add('hide-card');
        card.style.height = '0px';
        
        setTimeout(() => {
            if (!isActiveGetter()) {
                card.style.display = 'none';
                card.classList.remove('hide-card');
            }
        }, 450);
    }
}

window.refreshDiscordCard = () => refreshDynamicCard('card-2-container', 'home', () => window.currentDiscordActivities);

let _discordActive = window.currentDiscordActivities ?? true;
Object.defineProperty(window, 'currentDiscordActivities', {
    get: () => _discordActive,
    set: (val) => {
        if (_discordActive !== val) {
            _discordActive = val;
            setTimeout(window.refreshDiscordCard, 10); 
        }
    }
});

function attachGlobalHeightObservers() {
    document.querySelectorAll('.transition-container').forEach(container => {
        const card = container.closest('.card');
        if (!card) return;

        let isAnimatingHeight = false;
        let animTimeout;
        let debounceTimer;

        const checkAndAnimate = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (isGlobalEntrance || isTabsAnimating || card.classList.contains('hide-card') || window.getComputedStyle(card).display === 'none' || isAnimatingHeight) return;
                
                const oldHeight = card.offsetHeight;
                if (oldHeight === 0) return;
                
                const originalTransition = card.style.transition;
                
                card.style.transition = 'none';
                card.style.height = 'auto';
                const newHeight = card.offsetHeight;
                
                if (Math.abs(oldHeight - newHeight) > 2) {
                    isAnimatingHeight = true;
                    card.style.height = oldHeight + 'px';
                    void card.offsetHeight; 
                    
                    if (originalTransition && originalTransition !== 'none') {
                        card.style.transition = originalTransition.includes('height') 
                            ? originalTransition 
                            : originalTransition + ', height 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                    } else {
                        card.style.transition = ''; 
                    }
                    
                    card.style.height = newHeight + 'px';
                    
                    clearTimeout(animTimeout);
                    animTimeout = setTimeout(() => {
                        isAnimatingHeight = false;
                        if (card.style.height === newHeight + 'px') card.style.height = 'auto';
                    }, 400);
                } else {
                    card.style.height = oldHeight + 'px';
                    void card.offsetHeight;
                    card.style.transition = originalTransition;
                    card.style.height = 'auto';
                }
            }, 10);
        };

        const resizeObserver = new ResizeObserver(checkAndAnimate);
        resizeObserver.observe(container);
        
        const mutationObserver = new MutationObserver(checkAndAnimate);
        mutationObserver.observe(container, { childList: true, subtree: true, characterData: true });
    });
}

try {
    injectIcons(); 
    preloadAssets();
    renderAllComponents(); 
    setupTabs();
    setupUIEvents();
    attachGlobalHeightObservers();
} catch (e) {
    console.error("UI Initialization Error:", e);
}

const enterBtn = document.getElementById('enter-btn');
const enterOverlay = document.getElementById('enter-overlay');
const mainContent = document.getElementById('content');
const bgAudio = document.getElementById('bg-audio');

let audioCtx, sourceNode, biquadFilter;

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        
        if (bgAudio && !audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            sourceNode = audioCtx.createMediaElementSource(bgAudio);
            biquadFilter = audioCtx.createBiquadFilter();

            biquadFilter.type = "lowpass";
            biquadFilter.frequency.value = 300; 

            sourceNode.connect(biquadFilter);
            biquadFilter.connect(audioCtx.destination);
        }
        
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        enterBtn.style.opacity = '0';

        setTimeout(() => {
            if (bgAudio) { 
                bgAudio.volume = 0.45; 
                bgAudio.currentTime = 13.035;
                bgAudio.play().catch(() => {}); 
                
                if (audioCtx && biquadFilter) {
                    biquadFilter.frequency.setValueAtTime(300, audioCtx.currentTime);
                    biquadFilter.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 6.35);
                }
            }
            const sfxAudio = document.getElementById('sfx-audio');
            if (sfxAudio) { 
                sfxAudio.volume = 0.6; 
                sfxAudio.play().catch(() => {}); 
            }

            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100vw';
            flash.style.height = '100vh';
            flash.style.backgroundColor = '#fff';
            flash.style.zIndex = '99999';
            flash.style.pointerEvents = 'none';
            document.body.appendChild(flash);
            
            flash.animate([
                { opacity: 1, offset: 0 },
                { opacity: 0, offset: 1 }
            ], { duration: 800, easing: 'ease-out' }).onfinish = () => flash.remove();

            if (enterOverlay) {
                enterOverlay.style.pointerEvents = 'none'; 
                enterOverlay.style.transition = 'opacity 6s ease-in-out'; 
                void enterOverlay.offsetWidth;
                enterOverlay.style.opacity = '0';
            }
        }, 150);
        
        setTimeout(() => { 
            if (audioCtx && biquadFilter) {
                biquadFilter.frequency.cancelScheduledValues(audioCtx.currentTime);
                biquadFilter.frequency.setValueAtTime(1800, audioCtx.currentTime);
                biquadFilter.frequency.exponentialRampToValueAtTime(22050, audioCtx.currentTime + 0.5);
            }

            if (enterOverlay) enterOverlay.style.display = 'none';
            
            if (mainContent) {
                mainContent.classList.remove('hidden');
                
                const animTargets = [
                    ...document.querySelectorAll('.glass-panel'), 
                    ...document.querySelectorAll('.tab'), 
                    ...document.querySelectorAll('.card')
                ];
                
                animTargets.forEach(el => {
                    if(el) {
                        el.style.opacity = '0';
                        el.style.transform = 'scale(0.96) translateY(20px)'; 
                        el.style.transition = 'none';
                    }
                });
                
                void mainContent.offsetWidth; 
                
                animTargets.forEach(el => {
                    if(el) {
                        el.style.transition = `opacity 0.4s ease, transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), height 0.65s cubic-bezier(0.25, 1, 0.5, 1)`;
                        el.style.opacity = '1';
                        el.style.transform = 'scale(1) translateY(0)';
                    }
                });

                setTimeout(() => {
                    animTargets.forEach(el => {
                        if (el) {
                            el.style.transition = ''; 
                            el.style.transform = '';
                            
                            if (!el.classList.contains('glass-panel') || el.id === 'glass-active') {
                                el.style.opacity = ''; 
                            }
                        }
                    });
                    isGlobalEntrance = false; 
                }, 800);
            } else {
                isGlobalEntrance = false;
            }
            syncBackgrounds(0); 
        }, 6500); 
    });
} else {
    isGlobalEntrance = false;
}

try {
    prefetchGitHubProfile();
    updateGitHubData();
    connectLanyard(); 

    swapData('home'); 
    
    const activeLayout = profiles['home'].layout;
    const targetCards = activeLayout.showCards || [];
    document.querySelectorAll('.card').forEach(card => {
        if (card.id === 'main-profile-card' || targetCards.includes(card.id)) {
            card.style.display = 'block';
            card.classList.remove('hide-card');
        } else {
            card.style.display = 'none';
            card.classList.add('hide-card');
        }
    });
} catch (e) {
    console.error("Service Initialization Error:", e);
}

setInterval(() => {
    if (document.hidden) return;
    const timeEl = document.getElementById('live-time-text');
    const locTime = document.getElementById('loc-time');
    if (timeEl && locTime && window.getComputedStyle(locTime).display !== 'none') {
        const gmt8 = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000 * 8));
        timeEl.textContent = `${gmt8.toLocaleTimeString('en-US', { hour12: true })} (GMT+8:00)`;
    }
}, 1000);

setInterval(() => {
    if (document.hidden) return;
    const activeTabNode = document.querySelector('.tab.active');
    const activeTab = activeTabNode ? activeTabNode.getAttribute('data-tab') : 'home';
    const activeLayout = profiles[activeTab]?.layout || profiles.home.layout;
    
    if (activeLayout.showGithubStats) updateGitHubData();
}, 60000);

const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox && lightboxImg) {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cert-preview-btn')) {
            lightboxImg.src = e.target.src;
            lightbox.style.display = 'flex';
            requestAnimationFrame(() => lightbox.classList.add('show'));
        }
        
        if (e.target === lightbox || e.target === lightboxClose) {
            lightbox.classList.remove('show');
            setTimeout(() => lightbox.style.display = 'none', 300);
        }
    });
}

window.addEventListener('load', () => {
    const loadingState = document.getElementById('loading-state');
    const enterPrompt = document.getElementById('enter-prompt');
    
    if (loadingState) {
        loadingState.style.display = 'none';
    }
    if (enterPrompt) {
        enterPrompt.style.display = 'block';
    }
}); 

const mainAvatar = document.getElementById('avatar-img');
if (mainAvatar) {
    mainAvatar.style.cursor = 'pointer';
    mainAvatar.addEventListener('click', () => {
        Swal.fire({
            title: 'Welcome to my Domain',
            text: 'Thank you for checking out my portfolio!',
            imageUrl: mainAvatar.src,
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Profile Avatar',
            background: 'rgba(17, 17, 17, 0.9)',
            color: '#fff',
            confirmButtonColor: '#ff0000',
            backdrop: `rgba(0,0,0,0.6)`
        });
    });
}