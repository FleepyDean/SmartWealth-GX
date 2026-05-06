import { useCallback, useRef } from 'react';

/**
 * Returns a callback ref. The element it is attached to becomes
 * horizontally scrollable via vertical mouse-wheel and click-drag.
 * Using a callback ref (instead of useEffect on a useRef) ensures
 * listeners attach correctly even when the target mounts conditionally.
 */
export default function useHorizontalScroll() {
  const cleanupRef = useRef(null);

  return useCallback((el) => {
    // Detach previous element's listeners (if any)
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (!el) return;

    const onWheel = (e) => {
      // Only intercept primarily-vertical wheel events.
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: 'auto' });
    };

    const DRAG_THRESHOLD = 6; // px before we treat it as a drag (so clicks still fire)
    let isDown = false;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let pointerId = null;

    const onPointerDown = (e) => {
      // Only react to primary mouse / touch / pen — let buttons handle their own clicks.
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDown = true;
      dragging = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      pointerId = e.pointerId;
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragging = true;
        el.setPointerCapture?.(pointerId);
        el.style.cursor = 'grabbing';
      }
      el.scrollLeft = startLeft - dx;
    };
    const onPointerUp = (e) => {
      if (dragging) {
        // Suppress the click that follows a drag so buttons under the cursor don't fire.
        const swallow = (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          el.removeEventListener('click', swallow, true);
        };
        el.addEventListener('click', swallow, true);
      }
      isDown = false;
      dragging = false;
      if (pointerId !== null) el.releasePointerCapture?.(pointerId);
      pointerId = null;
      el.style.cursor = '';
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('pointerleave', onPointerUp);

    cleanupRef.current = () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('pointerleave', onPointerUp);
    };
  }, []);
}
