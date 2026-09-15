import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Foundations', 'Components', 'Patterns', 'Screens', 'Documentation'],
      },
    },
  },
};

export default preview;
