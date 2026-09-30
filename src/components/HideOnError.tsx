'use client';

import { Component, type ReactNode } from 'react';

/** Si una card tira, no se muestra. Sin número de relleno. */
export default class HideOnError extends Component<
  { children: ReactNode },
  { hide: boolean }
> {
  state = { hide: false };

  static getDerivedStateFromError(): { hide: boolean } {
    return { hide: true };
  }

  render() {
    if (this.state.hide) return null;
    return this.props.children;
  }
}
