import React, { cloneElement } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';

import { StyledAnchor } from './StyledAnchor';

const Anchor = ({
  a11yTitle,
  children,
  color,
  disabled,
  forwardRef,
  href,
  icon,
  focus,
  label,
  onClick,
  reverse,
  theme,
  ...rest
}) => {
  if ((icon || label) && children) {
    console.warn(
      'Anchor should not have children if icon or label is provided',
    );
  }

  let coloredIcon = icon;
  if (icon && !icon.props.color) {
    coloredIcon = cloneElement(icon, {
      color: normalizeColor(color || theme.anchor.color, theme),
    });
  }

  const first = reverse ? label : coloredIcon;
  const second = reverse ? coloredIcon : label;

  return (
    <StyledAnchor
      {...rest}
      ref={forwardRef}
      aria-label={a11yTitle}
      colorProp={color}
      disabled={disabled}
      hasIcon={!!icon}
      focus={focus}
      hasLabel={label}
      reverse={reverse}
      href={!disabled ? href : undefined}
      onClick={!disabled ? onClick : undefined}
    >
      {first && second ? (
        <Box
          as="span"
          direction="row"
          align="center"
          gap="small"
          style={{ display: 'inline-flex' }}
        >
          {first}
          {second}
        </Box>
      ) : (
        first || second || children
      )}
    </StyledAnchor>
  );
};

Anchor.defaultProps = {};
Object.setPrototypeOf(Anchor.defaultProps, defaultProps);

let AnchorDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AnchorDoc = require('./doc').doc(Anchor);
}
const AnchorWrapper = compose(
  withFocus(),
  withTheme,
  withForwardRef,
)(AnchorDoc || Anchor);

export { AnchorWrapper as Anchor };
