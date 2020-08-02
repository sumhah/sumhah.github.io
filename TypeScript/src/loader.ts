// const BASE_URL = 'https://sumhah.github.io/TypeScript';
const BASE_URL = './src';

interface loadImageResource {
    sourceList: string[]
}

export const imageResourceMap: { [key: string]: HTMLImageElement } = {}

export function loadImageResource({sourceList}: loadImageResource) {
    return new Promise((resolve) => {
        let loadedNum = 0
        for (const src of sourceList) {
            const source = new Image();
            source.src = `${BASE_URL}/images/${src}`;
            imageResourceMap[src] = source;
            source.addEventListener('load', () => {
                loadedNum++;
                if (loadedNum >= sourceList.length) {
                    resolve();
                }
            });
        }
    });
}

interface ImageResourceOption {
    src: string
    volume: number
}

interface LoadAudioResource {
    sourceList: ImageResourceOption[]
}

export const audioResourceMap: { [key: string]: HTMLAudioElement } = {}

export async function loadAudioResource({sourceList}: LoadAudioResource) {
    for (const source of sourceList) {
        const audio = new Audio(`${BASE_URL}/audios/${source.src}`);
        audio.volume = source.volume;
        audioResourceMap[source.src] = audio;
        document.body.appendChild(audio);
    }
}
