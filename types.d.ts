/**
 * Rukn Design System - TypeScript Definitions
 * @version 2.2.0
 */

declare module '@ruknds/core' {
  /**
   * Import the complete Rukn Design System CSS
   * Includes variables and all component styles
   */
  const styles: string;
  export default styles;
}

declare module '@ruknds/core/variables' {
  /**
   * Import only the CSS variables/design tokens
   */
  const variables: string;
  export default variables;
}

declare module '@ruknds/core/css' {
  /**
   * Import only the component styles (requires variables to be imported separately)
   */
  const css: string;
  export default css;
}

declare module '@ruknds/core/helpers' {
  /**
   * Modal helper functions
   */
  export function openModal(modalId: string): void;
  export function closeModal(modalId: string): void;

  /**
   * Drawer helper functions
   */
  export function openDrawer(drawerId: string): void;
  export function closeDrawer(drawerId: string): void;
}

/**
 * CSS Custom Properties for Rukn Design System
 * Available globally after importing the styles
 */
interface RuknCSSVariables {
  // Colors
  '--r-color-primary': string;
  '--r-color-secondary': string;
  '--r-color-accent': string;
  '--r-color-success': string;
  '--r-color-warning': string;
  '--r-color-error': string;
  '--r-color-destructive': string;
  
  // Spacing
  '--r-space-1': string;
  '--r-space-2': string;
  '--r-space-3': string;
  '--r-space-4': string;
  '--r-space-6': string;
  '--r-space-8': string;
  '--r-space-12': string;
  '--r-space-16': string;
  '--r-space-20': string;
  '--r-space-24': string;
  '--r-space-32': string;
  
  // Typography
  '--r-font-heading': string;
  '--r-font-body': string;
  '--r-font-mono': string;
  '--r-font-arabic': string;
  
  // Transitions (iOS Motion)
  '--r-transition-instant': string;
  '--r-transition-fast': string;
  '--r-transition-base': string;
  '--r-transition-slow': string;
  '--r-transition-slower': string;
  
  // iOS Easing
  '--r-ease-ios-standard': string;
  '--r-ease-ios-smooth': string;
  '--r-ease-ios-decelerate': string;
  '--r-ease-ios-accelerate': string;
  '--r-spring-smooth': string;
  '--r-spring-bouncy': string;
  '--r-spring-snappy': string;
  
  // Border Radius
  '--r-radius-sm': string;
  '--r-radius-md': string;
  '--r-radius-lg': string;
  '--r-radius-xl': string;
  '--r-radius-2xl': string;
  '--r-radius-3xl': string;
  '--r-radius-full': string;
}

export {};

