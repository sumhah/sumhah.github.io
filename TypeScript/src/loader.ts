const BASE_URL = 'https://sumhah.github.io/TypeScript';

interface loadImageResource {
    sourceList: string[]
    onComplete?: Function
}

export const imgResourceMap: { [key: string]: HTMLImageElement } = {}
export function loadImageResource({sourceList, onComplete}: loadImageResource) {
    let loadedNum = 0
    for (const src of sourceList) {
        const source = new Image();
        source.src = `${BASE_URL}/images/${src}`;
        imgResourceMap[src] = source;
        source.addEventListener('load', () => {
            loadedNum++;
            if (loadedNum >= sourceList.length) {
                onComplete && onComplete();
            }
        });
    }
}

interface ImageResourceOption {
    src: string
    volume: number
}

interface LoadAudioResource {
    sourceList: ImageResourceOption[]
    onComplete?: Function
}

export const audioResourceMap: { [key: string]: HTMLAudioElement } = {}
export function loadAudioResource({sourceList}: LoadAudioResource) {
    for (const source of sourceList) {
        const audio = new Audio(`${BASE_URL}/audios/${source.src}`);
        audio.volume = source.volume;
        audioResourceMap[source.src] = audio;
        document.body.appendChild(audio);
    }
}
