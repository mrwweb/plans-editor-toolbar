// ==UserScript==
// @name     	Self Love for Grinnell Plans
// @description	Highlight all references to your own username. Requires you have QuickLove or PlansPlus already installed
// @version  	1.1.1
// @match		https://grinnellplans.com/*
// @match		https://www.grinnellplans.com/*
// @author		[rootwile] aka Mark Root-Wiley
// @source      https://github.com/mrwweb/plans-editor-toolbar/tree/main/self-love
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grinnellplans.com
// @grant    	none
// ==/UserScript==

function selfLove() {

    const colorOptions = {
        auto: false,
        light: 'rgba(255, 255, 255, 0.35)',
        dark: 'rgba(0, 0, 0, 0.15)',
        tomato: 'rgba(255, 99, 71, 0.4)',
        'peach puff': 'rgba(255, 218, 185, 0.7)',
        'lemon chiffon': 'rgba(255, 250, 205, 0.8)',
        lime: 'rgba(0, 255, 0, 0.25)',
    };

    function getUsername() {
        return (
            localStorage.getItem('username') ?? localStorage.getItem('plansPlusUser')
        );
    }

    function highlightMe() {
        const username = getUsername();
        const planText = document.querySelector('.plan_text');

        if (username && planText) {
            const search = new RegExp(
                `(\\[<a href="read\\.php\\?searchname=${username}" class="planlove">${username}<\\/a>\\])`,
                'gi'
            );
            let markMark = planText.innerHTML.replace(
                search,
                '<mark>$1</mark>'
            );
            planText.innerHTML = markMark;
        }
    }

    function setMarkOption(e) {
        if (e.target.tagName === 'INPUT') {
            localStorage.setItem('selfLoveMarkStyle', e.target.value);
            setMarkStyle();
        }
    }

    function setMarkStyle() {
        let markOption = localStorage.getItem('selfLoveMarkStyle');

        if (markOption && Object.keys(colorOptions).includes(markOption)) {
            const markColor = colorOptions[markOption];
            document.getElementById('mark-style')?.remove();
            let styles = `<style id="mark-style">mark {background: ${markColor} !important; box-shadow: 0 3px 0 1px ${markColor} !important} </style>`;
            document.head.insertAdjacentHTML('beforeend', styles);
        } else {
            document.getElementById('mark-style')?.remove();
        }
    }

    function insertPreferences() {
        const preferences = document.getElementById('preflist');

        if (preferences) {
            const username = getUsername();
            const styleOption =
                localStorage.getItem('selfLoveMarkStyle') ?? 'auto';

            let preferencesHTML = `<li><h2 class="heading2">Self Love Style Color</h2></li>
                <li><fieldset style="padding: 0; border: 0;"><legend>Highlight your own username like this: <mark>[${username}]</mark></legend>`;
            for (const option in colorOptions) {
                preferencesHTML += makeOption(option, option === styleOption);
            }
            preferencesHTML += `</fieldset></li>`;

            preferences.insertAdjacentHTML('beforeend', preferencesHTML);
            preferences.addEventListener('change', setMarkOption);
        }
    }

    function makeOption(value, checked = false) {
        return `<br><input type="radio" id="self_love_${value}" name="markStyle" value="${value}" ${
            checked ? 'checked' : ''
        }> <label for="self_love_${value}" style="text-transform: capitalize">${value}</label>`;
    }

    function init() {
        highlightMe();
        insertPreferences();
        setMarkStyle();
    }

    // TamperMonkey doesn't work with DOMContentLoaded, so this tries to fire in two ways
    document.addEventListener( 'DOMContentLoaded', init );
    if( document.readyState !== 'loading' ) {
        init();
    }
}

selfLove();
