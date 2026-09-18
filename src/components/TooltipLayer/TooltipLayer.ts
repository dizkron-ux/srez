import { createElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TooltipState = {
  text: string;
  anchorX: number;
  top: number;
};

const EDGE_GAP = 8;
const SHOW_DELAY = 120;

function getTooltipButton(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLButtonElement>('button[data-tooltip]')
    : null;
}

export function TooltipLayer() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [left, setLeft] = useState(0);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let showTimer = 0;

    const hide = () => {
      window.clearTimeout(showTimer);
      setTooltip(null);
    };

    const show = (button: HTMLButtonElement, delayed: boolean) => {
      const text = button.dataset.tooltip?.trim();
      if (!text || button.disabled) return;
      window.clearTimeout(showTimer);
      const reveal = () => {
        const rect = button.getBoundingClientRect();
        setTooltip({ text, anchorX: rect.left + rect.width / 2, top: rect.bottom + 8 });
      };
      if (delayed) showTimer = window.setTimeout(reveal, SHOW_DELAY);
      else reveal();
    };

    const onMouseOver = (event: MouseEvent) => {
      const button = getTooltipButton(event.target);
      if (!button || (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))) return;
      show(button, true);
    };
    const onMouseOut = (event: MouseEvent) => {
      const button = getTooltipButton(event.target);
      if (!button || (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))) return;
      hide();
    };
    const onFocusIn = (event: FocusEvent) => {
      const button = getTooltipButton(event.target);
      if (button) show(button, false);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (getTooltipButton(event.target)) hide();
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    document.addEventListener('click', hide);
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      window.clearTimeout(showTimer);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('click', hide);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, []);

  useLayoutEffect(() => {
    if (!tooltip || !tooltipRef.current) return;
    const width = tooltipRef.current.offsetWidth;
    const halfWidth = width / 2;
    setLeft(Math.min(window.innerWidth - EDGE_GAP - halfWidth, Math.max(EDGE_GAP + halfWidth, tooltip.anchorX)));
  }, [tooltip]);

  if (!tooltip) return null;

  return createPortal(
    createElement(
      'span',
      {
        ref: tooltipRef,
        className: 'srez-tooltip-layer',
        style: { left: left || tooltip.anchorX, top: tooltip.top },
        'aria-hidden': true,
      },
      tooltip.text,
    ),
    document.body,
  );
}
