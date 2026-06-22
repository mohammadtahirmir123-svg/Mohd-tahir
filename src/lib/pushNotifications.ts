/**
 * Global push notification helper that utilizes service worker registration
 * and supports custom callbacks and postMessage fallbacks.
 */

export function getPushPermissionStatus(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined') return 'unsupported';
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export async function requestPushPermission(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!('Notification' in window)) {
    console.warn("Notification API not supported by this browser.");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Trigger a success audio wave beep
      triggerSimpleBeep();
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Notification request permission encountered error/sandbox limit:", err);
    return false;
  }
}

export function triggerSimpleBeep() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.frequency.setValueAtTime(660, now); // Sweet soft synthesized chime
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Avoid blocking UI if audio is disabled
  }
}

/**
 * Triggers a real browser Push notification via the service worker, with robust fallbacks.
 */
export async function sendPushNotification(title: string, body: string) {
  // Always trigger the custom global event for the high-fidelity lockscreen slider simulation
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('phone-push-notification', {
      detail: { title, body, timestamp: 'Just now' }
    }));
  }

  // 1. Try to communicate with the registered Service Worker (Active Controller)
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg.active) {
        reg.active.postMessage({
          type: 'TRIGGER_PUSH_NOTIFICATION',
          payload: {
            title,
            body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            vibrate: [150, 80, 150]
          }
        });
        console.log('⚡ [Push API Router] Dispatched to Service Worker successfully.');
        return;
      }
    } catch (e) {
      console.warn("Could not postMessage to Service Worker:", e);
    }
  }

  // 2. Client-side native HTML Notification fallback if granted permission
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    } catch (err) {
      console.warn("Direct native Notification instantiation bypassed due to sandbox:", err);
    }
  }
}
