import { $, $$ } from '../utils/dom.js';
import { formatTime } from '../utils/core.js';
import { FATAL_LYRICS } from '../config.js';
import { startSyncing, stopSyncing, syncBackgrounds } from './animations.js';
import { isAnimating, currentIndex } from './tabs.js';

export function setupUIEvents() {
    
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            const gl = $('glass-left'), ga = $('glass-active'), gr = $('glass-right');
            
            if (gl) gl.style.transition = 'none';
            if (ga) ga.style.transition = 'none';
            if (gr) gr.style.transition = 'none';
            
            requestAnimationFrame(() => {
                syncBackgrounds(currentIndex);
                
                if (gl) gl.style.transition = '';
                if (ga) ga.style.transition = '';
                if (gr) gr.style.transition = '';
                
                if (isAnimating) startSyncing(() => currentIndex);
            });
        } else {
            stopSyncing();
        }
    });

    const locHome = $('loc-home'), locationText = $('location-text');
    if(locHome && locationText) {
        locHome.addEventListener('mouseenter', () => { locationText.textContent = "Bacoor, Cavite, Philippines"; locationText.style.color = "#ffffff"; locationText.classList.remove('always-glitch'); });
        locHome.addEventListener('mouseleave', () => { locationText.textContent = "END OF TIME?"; locationText.style.color = ""; locationText.classList.add('always-glitch'); locationText.setAttribute('data-glitch', "END OF TIME?"); });
    }

    const tooltipEl = $('custom-tooltip');
    if(tooltipEl) {
        document.addEventListener('mousemove', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                tooltipEl.innerHTML = target.getAttribute('data-tooltip'); 
                tooltipEl.classList.add('show');
                
                tooltipEl.style.left = '0px';
                tooltipEl.style.top = '0px';
                
                let x = e.clientX + 15;
                let y = e.clientY + 15;
                
                const tooltipRect = tooltipEl.getBoundingClientRect();
                
                if (x + tooltipRect.width > window.innerWidth - 10) x = e.clientX - tooltipRect.width - 15;
                if (y + tooltipRect.height > window.innerHeight - 10) y = e.clientY - tooltipRect.height - 15;
                
                tooltipEl.style.left = `${x}px`;
                tooltipEl.style.top = `${y}px`;
            } else {
                tooltipEl.classList.remove('show');
            }
        });
    }

    const bgAudio = $('bg-audio'), durationEl = $('duration'), currentTimeEl = $('current-time'), progressFill = document.querySelector('.progress-fill');
    if(bgAudio) {
        const updateDuration = () => { 
            if(durationEl && !isNaN(bgAudio.duration)) durationEl.textContent = formatTime(bgAudio.duration); 
        };
        
        if (bgAudio.readyState >= 1) {
            updateDuration();
        }
        
        bgAudio.addEventListener('loadedmetadata', updateDuration);
        
        let audioFrame;

        bgAudio.addEventListener('timeupdate', () => {
            cancelAnimationFrame(audioFrame);
            audioFrame = requestAnimationFrame(() => {
                if(currentTimeEl) currentTimeEl.textContent = formatTime(bgAudio.currentTime);
                if (progressFill && bgAudio.duration > 0) progressFill.style.width = `${(bgAudio.currentTime / bgAudio.duration) * 100}%`;

                // Restore Lyric Syncing Logic
                const activeTab = document.querySelector('.tab.active')?.getAttribute('data-tab');
                if (activeTab === 'home') {
                    const currentLyric = FATAL_LYRICS.filter(l => l.time <= bgAudio.currentTime).pop();
                    if (currentLyric) {
                        const bioEl = $('profile-bio');
                        
                        if (bioEl && bioEl.dataset.targetLyric !== currentLyric.text) {
                            bioEl.dataset.targetLyric = currentLyric.text; 
                            
                            bioEl.style.opacity = '0';
                            
                            setTimeout(() => {
                                bioEl.textContent = currentLyric.text;
                                bioEl.style.opacity = '1';
                            }, 100); 
                        }
                    }
                }
            });
        });
    }
}