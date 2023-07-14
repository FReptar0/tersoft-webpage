const customgptDefaultCSS=".cgptcb-body {\n    z-index: 2147483000;\n    position: fixed;\n}\n.cgptcb-body .cgptcb-chat-circle,\n.cgptcb-body .cgptcb-chat-box-toggle {\n    position: fixed;\n    bottom: 1rem;\n    right: 1rem;\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    line-height: 4rem;\n    cursor: pointer;\n    color: rgb(255, 255, 255);\n    background-color: #0099dd;\n    box-shadow: 0 0.25rem 0.5rem rgb(50 50 50 / 0.3), 0 1px 3px rgb(0 0 0 / 0.05);\n    text-align: center;\n    transition: all .2s ease-in-out;\n}\n\n/*Increase the size on Hover*/\n.cgptcb-body .cgptcb-chat-circle:hover,\n.cgptcb-body .cgptcb-chat-circle:active,\n.cgptcb-body .cgptcb-chat-box-toggle:hover,\n.cgptcb-body .cgptcb-chat-box-toggle:active {\n    transform: scale(1.1);\n}\n\n/* Center the icons inside the buttons */\n.cgptcb-body .cgptcb-chat-circle img,\n.cgptcb-body .cgptcb-chat-circle svg {\n    width: 45px !important;\n    height: 45px !important;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n    border-radius: 50%;\n}\n\n.cgptcb-body .cgptcb-chat-box-toggle img,\n.cgptcb-body .cgptcb-chat-box-toggle svg {\n    width: 18px !important;\n    height: 18px !important;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n}\n\n.cgptcb-body .cgptcb-chat-box-toggle {\n    display: none;\n}\n\n.cgptcb-body .cgptcb-launcher-icon-bg {\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n    background-color: #ff00ff;\n    width: 1px;\n    height: 1px;\n    border-radius: 50%;\n    box-shadow: 0 0 1px 0px #ffffff, 0 0 1px 1px #ff00ff, 0 0 1px 1px #00ffff;\n    z-index: -999;\n    animation-name: glow-animation;\n    animation-duration: 7s;\n    animation-timing-function: ease-out;\n    animation-iteration-count: infinite;\n}\n\n.pulse {\n    animation: pulse-animation 1.5s infinite;\n}\n\n.squiggle {\n    stroke-dasharray: 150;\n    stroke-dashoffset: 150;\n    animation: draw-path 2s ease-in-out infinite;\n}\n\n@keyframes glow-animation {\n    0% {\n        opacity: 0;\n        box-shadow: 0 0 1px 0px #ffffff, 0 0 1px 1px #ff00ff, 0 0 1px 1px #00ffff;\n    }\n\n    10% {\n        opacity: 0.5;\n        box-shadow: 0 0 5px 0px #ffffff, 0 0 5px 5px #ff00ff, 0 0 5px 5px #00ffff;\n    }\n\n    20% {\n        opacity: 1;\n        box-shadow: 0 0 10px 0px #ffffff, 0 0 10px 10px #ff00ff, 0 0 10px 10px #00ffff;\n    }\n\n    30% {\n        box-shadow: 0 0 15px 0px #ffffff, 0 0 15px 15px #ff00ff, 0 0 15px 15px #00ffff;\n    }\n\n    40% {\n        box-shadow: 0 0 15px 0px #ffffff, 0 0 15px 15px #ff00ff, 0 0 15px 15px #00ffff;\n    }\n\n    50% {\n        box-shadow: 0 0 15px 0px #ffffff, 0 0 15px 15px #ff00ff, 0 0 15px 15px #00ffff;\n    }\n\n    60% {\n        box-shadow: 0 0 15px 0px #ffffff, 0 0 15px 15px #ff00ff, 0 0 15px 15px #00ffff;\n    }\n\n    70% {\n        box-shadow: 0 0 15px 0px #ffffff, 0 0 15px 15px #ff00ff, 0 0 15px 15px #00ffff;\n    }\n\n    80% {\n        box-shadow: 0 0 10px 0px #ffffff, 0 0 10px 10px #ff00ff, 0 0 10px 10px #00ffff;\n    }\n\n    90% {\n        box-shadow: 0 0 5px 0px #ffffff, 0 0 5px 5px #ff00ff, 0 0 5px 5px #00ffff;\n    }\n\n    100% {\n        opacity: 0.5;\n        box-shadow: 0 0 1px 0px #ffffff, 0 0 1px 1px #ff00ff, 0 0 1px 1px #00ffff;\n    }\n}\n\n@keyframes pulse-animation {\n    0% {\n        box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);\n    }\n\n    25% {\n        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n    }\n\n    50% {\n        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);\n    }\n\n    100% {\n        box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);\n    }\n}\n\n@keyframes draw-path {\n    to {\n        stroke-dashoffset: 0;\n    }\n}\n\n.cgptcb-body .cgptcb-chat-box-container {\n    border: none;\n    outline: none;\n    overflow: hidden;\n    height: 0;\n    width: 0;\n    padding: 0;\n    margin: 0;\n    position: absolute;\n    right: 1rem;\n    bottom: 84px;\n    background: none;\n    border-radius: 1.25rem;\n    transition: all 0.1s ease-in-out;\n}\n\n:root {\n    --cgpt-chat-box-container-height: 704px;\n    --cgpt-chat-box-header-height: 52px;\n}\n\n.cgptcb-chat-box-iframe {\n    /* 1px is the bottom border for the header */\n    height: calc(100% - var(--cgpt-chat-box-header-height) - 1px) !important;\n}\n\n.cgptcb-body .cgptcb-chat-box-container.open {\n    height: min(var(--cgpt-chat-box-container-height), calc(100% - 104px));\n    z-index: 2147483000;\n    position: fixed;\n    min-height: 80px;\n    max-height: var(--cgpt-chat-box-container-height);\n    width: 400px !important;\n    box-shadow: 0 0.25rem 0.5rem rgb(50 50 50 / 0.3), 0 1px 3px rgb(0 0 0 / 0.05);\n}\n\n/* responsive css */\n@media only screen and (max-width: 600px) {\n    .cgptcb-chat-circle,\n    .cgptcb-chat-box-toggle {\n        right: 1rem;\n        bottom: 1rem;\n    }\n\n    .cgptcb-body .cgptcb-chat-box-container.open {\n        height: 80% !important;\n        width: 90% !important;\n        box-shadow: 0 0.25rem 0.5rem rgb(50 50 50 / 0.3), 0 1px 3px rgb(0 0 0 / 0.05);\n    }\n}\n\n.cgptcb-chat-box-header {\n    background-color: #fff;\n    border-bottom: 1px solid #e6e6e6;\n    height: var(--cgpt-chat-box-header-height);\n    padding-inline: 1rem;\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 1rem;\n}\n\n.cgptcb-chat-box-action {\n    cursor: pointer;\n    border-radius: 50%;\n    outline: none;\n    border: 0;\n    background-color: #eee !important;\n    padding: 0.5rem 0.7rem;\n    color: #000 !important;\n    line-height: 1 !important;\n}";function getDeviceId(){var n=navigator.userAgent,t=navigator.platform;return btoa(n+t)}function generateSessionId(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){const t=16*Math.random()|0;return("x"===n?t:3&t|8).toString(16)}))}function setSessionCookie(n){var t,e="customgpt-session-"+n,o=getCookie(e);o?((t=new Date).setTime(t.getTime()+6048e5),document.cookie=e+"="+o+"; expires="+t.toGMTString()+"; path=/"):(o=generateSessionId(),(t=new Date).setTime(t.getTime()+6048e5),document.cookie=e+"="+o+"; expires="+t.toGMTString()+"; path=/");return o}function getCookie(n){var t=null;if(document.cookie&&""!=document.cookie)for(var e=document.cookie.split(";"),o=0;o<e.length;o++){var c=e[o].trim();if(c.substring(0,n.length+1)==n+"="){t=decodeURIComponent(c.substring(n.length+1));break}}return t}function checkCookie(n){for(var t=document.cookie.split(";"),e=0;e<t.length;e++){if(t[e].trim().startsWith(n+"="))return!0}return!1}function refreshSessionId(n){var t="customgpt-session-"+n;return getCookie(t)&&(document.cookie=t+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"),setSessionCookie(n)}const CustomGPT={init:async function(n){let t=CustomGPT.getInstance();if(t)return t;if(!n.p_id||!n.p_key)return void console.error("CustomGPT: Project Information is missing");let e=n.customGPTDomain||"app.customgpt.ai",o=(n.pulse,n.affid||""),c=n.prompt||"",i=Number(n.auto_popup)||0,a=Number(n.reset_conversation)||0,r=n.launcherColor||"#0099dd",p=n.highlighterColor||"#ff00ff",s=n.customcss?n.customcss:customgptDefaultCSS;if(s){const n=document.createElement("style");n.innerHTML=s,document.head.appendChild(n)}let f=null;f=a?refreshSessionId(n.p_id):setSessionCookie(n.p_id);let d=`https://${e}/projects/${n.p_id}/ask-me-anything/${f}?embed=1&shareable_slug=${n.p_key}`;o&&(d+=`&affid=${o}`),c&&(d+=`&prompt=${c}`);let g=`https://${e}/api/projects/${n.p_id}/chatbot_avatar?shareable_slug=${n.p_key}`;fetch(g).then((n=>n.json())).then((n=>{if("success"===n.status){const t=document.getElementById("cgptcb-chat-circle");t.childNodes.forEach((n=>n.remove()));const e=document.createElement("img");e.setAttribute("class","cgptcb-chat-icon"),e.setAttribute("id","chatBubbleImageId"),e.setAttribute("src",n.data),t.innerHTML=e.outerHTML,t.style.backgroundColor="transparent"}}));const h=document.createElement("div");h.setAttribute("id","cgptcb-body"),h.setAttribute("class","cgptcb-body"),h.innerHTML=`<div class="cgptcb-chat-circle"\n                id="cgptcb-chat-circle"\n                style="background-color: ${r} !important;">\n               <span class="cgptcb-launcher-icon-bg"\n                 style="background-color: ${p} !important;">\n               </span>\n               <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M15.6467 0C11.5314 0.0912877 7.60398 1.76582 4.68687 4.68293C1.68592 7.68388 0 11.754 0 15.998C0.000111318 16.0994 0.00118356 16.2007 0.00321168 16.3019H3.95992C4.25596 15.6478 4.92138 15.2119 5.66147 15.2119C6.69693 15.2119 7.51036 16.0112 7.51036 17.0285C7.51036 18.0457 6.62292 18.9177 5.58746 18.9177C4.84737 18.9177 4.18195 18.4818 3.88592 17.8277H0.106798C0.520987 21.3964 2.12657 24.7425 4.69201 27.308C7.59062 30.2066 11.4858 31.8798 15.5727 31.9938V22.0424H11.7262V24.295C12.3923 24.5857 12.8357 25.2396 12.8357 25.9662C12.8357 26.9837 12.0222 27.7828 10.9868 27.7828C9.95133 27.7828 9.13789 26.9837 9.13789 25.9662C9.13789 25.2396 9.58128 24.5857 10.2474 24.295V20.5891H15.6467V14.1219H11.3568V11.1426H9.58128C9.41326 11.5139 9.12589 11.8151 8.77318 12.006C8.50515 12.1512 8.19978 12.2325 7.88041 12.2325C6.84495 12.2325 6.03085 11.4333 6.03085 10.416C6.03085 9.39868 6.84495 8.59925 7.88041 8.59925C8.19511 8.59925 8.49582 8.67809 8.76052 8.81894C8.99254 8.94246 9.19724 9.11365 9.35859 9.32117C9.4466 9.43369 9.52128 9.55704 9.58128 9.68922H12.8357V12.6686H15.6467V0Z" fill="white"/>\n<path d="M17.1255 32V27.7828H21.4154V24.3677H23.339C23.5063 24.7384 23.793 25.0391 24.1444 25.23C24.2758 25.3013 24.4164 25.3573 24.5631 25.396C24.7165 25.4363 24.8765 25.4577 25.0399 25.4577C26.0753 25.4577 26.8894 24.6584 26.8894 23.6409C26.8894 22.6236 26.0753 21.8244 25.0399 21.8244C24.3004 21.8244 23.6343 22.2604 23.339 22.9143H19.9366V26.3296H17.1255V8.88995H20.824C21.12 9.54387 21.7854 9.97992 22.5249 9.97992C23.561 9.97992 24.3744 9.18066 24.3744 8.16336C24.3744 7.14591 23.561 6.34664 22.5249 6.34664C21.7854 6.34664 21.12 6.78269 20.824 7.43661H17.1255V0.0355226C20.9589 0.305197 24.5821 1.94792 27.3171 4.68293C30.318 7.68388 32.0039 11.754 32.0039 15.998V17.6099H26.0013V15.4298C26.6674 15.1392 27.1108 14.4851 27.1108 13.7586C27.1108 12.7413 26.2973 11.9418 25.2619 11.9418C24.2264 11.9418 23.413 12.7413 23.413 13.7586C23.413 14.4851 23.8564 15.1392 24.5225 15.4298V19.063H32.0039V29.4925C32.0031 30.1573 31.7386 30.7946 31.2686 31.2646C30.7985 31.7347 30.1612 31.9992 29.4964 32H17.1255Z" fill="white"/>\n</svg>\n\n            </div>\n            <div class="cgptcb-chat-box-toggle"\n                id="cgptcb-chat-box-toggle"\n                style="display:none; background-color: ${r} !important;">\n              <svg width="32" height="32" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M15.8052 17.6234C16.3073 18.1255 17.1213 18.1255 17.6234 17.6234C18.1256 17.1213 18.1256 16.3073 17.6234 15.8051L10.8183 8.99999L17.6234 2.19486C18.1255 1.69276 18.1255 0.87869 17.6234 0.376588C17.1213 -0.125513 16.3072 -0.125513 15.8051 0.376588L9.00001 7.18171L2.19488 0.376577C1.69278 -0.125525 0.878709 -0.125526 0.376608 0.376575C-0.125494 0.878679 -0.125494 1.69275 0.376608 2.19485L7.18174 8.99998L0.376576 15.8051C-0.125525 16.3073 -0.125525 17.1213 0.376576 17.6234C0.878678 18.1255 1.69275 18.1255 2.19485 17.6234L9.00001 10.8183L15.8052 17.6234Z" fill="white"/>\n</svg>\n\n            </div>\n            <div class="cgptcb-chat-box-container" id="cgptcb-chat-box-container">\n                <div class="cgptcb-chat-box-header">\n                    <button id="cgptcb-chat-box-clear" class="cgptcb-chat-box-action" title="Reset conversation">\n                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\n                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\n                            <path d="M4 7l16 0"></path>\n                            <path d="M10 11l0 6"></path>\n                            <path d="M14 11l0 6"></path>\n                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>\n                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>\n                        </svg>\n                    </button>\n                    <button id="cgptcb-chat-box-close" class="cgptcb-chat-box-action" title="Close chat">\n                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\n                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\n                            <path d="M18 6l-12 12"></path>\n                            <path d="M6 6l12 12"></path>\n                        </svg>\n                    </button>\n                </div>\n                <iframe class="cgptcb-chat-box-iframe" id="cgptcb-chat-box-iframe" style="width:100%;height:100%;border:none;" src="${d}"></iframe>\n            </div>\n            `;let b=this;return document.body.appendChild(h),document.getElementById("cgptcb-chat-box-iframe").onload=function(){i&&b.show()},document.getElementById("cgptcb-chat-circle").addEventListener("click",(()=>{b.show()})),document.getElementById("cgptcb-chat-box-toggle").addEventListener("click",(()=>{b.hide()})),document.getElementById("cgptcb-chat-box-close").addEventListener("click",(()=>{b.hide()})),document.getElementById("cgptcb-chat-box-clear").addEventListener("click",(()=>{const t=document.getElementById("cgptcb-chat-box-iframe");f=refreshSessionId(n.p_id),c=null,d=`https://${e}/projects/${n.p_id}/ask-me-anything/${f}?embed=1&shareable_slug=${n.p_key}`,o&&(d+=`&affid=${o}`),t.src=d})),h},getInstance:function(){return document.getElementById("cgptcb-body")},show:function(){document.getElementById("cgptcb-chat-box-container").classList.add("open"),document.getElementById("cgptcb-chat-circle").style.display="none",document.getElementById("cgptcb-chat-box-toggle").style.display="block"},hide:function(){document.getElementById("cgptcb-chat-box-container").classList.remove("open"),document.getElementById("cgptcb-chat-circle").style.display="block",document.getElementById("cgptcb-chat-box-toggle").style.display="none"},destroy:function(){document.getElementById("cgptcb-body").remove()}};