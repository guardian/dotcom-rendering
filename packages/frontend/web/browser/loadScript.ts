const loadScript = (src: string): Promise<void> => {
    if (document.querySelector(`script[src="${src}"]`)) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const ref = document.scripts[0];
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject(new Error(`Failed to load script ${src}`));
        };
        if (ref.parentNode) {
            ref.parentNode.insertBefore(script, ref);
        }
    });
};

export { loadScript };
