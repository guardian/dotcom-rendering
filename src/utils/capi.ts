export const isFeature = (tags: Array<{ id: string }>): boolean => tags.some(tag => tag.id === 'tone/features');
