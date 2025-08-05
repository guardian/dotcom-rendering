/**
 * Confetti utility for creating celebration animations
 */

export interface ConfettiOptions {
	/** Number of confetti particles */
	particleCount?: number;
	/** Duration of the animation in milliseconds */
	duration?: number;
	/** Starting position for confetti (relative to viewport) */
	origin?: { x: number; y: number };
	/** Colors for the confetti particles */
	colors?: string[];
	/** Size range for particles */
	size?: { min: number; max: number };
}

interface ConfettiParticle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	color: string;
	size: number;
	rotation: number;
	rotationSpeed: number;
	opacity: number;
	life: number;
	maxLife: number;
}

const defaultOptions: Required<ConfettiOptions> = {
	particleCount: 250,
	duration: 3000,
	origin: { x: 0.5, y: 0.5 },
	colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'],
	size: { min: 4, max: 10 },
};

export class ConfettiInstance {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private particles: ConfettiParticle[] = [];
	private animationId: number | null = null;
	private startTime: number = 0;
	private options: Required<ConfettiOptions>;

	constructor(container: HTMLElement, options: ConfettiOptions = {}) {
		this.options = { ...defaultOptions, ...options };

		// Create canvas
		this.canvas = this.createCanvasElement();

		const ctx = this.canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Could not get canvas context');
		}
		this.ctx = ctx;

		// Size canvas to container
		this.resizeCanvas();

		// Append to container
		container.appendChild(this.canvas);

		// Create particles
		this.createParticles();

		// Start animation
		this.startTime = Date.now();
		this.animate();
	}

	private createCanvasElement(): HTMLCanvasElement {
		const canvas = document.createElement('canvas');
		canvas.style.position = 'absolute';
		canvas.style.top = '0';
		canvas.style.left = '0';
		canvas.style.pointerEvents = 'none';
		canvas.style.zIndex = '9999999';
		return canvas;
	}

	private resizeCanvas(): void {
		const rect = this.canvas.parentElement?.getBoundingClientRect();
		if (rect) {
			this.canvas.width = rect.width;
			this.canvas.height = rect.height;
		}
	}

	private createParticles(): void {
		const { particleCount, origin, colors, size } = this.options;
		const centerX = this.canvas.width * origin.x;
		const centerY = this.canvas.height * origin.y;

		for (let i = 0; i < particleCount; i++) {
			const angle =
				(Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
			const velocity = 2 + Math.random() * 4;
			const particleSize =
				size.min + Math.random() * (size.max - size.min);
			const maxLife = 60 + Math.random() * 60; // 1-2 seconds at 60fps
			const colorIndex = Math.floor(Math.random() * colors.length);
			const selectedColor = colors[colorIndex];

			if (!selectedColor) {
				throw new Error('No color available for confetti particle');
			}

			this.particles.push({
				x: centerX,
				y: centerY,
				vx: Math.cos(angle) * velocity,
				vy: Math.sin(angle) * velocity - Math.random() * 2, // Slight upward bias
				color: selectedColor,
				size: particleSize,
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: (Math.random() - 0.5) * 0.2,
				opacity: 1,
				life: 0,
				maxLife,
			});
		}
	}

	private updateParticles(): void {
		const gravity = 0.1;
		const friction = 0.99;

		this.particles = this.particles.filter((particle) => {
			// Update position
			particle.x += particle.vx;
			particle.y += particle.vy;

			// Apply gravity and friction
			particle.vy += gravity;
			particle.vx *= friction;
			particle.vy *= friction;

			// Update rotation
			particle.rotation += particle.rotationSpeed;

			// Update life and opacity
			particle.life++;
			particle.opacity = 1 - particle.life / particle.maxLife;

			// Remove particles that are off-screen or expired
			return (
				particle.life < particle.maxLife &&
				particle.x > -particle.size &&
				particle.x < this.canvas.width + particle.size &&
				particle.y < this.canvas.height + particle.size
			);
		});
	}

	private drawParticles(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (const particle of this.particles) {
			this.ctx.save();
			this.ctx.globalAlpha = particle.opacity;
			this.ctx.translate(particle.x, particle.y);
			this.ctx.rotate(particle.rotation);
			this.ctx.fillStyle = particle.color;

			// Draw a small square/rectangle
			this.ctx.fillRect(
				-particle.size / 2,
				-particle.size / 2,
				particle.size,
				particle.size,
			);

			this.ctx.restore();
		}
	}

	private animate = (): void => {
		const elapsed = Date.now() - this.startTime;

		if (elapsed < this.options.duration && this.particles.length > 0) {
			this.updateParticles();
			this.drawParticles();
			this.animationId = requestAnimationFrame(this.animate);
		} else {
			this.destroy();
		}
	};

	public destroy(): void {
		if (this.animationId !== null) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}

		if (this.canvas.parentElement) {
			this.canvas.parentElement.removeChild(this.canvas);
		}
	}
}

/**
 * Creates a confetti animation around a specific DOM element
 */
export const createConfetti = (
	targetElement: HTMLElement,
	options: ConfettiOptions = {},
): ConfettiInstance => {
	// Find the closest positioned parent or use document.body
	let container = targetElement.offsetParent as HTMLElement | null;
	if (container === null) {
		container = document.body;
	}

	// Calculate origin relative to container
	const targetRect = targetElement.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	const origin = {
		x:
			(targetRect.left + targetRect.width / 2 - containerRect.left) /
			containerRect.width,
		y:
			(targetRect.top + targetRect.height / 2 - containerRect.top) /
			containerRect.height,
	};

	return new ConfettiInstance(container, { ...options, origin });
};

/**
 * Creates confetti with football-themed colors
 */
export const createFootballConfetti = (
	targetElement: HTMLElement,
	options: Omit<ConfettiOptions, 'colors'> = {},
): ConfettiInstance => {
	const footballColors = [
		'#00ff41', // Bright green (pitch)
		'#ffff00', // Yellow (cards/lines)
		'#ffffff', // White (ball)
		'#ff4444', // Red
		'#4444ff', // Blue
		'#ff8800', // Orange
	];

	return createConfetti(targetElement, {
		...options,
		colors: footballColors,
		particleCount: 60,
		duration: 2500,
	});
};
