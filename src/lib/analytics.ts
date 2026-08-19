declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void
  }
}

export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (window.plausible) {
    window.plausible(eventName, { props })
  }
}