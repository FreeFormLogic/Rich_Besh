// Утилиты для работы с изображениями в продакшене
import avatarImage from '@assets/Avatar_1754505326694.jpg';

export const getImageSrc = (imageUrl?: string): string => {
  if (!imageUrl) {
    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200";
  }
  
  // Для путей @assets/ используем импортированные изображения
  if (imageUrl.startsWith('@assets/')) {
    if (imageUrl.includes('Avatar_1754505326694.jpg')) {
      return avatarImage;
    }
    // Fallback для других изображений - пытаемся использовать прямой путь
    return imageUrl.replace('@assets/', '/attached_assets/');
  }
  
  return imageUrl;
};

export const avatarImageSrc = avatarImage;