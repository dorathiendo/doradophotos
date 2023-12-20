import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {ALBUM_IDS, constructImageUrl, getPhotosFromAlbum} from "./flickrApi.js";
import './style.css';
import './base.css';


window.addEventListener('load', () => {
    getPhotos(ALBUM_IDS['landscapes']);
});

const navItems = document.querySelectorAll('.nav-list li');
[...navItems].forEach(item => {
    item.addEventListener('click', () => {
        const id = item.id;
        document.querySelector('.image-container').innerHTML = '';

        if (id === 'about') {
            document.querySelector('.about').classList.remove('hidden');
        } else {
            document.querySelector('.about').classList.add('hidden');
            getPhotos(ALBUM_IDS[id]);
        }
    });
});

function getPhotos(albumId) {
    getPhotosFromAlbum(albumId).then(response => {
        response.forEach(photo => {
            const img = document.createElement('img');
            img.classList.add('fade-in');
            img.src = constructImageUrl(photo);
            img.alt = photo.title;
            // img.style.transform = `translateY(-${Math.random() * 50}%)`;
            const wrapper = document.createElement('div');
            wrapper.classList.add('image-wrapper');
            wrapper.appendChild(img);

            document.querySelector('.image-container').appendChild(wrapper);

            gsap.registerPlugin(ScrollTrigger);

            gsap.utils.toArray('.fade-in').forEach(image => {
                gsap.to(image, {
                    opacity: 1,
                    // y: 0, // Optional: animate position from translateY(50px) to translateY(0)
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: image,
                        start: 'top 80%', // Start animation when the top of the image reaches 80% of the viewport
                        toggleActions: 'play none none none'
                    }
                });
            });

        });
    });
}

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))
