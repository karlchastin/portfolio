import { $ } from '../utils/dom.js';
import { techStack, certifications, experience } from '../config.js';

const renderList = (id, data, mapper) => {
    const el = $(id);
    if (el) el.innerHTML = data.map(mapper).join('');
};

const createGenericCard = (item) => `
    <div class="repo-card">
        <div class="repo-banner" style="background: ${item.banner}"></div>
        <div class="repo-content">
            <div class="repo-name">${item.name}</div>
            ${item.idName ? `<div class="repo-id">${item.idName}</div>` : ''}
            <div class="repo-desc">${item.desc}</div>
            ${item.private || !item.url 
                ? `<div class="repo-btn btn-private">${item.btnText || 'Private Repository'}</div>` 
                : `<a href="${item.url}" target="_blank" class="repo-btn btn-view">${item.btnText || 'View Repository'}</a>`}
        </div>
    </div>`;

export function renderAllComponents() {
    const techList = $('tech-stack-list');
    if (techList) {
        techList.innerHTML = techStack.map(tech => `
            <div class="achievement-badge" data-tooltip="${tech.name}">
                <img src="${tech.icon}" alt="${tech.name}">
            </div>
        `).join('');
    }

    renderList('certifications-list', certifications, createGenericCard);
    renderList('experience-list', experience, createGenericCard);
}