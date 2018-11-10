import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Button from './Button';
import theme from '../../theme';

describe('Button', () => {
  const onClick = jest.fn();
  const variant = 'primary';
  const buttonComp = (
    <ThemeProvider onClick={onClick} theme={theme}>
      <Button variant={variant}>CHILD</Button>
    </ThemeProvider>
  );
  test('styles', () => {
    const tree = renderer.create(buttonComp).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', theme.colors.primaryLight);
    expect(tree).toHaveStyleRule('font-size', '16px');
    expect(tree).toHaveStyleRule('padding-left', '20px');
    // we can pass a modifier which will be applied before checking the assertion
    expect(tree).toHaveStyleRule('background-color', theme.colors.primary, {
      modifier: ':hover',
    });
    expect(tree).toHaveStyleRule('font-size', '18px', {
      media: 'screen and (min-width:40em)',
    });
    expect(tree).toHaveStyleRule('padding-left', '25px', {
      media: 'screen and (min-width:40em)',
    });
  });
});
