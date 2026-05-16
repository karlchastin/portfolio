import { $ } from '../utils/dom.js';
import { featuredRepos, knownLanguages, certificationsData } from '../config.js';

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

const createLanguageCard = (item) => `
    <div class="repo-card" style="background: rgba(0,0,0,0.2); border-radius: 16px; display: flex; flex-direction: row; align-items: center; padding: 16px; gap: 16px; box-shadow: none;">
        <div style="width: 56px; height: 56px; flex-shrink: 0; background: transparent; display: flex; justify-content: center; align-items: center;">
            <img src="${item.icon}" style="width: 100%; height: 100%; object-fit: contain;" alt="${item.name}">
        </div>
        <div class="repo-content" style="padding: 0; border: none; flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <div class="repo-name" style="margin-bottom: 4px;">${item.name}</div>
            <div class="repo-desc" style="margin: 0;">${item.desc}</div>
        </div>
    </div>`;

const createCertCard = (item) => `
    <div class="repo-card">
        <img src="${item.image}" class="cert-preview-btn" style="width: 100%; height: auto; object-fit: contain; background: rgba(0,0,0,0.5); cursor: zoom-in; border-radius: 12px 12px 0 0;" alt="${item.name}">
        <div class="repo-content">
            <div class="repo-name">${item.name}</div>
            <div class="repo-desc">${item.desc}</div>
            <a href="${item.url}" target="_blank" class="repo-btn btn-view">${item.btnText}</a>
        </div>
    </div>`;

export function renderAllComponents() {
    renderList('featured-repo-list', featuredRepos, createGenericCard);
    renderList('programming-languages-list', knownLanguages, createLanguageCard);
    renderList('certifications-list', certificationsData, createCertCard);
}