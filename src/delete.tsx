function testHandlers(node: ReactNode): void {
    if (isValidElement(node)) {
        const container = document.createElement("div");
        document.body.appendChild(container);
        act(() => {
            renderDom(node, container);
        });
        const likeButton = container.querySelector('[data-testid="like"]');
        const dislikeButton = container.querySelector('[data-testid="dislike"]');
        const feedback = container.querySelector('[data-testid="feedback"]');
        expect(feedback?.getAttribute('hidden')).toBe("")


        act(() => {
         dislikeButton!.dispatchEvent(new MouseEvent('click', {bubbles: true}));
       });

       expect(feedback!.textContent).not.toBe('hidden=""');
     //    dislikeButton.simulate('click');
     //    likeButton.simulate('click');
        expect(feedback.html()).not.toContain('hidden=""');
        unmountComponentAtNode(container);
        container.remove();
    }
}
});
