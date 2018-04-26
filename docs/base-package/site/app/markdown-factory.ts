import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import * as octicons from 'octicons';
import { Router } from '@angular/router';

export function markedOptionsFactory(router: Router): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.heading = (text: string, level: number) => {
    const escapedText = text.toLowerCase()
      .replace(/[^\w(): ]+/g, '-')
      .replace(/-code-/g, '-')
      .replace(/-strong-/g, '')
      .replace(/-$/, '')
      .replace(/^-/, '')
      .replace(/\([a-zA-Z: ]*\)$/, '');

    const currentUrl = router.routerState.snapshot.url.split('#')[0];
    return level >= 4
      ? `
        <a id="${escapedText}" class="header" href="${currentUrl}#${escapedText}">
          <h${level}>
            ${octicons.link.toSVG()}
            ${text}
           </h${level}>
        </a>
        `
      : `
        <h${level}>
          ${text}
        </h${level}>
      `;
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}
